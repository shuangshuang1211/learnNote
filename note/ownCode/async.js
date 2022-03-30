// 执行遇到await 关键字都会暂停当前函数后面代码的执行,
// await右边表达式相当于一个promise对象，会先执行，await左边以及下面的相当于一个微任务，会等待
// async function async1() {
//   console.log("a");
//   const r = await '不是同步';
//   console.log('r', r);
//   const res = await async2();
//   console.log("b");
// }
// async function async2() {
//   console.log("c");
//   return 2;
// }

// console.log("d");

// setTimeout(() => {
//   console.log("e");
// }, 0);

// async1().then(res => {
//   console.log("f")
// })

// new Promise((resolve) => {
//   console.log("g");
//   resolve();
// }).then(() => {
//   console.log("h");
// });

// console.log("i");
const strinit = '-1+2-3+15--2.5' // 1+-2-3+++4
function transfer(str) {
  const strArr = str.split('')
  let sum = 0, flag, currValue = ''
  sum = strArr.reduce((acc, cur, index, arr) => {
    if (cur === '+' || cur === '-') {
      flag = flag === cur ? '+' : cur
    } else {
      currValue += cur
      if ((arr[index + 1] === '+' || arr[index + 1] === '-') && (flag || flag === undefined) ) {
        flag = flag || arr[index + 1] 
        acc = flag === '+' ? Number(currValue) + acc : acc - Number(currValue)
        currValue = ''
        flag = ''
      }
    }
    return acc
  }, sum)
  currValue = Number(currValue)
  return flag && currValue ? (flag === '-' ? sum - currValue : sum + currValue) : sum
}
console.log('transfer(strinit)= ', transfer(strinit))