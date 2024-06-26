function Vue(options){
  this.$data = options.data()
  proxy(this)

  this.update = function(){
    console.log('update',this.a,this.b,this.b.c,this.b.arr) 
  }

  this.mount = function(){
    new Watcher(this,this.update.bind(this))
    return this
  }

  observe(this.$data)
}

function observe(obj){
  if(obj && typeof obj === 'object'){
    new Observer(obj)
  }
}

function Observer(obj){

  this.dep = new Dep()
  Object.defineProperty(obj,'__ob__',{
    value: this,
    enumerable: false,  // 不可遍历  
    writable: true,
    configurable: true 
  })

  this.walk = function(obj){
    for(let key in obj){
      defineReactive(obj,key,obj[key]) 
    } 
  }

  this.walkArray = function(array){
    const funs = ['push','pop','sort','reverse','shift','unshift','splice']
    const arrayProto = Object.create(Array.prototype)
    funs.forEach(method => {
      arrayProto[method] = function(){
        console.log('xxx')
        // 原始操作
        Array.prototype[method].apply(array, arguments) 

        const ob = array.__ob__
        ob.dep.notify()
      }
    })

    array.__proto__ = arrayProto
  }

  if(Array.isArray(obj)){
    this.walkArray(obj)
  }else{
    this.walk(obj) 
  }
}

function defineReactive(obj,key,val){
  if(val && typeof val === 'object'){
    console.log(val)
    observe(val) 
  }

  const dep = new Dep()
  Object.defineProperty(obj,key,{
    get(){
      if(Dep.target){
        if(Array.isArray(val)){
          val.__ob__.dep.addSub(Dep.target)
        }else{
          dep.addSub(Dep.target)
        }
      }
      return val    
    },
    set(newVal){
      dep.notify()

      // 这里为什么写 val = newVal  因为obj[key] = newVal 会不断触发set
      // 这里其实是通过闭包 修改val 的值 下次get的时候也返回val的值
      val = newVal 
    }
  })
}

function Watcher(vm,update){
  Dep.target = this
  update()
  Dep.target = null

  this.update = function(){
    update() 
  }
}

function Dep(){
  this.subs = []
  this.addSub = function(watcher){
    this.subs.push(watcher) 
  }
  this.notify = function(){
    this.subs.forEach(watcher => {
      watcher.update() 
    }) 
  }
}

function proxy(vm){
  Object.keys(vm.$data).forEach( key => {
    Object.defineProperty(vm,key,{
      get(){
        return vm.$data[key]
      },
      set(newVal){
        vm.$data[key] = newVal
      }
    }) 
  })
}

function set(target,key,val){
  if(Array.isArray(target)){
    target.splice(key, 1, val);
    return val
  }

  // 数据劫持 通知更新触发get 依赖收集 也会自动更新页面
  defineReactive(target,key,val)
  const ob = target.__ob__
  ob.dep.notify() // 通知更新
}

const vm = new Vue({
  data(){
    return {
      a: 'aaa',
      b: {c: 'ccc',arr: [1,2,3]}
    }
  }
}).mount()
// vm.a = 'AAA'    
// vm.b.c = 'CCC'
// vm.b.arr.push(123)
// console.log(vm.b.arr)

set(vm.b.arr,'1','ddd')