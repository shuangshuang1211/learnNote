// promise setTimeout执行顺序，宏任务微任务，时间循环
// console.log('1', '开始执行');
// const promise1 = new Promise((res, rej) => {
//   console.log('2', 'new promise 内的代码是同步代码');
//   res('promise1');
// }).then((data) => {
//   console.log('6', data, '同步代码执行完马上执行这， res的值就是then中的data');
//   return data;
// });

// const promise2 = new Promise((res, rej) => {
//   console.log('3');
//   setTimeout(() => {
//     res('promise2');
//   }, 10);
// });

// setTimeout(() => {
//   console.log('9', '开始执行宏任务');
// }, 0);
// async function asyncPro() {
//   console.log('4');
//   const data = await promise2;
//   console.log('12', data, 'setTimeout时间为0的执行完，开始执行下一个setTimeout，此时就为promise2中延迟10');
// }
// asyncPro();
// promise2.then((data) => {
//   console.log('13', data, '12和13按顺序执行');
// });
// setTimeout(() => {
//   console.log('10', '相同时间返回的多个宏任务按顺序执行');
// }, 0);

// promise1
// .then((data) => {
//   console.log('7', '同步代码执行完就开始执行微任务');
//   console.log('16_date', new Date());
//   setTimeout(() => {
//     console.log('16');
//   }, 100);
//   return data;
// })
// .then((data) => {
//   console.log('8', data, '多个then会按顺序执行，前一个then中饭return的data就是后续then中接受的data');
// });

// setTimeout(() => {
//   console.log('14', '12和13的setTimeout比14的timeout更先进入执行队列');
// }, 10);
// console.log('15_date', new Date());
// setTimeout(() => {
//   console.log('15', '15比16更先执行，是因为15比16会先进入执行队列， 15是同步代码执行到此时时就开始计数，而16是同步code执行完后才开始的');
// }, 100);
// setTimeout(() => {
//   console.log('11', '9 10 11 按顺序执行，setTimeout为0');
// }, 0);
// console.log('5', '同步代码结束');

//  promise 遇到的面试题

const promise3 = (data) => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (data % 2 === 0) {
      resolve(data);
    } else {
      reject(`${data} 不是偶数`);
    }
  }, 10);
});

// promise3(2).then((data) => {
//   console.log('data', data);
// }).then((data) => {
//   console.log('data', data);
// }).catch((reason) => {
//   console.log('reason', reason);
// })

const promise4 = (data) => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (data % 3 === 0) {
      resolve(data);
    } else {
      reject(`${data} 不是3的倍数`);
    }
  }, 100);
});
// Promise.race([promise3(3), promise4(9)])  // 有一个promise状态Settled就返回
// .then((data) => {console.log('race_data', data)})
// .catch((reason) => { console.log('race_reason', reason);});
// Promise.all([promise3(2), promise4(9)])  // 所有promise fullfiled状态返回结果数组，有一个reject就返回reject
// .then((data) => {console.log('all_data', data)}) // []
// .catch((reason) => { console.log('all_reason', reason);})
// Promise.allSettled([promise3(3), promise4(9)])  // 所有promise 状态Settled就返回结果数组
// .then((data) => {console.log('allSettled_data', data)}) // [{ status: 'rejected', reason: '3 不是偶数' },{ status: 'fulfilled', value: 9 }]
// .catch((reason) => { console.log('allSettled_reason', reason);})
// // Promise.any([promise3(3), promise4(9)])  // 有一个promise状态fullfiled就返回
// // .then((data) => {console.log('all_data', data)}) // []
// // .catch((reason) => { console.log('all_reason', reason);})
// Promise.reject('reject error')  //
// .then((data) => {console.log('reject_data', data)}) // []
// .catch((reason) => { console.log('reject_reason', reason);})
// Promise.resolve('promise3(3)')  //
// .then((data) => {console.log('resolve_data', data)}) // []
// .catch((reason) => { console.log('resolve_reason', reason);})

// 自己实现Promise.all 和Promise.race
const allPromise = (promises) => {
  let res = [];
  const resPromise = new Promise((resolve, reject) => {
    [...promises].forEach((prom, index, arr) => {
      if (prom instanceof Promise) {
        prom.then((data) => {
          res[index] = data;
          if (res.length === arr.length) {
            resolve(res);
          }
        }, reject);
      } else {
        res[index] = prom;
      }
    });
  })
  return resPromise;
};

const racePromise = (arrPromises) => {
  let res = [];
  return new Promise((resolve, reject) => {
    let promises = arrPromises
    if (!(arrPromises instanceof Array)) {
      promises = [...arguments];
    }
    promises.forEach((promise, index) => {
      if (promise instanceof Promise) {
        promise.then((value) => {
          res.push(value);
          if (res.length === 1) {
            return resolve(res);
          }
        }, reject);
      } else {
        res.push(promise);
      }
    });
  })
};

// allPromise([promise3(3), 5, promise4(9)]).then((data) => {console.log('allPromise', data)}).catch((reason) => {console.log('allPromise',reason)})


// 1. 用promise实现一个超时控制
// 延时promise
const sleep = (time) => new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('timeout_获取失败');
  }, time);
});

const controlTime = (actualFunction, timeOutFunction) => Promise.race([actualFunction, timeOutFunction]);

// 测试用例
const createPromise = (time) => new Promise((res, rej) => {
  setTimeout(() => res('成功获取'), time);
});

const example1 = controlTime(createPromise(101), sleep(100));
example1.then((data) => {console.log('example1', data)}).catch((data) => {console.log('example1_reject', data)});

// promise实现代码中断执行
const sleep2 = (time) => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('timeout_继续执行');
  }, time);
});
const stopFunc = (funList, time) => {
  let codes = [...funList];
  if (codes.length >= 1 ) {
    const t1 =  (new Date()).getTime();
    sleep2(time).then(() =>{
      codes[0]();
      const t2 =  (new Date()).getTime();
      console.log('time', t2 - t1);
      codes.shift();
      stopFunc(codes, time)
    })
  }
};

stopFunc([() => {console.log(1)}, () => {console.log(2)}, () => {console.log(3)}], 1000)
// const t1 =  (new Date()).getTime();
// console.log('1', t1);
// sleep2(100).then((data) => {
//   const t2 =  (new Date()).getTime();
//   console.log('2', t2 - t1);
//   sleep2(1000).then(data => {
//     const t3 =  (new Date()).getTime();
//     console.log('3', t3 - t2);
//   })
// }).catch(err => console.log('err', err));
