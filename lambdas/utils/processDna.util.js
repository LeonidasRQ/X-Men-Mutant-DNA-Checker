/**
 * Divides each element of the input array into another array
 * for example: ["TCAG"] would be: ["T", "C", "A", "G"]
 */
exports.processDna = (dnaChain) => {
  const processedDna = dnaChain.map((chain) => chain.split(""));
  return processedDna;
};
