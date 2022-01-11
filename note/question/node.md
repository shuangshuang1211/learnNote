- 事件驱动
- 发布订阅
- 观察者

node适合I/O高并发密集型的任务

#### CommonJs 和 ESM 的差异？

- CMS是一种超集，类似于EMAScript规范
- CMS主要针对服务端，适用于同步加载，ES模块适用于浏览器端
- CMS中加载时深度优先遍历加载, 第一次加载某个模块时，会缓存该模块。以后再加载该模块，就直接从缓存取出该模块的module.exports, 输入的是被输出的值的拷贝（这里要特别注意：这里是指在导出时给某个普通类型值放在module.exports内导出，此时在模块内修改这个值，外部不会变化，但是在外部通过引入的这个对象来修改是会改变的）[参考](https://javascript.ruanyifeng.com/nodejs/module.html)
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

#### node 中的队列

- timer: setTimeOut、setInterval
- penndingCallback: 执行操作系统的回调，比如Tcp、UDP
- idle，prepare：只在系统内部进行
- poll: 执行与I/O相关的回调
- check：执行setImmediate的回调
- close callback：执行close事件的回调

#### node中事件的执行流程

- 先执行同步代码，将不同的任务添加至相应的队列，同步代码执行后清空微任务
- 微任务清空后会去time队列中执行满足条件的宏任务，执行完一个宏任务就会去清空微任务再执行下一个宏任务，执行完所有宏任务后依次切换队列（旧版本在每次切换队列之前才会清空微任务）
- node下特有的微任务：process.nextTick(优先级高于promise)