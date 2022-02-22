# webpack
### 原理打包？常用的插件

- 怎么提升webpack的打包速度（减少打包体积）？

  1. dll 动态库，开发环境下让大的外部依赖模块打包成dll库，这样以后不用每次再打包

  2. webpack config 可以配置prod和dev的模式，单独配置merge

  3. entry可以有多个，输出目录的配置，runtimechunk可以减少浏览器请求的一些公共文件，进行缓存

  4. Splichunks动态加载的模块进行单独打包，懒加载设置，，外部模块 .vendor

  5. 接入CDN

  6. scope hoisting
  
  7. 对于loader，用include和exclude控制需要转义的范围
  
  8. 按需加载
  
     **require.ensure(dependencies, callback, chunkName)**
  
     import
  
  9. 按需引入
  
  10. Happypack，loader变为多进程
  
  11. 用webpack-bundle-analyzer看打包后的模块分析，找出过大的模块 （减少打包体积）
  
  12. tree shaking
  
  13. webpack4之后，活用[optimization](https://webpack.docschina.org/configuration/optimization/#optimizationchunkids)配置对项目进行自定义优化，虽然它根据mode也可以是自动的
  
  6. CompressionWebpackPlugin对资源进行gzip压缩

#### 前端性能工程优化([详情](https://liuliuliu.yuque.com/staff-ihrmb9/ot84gf/sgeu7q#WfnNu))

![img](./images/perfermance.png)

- 图片优化，选择适合的图片格式
  - Base64、webP
- 资源构建传输优化
  - webpack相关的优化(见上述wepack性能优化)
  - http2
  - gzip
- CDN
- 请求缓存优化
- 本地缓存优化
- 浏览器渲染在开发中可优化的点
- 借助perfermance
- 通用优化技术
  - 懒加载预加载
  - 防抖节流虚拟列表
  - SSR


#### Webpack 的构建流程主要有哪些环节？描述 Webpack 打包的整个过程。

- 初始化配置参数,merge webpack.config.js或shell中输入的配置选项
- 编译
  - 创建一个complier 对象(具有文件读写能力)
   - 挂载配置的pulgins和webpack默认的插件到此对象上
   - complier对象需要定义某些特定事件流的钩子，当执行到该事件时触发回调注入一些新的操作或修改
   - Complier必须有run方法(最终调用此方法来执行打包操作)，在此方法中，实际又实例化了Complition(Complier)
- Complition
  - 确定entry入口(mouduleId),保存在Complition属性上
   - 创建模块，存入依赖的所有模块，从文件中读取依赖模块，若不是js模块或其他非CommonJs规范的加载模块方式，则用loader进行处理，返回js模块
   - 对模块进行转换，转换成AST语法树，用自定义的_webpack_require替换模块导入的关键字require，最终将修改后的AST转换成node code保存
   - 如果依赖的模块又依赖了模块，则递归进行上述操作直到处理完所有依赖模块
- 生成chunk
  - 根据入口找到依赖所有模块后，把所有模块的源码合并到一起，并根据提供的template与源码生成chunk.js文件
  - 最后输出chunk assets到目标目录
- Loader 与plugins 
  1. Loader 只是对文件输入到输出的转换，其本质是一个函数，这个函数如果是在最后一步执行的，其导出必须是一段js代码的字符串(在webpack中经过loader处理完后，会直接把返回值附加到输出的模块代码中)，如果返回的是其他格式，也可以用其他格式的loader再接着进行处理，所以所有loader可以配合一起使用（管道）
  2. Plugins (函数或者包含apply方法的对象，注入到webpack中后会被webpack调用)通过注入到webpack暴露出的钩子节点进行挂载任务然后对代码的一些处理

### HMR热加载的原理？

- webpack express websocket，express 启动本地服务，当浏览器访问资源时以此响应；服务端与客户端用websocket实现长链接；webpack监听源代码是否有变化，当有变化时增量编译构建产生已改动模块json文件和改动模块代码js文件

- 构建完成通过hook.done发送通知，浏览器获取最新的hash，hmr runtime检查是否更新，有更新则下载manifest(改动模块的信息)，再通过模块改动信息用jsonp获取模块改动代码，更新改动模块，更改资源

- **注意点**： 两端都有hmr运行时（runtime）,hmr是增量更新、通过ws通信

  

# gulp
1. 怎么打包