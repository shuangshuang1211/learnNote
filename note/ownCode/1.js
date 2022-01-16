var a = [];
for(var i = 0; i < 10; i++) {
  a[i] = function() {
    console.log(i)
  }
}

a[6]()


if (true) {
  var tmpa = 123;
  var tmpa = 1234;
  let tmp;
  // let tmp;
}
console.log(tmpa);

var arr = [12, 1, 32, 89, 4]
const minValue = arr.reduce((arr, cur) => arr > cur ? cur : arr, arr[0]);
console.log('minValue', minValue);

var a = 10;
var obj = {
  a: 20,
  fn: () => {
    setTimeout(() => {
      console.log(this, this.a)
    })
  }
}
// obj.fn();
// const objfn = obj.fn;
// objfn();

// 柠檬水
// 5 10 20,如果当前是5则跳过，是10，前面的数字必须有一个5， 是20，则有一个5 一个10，或三个5
const zhaol = (dataArr) => {
  let i = 0;
  let flag = true;
  let five = 0;
  let ten = 0;
  while (i < dataArr.length && flag) {
    const cur = dataArr[i];
      if (cur === 5) {
        five += five;
      } else if (cur === 10) {
        if (five >= 1) {
          five = five - 1;
          ten = ten + 1;
        } else {
          flag = false;
          break;
        }
      } else {
        if (ten < 0 || five < 1) {
          flag = false;
          break;
        } else if (ten >= 1 && five >= 1) {
          five = five - 1;
          ten = ten - 1;
        } else if (ten === 0 && five >= 3) {
          five = five - 3;
        }
      }
    i++;
    // break;
  }
  console.log('xxx', i);
  return flag;
}

const test = zhaol([5,20,10,5,5, 20,5,20])

console.log('test', test);
