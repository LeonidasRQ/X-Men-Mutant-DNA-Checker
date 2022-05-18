const Responses = require("../common/API_Responses");
const Dynamo = require("../common/Dynamo");

const tableName = process.env.tableName;

exports.handler = async (event) => {
  const count_mutant_dna = await Dynamo.get(tableName, true).catch((err) => {
    console.log("Error in Dynamo Get", err);
    return null;
  });

  const count_human_dna = await Dynamo.get(tableName, false).catch((err) => {
    console.log("Error in Dynamo Get", err);
    return null;
  });

  if (!count_human_dna || !count_mutant_dna) {
    return Responses._404({ message: "No dna chains to count on database" });
  }

  const ratio = count_mutant_dna / count_human_dna;

  const response = {
    count_mutant_dna,
    count_human_dna,
    ratio,
  };

  return Responses._200({ response });
};
