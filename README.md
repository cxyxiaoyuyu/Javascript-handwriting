## 1 手写深拷贝
* 基本数据类型直接返回 
* 普通对象 数组 递归实现
* 函数 箭头函数直接返回 普通函数正则匹配函数体和函数参数
``` javascript
if (!source.prototype) return source
const sourceString = source.toString()
let body: string = sourceString.match(/(?<={)(.*\n*)(?=})/m)[0]
let params: string = sourceString.match(/(?<=\().*(?=\)\s*{)/)[0]
dist = new Function(...params.split(','), body)
```
* 正则 获取source 和 flags 重新创建
``` javascript
dist = new RegExp(source.source, source.flags);
```
* 日期 直接再创建
``` javascript
dist = new Date(source)
```
* 环 添加cache 判断是否已经克隆过该对象

**跳过原型属性**

## 2 手写 instanceof
> instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上

一般情况下instanceof 不能判断基本类型
``` javascript
'abc' instanceof String   // false
123 instanceof Number     // false
true instanceof Boolean   // false
```

## 3 手写 eventHub

## 4 手写 Promise

