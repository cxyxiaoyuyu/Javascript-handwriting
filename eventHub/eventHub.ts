// on emit off one

class EventHub { 
  private callbacks: {[key:string]:Array<(data: unknown) => void >} = {}
  $on(name:string, fn:(data:unknown) => void){
    this.callbacks[name] = this.callbacks[name] || [] 
    this.callbacks[name].push(fn) 
  }
  $emit(name:string, args?:unknown){ 
    if(this.callbacks[name]){
     this.callbacks[name].forEach(cb => cb(args)) 
    } 
  }
  $off(name:string, fn:(data:unknown) => void){
    let index = indexOf(this.callbacks[name],fn)
    if(index === -1) return
    this.callbacks[name].splice(index,1)
  }
}
export default EventHub


function indexOf(arr:Array<(data: unknown) => void >,item:(data:unknown) => void){
  if(arr === undefined) return -1
  let index = -1
  for(let i=0;i<arr.length;i++){
    if(arr[i] === item){
      index = i
      break
    }
  }
  return index
}

