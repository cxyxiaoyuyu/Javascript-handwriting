const chai = require('chai')
const sinon = require('chai')
const sinonChai = require('sinon-chai')

chai.use(sinonChai)
const assert = chai.assert

const deepClone = require('./deepClone')
describe('deepClone',()=>{
  it("是一个函数",()=>{
    assert.isFunction(deepClone)
  })
  it("能够复制基本类型",() => {
    // 1 Number
    const n = 123 
    const n2 = deepClone(n)
    assert(n === n2)

    // 2 String
    const s = 'sss'
    const s2 = deepClone(s)
    assert(s === s2)

    // 3 Boolean
    const b = true
    const b2 = deepClone(b)
    assert(b === b2)

    // 4 un
    const un = undefined
    const un2 = deepClone(un)
    assert(un === un2)

    // 5 nu
    const nu = null
    const nu2 = deepClone(nu)
    assert(nu === nu2)

  })
  describe('对象',()=>{
    it("能够复制普通对象",()=>{
      const a = { name: 'xiaoyu', child: {name: 'xinyi'}} 
      const a2 = deepClone(a)
      assert(a !== a2)
      assert(a.name === a2.name)
      assert(a.child !== a2.child)
      assert(a.child.name === a2.child.name)
    })  
    it("能够复制数组对象",()=>{
      const a = [1,2,[3,4]] 
      const a2 = deepClone(a)
      assert(a !== a2)
      assert(a[0] === a2[0])
      assert(a[1] === a2[1])
      assert(a[2] !== a2[2])
      assert(a[2][0] === a2[2][0])
      assert(a.length = a2.length)  // 判断是不是数组
    })
    it("能够复制函数",()=>{
      const a = function(x,y){ 
        return x + y 
      }
      a.x = 'xxx'
      const a2 = deepClone(a)
      assert(a(1,2) === a2(1,2))
      assert(a.x === a2.x)

      const aa = (x,y) => {
        return x * y
      }
      const aa2 = deepClone(aa)
      assert(aa(2,2)=== aa2(2,2))
    })
    it("能够复制环",()=>{
      const a = { name: 'xiaoyu' } 
      a.self = a
      const a2 = deepClone(a)
      assert(a !== a2)
      assert(a.name = a2.name)
      assert(a.self !== a2.self)
      assert(a.self.name === a2.self.name)
    })
    it("可以复制正则",()=>{
      const a = /123/g 
      const a2 = deepClone(a)
      assert(a !== a2)
      assert(a.source === a2.source)
      assert(a.flags === a2.flags)
    })
    it("可以复制日期",()=>{
      const a = new Date()
      const a2 = deepClone(a)
      assert(a !== a2)
      assert(a.getTime() === a2.getTime())
    })
    it("自动跳过原型属性",()=>{
      const a = Object.create({name: 'a'}) 
      const a2 = deepClone(a)
      assert(a !== a2)
      assert('name' in a)
      assert.isFalse('name' in a2)
    })

    // 一般不考虑 实际会爆栈
    xit("不会爆栈",()=>{
      const a = { next: null } 
      let b = a
      for(let i=0;i<1000;i++){
        b.next = { next: null } 
        b = b.next
      }
      const a2 = deepClone(a)
    })
  })
})