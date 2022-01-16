new Promise((resolve,reject) => {
  console.log('M');
  resolve();
})
.then(() => {
  new Promise((resolve,reject) => {
    console.log('N');
    resolve();
  })
  .then(() => {
    console.log('O');
  })
  .then(() => {
    console.log('P');
  })
  .then(() => {
    console.log('S');
  })
  // console.log('R');
})
.then(() => {
  console.log('Q');
})
.then(() => {
  console.log('t');
})