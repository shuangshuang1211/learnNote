// {a: {test: 1, b: 2}}, 'a.b.c.d' ==> {a: {test: 1, b: {c: {d: {}}}}}}
function namespace(oNamespace, sPackage) {
  const arr = sPackage.split('.');
  const obj = oNamespace;
  arr.forEach((value) => {
    if (value in oNamespace) {
      if (typeof oNamespace[value] !== 'object') {
        oNamespace[value] = {}
      }
    } else {
      oNamespace[value] = {}
    }
    oNamespace = oNamespace[value];
  });

  return obj;
}
// sum(1,2,3,4) === sum(1)(2)(3)(4) === sum(1, 2)(3)(4)
function sum () {
  const sumValueA = [...arguments].reduce((acc, cur) => acc + cur, 0);
  let temp = function () {
    const sumValueB = [...arguments].reduce((acc, cur) => acc + cur, 0);
    return sum(sumValueA+sumValueB);
  }
  temp.toString = function () {
    return sumValueA;
  }
  return temp;
}

// console.log('sum(1)', sum(1).toString());
// console.log('sum(1, 2,3,4,5)', sum(1, 2,3,4,5).toString());
// console.log('sum(1)(2)', sum(1)(2).toString());
// console.log('sum(1,2)(3)(4,5)', sum(1,2)(3)(4,5).toString());

// 排序的方法()?
function bubbleSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] < arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}

function selectSort(arr) {
  const len = arr.length;
  let minNum, minIndex;
  for (let i = 0; i < len - 1; i++) {
    minIndex = i;
    for (let j = i + 1; j < len; j++) {
      if (arr[minIndex] > arr[j]) { // 要寻找最小数
        minIndex = j;  //保存下最小数索引
      }
    }
    minNum = arr[minIndex];
    arr[minIndex] = arr[i];
    arr[i] = minNum;  // i 代表有序数组的索引
  }
  return arr;
}

function insertsort(arr) {
  const len = arr.length;
  for (let i = 1; i < len; i++) {
    let preIndex = i - 1;
    const curr = arr[i];
    while(preIndex >= 0 && arr[preIndex] > curr) {
      arr[preIndex + 1] = arr[preIndex];
      preIndex --;
    }
    arr[preIndex + 1] = curr;
  }
  return arr;
}

const testArr = [3,1,2,1,5,13,21,1, 13,7];
// console.log('bubbleSort', bubbleSort(testArr));
// console.log('selectSort', selectSort(testArr));
// console.log('insertsort', insertsort(testArr));
// function tets(i) {
//   while (i < 5) {
//     console.log('i==', i);
//     i++;
//   }
//   console.log('i***', i);
// }

function shellSort(arr) {
  const len = arr.length;
  for (let gap = Math.floor(len / 2); gap > 0; gap = Math.floor(gap / 2)){
    // 本列在gap = 5; gap = 2; gap = 1依次循坏
    for (let i = gap; i < len; i++) {
      let j = i;
      const cur = arr[i];
      while(j - gap >= 0 && cur < arr[j - gap]) {
        arr[j] = arr[j-gap];
        j = j - gap;
      }
      arr[j] = cur;
    }
  }
  return arr;
}
// console.log('shellSort(testArr)', shellSort(testArr));

const merge = (leftArr, rightArr) => {
  const res = [];
  while(leftArr.length > 0 && rightArr.length > 0) {
    if (leftArr[0] <= rightArr[0]) {
      res.push(leftArr.shift());
    } else {
      res.push(rightArr.shift());
    }
  }
  while (leftArr.length) {
    res.push(leftArr.shift());
  }
  while (rightArr.length) {
    res.push(rightArr.shift());
  }
  return res;
};
function mergeSort(arr) {
  if (arr.length < 2) {
    return arr;
  }
  const middle = Math.floor(arr.length / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);
  return merge(mergeSort(left), mergeSort(right));
}

