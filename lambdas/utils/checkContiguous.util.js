/**
 * Checks if a certain element is contiguous to another
 */
exports.checkContiguous = (array) => {
  let visited = {};

  visited[array[0]] = 1;

  for (let i = 1; i < array.length; i++) {
    if (array[i] == array[i - 1]) continue;
    else if (visited[array[i]]) return false;

    visited[array[i]] = 1;
  }

  return true;
};
