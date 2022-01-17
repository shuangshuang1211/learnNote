

## 1. Iterator|Generator|await

### 1.1 Iterator 语法

> Iterator 是一个接口（规范），为不同的数据结构提供统一的访问机制
> ES6 当中并不存在Iterator 类

#### 1.1.1 Iterator 特点

1. 任何数据结构只要部署了 Iterator 接口，就可以实现遍历操作，依次处理每个成员
2. 拥有 next 方法，用于依次遍历数据结构成员
3. 每一次遍历都会返回一个对象 {done: false, value: xxx}
   1. done 键会记录着当前数据结构是否遍历完成
   2. value 记录着本次遍历拿到的值 

#### 1.1.2 Iterator 模拟

```js
class Iterator {
  constructor(arr) {
    this.arr = arr
    this.index = 0
  }
  // next方法用于遍历结构，返回 {}
  next = () => {
    if (this.index > this.arr.length - 1) {
      // 如果说当前数据结构中内容都已遍历完成则不会再遍历
      return {
        done: true,
        value: undefined
      }
    }
    return {
      done: false,
      value: this.arr[this.index++]
    }
  }
}

const arr = [1, 2, 3, 4]
const it = new Iterator(arr)
console.log(it.next())
console.log(it.next())
console.log(it.next())
console.log(it.next())
console.log(it.next())
```

#### 1.1.3 可遍历结构

> 虽然 ES6当中并没有内置 Iterator 类，但是有些数据默认拥有 Symbol.iterator 属性，此时数据就被称之为遍历结构，采用 for of 循环处理
> Array String Set Map NodeList Arguments 或者是基于 generator 创建的对象... 
> 对象本身并不满足 Iterator 接口规范

```js
const arr = [1, 2, 3, 4, 5, 6, 7, 8]

arr[Symbol.iterator] = function () {
  // 此接口符合 Iterator 规范，因此要返回一个对象，且具备 next 方法 
  let index = 0
  let self = this
  return {
    next() {
      if (index > self.length - 1) {
        return {
          done: true,
          value: undefined
        }
      }
      let ret = {
        done: false,
        value: self[index]
      }
      index += 2
      return ret
    }
  }
}
for (let item of arr) {
  console.log(item)
}
```

#### 1.1.4 遍历类数组对象

> 对象默认没有实现 Iterator 接口

```js
const obj = {
  0: '100',
  1: 200,
  2: 300,
  length: 3,
  //[Symbol.iterator]: Array.prototype[Symbol.iterator]
  [Symbol.iterator]: function () {
    let index = 0
    let self = this
    return {
      next() {
        return index > self.length - 1 ? {
          done: true,
          value: undefined
        } : {
          done: false,
          value: self[index++]
        }
      }
    }
  }
}

for (let item of obj) {
  console.log(item)
}
```

#### 1.1.5 遍历键值对对象

```js
const obj = {
  name: 'zce',
  age: 40,
  gender: '男',
  length: 3,
  [Symbol.iterator]: function () {
    let self = this
    let keys = [
      ...Object.getOwnPropertyNames(self),
      ...Object.getOwnPropertySymbols(self)
    ]
    let index = 0
    return {
      next() {
        return index > self.length - 1 ? {
          done: true,
          value: undefined
        } : {
          done: false,
          value: self[keys[index++]]
        }
      }
    }
  }
}

for (let item of obj) {
  console.log(item)
}
```

### 1.2 Generator 语法

> 生成器对象是由一个 generator function 返回，并且符合可迭代协议和迭代器协议

#### 1.2.1 生成器对象特点

- 生成器对象，由生成器函数默认返回，且生成器函数不能执行 new **的实例化操作**
- 生成器实例对象的原型身上会存在
  - next 方法，用于遍历对应的值
  - return 结束遍历并且返回 return 指定的值
- 沿着原型链向上查找可以在原型对象上找到 Symbol.iterator 属性

