const AWS = require("aws-sdk");

async function getStats(event) {
  try {
    const dynamodb = new AWS.DynamoDB.DocumentClient();

    const result = await dynamodb
      .scan({
        TableName: "DnaTable",
      })
      .promise();

    const stats = result.Items;

    return {
      status: 200,
      body: { stats },
    };
  } catch (error) {
    console.log(error);
  }
}

module.exports = { getStats };
