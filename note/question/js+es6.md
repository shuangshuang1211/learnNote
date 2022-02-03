# Js + ES6

### JavaScript 面向对象的理解和感悟

- 什么是面向对象，面向对象有哪些特点，以及这些特点的解释(基础点)
  
  - 面向对象是一种设计思想，
  
  - 面向对象是基于面向过程而言，是把一个个问题抽象成对象的形式，把解决问题的方法作为这个对象的属性或方法

  - 面向对象具有封装、继承、多态的特性
    - 封装： 其主要目的是为数据提供有效性准确性和安全性，以及更好的代码复用，从设计层面在代码级别上对实现层面的管理和控制，降低开发风险或成本；像访问修饰符(public private 默认 protected等)、对象的get (读)或set(修改)方法、以及使用的一些api或平时使用的框架都是对封装的一种实践
  
    - 继承：是指某个对象能获得另一个对象的属性和方法，继承可以实现使用现有的类方法属性而不需要额外的编码；实现继承一般通过inheritance和composition两种方式，从继承概念上来说又可以有接口继承和实现继承，实现继承完全复用父类的属性方法，接口继承则是复用属性和方法的名称，其具体的实现方式还需子类内部自己实现。在es中，其实一开始是没有类的概念，就算新的es6中的类也是es5构造+原型继承上的一种语法糖，而且es中没有函数签名的概念，所以在继承实现方面，不能用接口实现继承，只能支持实现继承。
  
      - **构造函数模式**： 为创建对象es提出了构造函数模式，但是这种方法存在的一个问题是每次实例化对象的时候都会新建一个新的方法，函数也是一个对象，这样就导致不同实例上的同名函数其实不相等；
  
      - **原型链继承**： 所以基于此引入了原型链继承的概念，通过设置构造函数的prototype，所有实例内部_proto_指向原型对象，原型继承最大的问题是如果原型上是一个引用对象，当一个实例更改这个引用对象后，所有实例的这个值都会被修改，不能向超类型中的构造函数传递参数；
  
      - **借用构造函数**：在子类型的构造函数内调用超类的构造函数方法(**SuperType.call(this)**),可以想超类传参，但是也有构造函数带来的问题，以及超类的原型上的属性和方法不能获取
  
      - **组合继承**： 基于此，又提出了组和继承(原型链+借用构造函数)，通过构造函数定义实例的属性，而原型上定义实例共享的属性和方法，这种方式应该是目前es中应用最广泛的一中模式；组合继承其实也存在一种问题，就是当子类要重写父类一些属性时，父类的构造函数会调用两次，一次是在给子类原型赋值，另一个就是在子类构造函数中；
  
      - 如果这几种继承都不适用，又提出了**原型式继承(Object.create())**、**寄生式继承**和**寄生组合式继承**，
  
        - 原型式继承在函数内部(obejct(o))临时定义个构造函数，把o作为构造函数的原型对象，返回这个构造函数的实例；Object.create()就是对这种继承方式的规范化实现，这种也存在包含 引用类型值的属性会共享该值；
  
          ```js
          function object (o) {
            function F() {};
            F.prototype = o;
            return new F();
          }
          ```
  
      - 寄生式继承其实就是创建一个封装继承过程的函数,在函数内部对传入的对象进行增强，然后返回增加的对象，但这种也会存在于构造函数模式一样的问题，函数不能复用；
  
        ```js
        function createAnother (original) {
                const clone = object(original);
                // 对clone对象进行增加
                clone.ownMethod = () => {};
                return clone
              }
        ```
  
      - 寄生组合继承，寄生组合继承就是借用构造函数继承属性，原型链的混成形式继续方法，不必为了指定子类型的原型而调用超类型的构造函数，一般这种模式普遍被认为是理想的模式，
  
        ```js
        function inheritPrototype (SuperType, SubType) {
              	const prototype = object(SuperType.prototype);
                prototype.constructor = SubType
                SubType.prototype = prototype;
              }
        ```
  
      因为es中继承各种或多或少的问题，所以再现在开发中引入TS，辅助开发。extends用于扩展父类，mixin混合多种类组成新的类
  
    - 多态：针对某个对象的方法或属性，在实际运行时可能会有不同的实现，体现了可扩展性和多样性
  
  - **原型的考点**
  
    constructor的指向，instanceOf的手动实现，原型链的尽头(Object.prototype._proto_ === null),原型链的属性屏蔽问题（原型链上有且writeable为true会重写，writeable为false则无法修改，如果是个setter，则一定会调用这个setter，不会屏蔽也不会重新定义），创建一个纯净的对象(Obejct.create(null)),
  
    ```js
    // 实现instanceof
          function myInstanceof (instance, constructorFn) {
            // instance 为普通类型或null则返回false
            // constructorFn 为构造函数
            if (typeof constructorFn !== 'function')  throw new Error('');
            if ((typeof instance !== 'function' && typeof instance !== 'object') || null) return false;
            // 循环查找instance的原型对象是否是constructorFn的prototype,直到instance的原型对象为null
            const protoObj = constructorFn.prototype
            while (instance.__proto__) {
              if (protoObj === instance.__proto__) {
                return true;
              }
              instance = instance.__proto__
            }
            return false;
          }
    ```
  

