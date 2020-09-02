const myInstanceof = function(instance, constructor){
  // 如果是基本类型就返回false 用 typeof 判断
  if(typeof instance !== 'object' && typeof instance !== 'function' || instance === null){
    return false
  }
  let proto = instance.__proto__   
  // 或者 proto = Object.getPrototypeOf(instance)
  while(proto !== null){   // 因为原型链的终点是 null
    if(proto === constructor.prototype) return true 
    proto = proto.__proto__
  }
  return false
  // 或者直接用isPrototypeOf判断
  // return constructor.prototype.isPrototypeOf(instance)
}

// 测试
myInstanceof(123,Object)         // false
myInstanceof('abc',String)       // false
myInstanceof([],Array)           // true
myInstanceof([],Object)          // true
myInstanceof({},Array)           // false
myInstanceof({},Object)          // true
myInstanceof(Math.max,Function)  // true
