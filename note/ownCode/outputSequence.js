// 涉及到多个立即resolve的promise 后续多个then执行的顺序；
// 先执行第一个promise then 的内容，再执行第一个promise then 的内容，再执行第一个promise.then后的then，再执行promise第二个then
// 每遇到一个then就跳出当前代码继续向下执行，把这个then加入微任务的后续队列，
// new Promise((resolve, reject) => {
//   console.log('A');
//   resolve();
// })
// .then(() => {
//   new Promise((resolve, reject) => {
//     console.log('B');
//     resolve();
//   })
//   .then(() => {
//     console.log('C');
//   })
//   .then(() => {
//     new Promise((resolve, reject) => {
//       console.log('D');
//       resolve();
//     })
//     .then(() => {
//       console.log('E');
//     })
//     .then(() => {
//       console.log('F');
//     });
//     console.log('G');
//   })
//   console.log('H');
// })
// .then(() => {
//   console.log('I');
// });

// new Promise((resolve, reject) => {
//   console.log('J');
//   resolve();
// })
// .then(() => {
//   console.log('K');
// })
// .then(() => {
//   console.log('L');
// })
/*
A J
thenB(H) thenK
thenC  thenI thenL
then D G
then E thenF
*/
// 遇到一个then就会把当前then加入一个微任务队列，退出当前then链执行其他代码
new Promise((resolve, reject) => {
  console.log('A');
  setTimeout(() => {
    console.log('B');
  }, 0);
  console.log('C');
  resolve();
  console.log('D');
})
.then(() => {
  console.log('E');
  new Promise((resolve, reject) => {
    console.log('F');
    resolve();
    console.log('G');
  })
  .then(() => {
    setTimeout(() => {
      console.log('H');
    }, 0);
    console.log('I');
  })
  .then(() => {
    console.log('J');
  })
})
.then(() => {
  console.log('K');
})

setTimeout(() => {
  console.log('L');
}, 0);

new Promise((resolve,reject) => {
  console.log('M');
  resolve();
})
.then(() => {
  setTimeout(() => {
    new Promise((resolve,reject) => {
      console.log('N');
      resolve();
    })
    .then(() => {
      setTimeout(() => {
        console.log('O');
      }, 0);
    })
    .then(() => {
      console.log('P');
    })
  }, 0);
});

console.log('Q');