JavaScript 如何实现这些特点，比如封装、继承、多态。如果关于上述三点，你能够解释到有多少种实现方式、优缺点是什么。以及近几年流行的解决方案是什么。这就是**「加分」**，比如对于继承吧。类式继承、构造函数继承、组合继承、原型继承、寄生组合继承等等，说出大概的实现思路和优缺点，再介绍下 extends 或者 mixin 的实现甚至你可以衍生到JavaScript 的模块化发展甚至到为什么现在 TS 如此流行。那么可以说到这一环节解答的就非常棒了。

为什么需要面向对象。以及当先对于软件设计的高内聚、低耦合的思考？





### 如何理解 JS 异步编程的，EventLoop、消息队列都是做什么的，什么是宏任务，什么是微任务？

   - 因为js一开始是针对浏览器的脚本语言，需要用它来操作DOM，若js可以多线程进行，则容易造成在删除增加DOM时候出现问题，所以js是单线程的(代码从上到下依次执行)。但浏览器不是，为了提升性能，浏览器会先在调用找依次执行同步代码，对于异步代码会等异步任务完成后将异步回调处理函数加入等待执行的任务队列(先进先出);
  - 调用找实行先进后出原则，会保存代码执行期间所有执行上下文，排队的任务会依次push进调用找执行后清除;
  - 当有多个异步任务(即所谓的宏任务)时，后执行的异步代码比之前的异步代码先返回结果，这时，会让先得到返回结果的异步回调先进入任务队列；若这个异步任务执行后还有其他的后续任务处理(微任务)，会继续执行完当前所有的微任务才会执行下一个宏任务
  - 整体script代码相当于首个宏任务，宏任务有: setTimeOut、setInterval、requestAnimationFrame(浏览器)、I/O、用户交互事件(浏览器)等;
  - 微任务：process.nextTick(针对Node)、promise链式调用的函数(then catch finally)、MutationObserver；
  - 所以整体执行逻辑是，先执行同层级代码的宏任务，再执行当前宏任务下的微任务(包含微任务后又产生的微任务)，等同层级微任务执行完毕再执行下一个宏任务...这样就形成事件的循环
  - 为什么要分为微任务和宏任务？为了区分任务的优先级



  - JS 异步编程

​     JavaScript 语言的执行环境是单线程的(V8主线程是单线程)，一次只能执行一个任务，多任务需要排队等候，这种模式可能会阻塞代码，  导致代码执行效率低下。为了避免这个问题，出现了异步编程。一般是通过 callback 回调函数、事件发布/订阅、Promise 等来组织代码，本质都是通过回调函数来实现异步代码的存放与执行。