// console.log('mergeSort', mergeSort([4,5,1,6, 2,1,7,3]));

const swap = (arr, i, j) => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp
};

function partition (arr, left, right) {
  let privot = left;
  let index = privot + 1;
  for (let i = index; i <= right; i++) {
    if (arr[i] < arr[privot]) {
      swap(arr, i, index);
      index++;
    }
  }
  swap(arr, privot, index - 1);
  return index -1;
}

function quickSort (arr) {
  const len = arr.length;
  const pivot = arr[0];
  let left = 1;
  let right = len - 1;
  if (len <= 1) {
    return arr;
  } else {
    while (right > left) {
      if (arr[right] <= pivot) {
        if (arr[left] > pivot) {
          const temp = arr[right];
          arr[right] = arr[left];
          arr[left] = temp;
        } else {
          left++;
        }
      } else {
        right--;
      }
    }
    if (arr[right] <= arr[0]) {
      const tempP = arr[0];
      arr[0] = arr[right];
      arr[right] = tempP;
    }
    // arr[0] = arr[right];
    // arr[right] = pivot;
    // console.log('xxx', arr.slice(0,right), arr.slice(right));
    quickSort(arr.slice(0,right));
    quickSort(arr.slice(right));
    // return arr;
    return quickSort(arr.slice(0,right)).concat(quickSort(arr.slice(right)));
    // if (quickSort(arr.slice(right)) instanceof Array && quickSort(arr.slice(0, right)) instanceof Array) {
    //   return quickSort(arr.slice(0,right)).concat(quickSort(arr.slice(right)));
    // }
  }

}

// console.log('quickSort', quickSort([4,5,1,6, 2,1,7,3,5]));
function countSort(arr, max) {
  let buckt = new Array(max + 1);
  let arrLen = arr.length;
  let sortIndex = 0;
  console.log('buckt', buckt[0]);
  for (let i = 0; i < arrLen; i++) {
    if (!buckt[arr[i]]) {
      buckt[arr[i]] = 0;
    }
    buckt[arr[i]]++;
  }
  for (let j = 0; j < arrLen; j++) {
    while (buckt[j] > 0) {
      arr[sortIndex++] = j;
      buckt[j]--;
    }
  }
  return arr;
}

// console.log('countSort', countSort([4,5,1,6, 2,1,7,3], 7));

let counter = [];
function radixSort (arr, maxDigit) {
  let len = arr.length;
  let mod =10;
  let dev = 1;
  for (let i = 0; i < maxDigit; i++, dev*=10, mod*=10) {
    for (let j = 0; j < len ; j++) {
      const digit = Math.floor(arr[j] % mod / dev);
      if (counter[digit] == null) {
        counter[digit] = [];
      }
      counter[digit].push(arr[j]);
    }
    let index =0;
    for (let x =0; x < counter.length; x++) {
      let value = null;
      console.log('counter[x]', counter, x, counter[x]);
      if (!!counter[x]) {
        while ( (value = counter[x].shift()) !== null) {
          arr[index++] = value;
        }
      }
    }
  }
  return arr;
}

// console.log('radix', radixSort([4,5,1,6, 2,1,7,3], 1));

function debounce (fn, delay) {
  let timer;
  return () => {
    const context = this;
    console.log('this', this.toString());
    const args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  }
}

function throttle (fn, delay = 250) {
  let timer;
  let lastTime;
  return function () {
    let nowTime = Number(new Date());
    const args = arguments;
    const context = this;  // 取debounce执行作用域的this
    // console.log('this', this.toString());
    if (lastTime && nowTime < lastTime + delay) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        lastTime = nowTime;
        fn.apply(context, args);
      }, delay);
    } else {
      lastTime = nowTime;
      fn.apply(context, args);
    }
  }
 }
 const obj = {
   name: 'bbb',
 }
// const fnt = () => this;
// const thfn = throttle(fnt, 5000)();
// console.log('thfn', thfn);

