const Responses = require("../common/API_Responses");
const Dynamo = require("../common/Dynamo");

const tableName = process.env.tableName;

const { v4 } = require("uuid");

/**
 * Divides each element of the input array into another array
 * for example: ["TCAG"] would be: ["T", "C", "A", "G"]
 */
function processDna(dnaChain) {
  const processedDna = dnaChain.map((chain) => chain.split(""));
  return processedDna;
}

/**
 * Counts the number of times each element occurs along the array
 */
function checkDuplicates(elements) {
  const rta = elements.reduce((obj, item) => {
    if (!obj[item]) {
      obj[item] = 1;
    } else {
      obj[item] = obj[item] + 1;
    }
    return obj;
  }, {});

  return Object.values(rta).some((value) => value === 4);
}

/**
 * Checks if a certain element is contiguous to another
 */
function checkContiguous(array) {
  let visited = {};

  visited[array[0]] = 1;

  for (let i = 1; i < array.length; i++) {
    if (array[i] == array[i - 1]) continue;
    else if (visited[array[i]]) return false;

    visited[array[i]] = 1;
  }

  return true;
}

/**
 * Checks if the received dna chain is mutant or not
 */
function checkMutant(dna) {
  const processedDna = processDna(dna);

  let leftDiagonal = [];
  let rightDiagonal = [];
  let verticalLine = [];
  let horizontalLine = [];

  const dnaChainSize = processedDna.length;

  for (let i = 0; i < dnaChainSize; i++) {
    // left-bottom and right-bottom diagonal elements are pushed to its corresponding arrays
    leftDiagonal.push(processedDna[i][i]);
    rightDiagonal.push(processedDna[i][dnaChainSize - 1 - i]);
    for (let j = 0; j < dnaChainSize; j++) {
      // up-down and horizontal line elements are pushed to its corresponding arrays
      verticalLine.push(processedDna[j][i]);
      horizontalLine.push(processedDna[i][j]);
    }
  }

  const leftDiagonalHasDuplicates = checkDuplicates(leftDiagonal);
  const rightDiagonalHasDuplicates = checkDuplicates(rightDiagonal);
  const upDownLineHasDuplicates = checkDuplicates(verticalLine);
  const horizontalLineHasDuplicates = checkDuplicates(horizontalLine);

  if (
    leftDiagonalHasDuplicates ||
    rightDiagonalHasDuplicates ||
    upDownLineHasDuplicates ||
    horizontalLineHasDuplicates
  ) {
    const leftDiagonalHasContiguousItems = checkContiguous(leftDiagonal);
    const rightDiagonalHasContiguousItems = checkContiguous(rightDiagonal);
    const upDownLineHasContiguousItems = checkContiguous(verticalLine);
    const HorizontalLineHasContiguousItems = checkContiguous(horizontalLine);

    if (
      leftDiagonalHasContiguousItems ||
      rightDiagonalHasContiguousItems ||
      upDownLineHasContiguousItems ||
      HorizontalLineHasContiguousItems
    ) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

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
