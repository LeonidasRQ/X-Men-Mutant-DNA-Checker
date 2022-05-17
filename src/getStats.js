const AWS = require("aws-sdk");

async function getStats(event) {
  try {
    const dynamodb = new AWS.DynamoDB.DocumentClient();

    let count_mutant_dna_scan = await dynamodb
      .scan({
        TableName: "DnaTable",
        FilterExpression: "isMutant = :v1",
        ExpressionAttributeValues: {
          ":v1": true,
        },
        Select: "COUNT",
      })
      .promise();

    let count_human_dna_scan = await dynamodb
      .scan({
        TableName: "DnaTable",
        FilterExpression: "isMutant = :v1",
        ExpressionAttributeValues: {
          ":v1": false,
        },
        Select: "COUNT",
      })
      .promise();

    const count_mutant_dna = count_mutant_dna_scan.Count;
    const count_human_dna = count_human_dna_scan.Count;
    const ratio = count_mutant_dna / count_human_dna;

    const response = {
      count_mutant_dna,
      count_human_dna,
      ratio,
    };

    return {
      status: 200,
      body: response,
    };
  } catch (error) {
    console.log(error);
  }
}

module.exports = { getStats };
