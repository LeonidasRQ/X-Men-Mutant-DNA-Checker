const Dynamo = require("./Dynamo");

test("Dynamo is an object", () => {
  expect(typeof Dynamo).toBe("object");
});

test("Dynamo has get and write", () => {
  expect(typeof Dynamo.get).toBe("function");
  expect(typeof Dynamo.write).toBe("function");
});

const validTableName = "DnaTable";

const data = {
  dnaChain: ["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"],
};

// test("Dynamo write works", async () => {
//   expect.assertions(1);
//   try {
//     const res = await Dynamo.write(data, validTableName);
//     expect(res).toBe(res);
//   } catch (error) {
//     console.log("Error in dynamo write test", error);
//   }
// });

// test("Dynamo get works", async () => {
//   expect.assertions(1);
//   try {
//     const res = await Dynamo.get(validTableName, true);
//     expect(res).toEqual(data);
//   } catch (error) {
//     console.log("Error in Dynamo get", error);
//   }
// });
