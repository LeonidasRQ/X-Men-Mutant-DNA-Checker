const Dynamo = require("../../lambdas/common/Dynamo");
const getStats = require("../../lambdas/endpoints/getStats");
const validators = require("../testUtils/validators");
const { dnaChains } = require("../testUtils/dnaChains");

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
    Object.values(dnaChains).map(async (item) => {
      await Dynamo.write(item, process.env.tableName);
    });

    const res = await getStats.handler();

    expect(res.statusCode).toBe(200);
  });
});
