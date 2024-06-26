// 会有bug catch 没有清空 会有影响 可以用面向对象的方法解决
const cache = [];
module.exports = function deepClone(source) {
  // 判断是不是对象
  if (source instanceof Object) {
    const sourceDist = cache.find((value) => value[0] === source)?.[1];
    if (sourceDist) {
      return sourceDist;
    } else {
      let dist;

      // 数组
      if (source instanceof Array) {
        dist = new Array();

        // 函数
      } else if (source instanceof Function) {
        // dist = function () {
        //   return source.apply(this, arguments);
        // };

        // 考虑箭头函数和普通函数  箭头函数没有原型
        // if (!source.prototype) return source

        const sourceString = source.toString();
        // 哈哈哈 无敌匹配正则 管你函数体换不换行
        let body = sourceString.match(/(?<={)((\n*.*)*)(?=})/m)[0];
        let params = sourceString.match(/(?<=\().*(?=\))/)[0];
        dist = new Function(...params.split(","), body);
        
      // 正则
      } else if (source instanceof RegExp) {
        dist = new RegExp(source.source, source.flags);

        // 日期
      } else if (source instanceof Date) {
        dist = new Date(source);

        // 普通对象
      } else {
        dist = new Object();
      }

      cache.push([source, dist]);
      for (let key in source) {
        // 跳过原型上的属性
        if (source.hasOwnProperty(key)) {
          dist[key] = deepClone(source[key]);
        }
      }
      return dist;
    }

    // 基本类型
  } else {
    return source;
  }
};