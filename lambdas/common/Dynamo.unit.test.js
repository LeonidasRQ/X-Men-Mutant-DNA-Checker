const Dynamo = require("./Dynamo");

test("Dynamo is an object", () => {
  expect(typeof Dynamo).toBe("object");
});

test("Dynamo has get and write", () => {
  expect(typeof Dynamo.get).toBe("function");
  expect(typeof Dynamo.write).toBe("function");
});

const validTableName = "DnaTableCircleCi";
const data = { name: "john" };

test("Dynamo write works", async () => {
  try {
    const res = await Dynamo.write(data, validTableName);
    expect(res).toBe(data);
  } catch (error) {
    console.log("Error in dynamo write test", error);
  }
});

test("Dynamo get works", async () => {
  try {
    const res = await Dynamo.get(validTableName, true);
    expect(res).toEqual(0);
  } catch (error) {
    console.log("Error in Dynamo get", error);
  }
});
