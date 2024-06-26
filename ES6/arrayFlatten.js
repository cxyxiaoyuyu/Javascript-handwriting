const flatten = (arr) => {
  let result = [];
  arr.forEach((item) => {
    if (Array.isArray(item)) {
      result = result.concat(flatten(item));
    } else {
      result.push(item);
    }
  });
  return result;
};
const arr = [1, [2, [3, ,[5,6,7],4]]];
console.log(flatten(arr));