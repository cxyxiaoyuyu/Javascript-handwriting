const obj = { a: 1, b: 2 };
const fn = () => {};
const nan = NaN;
const date = new Date();
const reg = /123/;
const arr = [obj, fn, obj, fn, 1, 1, 2, 2, nan, nan, date, date, reg, reg];

const arrayRemoveDuplicate = (arr) => {
  const result = arr.filter((item, index) => {
    // 不能去重NaN  arr.indexOf(NaN) => -1 找不到NaN 最后数组中NaN会丢失
    return arr.indexOf(item) === index;
  });
  console.log(result);
};

const arrayRemoveDuplicate2 = (arr) => {
  const res = Array.from(new Set(arr));
  console.log(res);
};

const arrayRemoveDuplicate3 = (arr) => {
  const map = new Map();
  const arr2 = [];
  for (let a of arr) {
    if (!map.has(a)) {
      map.set(a, a);
      arr2.push(a);
    }
  }
  console.log(arr2);
};

const arrayRemoveDuplicate4 = (arr) => {
  const map = new Map();

  for (let a of arr) {
    if (!map.has(a)) {
      map.set(a, a);
    }
  }
  console.log(Array.from(map.keys()));
};

arrayRemoveDuplicate(arr);
arrayRemoveDuplicate2(arr);
arrayRemoveDuplicate3(arr);
arrayRemoveDuplicate4(arr);