- EventLoop 事件环和消息队列

  **EventLoop** 是一种循环机制 ，不断去轮询一些队列 ，从中找到 需要执行的任务并按顺序执行的一个执行模型。

  **消息队列** 是用来存放宏任务的队列， 比如定时器时间到了， 定时间内传入的方法引用会存到该队列， ajax回调之后的执行方法也会存到该队列。

  一开始整个脚本作为一个宏任务执行。执行过程中同步代码直接执行，宏任务等待时间到达或者成功后，将方法的回调放入宏任务队列中，微任务进入微任务队列。

  当前主线程的宏任务执行完出队，检查并清空微任务队列。接着执行浏览器 UI 线程的渲染工作（有时候是不会渲染的，hasARenderingOpportunity为false就不会渲染，requestAnimationFrame来渲染避免掉帧），检查web worker 任务，有则执行(requestIdleCallback执行时机)。

  

  然后再取出一个宏任务执行。以此循环...

- 宏任务与微任务

  - **宏任务**： 可以理解为每次执行栈执行的代码就是一个宏任务（包括每次从事件队列中获取一个事件回调并放到执行栈中执行）。

    浏览器为了让 JS 内部宏任务 与 DOM 操作能够有序的执行，会在一个宏任务执行结束后，在下一个宏任务执行开始前，对页面进行重新渲染。

    宏任务包含：script(整体代码)、setTimeout、setInterval、I/O、UI交互事件、MessageChannel 、UI rendering、requestIdleCallback、setIntermidate（node有）

  - **微任务**： 可以理解是在当前任务执行结束后需要立即执行的任务。也就是说，在当前任务后，在渲染之前，执行清空任务。 所以它的响应速度相比宏任务会更快，因为无需等待 UI 渲染。

     微任务包含：Promise.then(async await语法糖)、MutaionObserver(对DOM树进行监测)、process.nextTick(Node.js 环境)等
  
     > 根据Rendering opportunities来判断每轮`event loop`是否需要进行更新渲染，会根据浏览器刷新率以及页面性能或是否后台运行等因素判断的。如果`hasARenderingOpportunity` 为`true`，需要更新渲染，接下来就需要执行各种渲染所需工作：
     >
     > - 触发resize、scroll、建立媒体查询、建立css动画，
     > - 执行动画回调（RAF回调，RAF会在下次渲染之前调用指定回调所以用来渲染动画避免掉帧)；若想在浏览器下次渲染之前继续更新下一帧动画，回调函数内必须再次调用RAF
     > - 执行IntersectionObserver回调
     > - 更新渲染
     >
     > - 判断是否启动`闲时调度算法`RIC
  

