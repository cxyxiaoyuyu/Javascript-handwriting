Promise.myAllSettled = (promises) => {
  return new Promise((resolve, reject) => {
    let count = 0;
    let length = promises.length;
    const result = [];
    if (length === 0) {
      return resolve([]);
    }

    promises.forEach((p, index) => {
      Promise.resolve(p)
        .then((value) => {
          count += 1;
          result[index] = { value, status: "fulfilled" };
          if (count === length) {
            resolve(result);
          }
        })
        .catch((reason) => {
          count += 1;
          result[index] = { reason, status: "rejected" };
          if (count === length) {
            resolve(result);
          }
        });
    });
  });
};
const p1 = Promise.resolve(1);
const p2 = new Promise((resolve) => {
  setTimeout(() => resolve(2), 3000);
});
const p3 = new Promise((resolve) => {
  setTimeout(() => resolve(3), 1000);
});

const p4 = new Promise((_, reject) => {
  setTimeout(() => reject("err4"));
});
const p11 = Promise.myAllSettled([p1, p2, p3])
  .then(console.log)
  .catch(console.log);

// 2. 有一个Promise失败了
const p12 = Promise.myAllSettled([p1, p2, p4])
  .then(console.log)
  .catch(console.log); // err4

// 3. 有两个Promise失败了，可以看到最终输出的是err4，第一个失败的返回值
const p13 = Promise.myAllSettled([p1, p4, Promise.reject("123")])
  .then(console.log)
  .catch(console.log); // 123
