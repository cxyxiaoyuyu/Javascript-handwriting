// 将原本需要通过传入回调参数来实现回调执行（或者叫同步执行）改为利用promise的.then的方式来调用,
// 或者通过 async await 的方式调用    从而实现逻辑上的同步操作。
function a(str, callback) {
  callback(str + "456");
}

function promisify(fn) {
  return function (...args) {
    return new Promise(function (resolve, reject) {
      let callback = function (...args) {
        resolve(...args);
      };
      fn.apply(null, [...args, callback]);
    });
  };
}

const aa = promisify(a);

async function xxx() {
  const data = await aa("123"); // data 就是回调函数中的参数
  console.log(data);    // 这里可以写真正的callback 
}

xxx();