```js
function* foo() {
  return 100
}

const iterator = foo()
console.log(iterator) // 生成器对象， 由生成器函数默认返回
console.log(iterator instanceof foo)  // 检测生成器对象是否为生成器函数实例对象
console.log(iterator.__proto__ == foo.prototype)  // 生成器对象的显式和隐式原型 
// new foo()  // 生成器函数不能执行 new 操作
```

#### 1.2.2 yield 基础语法

```js
function* foo() {
  console.log('aa')
  const m = yield 1
  console.log(m, '<----')
  console.log('bb')
  yield 2
  console.log('cc')
  yield 3
  return 100
}

const iterator = foo()
console.log(iterator.next())
console.log(iterator.next(1000))
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())

for (let item of iterator) {
  console.log(item)
}
```

#### 1.2.3 yield 嵌套和this

```js
function* fn1() {
  console.log(this, '<-----')
  yield 1
  yield 2
}

function* fn2() {
  yield 3
  yield* fn1()
  yield 4
}

const iterator = fn2()
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
```

### 1.3 await 语法

## 2. 异步编程

### 2.1 名词说明

> JS 当中是否存在异步编程
> JS 是否能同时处理多件事情（JS是多线程的？）
> 事件循环是为了解决什么问题或者达到了什么效果
> 事件循环中的循环是如何体现的

#### 2.1.1 进程与线程

1. 进程可以看做是一个应用程序（例如打开浏览器或者浏览器打开一个页面）
2. 线程是程序当中具体做事情的人，每个线程同一时刻只能做一件事
3. 一个进程当中可以包含多个线程

#### 2.1.2 同步异步

1. 同步编程：一件事一件事的去做，上一件没有完成，下一件不会被处理（单线程）
2. 异步编程：上一件事没有处理完，下一件事可以可以继续去处理（多线程）
3. JS是单线程，基于 EventLoop 机制来实现异步编程的

#### 2.1.3 JS 中的异步操作

1. promise(then)
2. async/await(generator)
3. requestAnimationFrame 
4. 定时器操作 
5. ajax(网络请求)
6. 事件线绑定

#### 2.1.4 JS 单线程

1. 浏览器是多线程的，GUI 渲染线程、JS引擎线程、事件触发线程、异步HTTP请求线程
2. 浏览器平台下的 JS 代码是由 JS引擎执行的，所以它是单线程
3. JS 中大部分代码都是同步编程，可以基于单线程的 EventLoop 实现异步效果

### 2.2 EventLoop与EventQueue

