# webpack
### 原理打包？常用的插件

- 

### HMR热加载的原理？

- webpack express websocket，express 启动本地服务，当浏览器访问资源时以此响应；服务端与客户端用websocket实现长链接；webpack监听源代码是否有变化，当有变化时增量编译构建产生已改动模块json文件和改动模块代码js文件

- 构建完成通过hook.done发送通知，浏览器获取最新的hash，hmr runtime检查是否更新，有更新则下载manifest(改动模块的信息)，再通过模块改动信息用jsonp获取模块改动代码，更新改动模块，更改资源

- **注意点**： 两端都有hmr运行时（runtime）,hmr是增量更新、通过ws通信

  

# gulp
1. 怎么打包