参考： [浏览器渲染更新机制](https://juejin.cn/post/6885907453460873229)、[HTML](https://html.spec.whatwg.org/multipage/webappapis.html#event-loop-processing-model)

**涉及浏览器渲染机制的事件模型**

1. 找到一个可执行的Task队列，如果没有则跳转到下面的微任务步骤
2. 让最老的Task作为Task队列中第一个可执行的Task，并将其移除
3. 将最老的Task作为event loop的可执行Task
4. 记录任务开始时间点
5. 执行Task中的setp对应的步骤(上文中Task结构中的step)
6. 设置event loop的可执行任务为null
7. 执行微任务检查算法
8. 设置hasARenderingOpportunity(是否可以渲染的flag)为false
9. 记住当前时间点
10. 通过下面步骤记录任务持续时间
    1. 设置顶层浏览器环境为空
    2. 对于每个最老Task的脚本执行环境配置对象，设置当前的顶级浏览器上下文到其上
    3. 报告消耗过长的任务，并附带开始时间，结束时间，顶级浏览器上下文和当前Task
11. 如果在window环境下，会根据硬件条件决定是否渲染，比如刷新率，页面性能，页面是否在后台，不过渲染会定期出现，避免页面卡顿。值得注意的是，正常的刷新率为60hz，大概是每秒60帧，大约16.7ms每帧，如果当前浏览器环境不支持这个刷新率的话，会自动降为30hz，而不是丢帧。在后台的时候，聪明的浏览器会将这个渲染时机降为每秒4帧甚至更低，事件循环也会减少(这就是为什么我们可以用setInterval来判断时候能打开其他app的判断依据的原因)。如果能渲染的话会设置hasARenderingOpportunity为true。

1. 如果下面条件都成立，那么执行空闲阶段算法，对于开发者来说就是调用window.requestIdleCallback方法
   1. 在window环境下
   2. event loop中没有活跃的Task
   3. 微任务队列为空
   4. hasARenderingOpportunity为false



### 闭包、函数作用域和块、作用域链

- js执行会时会开辟一块内存作为执行环境，来规定执行期间允许获取到的所有信息(EC\ECG)，这些信息都被保存在变量对象中(VOG(window)\AO),全局执行环境是最外层的执行环境

- 块级作用域：块级作用域由最近的一对包含花括号{}界定(这里涉及到**let var const**的区别)

- 执行上下文：代码在执行期间所能获取到的所有变量信息

- 函数作用域：函数在创建的时候就明确了作用域[[SCOPE]]，就是创建时所处的执行上下文对应的活动对象
  - 函数调用基本会有几个步骤：确定作用域链（最左边就是自己的作用域，最右边就是ECG），确定this，初始化arguments，形参赋值(相当于在当前AO中新增一个变量)，变量提升，代码运行
  - 模块模式：IIFE(ES5尚未支持块级作用域，使用此方法模拟块级，封装模块)，在IIFE中**绑定为函数名的标识符不能再绑定为其它值，即该标识符绑定是不可更改的**

- 作用域链：当代码在一个环境中执行时，会创建变量对象的一个作用域链，其作用是保证对当前执行环境有权访问的变量和函数进行有序访问，作用域链的前端，始终都是当前执行的代码所 在环境的变量对象，全局执行环境的变量对象始终都是作用域链中的最后一个对象

- 闭包： 闭包是一种机制，当前函数执行时创建的执行的上下文不会被销毁，闭包可以保护这个私有上下文中的变量不受其他上下文的变量影响，而且当前上下文创建的数据可以被当前上下文以外的变量引用

  ```js
  // 闭包的考题
  function fun(n, o) {
    console.log(o);
    return {
      fun2: function(m) {
        return fun(m, n);
      }
    }
  }
  // stage1
  var a = fun(0);
  a.fun2(1);
  a.fun2(2);
  a.fun2(3);
  // stage2
  var b = fun(0).fun2(1).fun2(2).fun2(3)
  // stage3
  var c = fun(0).fun2(1);
  c.fun2(2);
  c.fun2(3);
  ```



### var、let 、const

- var：声明的变量在函数作用域内，提升变量声明到函数作用域顶部，但值不会； 可用var重复申明同一个变量；var在全局作用域申明的变量在web环境中会成为window的属性(node环境没有BOM)
-  let: 声明的变量范围是块作用域；具有暂时性死区，不可进行变量提升；let不可重复声明同一个变量，但与var声明的变量一样可重复赋值；let在全局作用域申明的变量不能成为window的属性
- const: 基本与let一致，但不能给变量重新赋值，且声明变量的同时也要进行变量初始化；



### this的指向问题

- 定义：this是当前函数执行的主体，即谁执行了函数，不等于执行上下文也不是当前作用域

- 在标准函数中this引用的是调用这个函数时的对象，(全局上下文中就是window，o.Foo(), Foo中的this就是o，匿名函数自调用一般是window | undefined)；回调函数的this一般也是window或undefined

- 箭头函数中的 this 会保留定义该函数时的上下文；

- 事件绑定：无论是哪一级绑定事件一般都是被操作元素

- 构造函数调用(new)
    - **创建一个新对象**
    - **新对象的[[ProtoType]] 赋值为构造函数的prototype属性(即新建的实例的属性方法是在原型对象上)**
    - **构造函数内部的 this 被赋值为这个新对象(this指向这个新对象)**
    - **执行构造函数内部代码(给新对象增加属性或方法)**
    - **构造函数有无返回(不返回或返回一个基本数据类型都相当于不返回)，**有且不为空的一个**对象**返回这个对象，否则就返回新建的新对象
      new Class(使用new 调用的是class的构造函数)
    - new Foo  (优先级19) 和 new Foo() (优先级20) 优先级不一样， new 操作符都会将函数重新执行

- **bind、apply、call、new 的自己实现、一些console题**

    ```js
    // 手动实现new
    function myNew(constructorFn, ...rest) {
      // 参数必须是函数
      if (typeof constructorFn !== 'function') throw new Error('')
      // 新建一个对象,这个对象的原型对象是传入的构造函数的原型
      const newObj =  Object.create(constructorFn.prototype);
      const res = constructorFn.call(newObj, ...rest)
      return res && (typeof res === 'object' || typeof res === 'function') ? res : newObj
    }
    
    //手动实现call、apply
    Function.prototype.myCall = function(thisTarget, ...args) {
      // 获取需改变this指向的函数本身
      const fnBody = this;
      const fnKey = Symbol('callFn');
      thisTarget = thisTarget || window;
      // 把函数添加到目标this上，作为其属性，再通过目标对象调用函数执行
      thisTarget[fnKey] = fnBody;
      const res = thisTarget[fnKey](...args);
      delete thisTarget[fnKey];
      return res;
    }
    
    // 手动实现bind
    Function.prototype.myBind = function(thisTarget, ...rest) {
      const fnSelf = this;
      const TempFn = function () {}
      thisTarget = thisTarget || window;
      const bindFn = function(...args) {
        // 构造函数调用要考虑this指向新建的对象
        return fnSelf.call(this instanceof fnSelf ? this : thisTarget, ...rest, ...args)
      }
      if (this.prototype) {
        TempFn.prototype = this.prototype
      }
      bindFn.prototype = new TempFn()
      return bindFn
    }
    
    ```



### 函数式编程、高阶函数、函数柯里化

- 函数式编程： 对数据映射关系的描述，方便代码的重用，函数可作为变量参数和返回值

  - 纯函数： 传入相同的值返回相同，返回值只由传入值决定，且没有副作用
  - 副作用：异步函数，返回值不一定相同
    - 修改一个变量
    - 修改一个对象的属性值
    - 抛出错误
    - console输出输入
    - 读写文件、网络、数据库
  - 函数是一等公民，函数可作为参数或返回值

- 高阶函数：抽象代码，让代码更简洁、逻辑更清晰、能更注重业务逻辑

- 柯里化：让有多个参数的函数可以分多次传入参数再调用，即fn(n1,n2,n3,n4) => fn1(n1)(n2)(n3))(n4) 或者fn1(n1,n2)(n3,n4)

  ```js
  // 参数是个函数，返回的也是个函数
  // 返回的函数可以分多次传入参数
  // 在返回的函数内部，当接受的参数个数与最原始参数值相同(或大于)时要执行这个函数，参数小于原本的参数个数时返回一个函数
  // 如果fn = (...rest) => {}用扩展运算符来传入参数此时，fn.length的值为0
  function curry (fn) {
    return function curried(...args) {
      if (args.length < fn.length) {
        return () => arguments.callee(...args, ...arguments)
      }
      return fn(...args)
    }
  }
  ```