[模型图](https://www.processon.com/view/link/614554ccf346fb69b15f55cd)
[测试工具](https://www.jsv9000.app/)

#### 2.2.1 代码执行顺序

1. 浏览器加载界面之后会分配一个线程来执行 JS代码，称之叫 JS引擎（主线程）
2. JS引擎会自下而下执行 JS 代码，此过程会遇到（定时器、网络请求、事件绑定、promise)
3. 遇到上述的代码之后，浏览器会开启一个 Event Queue(任务|事件)队列 **优先级队列结构**
4. 在队列中存在二个任务队列：微任务micro task | 宏任务 macro task
5. 最终会将遇到的异步任务放到 Event Queue队列当中（未执行）
6. 主线程会继续向下执行同步代码，直到所有同步代码执行完就会处理异步任务 
7. 进入 Event Queue 当中查找异步任务，找到之后放入主线程里执行（此时主线程又被步用）
8. 执行完一个异步任务之后，主线程再次空闲，此时再进入 Event Queue 查找余下的异步任务

#### 2.2.2 异步任务执行顺序

1. 先执行微任务（只要有微任务就不会处理宏任务）
2. 微任务（一般是谁先放置谁先执行）
3. 宏任务（一般是谁先到达的谁先执行）

#### 2.2.3 整体顺序

1. 同步任务
2. 异步微任务 
3. 异步宏任务

> － 如果同步任务执行过程中遇到可执行的异步任务，此时依然需要等到同步任务执行完
> － 如果同步任务执行完，还没有可执行的异步任务，此时也只能等待
> － 不论何时放入的微任务，只要异步微任务存在，就永远不会执行异步宏任务（已经放入到微任务队列）

#### 2.2.４ setTimeout 补充

- 设置定义时器这个操作是同步的 
- 放置在 Event Queue 中的任务是异步宏任务
- 函数调用返回数字，表示当前是第几个定时器
- 等待时间设置为0时，也不是立即执行，因为浏览器存在最快的反应时间 
- 定时器的等待时间到了之后，它的代码可能还会执行（处于异步队列中，同步任务还未完成执行）

### 2.3 流程练习

#### 2.3.1 执行流程

```js
setTimeout(() => {
  console.log('1')
}, 30)

console.log(2)

setTimeout(() => {
  console.log(3)
}, 20)

console.log(4)


console.time('AA')
// 消耗95ms
for (let i = 0; i < 88888888; i++) { }
console.timeEnd('AA')

console.log(5)

setTimeout(() => {
  console.log(6)
}, 18)

console.log(7)

setTimeout(() => {
  console.log(8)
}, 25)

console.log(9)
```

#### 2.3.2 主线程占用

```js
// 死循环是将主线程彻底占用，其它所有事情不在处理
// 抛出异常只会影响下面的同步任务，已经放置在队列当中的任务会继续执行
setTimeout(() => {
  console.log(1)
}, 0)

console.log(2)
// while (true) { }
throw new Error('手动抛出异常')
// console.log(a)

console.log(3)

setTimeout(() => {
  console.log(4)
}, 10)

console.log(5)
```


### 2.3 Promise

> Promise 是ES6 当中新增的一个类，Promise 是一种承诺，约定的模式，基于这种模式可以有效的处理异步编程
> 可以有效的管理异步编程当中的代码，让代码开发起来更便捷，维护更方便，可读性更强 

#### 2.3.1 语法

1. executor函数 
   1. 执行 new 操作时必须传入参数
   2. executor 函数接收两个函数作为参数，且会立即执行
   3. executor 函数一般用于管理异步操作， 也可写同步
2. Promise 实例
   1. new 操作执行之后会返回一个 Promise 实例对象
   2. [[PromiseState]] promise状态：pending(准备态)， fulfilled(成功态)，rejected(失败态)
   3. [[PromiseResult]] promise值：默认是undefined, 一般用于存储成功的结果或者失败的原因
   4. __proto__：查找 Promise.prototype 原型，存在 then catch finally 三个常见的方法
3. 状态切换
   1. 执行 resolve 将实例状态改变成功态，传递的值是成功结果
   2. 执行 reject 将实例状态改为 rejected，传递的值是失败结果
   3. 如果 executor 函数中的代码执行报错，则状态也会切换至失败态，报错原因是 value 值 
   4. promise 状态一旦从pending态完成了切换，都无法再次改变状态
4. 异步处理
   1. new Promise 之后会立即执行 executor 函数 
   2. 在 executor 函数中管理了一个异步编程代码，此时状态是 pending(如果是异步操作)
   3. 当异步操作达到执行时机时，开始执行（看做是异步操作成功），调用 reject或者resolve修改状态
   4. 状态明确之后就可以执行后续的代码， 成功态调用第一个方法，失败态调用第二个方法

```js
const p1 = new Promise((resolve, reject) => {
  console.log('executor函数必须传且立即执行')
  // resolve('1000')
  // reject('10')
  // console.log(a)
  // 管理异步操作
  setTimeout(() => {
    resolve('1s之后')
  }, 1000)
})
console.log(p1)

p1.then((result) => {
  console.log('成功态-->', result)
}, (reason) => {
  console.log('失败态-->', reason)
})
```

5. 执行顺序总结

```js
let p1 = new Promise((resolve, reject) => {
  console.log(1)
  // resolve('ok') 
  // console.log('2')
  setTimeout(() => {
    resolve('ok') 
    console.log('2')
  }, 1000)
})
p1.then((ret) => {
  console.log('success--->', ret)
}, (reason) => {
  console.log('failed--->', reason)
})
console.log(3)
```

1. 执行 new Promise 操作
2. 执行 executor 函数： 执行同步代码 + 执行异步操作（如果有）
3. 执行 p1.then 注入两个方法（是否立即添加至微任务队列取决于当前 p1 状态是否明确，不考虑 pending)
4. 同步代码执行完成，等到异步任务也达到可执行状态
5. 先从队列中查找微任务，如果有则拉入主进程执行，如果没有则查找宏任务，如果有则执行

