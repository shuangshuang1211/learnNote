const bf = Buffer.alloc(8, 20)  // bf <Buffer 14 14 14 14 14 14 14 14>
const bf2 = Buffer.from([1,2,3,4])  // <Buffer 01 02 03 04>,参数还可以是bufffer实例，arraybuffer等
const bf3 = bf2.slice(1,3)  // <Buffer 02 03>
const bf4 = Buffer.from(bf3).fill(5,1)  // <Buffer 02 05>
const bflen = bf.length  // 8
const bf5 = bf4.write('04')  // bf5 = 2, bf4 = <Buffer 30 34>
console.log('bf', bf3 , bf4, bf5)

const fs = require('fs')

fs.writeFile('data.txt', 'hello nodejs', {}, () => {
  console.log('xieru')
})