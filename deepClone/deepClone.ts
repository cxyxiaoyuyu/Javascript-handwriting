export default class deepClone {
  cache: any = []
  clone(source: any) {
    if (source instanceof Object) {
      // 查找缓存里有没有
      let cacheDist = this.findCache(source)
      if (cacheDist) {
        return cacheDist
      } else {
        let dist: any
        if (source instanceof Array) {   // 1 clone array
          dist = new Array()
        } else if (source instanceof Function) {  // 2 clone function
          // 返回source的调用的话 length不会拷贝
          // dist = function(){
          //     return source.apply(this,arguments)
          // }

          // 考虑箭头函数和普通函数  箭头函数没有原型
          if (!source.prototype) return source

          const sourceString = source.toString()
          let body: string = sourceString.match(/(?<={)(.*\n*)(?=})/m)[0]
          let params: string = sourceString.match(/(?<=\().*(?=\)\s*{)/)[0]
          dist = new Function(...params.split(','), body)

        } else if (source instanceof RegExp) {    // 3 clone regExp         
          // @ts-ignore         // 不加这个就会报错 
          dist = new RegExp(source.source, source.flags);
        } else if (source instanceof Date) {      // 4 clone date
          // @ts-ignore
          dist = new Date(source)
        } else {
          dist = new Object()
        }

        this.cache.push([source,dist])
        for (let key in source) {
          if (source.hasOwnProperty(key)) {
            dist[key] = this.clone(source[key])
          }
        }
        return dist
      }
    } else {                        // 基本数据类型直接返回
      return source
    }
  }
  findCache(source: any) {
    let result = this.cache.find(value => value[0] === source)
    if(result){
      return result[1]
    }else{
      return undefined
    }
  }


}