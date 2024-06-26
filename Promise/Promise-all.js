Promise.myAll = (promises) => {
  return new Promise((resolve, reject) => {
    let result = [];
    const len = promises.length;
    let count = 0;
    if (len === 0) {
      return resolve([]);
    }
    promises.forEach((p, i) => {
      Promise.resolve(p).then((res) => {
        console.log(i)
        result[i] = res;
        count++;
        if (count === len) {
          resolve(result);
        }
      }).catch(reject);
    });
  });
};

// 测试一下
const p1 = Promise.resolve(1);
const p2 = new Promise((resolve) => {
  setTimeout(() => resolve(2), 1000);
});
const p3 = new Promise((resolve) => {
  setTimeout(() => resolve(3), 3000);
});

// const p4 = new Promise((_, reject) => {
//   setTimeout(() => reject("err4"));
// });
// const p5 = Promise.reject("err5");
// 1. 所有的Promise都成功了
const p11 = Promise.myAll([p1, p2, p3]).then(console.log).catch(console.log);

// 2. 有一个Promise失败了
// const p12 = Promise.myAll([ p1, p2, p4 ])
// 	.then(console.log)
//       .catch(console.log) // err4

// 3. 有两个Promise失败了，可以看到最终输出的是err4，第一个失败的返回值
// const p13 = Promise.myAll([ p1, p4, Promise.reject('123')])
// 	.then(console.log)
//       .catch(console.log) // 123
