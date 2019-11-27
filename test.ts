import deepClone from './deepClone'

test1('deepClone  is a function')
test2('deepClone  可以克隆基本数据类型')  // number string undefined null bool
test3('deepClone  可以克隆数组')  // Array
test4('deepClone  可以克隆对象')  // Object
test5('deepClone  可以克隆函数')  // Function
test6('deepClone  可以克隆正则')  // RegExp
test7('deepClone  可以克隆日期')  // Date
test8('deepClone  可以克隆复杂对象') 
test9('deepClone  可以跳过原型属性')
test10('deepClone  可以克隆环')


function test1(message:string){
    console.assert(new deepClone().clone instanceof Function)
    console.log(message)
}

function test2(message:string){
    // number
    let num:number = 123
    let num2:number = new deepClone().clone(num)
    console.assert(num === num2)

    // bigInt
    // let big:bigint = 10n
    // let big2:bigint = new deepClone().clone(big)
    // console.assert(big === big2)

    // string
    let str:string = 'abc'
    let str2:string = new deepClone().clone(str)
    console.assert(str === str2)

    // undefined
    let un:undefined = undefined
    let un2:undefined = new deepClone().clone(un)
    console.assert(un === un2)

    // null
    let nu:null = null
    let nu2:null = new deepClone().clone(nu)
    console.assert(nu === nu2)

    // Boolean
    let bool:boolean = true
    let bool2:boolean = new deepClone().clone(bool)
    console.assert(bool === bool2)

    console.log(message)
}

function test3(message:string){
    let arr = [1,[2,3,[4,5]]]
    let arr2 = new deepClone().clone(arr)
    console.assert(arr !== arr2)
    console.assert(arr[0] === arr2[0])
    console.assert(arr[1] !== arr2[1])
    arr[1][2][0] = 9
    console.assert(arr[1][2][0] === 9)
    console.assert(arr2[1][2][0] === 4)
    console.log(message)
}

function test4(message:string){
    let obj:any = {a:1,b:'a',child:{name:'xiaoyu',age:18}}
    obj.xxx = 'xxx'
    let obj2 = new deepClone().clone(obj)
    console.assert(obj !== obj2)
    console.assert(obj.a === obj2.a)
    console.assert(obj2.xxx === 'xxx')
    obj2.child.name = 'cxy'
    console.assert(obj2.child.name === 'cxy')
    console.assert(obj.child.name === 'xiaoyu')

    console.log(message)
}

function test5(message:string){
    // 箭头函数
    let fun = (a,b) => a + b
    let fun2 = new deepClone().clone(fun)
    console.assert(fun !== fun2 )
    console.assert(fun(1,2) === fun2(1,2) )

    // 普通函数
    let fn:any = function(a:number,b:number):number{ return a + b }
    fn.xxx = 'sum'
    let fn2 = new deepClone().clone(fn)
    console.assert(fn !== fn2)
    console.assert(fn2(1,2) === fn(1,2))
    console.assert(fn.length === fn2.length)
    console.assert(fn2.xxx === 'sum')
    fn2.yyy = 'yyy'
    console.assert(fn2.yyy === 'yyy')
    console.assert(fn.yyy !== fn2.yyy)
    // constructor 不同
    console.assert(fn.prototype.constructor !== fn2.prototype.constructor)

    console.log(message)
}

function test6(message:string){
    let reg:any = new RegExp(/(?<=\d{3})abc\d+/gi)
    reg.xxx = {yyy: { zzz: 1, yyy : 2,xxx:'xxx' }}
    let reg2 = new deepClone().clone(reg)
    console.assert(reg.source === reg2.source)
    console.assert(reg.flags === reg2.flags)
    console.assert(reg.xxx !== reg2.xxx)
    console.assert(reg2.xxx.yyy.zzz === 1)
    // console.log(message)
}

function test7(message:string){
    let date:any = new Date()
    date.xxx = {yyy: {zzz: 1}}
    let date2 = new deepClone().clone(date)
    console.assert(date !== date2);
    console.assert(date.getTime() === date2.getTime());
    console.assert(date.xxx.yyy.zzz === date2.xxx.yyy.zzz);
    console.assert(date.xxx.yyy !== date2.xxx.yyy);
    console.assert(date.xxx !== date2.xxx);
    console.log(message)
}

function test8(message:string){
    const a = {
        n: NaN,
        n2: Infinity,
        s: "",
        bool: false,
        null: null,
        u: undefined,
        //sym: Symbol(),
        o: {
          n: NaN,
          n2: Infinity,
          s: "",
          bool: false,
          null: null,
          u: undefined,
          //sym: Symbol()
        },
        array: [
          {
            n: NaN,
            n2: Infinity,
            s: "",
            bool: false,
            null: null,
            u: undefined,
            //sym: Symbol()
          }
        ]
      };
    const a2 = new deepClone().clone(a)
    console.assert(a !== a2);
    console.assert(isNaN(a2.n));
    console.assert(a.n2 === a2.n2);
    console.assert(a.s === a2.s);
    console.assert(a.bool === a2.bool);
    console.assert(a.null === a2.null);
    console.assert(a.u === a2.u);
    //console.assert(a.sym === a2.sym);
    console.assert(a.o !== a2.o);
    console.assert(isNaN(a2.o.n))
    console.assert(a.o.n2 === a2.o.n2);
    console.assert(a.o.s === a2.o.s);
    console.assert(a.o.bool === a2.o.bool);
    console.assert(a.o.null === a2.o.null);
    console.assert(a.o.u === a2.o.u);
    //console.assert(a.o.sym === a2.o.sym);
    console.assert(a.array !== a2.array);
    console.assert(a.array[0] !== a2.array[0]);
    console.assert(isNaN(a2.array[0].n))
    console.assert(a.array[0].n2 === a2.array[0].n2);
    console.assert(a.array[0].s === a2.array[0].s);
    console.assert(a.array[0].bool === a2.array[0].bool);
    console.assert(a.array[0].null === a2.array[0].null);
    console.assert(a.array[0].u === a2.array[0].u);
    //console.assert(a.array[0].sym === a2.array[0].sym);
    console.log(message)
}

function test9(message:string){
    let obj:any = Object.create({name:'xxx'})
    obj.xxx = {yyy: {zzz: 1}}
    let obj2:any = new deepClone().clone(obj)
    console.assert(obj !== obj2)
    console.assert( 'name' in obj2 === false )
    console.assert(obj.xxx.yyy.zzz === obj2.xxx.yyy.zzz);
    console.assert(obj.xxx.yyy !== obj2.xxx.yyy);
    console.assert(obj.xxx !== obj2.xxx);
    console.log(message)
}

function test10(message:string){
    let a:any = {name: 'a'}
    a.self = a
    let a2 = new deepClone().clone(a)
    console.assert(a !== a2);
    console.assert(a2.self === a2)
    console.assert(a.name === a2.name);
    console.assert(a.self !== a2.self);
    console.log(message)
}