- compose实现：对函数进行组合，传入多个函数返回一个函数

  ```js
  const compose = (...fns) => {
    // 应为从右向左执行等
    // 考虑fns长度为0的时候(...rest) => rest,fns 长度为1 fns[0]返回自身，其他则如下
    return (...rest) => fns.reverse().reduce((accFn, currFn) => accFn(currFn(...rest)))
  }
  ```



### 设计模式

- **单例模式**：一个类只有一个实例对象，比如线程池、window

  ```js
  function Signletom () {
    this.name = xxx;
    this.instance = null;
  }
  Signleton.prototype.getInstance = () => {
    if (!this.instance) {
      this.instance = new Signleton()
    }
      return this.instance
  }
  ```

- **策略模式**：把不同的实现分别封装成策略类，让他们可相互代替(一般是相对于静态语言而言，因为有重载)，例子：奖金、动画、表单验证等，在js函数一等对象语言中，策略模式已经隐形到代码中

- **代理模式**：

  - 保护代理： 保护代理用于控制不同权限的对象对目标对象的访问
  - 虚拟代理： 虚拟代理把一些开销很大的对象，延迟到 真正需要它的时候才去创建
    - 图片预加载：通过代理设置图片未加载完成时，展示成菊花图，加载成功后再设置成最后的src
    - 虚拟代理合并Http请求
    - 虚拟代理实现惰性加载
    - 缓存代理： 一些开销大的运算结果提供暂时的存储

