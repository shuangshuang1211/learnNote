// 执行遇到await 关键字都会暂停当前函数后面代码的执行
async function async1() {
  console.log("a");
  const r = await '不是同步';
  console.log('r', r);
  const res = await async2();
  console.log("b");
}
async function async2() {
  console.log("c");
  return 2;
}

console.log("d");

setTimeout(() => {
  console.log("e");
}, 0);

async1().then(res => {
  console.log("f")
})

new Promise((resolve) => {
  console.log("g");
  resolve();
}).then(() => {
  console.log("h");
});

console.log("i");
