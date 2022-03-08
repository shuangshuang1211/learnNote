#### node特点以及适用场景

- 事件驱动
- 发布订阅
- 观察者
- 异步I/O、单线程

node适合I/O高并发密集型的任务

`模块实例(client).on('data', fnCallback)` 是可读流，读取数据

`模块实例(client).write('content') 可写流写数据`

#### TCP粘包及解决

- 粘包产生原因：数据发送端和接收端会对数据进行一个缓冲(什么时候发送数据是由TCP的拥赛机制决定的)，然后再消费数据，这样提高I/O操作的性能

- 解决方法：

  - 可以让发送数据操作设定一定的时间间隔，这样降低了传输效率
  - 数据封包和拆包：数据传输包括消息头（有序列号和长度信息）、消息体

  ```js
  // server
  const net = require('net')
  const server = net.createServer()
  server.listen('端口号', 'ip地址：127.0.0.1')
  server.on('listening', () => {})
  // 监听客户端的请求
  server.on('connection', (socket) => {
    socket.on('data', (chunk) => {
      if (overageBuffer) {
        chunk = Buffer.concat([overageBuffer, chunk])
      }
      let packageLen = 0
      while(packageLen = ts.getPackageLen(chunk)) {
        const packageCon = chunk.slice(0, packageLen)
        chunk = chunk.slice(packageLen)
  
        const ret = ts.decode(packageCon)
        console.log(ret)
  
        socket.write(ts.encode(ret.body, ret.serialNum))
      }
      overageBuffer = chunk
    })
  })
  
  // client
  const net = require('net')
  const MyTransform = require('./myTransform.js')
  
  let overageBuffer = null 
  let ts = new MyTransform()
  
  const client = net.createConnection({
    host: 'localhost', 
    port: 1234
  })
  
  client.write(ts.encode('拉勾教育1'))
  //client.write(ts.encode('拉勾教育2'))
  //client.write(ts.encode('拉勾教育3'))
  //client.write(ts.encode('拉勾教育4'))
  //client.write(ts.encode('拉勾教育5'))
  
  client.on('data', (chunk) => {
    if (overageBuffer) {
      chunk = Buffer.concat([overageBuffer, chunk])
    }
    let packageLen = 0
    while(packageLen = ts.getPackageLen(chunk)) {
      const packageCon = chunk.slice(0, packageLen)
      chunk = chunk.slice(packageLen)
  
      const ret = ts.decode(packageCon)
      console.log(ret)
    }
    overageBuffer = chunk
  })
  ```

  

#### Http协议

原理 组成 断点续传编码缓存等

#### CommonJs 和 ESM 的差异？

- 什么是模块化？将复杂的程序分割成几个块，是按照一定的规范来组织代码的形式
- 模块化的好处？
  - 避免全局命名冲突、可复用性、可维护性、更好的分离与按需加载

- CMS是一种超集，类似于EMAScript规范
- CMS主要针对服务端，适用于同步加载，ES模块适用于浏览器端
- CMS中加载时深度优先遍历加载, 第一次加载某个模块时，会缓存该模块。以后再加载该模块，就直接从缓存取出该模块的module.exports, 输入的是被输出的值的拷贝（这里要特别注意：这里是指在导出时给某个普通类型值放在module.exports内导出，此时在模块内修改这个值，外部不会变化，但是在外部通过引入的这个对象来修改是会改变的）[参考](https://javascript.ruanyifeng.com/nodejs/module.html)
  - CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用
  - commonjs导出的是module.exports，commonjs的导入就是变量赋值。当module.exports的值是字符串、数字等原始类型时，赋值是值拷贝才会产生导出值改变不会导致导入值改变的现象。 esmodule中的导入值更像一个指针，导入导出值都指向同一个同一个内存地址，所以导入值会随导出值变化而变化。

- CMS是运行时加载（动态加载），ESM则是静态编译期间就确定模块的依赖
- ESM在编译期间会将所有import提升到顶部，commonjs不会提升require
- CommonJs 是单个值导出，ES6 Module可以导出多个

#### node 模块加载

- 根据传入的路径找到文件所处绝对路径，判断是否存在此文件，没有就补充完整文件名称，.js\json\node的顺序
- 缓存优先，看此模块是否已加载，若是则直接返回缓存模块的exports
- 读取文档内容，用前后'(function (fileanme, exports, _dirname) {}'、'})'字符串拼接成content
- 调用vm模块执行，this指向exports
- 返回

#### node 中的队列（事件循环机制）

- timer: setTimeOut、setInterval
- penndingCallback: 执行操作系统的回调，比如Tcp、UDP
- idle，prepare：只在系统内部进行使用
- poll: 执行与I/O相关的回调
- check：执行setImmediate的回调
- close callback：执行close事件的回调

#### node中事件的执行流程

- 先执行同步代码，将不同的任务添加至相应的队列，同步代码执行后清空微任务
- 微任务清空后会去timer队列中执行满足条件的宏任务，执行完一个宏任务就会去清空微任务再执行下一个宏任务，执行完所有宏任务后依次切换队列（旧版本在每次切换队列之前才会清空微任务）
- node下特有的微任务：process.nextTick(优先级高于promise)