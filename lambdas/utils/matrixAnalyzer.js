exports.matrixAnalyzer = (processedDna) => {
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

  return {
    leftDiagonal,
    rightDiagonal,
    verticalLine,
    horizontalLine,
  };
};