- **迭代器模式**：提供一种方法顺序访问一个聚合对象中的各个元素，而又不需要暴露该对象的内部表示。

- **观察者模式**：

  - 一个被观察者（添加观察者、删除观察者、通知的方法）、多个观察者、通过被观察者主动建立，被观察者改变需主动通知观察者

  - ```js
    // 自己实现观察者模式
    class ObservedObject {
        constructor () {
            this.observers = [];
        }
        addObserver (observer) {
            this.observers.push(observer)
        }
        delObserver (observer) {
           cosnt index =  this.observer.findIndex((ob) => ob.name === observer.name);
            this.observers.splice(index,1)
        }
        notify () {
            this.observers.forEach(ob => ob.call())
        }
    }
    class Observer {
        consturctor (name, observered) {
            this.name = name;
          	if (observered) {
                observered.addObserver(this)
            }
        }
        call (message) {
            
        }
    }
    
    
    ```

- **发布订阅模式**: 

  - 与观察者相比，发布订阅模式多了个发布订阅中心来建立整个体系

  - 发布订阅不直接通信

  - 发布者将要发布的消息交由订阅中心管理，订阅者按需订阅订阅中心

  - Emit 、on

  - ```js
    //发布订阅中心
    class PubSubCenter {
        constructor () {
            this.listeners = {};
        }
        publish (type, message) {
            const currListeners = this.listeners[type]
             if (currListeners) {
                 currListeners.forEach((callFn, index) => callFn(message))
             }
        }
        subscribe (type, callFn) {
             const currType = this.listeners[type]
           if (!currType) {
               this.listeners[type] = []
           }
            this.listeners[type].push(callFn)
        }
        
    }
    class Publish () {
        consturctor (type, context) {
            this.name = type
            this.context = context
        }
        publish (type, message) {
            this.context.publish(type, message)
        }
    }
    
    class Subscribe () {
        constructor (type, contrxt) {
            this.name = type;
            this.context = context
        }
        subscribe （type, callFn） {
            this.context.subscribe(type, callFn)
        }
    }
    ```

    

- **命令模式**：跟策略模式一样，命令模式也早已融入到了 JavaScript 语言之中，如高阶函数

- **组合模式**：对象组合成树形结构，例如：扫描文件夹

- **模板模式**： 基于继承的模板方法

- **装饰器模式**： 为对象动态加入行为（直接修改函数违背开放封闭原则）

- **适配器模式**： 



### Promise 手动实现、考题
- 具体 code 实现在interviewCode/promise.js

- then catch finally, 静态方法：resolve reject all race any allSettled 

- ```js
  // 传入的是一个函数带resolve reject 回调，构造函数执行constructor期间就执行此参数，如果出错就直接reject
  // resolve reject只能改变一次状态，即不是pending就直接返回,且在这里要保存resolve的value值或reason值,执行缓存的未处理的回调函数
  // then 方法： 返回一个新的promise（重点掌握）
  then(success, failed) {
    // success不是函数则是 (value) => value, failed不是函数则抛出错误 reason => throw Error()
    const returnPromise = new Mypromise((res, rej) => {
      if (status === 'fulfilled') {
        // settimeout是为了再后续处理中拿到then本身返回的promise
        thenFunc(success, value, res, rej)
      } else if (status === 'REJECTED') {
         thenFunc(failed, reason, res, rej)
      } else {
        this.cacheSuscessCallback.push(() => thenFunc(success, value, res, rej));
        this.cacheFailedCallback.push(thenReject);
      }
      
      function resolveCallValue (returnPromise, callValue, res, rej) {
        // 若then方法返回的Promise与then回调执行后返回的值相等，则要rej个error,
        rej(new TypeError('Type Error'));
        // 若then回调中返回的值是MyPromise的一个实例，则执行这个callValue 的then方法
        callValue.then(res, rej)
        // 其他情况就直接res(callValue)
      }
      function thenFunc = (fn, value, res, rej) => {
        setTimeout(() => {
          // 执行函数 then 中的回调函数要try catch，保证出错的时候能被后续方法捕获到
          try {
            const callValue = fn(value) // callValue 可能是普通值、Promise
            resolveCallValue(returnPromise, callValue, res, rej)
          } catch (error) {
            rej(error)
          }
        })
      }
    })
  }
  ```

  

