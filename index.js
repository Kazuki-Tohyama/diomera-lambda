// Github Action 設定テスト

exports.handler = async (event) => {
  let S3_ENDPOINT, DYNAMODB_ENDPOINT;

  if (event['stage-variables']['env'] === 'prod') {
    S3_ENDPOINT = process.env.PROD_S3_ARN;
    DYNAMODB_ENDPOINT = process.env.PROD_DYNAMODB_ARN;
  } else {
    S3_ENDPOINT = process.env.DEV_S3_ARN;
    DYNAMODB_ENDPOINT = process.env.DEV_DYNAMODB_ARN;
  }

  const responseBody = event['body-json'];

  const response = {
    statusCode: 200,
    body: responseBody,
  };
  return response;
};
