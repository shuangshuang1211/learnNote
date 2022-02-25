// const targetObj = {name: 'target',age: '30'}
// const proxyObj = new Proxy(targetObj, {
//   get: (target, prop, receiver) => {
//     console.log('target = ', target)
//     console.log('prop = ', prop)
//     console.log('receiver = ', receiver, this)
//     // return 10
//     // return Reflect.get(target, prop, receiver)
//     return target[prop]
//   }
// })

// console.log('==', proxyObj, proxyObj.name)

// let user = {
//   _name: "Guest",
//   get name() {
//     console.log('this', this)
//     return this._name;
//   },
// };

// let userProxy = new Proxy(user, {
//   get(target, prop, receiver) {
//     // console.log('receiver', receiver)
//     return Reflect.get(target, prop, receiver); // this指向admin
//     // return target[prop]; // this指向user
//   }
// });

// let admin = {
//   __proto__: userProxy,
//   _name: "Admin"
// };

// console.log('userProxy.name: ', userProxy.name);
// console.log('admin.name: ', admin.name);

// const proxyArr = (data) => {
//   return new Proxy(data, {
//     get: (target, prop, receiver) => {
//       prop = +prop
//       if (prop <= -target.length) {
//         console.log('over limit')
//         return
//       } else if (prop < 0) {
//         prop = prop + target.length
//       }
//       console.log(target, prop, receiver, target.length)
//       return Reflect.get(data, prop, receiver)
//     }
//   })
// }

// const p1 = proxyArr([1,2,3])
// console.log('===', p1[-2])

const obj = {
  name: 'xxxd',
  age: 40,
  hw: '30'
}

// for (let i in obj) {
//   console.log('i = ', i)
// }

// for (let i of obj) {
//   console.log('i = ', i)
// }

const range = {
  from: 1,
  to: 5
}
range[Symbol.iterator] = function() {
  // let i = range.from
  // while (i <= range.to) {
  //   yield i
  //   i++
  // }
  let start = range.from
  return {
    next: () => {
      if (start <= range.to) {
        start ++
        return {value: start - 1, done: false}
      } else {
        return {value: start, done: true}
      }
    }
  }
}
// for (let num of range) {
//   console.log(num) // 希望输出num = 1,2,3,4,5
// }

const myMap = new Map();
myMap.set(+0, '+000');
myMap.set(-0, '-000');
myMap.set(1, '001');
myMap.set(NaN, 'not a number');
// for (let [key, value] of myMap) {
//   console.log('key = ', key, 'value = ', value) // key =  0 value =  000; key =  1 value =  001 ...
// }
// console.log(myMap.size, myMap.has(NaN))  // 3 true
// for (let key of myMap.keys()) {
//   console.log('key = ', key) // key =  0 ; key =  1 ...
// }
// for (let value of myMap.values()) {
//   console.log('value = ', value) // value =  000; value =  001..
// }

function* gen(){
  yield 10;
  let x = yield 'foo';
  yield x;
}
const gen1 = gen()

// console.log(gen1.next(), gen1.next(), gen1.next(20), gen1.next())

function runGen (gen, arr = []) {
  let res;
  if (arr.length > 0) {
    res = gen.next(arr[arr.length - 1].value);
  } else {
    res = gen.next();
  }
  arr.push(res);
  if (!res.done) {
    return runGen(gen, arr);
  } else {
    return arr;
  }
}
// console.log(runGen(gen1))

function* iterArr(arr) {            //迭代器返回一个迭代器对象
  if (Array.isArray(arr)) {         // 内节点
      for(let i=0; i < arr.length; i++) {
          yield* iterArr(arr[i]);   // (*)递归
      }
  } else {                          // 离开
      yield arr;
  }
}
// 或者直接将迭代器展开:
var arr = [ 'a', ['b',[ 'c', ['d', 'e']]]];
var gen = iterArr(arr);
// console.log(runGen(gen))
arr = [...gen]; 

console.log(arr)