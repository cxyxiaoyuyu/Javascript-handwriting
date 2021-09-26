import EventHub from "./eventHub";

type TestCase = (message: string) => void

const test1:TestCase = message => {
  const eventHub = new EventHub()
  console.assert(eventHub instanceof Object === true,'eventHub 是一个对象')
  console.log(message)
}

const test2:TestCase = message => {
  const eventHub = new EventHub()

  let called = false
  eventHub.$on('开饭了',(message)=>{
    called = true
    console.assert(message === '叫小明回家吃饭')
  })
  eventHub.$emit('开饭了','叫小明回家吃饭')
  console.assert(called)

  console.log(message)
}

const test3:TestCase = message => {
  const eventHub = new EventHub()

  let called = false

  const fn:()=>void = () => {
    called = true
  }

  eventHub.$on('xxx',fn)
  eventHub.$off('xxx',fn)
  eventHub.$emit('xxx')

  console.assert(called === false)

  console.log(message)
}

test1('EventHub是一个对象')
test2('EventHub有发布订阅功能')
test3('EventHub可以取消订阅')