// console.log('test', debounce(fnt, 2000)());

function newOperation (ctors) {
  const args = Array.prototype.slice(arguments, 1);
  const newObj = {};
  newObj._proto_ = ctors.prototype;
  const res = ctors.apply(newObj, args);
  if ((typeof res === 'object' || typeof res === 'function') && res !== null) {
    return res;
  }
  return newObj;
}

function flatArr (arr) {
  return arr.reduce((acc, cur) => {
    if (cur instanceof Array) {
      return acc.concat(flatArr(cur));
    } else {
      return acc.concat(cur);
    }
  }, []);

}

// console.log('flat', flatArr([3, 4, {}, [3, [6, 7,2, [5, 6, 7, 8]]]]));

function multiply(a, b) {
  const aStr = a.toString();
  const bStr = b.toString();
  const aIndex = aStr.indexOf('.');
  const bIndex = bStr.indexOf('.');
  const aFixed = aIndex === -1 ? 0 : aStr.length - aIndex - 1;
  const bFixed = bIndex === -1 ? 0 : bStr.length - bIndex - 1;
  const res =
        a * Math.pow(10, aFixed)* b * Math.pow(10, bFixed) /Math.pow(10, aFixed + bFixed);
  return res.toFixed(aFixed + bFixed);
}


// console.log('multiply', multiply(0.00043, 0.001));

function testVar() {
  for (var i = 0; i < 10; i++) {
    // setTimeout(function() { console.log(i); }, 100 * i);
    console.log(i);
  }
}
// testVar();

const promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve(1), 1000);
});

promise.then((value) => {
  // console.log(value);
});

const getUrl = (url) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onreadystatechange = () => {
      if (this.readystate !== 4) {
        return ;
      } else {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
          resolve(xhr.responseText);
        } else {
          reject(xhr.statusText);
        }
      }
    }
    xhr.responseType = "json";
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.send();
  });
};
// getUrl('http://Users/test/learn/myGitHub/learnJS/note/question/data.json').then((value) => {
//   console.log('success', value);
// }, (error) => {
//   console.log('failed', error);
// });

const allPromise = (arrPromises) => {
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
          if (res.length === promises.length) {
            return resolve(res);
          }
        }, reject);
      } else {
        res.push(promise);
      }
    });
  })
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
// const a = new Promise(function (resolve, reject) {

//   setTimeout(() => {resolve('a resolve');}, 200);
// });
// const b = new Promise(function (resolve, reject) {
//   setTimeout(() => {reject('b resolve');}, 100);
// });
// const c = new Promise(function (resolve, reject) {
//   setTimeout(() => {resolve('c resolve');}, 300);
// });

// Promise.all([a, b, c]).then((vale) => console.log('Promise.all', vale), (err) => {console.log('Promise.all_reject', err)});
// allPromise([a, b, c]).then((vale) => console.log('allPromise', vale), (err) => {console.log('allPromise_reject', err)});

// Promise.race([a, b, c]).then((vale) => console.log('Promise.race', vale), (err) => {console.log('Promise.race_reject', err)});
// racePromise([a, b, c]).then((vale) => console.log('racePromise', vale), (err) => {console.log('racePromise_reject', err)});
// Promise.allSettled([a, b, c]).then((vale) => console.log('Promise.allSellted', vale), (err) => {console.log('Promise.Sellted_reject', err)});
// Promise.any([a, b, c]).then((vale) => console.log('Promise.any', vale), (err) => {console.log('Promise.any_reject', err)});
 // 二叉树遍历求和
 //       1
 //     2   3
 //   4  5 6 7
 //  8 9
 const binaryTree = {
   root: 1,
   left: {
     root: 2,
     left: {
      root: 4,
      left: {
        root: 8,
        left: null,
        right: null
      },
      right: {
        root: 9,
        left: null,
        right: null
      }
     },
     right: {
      root: 5,
      left: null,
      right: null
     }
   },
   right: {
    root: 3,
    left: {
      root: 6,
      left: null,
      right: null
    },
    right: {
      root: 7,
      left: null,
      right: null
    }
   }
 }
