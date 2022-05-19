const Dynamo = require("../../lambdas/common/Dynamo");
const getStats = require("../../lambdas/endpoints/getStats");
const validators = require("../testUtils/validators");

describe("Get Stats integration test", () => {
  test("It should return an API Gateway response", async () => {
    const res = await getStats.handler();
    expect(res).toBeDefined();
    expect(validators.isApiGatewayResponse(res)).toBe(true);
  });

  test("It should return a 404 if there are no DNA Chains in the Database", async () => {
    const res = await getStats.handler();
    expect(res.statusCode).toBe(404);
  });

  test("It should return a 200 if there are DNA Chains saved in the database", async () => {
    const tableName = process.env.tableName;

    const dnaChain = {
      id: "1234",
      dnaChain: {
        dnaChain: ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"],
      },
      isMutant: true,
    };

    const dnaChain1 = {
      id: "1235",
      dnaChain: {
        dnaChain: ["TTGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"],
      },
      isMutant: false,
    };

    const dnaChain2 = {
      id: "1236",
      dnaChain: {
        dnaChain: ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"],
      },
      isMutant: true,
    };

    await Dynamo.write(dnaChain, tableName);
    await Dynamo.write(dnaChain1, tableName);
    await Dynamo.write(dnaChain2, tableName);

    const res = await getStats.handler();
    expect(res.statusCode).toBe(200);
  });
});
