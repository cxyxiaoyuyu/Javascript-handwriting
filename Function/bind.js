Function.prototype.myBind = function () {
  let [_this, ...args] = arguments;
  _this.__fn__ = this;

  const func = function () {
    args = args || [];
    const all_args = [...args, ...arguments];
    return _this.__fn__(...all_args);
  };

  return func;
};
// const func = add.myBind(obj, 3, 4)
// const res = func()
// console.log(res)

// const func = add.myBind(obj)
// const res = func(3,4)
// console.log(res)
