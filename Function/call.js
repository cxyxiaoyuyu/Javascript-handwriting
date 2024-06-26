Function.prototype.myCall = function () {
  const [_this, ...args] = arguments;
  _this.__fn__ = this;
  const result = _this.__fn__(...args);
  delete _this.__fn__;
  return result;
};
const res = add.myCall(obj,2,3)
console.log(res)
