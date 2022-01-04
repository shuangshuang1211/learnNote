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

// const example1 = controlTime(createPromise(101), sleep(100));
// example1.then((data) => {console.log('example1', data)}).catch((data) => {console.log('example1_reject', data)});

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
      // console.log('time', t2 - t1);
      codes.shift();
      stopFunc(codes, time)
    })
  }
};

// stopFunc([() => {console.log(1)}, () => {console.log(2)}, () => {console.log(3)}], 1000)
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

// const errPromise = new Promise((resolve, reject) => {
//   throw Error('错误1');
//   console.log('不会执行');
// });

// errPromise
// .then(undefined, (rej) => {
//   console.log('rej', rej);
//   throw Error('错误2');
// })
// .then(undefined, (rej) => {
//   console.log('rej2', rej);
//   // throw Error('错误2');
//   return '2then';
// })
// .catch((error) => {
//   console.log('=====error_catch中的错误', error);
//   // catch 或then的reject捕获到错误后后面的代买还会继续执行
//   const a = `{error} ===`;
//   return '1catch';
// })
// .then((value) => {
//   console.log('错误3====', value);  // 这里的错误不能被上一个catch捕获
//   // throw Error('错误3');
// })
// .then(3)  // return undefined
// .then(Promise.resolve('resolve'))
// .then(console.log)
// .then(() => {
//   throw TypeError('type error');
// })
// .then(undefined, (err) => {
//   console.log('error.message', err);
//   return 100;
// })
// .then((value) => {
//   console.log('最后一个then', value); // value 是undefined
// })
// ;

const p1 = new Promise((res, rej) => {
  // setTimeout(() => {
  //   res(1000)
  // }, 2000);
  // rej('test_2')
});
// p1
// .then(undefined, (err) => `${err}_newtest_3`)
// .finally(() => {
//   console.log('finally')
//   return 3;
// })
// .then((value) => console.log('value', value))
// .then((value) => console.log('p1_第一次then', value), () => 'catch 的返回会在下一个then中捕获')
// .then(console.log)
// .then()
// .then(undefined, (reason) => {console.log('reason失败', reason)});
// p1.then((value) => console.log('p1_第二次then', value));

// const p2 = Promise.resolve('');
// p2.then(() => console.log('chengg')).catch((v) => console.log('rejct=', v));

// const result = Promise.resolve('then中获取的不是参数').then(2).then(Promise.resolve(3)).then(console.log);
// console.log('then中获取的不是参数_result', result);// 打印的时候result还是一个没被resolve的promise对象

// 实现一个Promise
// Promise是一个类，接受的参数是一个函数，且会立即执行
// 原型方法 then、 catch、 finally，返回的是一个promise，可链式调用，如果有异步则等待后续调用, 每个promise实例可以多次调用then方法
//
// 静态方法 all race resolve reject

