Promise._race = (promises) => {
  return new Promise((resolve, reject) => {
    promises.forEach((p) => {
      Promise.resolve(p).then(resolve).catch(reject);
    });
  });
};
const p1 = new Promise((resolve) => {
  setTimeout(() => {
    resolve(1);
  }, 2000);
});
const p2 = new Promise((resolve) => {
  setTimeout(() => resolve(2), 1000);
});

Promise._race([p1, p2])
  .then((res) => {
    console.log(res);
  })
  .catch((reason) => {
    console.log(reason, "12222");
  });

Promise._race([p2, Promise.reject("123")])
  .then((res) => {
    console.log(res);
  })
  .catch((reason) => {
    console.log(reason, "12222");
  });
