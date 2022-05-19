const { processDna } = require("./processDna.util");
const { checkDuplicates } = require("./checkDuplicates.util");
const { checkContiguous } = require("./checkContiguous.util");
const { matrixAnalyzer } = require("./matrixAnalyzer");
/**
 * Checks if the received dna chain is mutant or not
 */
exports.checkMutant = (dnaChain) => {
  // breaks down the matrix element to its subelements: ["AAAA"] => ["A", "A", "A", "A"]
  const processedDna = processDna(dnaChain);

  // Identifies the diagonals, horizontal lines, and vertical lines of the matriz
  const { leftDiagonal, rightDiagonal, verticalLine, horizontalLine } =
    matrixAnalyzer(processedDna);

  // Verifies if any of the arrays containing the values of the matrix diagonals has any duplicate values in it
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
    // Verifies if any of the arrays containing the values of the matrix diagonals, HL or VL has any contiguous values in it
    const leftDiagonalHasContiguousItems = checkContiguous(leftDiagonal);
    const rightDiagonalHasContiguousItems = checkContiguous(rightDiagonal);
    const upDownLineHasContiguousItems = checkContiguous(verticalLine);
    const horizontalLineHasContiguousItems = checkContiguous(horizontalLine);

    if (
      leftDiagonalHasContiguousItems ||
      rightDiagonalHasContiguousItems ||
      upDownLineHasContiguousItems ||
      horizontalLineHasContiguousItems
    )
      return true;
    else return false;
  } else return false;
};