const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
  constructor (executor) {
    // 传入的创建函数会立即执行，在执行期间如果出错会直接reject
    try {
      executor(this.resolve, this.reject);
    } catch (err) {
      this.reject(err);
    }
  }

  // 定义promise状态；
  status = PENDING;
  // 存储返回的成功的值；
  value;
  /// 失败原因；
  reason;
  // 定义 resolve reject函数, resolve改变状态为fulfilled, rejct 改变状态为 rejected
  // 状态只改变一次，若不是pending则不能再次执行resolve或reject
  resolve = (value) => {
    if (this.status !== PENDING) return;
    this.status = FULFILLED;
    this.value = value;
    while (this.cacheSuscessCallback.length) {
      this.cacheSuscessCallback.shift()();
    }
  }
  reject = (reason) => {
    if (this.status !== PENDING) return;
    this.status = REJECTED;
    this.reason = reason;
    while (this.cacheFailedCallback.length) {
      this.cacheFailedCallback.shift()();
    }
  };

  cacheSuscessCallback = [];
  cacheFailedCallback = [];

  // 定义then；
  then (successCallback, rejectCallback) {
    const isFunc = (fn) => fn instanceof Function;
    const resolveThenValue = (thenReturnPromsie, thenCallbackReturnValue, res, rej) => {
      // 判断then执行后返回的新的promise与then回调函数中返回的promise(如果是promsie)是否是同一个
      // 是同一个则reject
      if (thenReturnPromsie === thenCallbackReturnValue) {
        rej(new TypeError('Type Error'));
      } else if (thenCallbackReturnValue instanceof MyPromise) {
        // 若then回调中返回的是一个promise的新实例则调用这个promise的then方法；
        //（其实就相当于返回这个新的promise），这里理解错了***
        // 因为在then里面已经返回了一个新的new promsie(thenPromise)，所以要把这个promise的结果通过实际返回的promise返回
        // 如果是promise对象 查看promsie对象返回的结果
        // 再根据promise对象返回的结果 决定调用resolve 还是调用reject
        thenCallbackReturnValue.then(res, rej);
      } else {
        // 若是其他值，则直接reslove；
        res(thenCallbackReturnValue);
      }
    };

    // 若then中回调不是函数则用(value) => value代替，只要resolve或reject值未被捕获就会一直传递下去
    let successCall = isFunc(successCallback) ? successCallback : (value) => value;
    // 若失败回调中传入一个非函数值，则需要抛出错误
    let failCall = isFunc(rejectCallback) ? rejectCallback : (reason) => { throw Error(reason) };

    // then 执行后会返回一个新的回调
    const thenPromise = new MyPromise((res, rej) => {
      // 定义执行成功回调函数后对返回结果的处理
      const thenSuccess = () => {
        // 异步调用是为了拿到thenPromise值
        setTimeout(() => {
          // 若then回调返回的Promise出现错误，需要被后续的then或catch捕获
          // 注意，要在timeOut内部try catch，因为这一步的目的是要捕获到会带哦中一些执行出现的错误，如果
          // 放在外面，因为是异步执行TimeOut内的代码，所以try catch不会捕获到
          try {
            const thenValue = successCall(this.value);
            resolveThenValue(thenPromise, thenValue, res, rej);
          } catch (err) {
            rej(err);
          }
        });
      };
      // 定义执行Reject回调函数后对返回结果的处理
      const thenReject = () => {
        setTimeout(() => {
          try {
            const thenValue = failCall(this.reason);
            resolveThenValue(thenPromise, thenValue, res, rej);
          } catch (err) {
            rej(err);
          }
        });
      }
      if (this.status === FULFILLED) {
        // status 变为resolve则执行成功回调
        // 要考虑thenValue的类型，若是promise则进行promsie.then处理返回new promise，后续可以继续调用，其实这里就是再走一遍then逻辑
        thenSuccess();
      } else if (this.status === REJECTED) {
        // reject回调执行后返回的值，也要考虑是否是promise
        thenReject();
      } else {
        // pending，则要存储调用的回调函数，等到resolve或reject时直接调用
        this.cacheSuscessCallback.push(thenSuccess);
        this.cacheFailedCallback.push(thenReject);
      }
    });
    return thenPromise;
  }
  // 定义catch, catch其实是对then中只处理reject回调的包装
  catch (rejectCallback) {
    return this.then(undefined, rejectCallback)
  }

  // finally 无论resolve或者rejected都会调用，这里回调不会有参数，且返回一个新的promise
  // finally 返回的promise会resolve或reject finally之前promise的值，而不是finally中回调的返回值
  finally(call) {
    return this.then((value) => {
      // 这里直接调用当前执行finally promise的then方法，所以此时的value就是新promise要处理的value
      return MyPromise.resolve(call()).then(() => value);
    }, (error) => {
      // 这里的error就是finally执行后reject的error
      return MyPromise.resolve(call()).then(() => { throw error });
    })
  }

  // resolve 如果传入的值是一个promise则返回，如果传入的是其他类型的值则返回一个resolve的promise
  static resolve (value) {
    if (value instanceof MyPromise) {
      return value;
    } else {
      return new MyPromise((res) => {
        res(value);
      })
    }
  }

  // 传入一个值返回一个reject的promise
  static reject (value) {
    return new MyPromise((res,rej) => {
      rej(value);
    })
  }

  // 参数是具有iterable类型，其值可以是promsie或普通数据类型值；所有promsie都resolve则返回一个resolve(值为对应promise处理结果)的promsie,
  // 若有一个reject 则返回reject promise
  // 如果不传值会同步地返回一个已完成（resolved）状态的promise
  static all (arr) {
    let res = [];
    let key = 0;
    return new MyPromise((resolve, reject) => {
      const addData = (value, index) => {
        res[index] = value;
        key ++;
        // 要注意此时key值与实际传入的参数长度做比较
        if (key === arr.length) {
          resolve(res);
        }
      };
      if (arr !== null && typeof arr[Symbol.iterator] === 'function') {
        for (let index = 0; index < arr.length ; index ++) {
          const arrValue = arr[index];
          if (arrValue instanceof MyPromise) {
            arrValue.then((v) => {
              addData(v, index);
            }, (err) => {
              key ++;
              reject(err);
            });
          } else {
            addData(arrValue, index);
          }
        }
      } else if (!arr) {
        resolve();
      } else {
        console.error('arr must be iterable data');
      }
    });
  }

  // 参数可迭代，与all一样，若有一个被拒绝或已解决，则返回rejct 或resolve的promsie；
  // 若参数为空，则返回一个pending的promsie；若有参数已经是resolve或reject或非promise值，则会标记为找到的第一个值
  static race (arr) {
    return  new MyPromise((resolve, reject) => {
      if (arr) {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i] instanceof MyPromise) {
            arr[i].then((rev) => {
              resolve(rev);
              return;
            }, (err) => {
              reject(err);
              return;
            });
          } else {
            resolve(arr[i]);
            return;
          }
        }
      }
    });
  }

  // 参数可迭代，若所有的promise都resolve(fulfilled)或reject异步也完成时，返回一个resolve 数组promsie对应的结果对象数组的promise
  // [{status: 'fulfilled', value: xxx}, {status: 'rejected', reason: xxx}]
  static allSettled (arr) {
    let res = [];
    let key = 0;
    return new MyPromise((resolve, reject) => {
      const addData = (value, index, isReject) => {
        const obj = {
          status: isReject ? 'rejected' : 'fulfilled',
          value: isReject ? undefined : value,
          reason: isReject && value,
        }
        res[index] = obj;
        key ++;
        if (key === res.length) {
          resolve(res);
        }
      };
      if (arr !== null && typeof arr[Symbol.iterator] === 'function') {
        for (let index = 0; index < arr.length ; index ++) {
          const arrValue = arr[index];
          if (arrValue instanceof MyPromise) {
            arrValue.then((v) => {
              addData(v, index);
            }, (err) => {
              addData(err, index, true);
            });
          } else {
            addData(arrValue, index);
          }
        }
      } else {
        console.error('arr must be iterable data');
      }
    });
  }

  // 传入空，则返回已拒绝的promsie，若有一个成功(非promise会返回成功)，则返回这个promsie，若都是失败，返回rejected AggregateErr 的错误
  static any (arr) {
    let key = 0;
    return new MyPromise((resolve, reject) => {
      if (arr !== null && typeof arr[Symbol.iterator] === 'function') {
        for (let index = 0; index < arr.length ; index ++) {
          const arrValue = arr[index];
          if (arrValue instanceof MyPromise) {
            arrValue.then((v) => {
              resolve(v);
              return ;
            }, (err) => {
              key ++;
              if (key === arr.length) {
                reject('AggregateErr: No Promise in Promise.any was resolved');
              }
            });
          } else {
            resolve(arrValue);
            return ;
          }
        }
      } else if (!arr) {
        resolve();
      } else {
        console.error('arr must be iterable data');
      }
    });
  }
}

