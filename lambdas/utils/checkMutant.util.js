const { processDna } = require("./processDna.util");
const { checkDuplicates } = require("./checkDuplicates.util");
const { checkContiguous } = require("./checkContiguous.util");

/**
 * Checks if the received dna chain is mutant or not
 */
exports.checkMutant = (dna) => {
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
};
