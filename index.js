const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  let S3_ENDPOINT, DYNAMODB_TABLENAME;

  if (event['stage-variables']['env'] === 'prod') {
    S3_ENDPOINT = process.env.PROD_S3_ARN;
    DYNAMODB_TABLENAME = process.env.PROD_DYNAMODB_TBLNAME;
  } else {
    S3_ENDPOINT = process.env.DEV_S3_ARN;
    DYNAMODB_TABLENAME = process.env.DEV_DYNAMODB_TBLNAME;
  }

  // const reqBody = event['body-json'];

  const unixtime = new Date().getTime().toString();

  const params = {
    TableName: DYNAMODB_TABLENAME,
    Item: {
      'id': unixtime
      // 'name': reqBody.name,
      // 'title': reqBody.title
    }
  };

  let result;
  try {
    result = dynamodb.put(params);
  } catch (err) {
    result = err;
  }

  // const responseBody = event['body-json'];

  const response = {
    statusCode: 200,
    body: result,
  };
  return response;
};