### 节流防抖实现

- interviewCode/try2Do.js debounce

###  什么是浅拷贝，什么是深拷贝？

 　浅拷贝和深拷贝主要是针对引用类型的数据而言，浅拷贝只拷贝引用类型的内存地址，即新对象的引用值与旧对象的值占同一个内存空间，如果改变其中任何一个值都会影响另外一个值；而深拷贝则会对引用类型的值再重新开辟一片内存空间存当前对象，且他们之间相互独立，对各自操作将不会影响另外的值。

- 浅拷贝：针对 Object,Array 这种复杂数据类型，浅拷贝复制一层对象的属性，属性中的值是基本数据类型直接复制值，如果是引用类型复制内存地址的指针，所以在修改复制后的变量里引用类型的里面的值时，会导致原始数据也被修改
  - Object.assign()、Object.create()、扩展运算符、直接赋值、
  - Object.assign({}, target, source) 与 {...target, ...source}一样
  - Object.assign会触发target的setter，可能会出现一些副作用
  
- 深拷贝：针对 Object,Array 这种复杂数据类型，深复制递归复制了所有的层级，新数据和原始数据不存在联系，因此在修改复制后的变量里引用类型的里面的值时，不会导致原始数据也被修改
  - JSON.parse(JSON.stringify())： 无法正确处理undefined、function、symbol、set、map等类型的值
  
  - 迭代递归，分别处理不同类型对应的值, [参考](https://github.com/ConardLi/ConardLi.github.io/blob/master/demo/deepClone/src/clone_6.js)
  
    ```js
    function clone(target, mapCahche = new WeakMap()) {
      // 普通类型的值直接返回
      if (!(target !== null && typeof target === 'object')) {
        return target
      }
      const type = Object.prototype.toString.call(target)
      let cloneObject ;
      if (type is need deep clone) {
        // 初始化
        cloneObject = new target.constructor()
      } else {
        return cloneOtherType(target, type)
      }
      // 防止循坏引用
      if (mapCahche.get(target)) {
        return mapCahche.get(target)
      }
      mapCahche.set(target, cloneTarget)
      // map
      if (type is map) {
        target.forEach((value, key) => {
          cloneObject.set(key, clone(value, mpCahche))
        })
        return cloneObject
      }
      // set
      if (type is set) {
        target.forEach((value) => {
          cloneObject.add(clone(value, mpCahche))
        })
        return cloneObject
      }
      // object array argsTag
      const keys = type === arrayType ? target: Obejct.keys(target)
      let i = 0;
      while (i < keys.length) {
        const value = target[keys[i]];
        cloneObject[i] = clone(value, mapCahche)
        i++
      }
      return cloneObeject
    }
    ```
  
    





1. 排序算法(至少三种)*
2. 数组去重
3. Mixins 和 高阶函数 、Hook
4. sum(1) sum(1)(2)(3)(4) sum(1, 2, 3, 4);

9. 进程与线程？

    进程： 相当于打开一个应用程序(打开浏览器页面浏览器是多进程，多个页面互不干扰)

    线程： 相当于应用程序中具体做事情的人，

    throw error后，后续代码不会执行，但是前面添加的异步代码会执行，死循环主线程会一直占用，所以异步的回调都不会放入主线程执行

10. 打开一个浏览器会有哪些进程

     DOM事件监听

     网络请求处理线程

     定时器

     GUI界面渲染

     js引擎执行线程，主线程

11. 对Symbol的理解？(是什么，属性方法，用途)
          https://juejin.cn/post/6925619440843227143
         每个从Symbol()返回的symbol值都是唯一的，一个symbol值能作为对象属性的标识符 —— 这是该数据类型仅有的目的

12. super方法的理解？super关键字用于访问和调用一个对象的父对象上的函数,
         super 关键字使用的注意几个问题：
       只能在派生类的构造函数实例方法和静态方法中使用...
       在派生类中的构造函数中super()要在this使用之前(原因)
       如果在派生类中显式定义了构造函数，则要么必须在其中调用 super()，要么必须在其中返回 一个对象
          https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/super

13. weakMap 和 Map的区别， Set和weakSet？
         集合 与 字典 的区别：
         共同点：集合、字典 可以储存不重复的值
         不同点：集合 是以 {value, value}的形式储存元素，字典 是以 {key => value} 的形式储存
         WeakMap 对象是一组键值对的集合，其中的键是弱引用对象(垃圾回收机制，不可枚举)，而值可以是任意。
         WeakSet 对象允许你将弱引用对象储存在一个集合中
         Set
       成员唯一、无序且不重复
       [value, value]，键值与键名是一致的（或者说只有键值，没有键名）
       可以遍历，方法有：add、delete、has
         WeakSet
       成员都是对象
       成员都是弱引用，可以被垃圾回收机制回收，可以用来保存DOM节点，不容易造成内存泄漏
       不能遍历，方法有add、delete、has
         Map
       本质上是键值对的集合，类似集合
       可以遍历，方法很多可以跟各种数据格式转换
         WeakMap
       只接受对象作为键名（null除外），不接受其他类型的值作为键名
       键名是弱引用，键值可以是任意的，键名所指向的对象可以被垃圾回收，此时键名是无效的
       不能遍历，方法有get、set、has、delete
         https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/6

14. 数据结构?
          基本数据类型： string number(NaN == NaN false) symbol boolean null(null 值表示一个空对象指针) undefined bigint
          引用类型： object array set map

15. 理解promise

     promise 的executor函数报错时，此时promise实例的状态会是rejected，此时值是报错的原因

      resolve()后续的代码也会执行

     then中的回调函数执行不报错范湖都是fulfilled的promise，如果返回的是promise，就是这个返回promise的状态

16. Async

     async函数执行返回的是一个promise，如果函数体内没有报错，返回的就是fulfilled的promise值为函数返回的值，没有就是undefined

     - await一般配合async使用，后面放的是promsie的实例，如果不是则会转为promise的实例
     - await foo() ，此时foo函数会被立即调用，且foo的返回值可以被处理成promise值，await 后面的代码相当于then

17. 函数 : 函数所有参数是按值传入的，原始值传入函数不影响外部值，对象按值传入函数(把对象作为参数传       递，那么传递的值就是这个对象的引用)，但以引用的方式来访问这个传入的对象（函数的参数就是局部变量）
       默认参数：传入undefined相当于不传会使用默认参数,后定义默认值的参数可以引用先定义的参数,前面定义的参数不能引用后面定义
       函数内部存在的对象：
       arguments : (callee指向arguments所在函数的指针)



18. Date RegExp 等创建的实例都有 toLocalString() toString() valueof() 等方法；
        原始值包装类型：
        Boolean
        Number
        String =>（slice()、substr(子字符串截取的开始位置index， 截取子字符串的长度)和 substring()）

19. yield 生成器， Generator 函数赋值时不会执行函数内部内容，第一次调用的next内不需要参数，输入的参数也会忽略，随后输入的next参数是执行下一个yield相关代买需要的输入或输出,每一个yield执行完就停止，等待下一次next的调用再执行yield，执行next()后返回结果中的res.value是yield 表达式或return的返回；
        自定义生成器自动执行函数
        function runGen (gen, arr = []) {
          let res;
          if (arr.length > 0) {
        res = gen.next(arr[arr.length - 1].value);
          } else {
        res = gen.next();
          }
          arr.push(res);
          if (!res.done) {
        return runGen(gen, arr);
          } else {
        return arr;
          }
        }

20. 实现默认迭代器(生成器生成默认迭代器)
         class Foo {
        constructor() {
          this.values = [1, 2, 3];
        }
        *[[Symbol.iterator]]() {
          yield*  this.values;
        }
         }

21. 有哪些设计模式？工厂模式、迭代模式、原型模式、代理模式(用途？涉及到Reflect api，四版第九章)

