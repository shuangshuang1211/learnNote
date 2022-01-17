- 工程化的意义？解决了哪些问题？

  1. 想使用ES6、7的新特性，但是兼容可能有问题； == 传统语法的弊端
  2. Less、Sass、postCss增加Css编程性，但在运行环境不支持
  3. 想使用模块化或组件化方式来管理优化代码，提高可维护性 ，模块化组件化
  4. 一些手动实现(比如手动打包上传到服务器) == 重复机械式的工作
  5. 代码风格统一、质量保证
  6. 依赖后端项目或接口

- 脚手架本质？

  node实现一个工具包

  创建项目的基础目录结构，提供项目规范、约定以及某些基础依赖

- 实现一个自定义Generator的步骤
  安装yo(npm i yo/ yarn add yo)，不用自定义的generator则还要安装yeoman的sub-generator(例如 generator-node) 最后直接yo sub-generatorName 生成；
  自定义Generator：新建一个generator目录(generator-xxx,必须是这种形式的名字)
  npm / yarn init 初始化这个项目
  安装yeoman的依赖 yeoman-generator
  自定义generator入口文件 generators/app/index.js,在index.js实现文件的编写，处理模板文件
  最后npm link这个generator到全局，在新建的项目目录下用 yo genneratorName(就是generator-后面的名字)

- 怎样发布一个module？

  修改要提交到git仓库

  在项目根目录下npm publish --registry=(官方镜像地址)

- 实现一个脚手架

  1. 初始化项目文件，确定脚手架的入口文件cli.js(必须叫这个名字吗？不是)，入口文件特殊的文件头(#!/usr/bin/env node) linux /mac 还需要修改读写权限，chmod 755 cli.js

     `#!/usr/bin/env node`中'#!'是一个符号用于解释这个脚本的解释程序，实现脚手架，最后其实执行的还是一个脚本，一段代码，这段代码需要什么执行器这是需要指定的，而解释器安装在哪里可以通过/usr/bin/env来确定就是告诉系统可以在PATH目录中查找

  2. 修改package.json 的bin: './cli.js' (了解为什么要在这里设置npm工作模式？)

  3. 编写cli.js文件，命令行交互(inquirer:实现命令行交互插件、模板引擎ejs)

     - 命令行交互拿到需要的数据；
     - 获取模板目录和生成目录；
     - 读取模板下文件进行渲染，写入到目标路径
     - 先npm link到本地全局，新建目录测试一下
     - 如要publish，可以 npm (yarn) publish --registry=https:


- 自动化构建工具(Grunt\Gulp\FIS)

  Grunt:   1. 初始化项目(npm init --yes) ;   2. 安装grunt ； 3. gruntfile.js; 4. ./bin/grunt taskName

- Gulp : 文件流构建工具

  默认入口文件是gulpgile.js

  Src: 是 gulp的读取流，dest:写入流 pipe： 管道

  转换scss、脚本文件(babel，新特性向后兼容)、html模板文件转换、browserSync开发服务器