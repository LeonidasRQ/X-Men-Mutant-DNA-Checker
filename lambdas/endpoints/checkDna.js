const Responses = require("../common/API_Responses");
const Dynamo = require("../common/Dynamo");
const { checkMutant } = require("../utils/checkMutant.util");

const tableName = process.env.tableName;

const { v4 } = require("uuid");

exports.handler = async (event) => {
  const id = v4();
  const { dnaChain } = JSON.parse(event.body);
  const processedAt = new Date();
  const isMutant = checkMutant(dnaChain);

  const newDna = {
    id,
    dnaChain,
    processedAt,
    isMutant,
  };

  await Dynamo.write(newDna, tableName).catch((err) => {
    console.log("Error in DynamoDB write", err);
    return null;
  });

  if (!isMutant) {
    return Responses._403({ message: "It´s not a mutant, get out of here!" });
  }
  return Responses._200({ message: "It's a mutant, come and join us!" });
};
