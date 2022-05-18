/**
 * Counts the number of times each element occurs along the array
 */
exports.checkDuplicates = (elements) => {
  const rta = elements.reduce((obj, item) => {
    if (!obj[item]) {
      obj[item] = 1;
    } else {
      obj[item] = obj[item] + 1;
    }
    return obj;
  }, {});

  return Object.values(rta).some((value) => value === 4);
};
