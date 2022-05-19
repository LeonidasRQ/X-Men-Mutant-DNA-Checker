const checkDna = require("../../lambdas/endpoints/checkDna");
const eventGenerator = require("../testUtils/eventGenerator");
const validators = require("../testUtils/validators");

describe("Check DNA integration test", () => {
  test("It should take a body and return an API Gateway response", async () => {
    const event = eventGenerator({
      body: {
        dnaChain: ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"],
      },
    });

    const res = await checkDna.handler(event);

    expect(res).toBeDefined();
    expect(validators.isApiGatewayResponse(res)).toBe(true);
  });

  test("It should return a 200 if the canditate's DNA is mutant", async () => {
    const event = eventGenerator({
      body: {
        dnaChain: ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"],
      },
    });
    const res = await checkDna.handler(event);

    expect(res.statusCode).toBe(200);
  });

  test("It should return a 403 if the canditate's DNA is human", async () => {
    const event = eventGenerator({
      body: {
        dnaChain: ["TTGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"],
      },
    });
    const res = await checkDna.handler(event);

    expect(res.statusCode).toBe(403);
  });
});