#### 2.3.2 状态和值整理

1. new Promise 获取实例
   1. 通过调用 resolve 或 reject 控制 [[PromiseState]] 和 [[PromiseResult]]
   2. executor 函数执行失败， 状态为 rejected 值为报错信息
2. 执行 then 返回实例
   1. then 注入的两个方法不论执行哪个，只要执行不报错，新实例状态就是 fulfilled，反之就是 rejected，新实例的值就是方法的返回值
   2. 如果方法执行返回新promise实例，则此实例最后的成功或者失败就决定了then拿到的实例是成功还是失败，值都是一样的

```js
let p1 = new Promise((resolve, reject) => {
  resolve('ok')
})

let p2 = p1.then((result) => {
  console.log('success-->', result)
  // return 10
  // console.log(a)
  setTimeout(() => {
    console.log('okk')
  }, 1000)
  // return Promise.resolve('000000')
}, (reason) => {
  console.log('failed-->', reason)
  return 20
})

p2.then((result) => {
  console.log('success-->', result)
}, (reason) => {
  console.log('failed-->', reason)
})
```

#### 2.3.3 失败Promise处理

1. 对于失败的 promise 实例如果没有编写方法处理其结果，则会在控制台中抛出异常信息（不阻碍其它代码执行）
2. then链中的方法处理存在顺延机制，如果某个方法没有传递，则会顺延至下一个then中具备相同状态需要执行的函数

```js
// 此时浏览器会抛出语法异常
Promise.reject('NO').then((result) => {
  console.log('只添加了成功态')
})

// 顺延机制
Promise.reject('No').then((result) => {
  console.log('成功的方法')
}).then(null, (reason) => {
  console.log('第二个then当中的reject 处理方法', reason)
})

// catch 使用
Promise.resolve('拉勾教育').then((result) => {
  console.log('成功1-->', result)
  return 10
}).then((result) => {
  console.log('成功2-->', result)
  return Promise.reject('用 catch 最后来处理失败')
}).catch(reason => {
  console.log('失败原因是：', reason)
})
```

#### 2.3.4 Promise与微任务

1. then 操作
   1. 当前实例的状态如果是明确的，则会创建一个异步微任务
   2. 当前实例的状态如果是pending，此时不会立即创建微任务（可以理解为保存任务）
2. reject|resolve执行
   1. 调用上述方法时会创建一个异步微任务，同步结束后基于状态执行then的相关操作

### 2.4 async 与 await

#### 2.4.1 async 特点

1. 用于修饰函数，默认让函数返回一个 promise 实例 
2. 如果函数执行报错，则 promise状态为 rejected， 值为报错原因
3. 如果函数执行正常则实例状态为 fulfilled，值为函数返回值，如果函数没有返回值则值就是 undefined

```js
async function foo() {
  return 10
}

console.log(foo())

foo().then((result) => {
  console.log('成功态-->', result)
})
```

#### 2.4.2 await 

1. await 要基于 async 配合使用，一般不会单独使用 async 
2. await 后面一般放置的是 promise 实例，如果不是，则会将它转为 new Promise.resolve() 处理
3. await foo() 语法执行规则就是立即执行 foo 函数，接收 foo 的返回值然后处理为 promise 实例 
4. await 本身是一个异步微任务，把当前上下文中 await 下面要执行的代码整体存储到异步微任务当中，当await 后面的promise 实例状态切换之后再去执行之前的异步微任务

```js
function foo() {
  console.log(1)
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(2)
    }, 1000)
  })
}

console.log(3)

async function fn() {
  console.log(4)
  let result = await foo()
  console.log(result)
  console.log(5)
}

fn()

console.log(6)
```

#### 2.4.3 面试题

