const AWS = require("aws-sdk");

let options = {};

if (process.env.IS_OFFLINE) {
  options = {
    region: "localhost",
    endpoint: "http://localhost:8000",
  };
}

if (process.env.MOCK_DYNAMODB_ENDPOINT) {
  options = {
    endpoint: "http://localhost:8000",
    region: "local",
    sslEnabled: false,
  };
}

const documentClient = new AWS.DynamoDB.DocumentClient(options);

const Dynamo = {
  async get(TableName, ExpressionAttributeValue) {
    const params = {
      TableName,
      FilterExpression: "isMutant = :v1",
      ExpressionAttributeValues: {
        ":v1": ExpressionAttributeValue,
      },
      Select: "COUNT",
    };

    const data = await documentClient.scan(params).promise();

    if (!data) {
      throw Error(`There was an error fetching the data from ${TableName}`);
    }
    console.log(data.Count);

    dnaCount = data.Count;

    return dnaCount;
  },

  async write(data, TableName) {
    if (!data) {
      throw Error("There is no data to process");
    }

    const params = {
      TableName,
      Item: data,
    };

    const res = await documentClient.put(params).promise();

    if (!res) {
      throw Error(
        `There was an error inserting ID of ${data.ID} in table ${TableName}`
      );
    }

    return data;
  },
};
module.exports = Dynamo;