// 测试案例
const myPromise1 = new MyPromise((res, rej) => {
  // res(1);
  // rej(2);
  setTimeout(() => {
    rej(1000);
  }, 2000);
});
const myPromise2 = new MyPromise((res, rej) => {
  // res(1);
  rej(2);
  // setTimeout(() => {
  //   rej(1000);
  // }, 2000);
});
const myPromise3 = new MyPromise((res, rej) => {
  rej(3);
  // rej(2);
  // setTimeout(() => {
  //   rej(1000);
  // }, 2000);
});
const _ = require('lodash');
// console.log('test', myPromise1.resolve.toString());
const susCall = _.curry((order, value) => {
  console.log(`成功_${order}`, value);
  return '成功';
});
const failCall = _.curry((order, value) => {
  console.log(`失败_${order}`, value);
  return '失败'
});
myPromise1
// .catch(failCall(1))
// .then((value) => {
//   susCall(1.1, value);
//   return '1.1';
// }, (reason) => {
//   failCall(1.1, reason);
// })
// .finally(() => {
//   console.log('finally');
//   return 'finally';
// })
// // .then().then(3)
// .then((value) => {
//   susCall(1.2, value);
// }, (reason) => {
//   failCall(1.2, reason);
// })
;
myPromise1
// .then((value) => {
//   susCall(2.1, value);
// }, (reason) => {
//   failCall(2.2, reason);
// })
// .then((value) => {
//   susCall(2.3, value);
// }, (reason) => {
//   failCall(2.4, reason);
// });
;
// MyPromise.reject('myPromise1').catch((err) => console.log('2', err));
// console.log('MyPromise.reject(myPromise1)', MyPromise.reject(myPromise1));
// Promise.reject(myPromise1).then(() => console.log('1=')).catch((err) => console.log('2=', err));
// console.log('Promise.reject(myPromise1)', Promise.reject(myPromise1));

const res = MyPromise.all([myPromise1, myPromise2, myPromise3, 4]);
res.then((value) => console.log('all所有成功', value), (err) => console.log('有一个失败', err));

const raceRes = MyPromise.race([myPromise1, myPromise2, myPromise3, 4]);
raceRes.then((value) => console.log('race有一个已被resolve', value), (err) => console.log('有一个reject', err));

const allSettledRes = MyPromise.allSettled([myPromise1, myPromise2, myPromise3, 4]);
allSettledRes.then((value) => console.log('allSettled已被resolve', value), (err) => console.log('有一个reject', err));

// const anyRes = MyPromise.any([myPromise1, myPromise2, myPromise3, 4]);
// anyRes.then((value) => console.log('anyRes 有一个resolve', value), (err) => console.log('所有都reject', err));
// console.log('res', res);
// Promise.allSettle()

const pp1 = new Promise((res, rej) => {
  rej('pp2_1')
});
const pp2 = pp1.then(() => {
  throw Error('错误pp2');
  // return new Promise((res, rej) => {
  //   res('2')
  // });
})

pp2.then((value) => {
  console.log('pp2', value);
})
.catch(4)
.catch((error) => {
  console.log('endError', error);
})
;

myPromise3.then(() => {
  throw Error('错误myPromise3');
}).catch(2).then((value) => {console.log('then', value)})
.catch((error) => {
  console.log('endError_MyPromise', error);
});