```js
async function async1() {
  console.log('async1 执行了')
  await async2()
  console.log('async1 结束了')
}

async function async2() {
  console.log('async2')
}

console.log('同步代码执行了')

setTimeout(() => {
  console.log('setTimeout')
}, 0)

async1()

new Promise((resolve) => {
  console.log('promise1')
  resolve()
}).then(() => {
  console.log('promise2')
})

console.log('同步代码结束了')
```

```js
console.log('start')
let timer
Promise.resolve()
  .then(() => {
    console.log('a')
  })
  .then(() => {
    console.log('b')
  })

setTimeout(() => {
  Promise.resolve()
    .then(() => {
      console.log('c')
    })
    .then(() => {
      console.log('d')
    })
  timer = setInterval(() => {
    console.log('loop')
  }, 4000)
  console.log('setTimeout')
}, 0)
```

```js
setTimeout(function foo1() {
  console.log('1')
})

Promise.resolve().then(function foo2() {
  console.log('2')
}).then(function foo3() {
  return Promise.resolve('3').then(function foo4(data) {
    setTimeout(function foo5() {
      console.log('4')
    })
    console.log('5')
    return data
  })
}).then(function foo6(ret) {
  console.log(ret)
})
```

```js
function fn1() {
  console.log('fn1 start')
  return new Promise((resolve) => {
    resolve('zcegg1')
  })
}
function fn2() {
  console.log('fn2 start')
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('zcegg2')
    }, 10)
  })
}
console.log('a')
setTimeout(async () => {
  console.log('b')
  await fn1()
  console.log('c')
}, 20)
for (let i = 0; i < 88888888; i++) { }  // 90ms  
console.log('d')
fn1().then((result) => {
  console.log('f')
})
fn2().then((result) => {
  console.log('g')
})
setTimeout(() => {
  console.log('h')
}, 0)
console.log('end')
```

## 3. 浏览器渲染机制与优化

### 3.1 资源的请求和解析

> 请求是指资源获取，解析指的是代码的执行

1. 客户端从服务器获取页面源代码
   1. 浏览器拿到源码之后开启 GUI 渲染进程，自上而下解析代码，最后绘制
   2. GUI自上而丰渲染解析代码过程整体是同步，但也会遇到异步行为
2. CSS资源加载
   1. style 内嵌样式，GUI线程执行同步渲染行为
   2. link 外链样式，异步操作
      1. 开启 HTTP 网络请求线程
      2. 异步操作不会等到资源完全获取，GUI 线程会继续向下渲染 
      3. GUI 线程将同步操作执行完成之后再处理基于 HTTP 网络请求回来的资源
   3. @import 导入样式（同步操作）
      1. 和 link 相同点是它也会开启 HTTP请求去下载资源 
      2. 和 link 不同点是它会阻塞 GUI 线程渲染，在资源回来之前渲染不会继续
3. Javascript 资源
   1. 默认情况下 script 都是同步操作
      1. 基于http请求，将目标资源请求回本地，由 JS 引擎处理完成，而且 GUI 再继续向下渲染 
      2. script 标签默认会阻塞 GUI 的渲染
      3. window.onload 触发条件，所有资源都加载完成（包含 DOM TREE/CSS/图片等资源）
      4. DOMContentLoaded, DOM TREE加载完即可
   2. async 属性
      1. 遇到 `<script async></script>` 首先会开启 HTTP 请求加载 JS 资源
      2. GUI 渲染线程会继续向下渲染，将默认改为了异步
      3. 一旦资源请求回来就会中断 GUI 的渲染，先把请求回来的 JS 进行渲染解析（不记录顺序）
   3. defer 属性
      1. 遇到 `<script defer></script>` 和 async 一样，开启 HTTP 网络请求加载资源
      2. 此时 GUI 还会继续渲染，执行异步操作
      3. defer 和 link 类似，是在 GUI 同步代码渲染之后才会执行取回的 JS 资源 
   4. 多媒体资源（img video)
      1. 异步操作，遇到请求之后开启 HTTP 线程去加载资源 
      2. 异步操作不会阻塞 GUI 的渲染 （老版本浏览器会阻塞GUI渲染）
      3. 当 GUI 渲染完成之后才会处理请求回来的资源（link defer)
   5. 预测解析
      1. webkit 浏览器预测解析，chrome 的预加载扫描器 html-preload-scanner 通过扫描节点中的 src link 等属性，找到外部链接资源后进进预加载
      2. 上述操作可以避免资源加载的等待时间，同样实现了提前加载以及加载和执行分离

