const AWS = require("aws-sdk");

async function getStats(event) {
  try {
    const dynamodb = new AWS.DynamoDB.DocumentClient();

    const count_mutant_dna = await dynamodb
      .scan({
        TableName: "DnaTable",
        FilterExpression: "isMutant = :v1",
        ExpressionAttributeValues: {
          ":v1": true,
        },
        Select: "COUNT",
      })
      .promise();

    const count_human_dna = await dynamodb
      .scan({
        TableName: "DnaTable",
        FilterExpression: "isMutant = :v1",
        ExpressionAttributeValues: {
          ":v1": false,
        },
        Select: "COUNT",
      })
      .promise();

    const ratio = count_mutant_dna.Count / count_human_dna.Count;

    const response = {
      count_mutant_dna,
      count_human_dna,
      ratio,
    };

    return {
      status: 200,
      body: JSON.stringify(response),
    };
  } catch (error) {
    console.log(error);
  }
}

module.exports = { getStats };