let sumArr = [];
 function binaryTreeSum (data, sum = '') {
  //  let newSum = sum;
   if (!data) {
      return sum.toString() + '';
   } else {
      let sumStr = sum.toString() + data.root.toString();
      if (data.left === null || data.left === null) {
        sumArr.push(sumStr);
      } else {
        return binaryTreeSum(data.right ,sumStr) + binaryTreeSum(data.left, sumStr);
      }
   }
 }
 console.log('binaryTreeSum', binaryTreeSum(binaryTree));
console.log('sumArr', sumArr);

 function sumTree(root, sum = 0) {
	// 1. 判断输入是否合法
	if(!root) {
		return 0;
	}
	// 4. 得出结果
	sum = sum + root.val;
	// 2. 判断递归结束的条件（遍历每个节点，对每个节点判断其是否有左右子树）
	if(!root.left && !root.right) {
		return sum;
	}
	// 3. 寻找路径，将问题小化
	return sumTree(root.left, sum) + sumTree(root.right, sum);
}
var root2 = {
  val: 1,
  left: {
      val: 2,
      left: null,
      right: null,
  },
  right: {
      val: 3,
      left: null,
      right: null,
  }
}

//  console.log(binaryTreeSum(binaryTree, 0), sumTree(root2, 0));

 // 去重;
function removeDuplicate (arr) {
  // let newArr = [arr[0]];
  // const isObjectNotEqual = (data) => data instanceof Object &&
  //   Object.keys(value).findIndex((key) => data[key])
  return arr.reduce((acc, value) => {
    if (value instanceof Object) {
      const index = acc.findIndex((data) => {
          if (data instanceof Object) {
            if (Object.keys(value).findIndex((key) => value[key] !== newValue[key]) !== -1) {
              return false;
            }
          } else if (data !== value) {
            return true
          } else {
            return false;
          }
      });
      if (index !== -1) {
        acc.push(value);
      }
    }
    // newArr.forEach((newValue) => {
    //   if (value instanceof Object && newValue instanceof Object) {
    //     if (Object.keys(value).findIndex((key) => value[key] !== newValue[key]) !== -1) {
    //       newArr.push(value);
    //     }
    //   } else if (value !== newValue) {
    //     newArr.push(value);
    //   }
    // });
    return acc;
  }, []);
}
// const dupArr = [1,1, '1', 'NaN', NaN, {a:1}, {a:1}, '{a:1}', [1, 2], [1, 2]];
// console.log('removeDuplicate', removeDuplicate(dupArr), [...new Set(dupArr)]);

function* test (x) {
  console.log('satrt');
  const y = yield x*2;
  const z = yield y*3;
  return z;
}

const gen = test(2);
// console.log('[...gen]', [...gen]);
// const res1 = gen.next();
// const res2 = gen.next(res1.value);
// const res3 = gen.next(res2.value);
// const res4 = gen.next(res3.value);
// console.log(res1);
// console.log(res2);
// console.log(res3);
// console.log(res4);
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

// console.log('runGen', runGen(gen));
// function* helloWorldGenerator() {
//   yield 'hello';
//   yield 'world';
//   return 'ending';
// }

// var hw = helloWorldGenerator();
// hw.next();
// hw.next();
// hw.next();
// // hw.next();
// const dest = function xx() {
//   const a = next();
// }

function Person(own){
  this.own = own;
}
Person.prototype.name = "Nicholas";
Person.prototype.age = 29;
Person.prototype.job = "Software Engineer";
Person.prototype.sayName = function(){
    console.log('this', this, this.name);
};

const persons1 = new Person('own1');
console.log('persons1', persons1);
const persons2 = new Person('own2');
console.log('persons2', persons2);
persons1.sayName();
persons2.sayName();