### 3.2 页面渲染步骤

1. DOM TREE(DOM树)：自下而下渲染页面，整理好整个页面的 DOM 结构关系
2. CSS TREE(样式树)：当把所有的样式资源请求回来之后，按照引入 CSS 的顺序，依次渲染成样式代码，生成样式树
3. RENDER TREE(渲染树)：把生成的DOM树和CSS树结合在一起，生成渲染树（默认隐藏的元素不在渲染树中）
4. Layout布局、回流、重排：依据生成的渲染树，计算元素们在设备视口（viewport)内确切位置和大小，这个过程是回流
5. 分层处理：按照层级定位分层处理，每个层级都会有自己的绘制步骤
6. Painting 绘制（重绘）：将每层计算好的绘制步骤，开始绘制页面，依据渲染树及回流得到的几何信息，获取节点绝对像素，最后执行绘制

### 3.3 CRP 关键节点及优化

1. 不使用 @import 导入样式
2. link 标签放置于 head 标签 （提前加载样式资源，利用渲染树快速生成）
3. 样式代码较少时直接使用内嵌，减少 HTTP 请求
4. 减少 DOM或者减少 DOM 层级嵌套，标签语义化（开发时只把首屏结构写出来，只渲染首屏，等待首页渲染完成之后页面滚动时再基于 JS 创建其它屏的结构和内容，骨加屏/SSR） 
5. 把 script 放到页面的底部（先渲染DOM树，再执行JS）
6. 图片合并、Base64、图片懒加载

### 3.4 回流和重绘

#### 3.4.1 名词

1. 回流：元素的大小或者位置发生了变化（页面布局和几何信息发生变化）触发重新布局，渲染树重新计算布局和渲染
   1. DOM 元素增删改查致结构发生改变
   2. DOM 样式（大小或者位置）发生改变
   3. DOM 内容发生改变
   4. 浏览器窗口大小发生改变（视口）
   5. 第一次加载必然会有一次回流
2. 重绘：元素样式发生改变（但宽高、大小、位置信息不变）
3. 回流一定会触发重绘，而重绘不一定会回流

#### 3.4.2 优化方式

1. 回流优化
   1. 使用文档碎片操作DOM
   2. 使用字符串拼接操作DOM
   3. 放弃传统DOM操作，基于 VUE/React 
   4. 分离读写操作（设置和获取分开）
   5. 集中样式改变（设置样式操作集中写在一起）
   6. 缓存布局信息（将修改之前的样式保存在变量中）
   7. 元素批量修改
   8. 尽可能分层（但第一次渲染会慢），当前元素如果具备 position:absolute/fixed再或者具备 opacity/filters等属性，此时在修改样式或执行动画时会优化回流速度（只是优化回流，不是不回流）因为这些元素在重绘的时候只影响当前层
   9. 基于 transform 修改元素样式可以直接跳过渲染树，直接执行重绘，不回流
2. 重绘
   1. 浏览器渲染队列机制， 上一行代码如果是修改元素的样式，此时并没有直接通知浏览器去渲染，
   2. 把它放置在浏览器渲染队列当中，继续向下执行代码，把执行遇到的修改样式操作全部放置到浏览器渲染队列中
   3. 如果不再有修改样式的操作，或者遇到了获取样式的操作则中断队列存放操作把队列中的渲染操作执行一次（引发一次回流）继续向下执行代码

#### 3.4.3 渲染进程

```js
const oBox = document.getElementById('root')
oBox.onclick = function () {
  // 立即回到左侧
  oBox.style.left = 0 
  oBox.style.top = 0
  oBox.style.transitionDuration = '0s'

  // oBox.offsetLeft

  // 移动到别外
  oBox.style.transitionDuration = '1s'
  oBox.style.left = '400px'
}
```