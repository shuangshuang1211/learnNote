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
    
  - ```js
    Function.prototype === Function.__proto__ === Object.__proto__ 指向内置的一个function  anonymous对象
    [function  anonymous].__proto__ === Object.prototype
    Object.prototype.__proto__ === null
    ```
  
  - ```js
    function F () {}
    Function.prototype.a = () => {}
    Object.prototype.b = () => {}
    const f = new F()
    console.log(F.a, F.b, f.a, f.b)
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

     微任务包含：Promise.then(以及async await语法糖)、MutaionObserver(对DOM树进行监测)、process.nextTick(Node.js 环境)等
  
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

- js执行会时会开辟一块内存作为执行环境(执行栈/调用栈)，来规定执行期间允许获取到的所有信息(EC\ECG)，这些信息都被保存在变量对象中(VOG(window)\AO),全局执行环境是最外层的执行环境

- 在`JavaScript`运行的时候，主线程会形成一个栈，这个栈主要是解释器用来最终函数执行流的一种机制。通常这个栈被称为调用栈`Call Stack`，或者执行栈（`Execution Context Stack`）。

  调用栈，顾名思义是具有LIFO（后进先出，Last in First Out）的结构。调用栈内存放的是代码执行期间的所有执行上下文。

  - 每调用一个函数，解释器就会把该函数的执行上下文添加到调用栈并开始执行；
  - 正在调用栈中执行的函数，如果还调用了其他函数，那么新函数也会被添加到调用栈，并立即执行；
  - 当前函数执行完毕后，解释器会将其执行上下文清除调用栈，继续执行剩余执行上下文中的剩余代码；
  - 但分配的调用栈空间被占满，会引发”堆栈溢出“的报错。

- 块级作用域：块级作用域由最近的一对包含花括号{}界定(这里涉及到**let var const**的区别)

- 执行上下文：代码在执行期间所能获取到的所有变量信息

- 函数作用域：函数在创建的时候就明确了作用域[[SCOPE]]，就是创建时所处的执行上下文对应的活动对象
  - 函数调用基本会有几个步骤：确定作用域链（最左边就是自己的作用域，最右边就是ECG），确定this，初始化arguments，形参赋值(相当于在当前AO中新增一个变量)，变量提升，代码运行
  
  - 模块模式：IIFE(ES5尚未支持块级作用域，使用此方法模拟块级，封装模块)，在IIFE中**绑定为函数名的标识符不能再绑定为其它值，即该标识符绑定是不可更改的**
  
    ```js
    var a = 2;
    function foo(){
        console.log(a)
    }
    function bar(){
        var a = 3;
        foo();
    }
    bar() // 输出2
    ```
  
    
  
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

- var：声明的变量在函数作用域内，提升变量声明到函数作用域顶部，但值不会；在函数作用域内，省略var定义的变量在非严格模式下在这个函数执行一次后，会成为window的一个属性； 可用var重复申明同一个变量；var在全局作用域申明的变量在web环境中会成为window的属性(node环境没有BOM)

  - 在全局作用域下用var申明的变量在浏览器环境下会成为window的属性
  - 通过函数声明的方式（非函数表达式）声明的函数在代码执行之前被js引擎提升到了当前作用域的顶部，而且函数声明提升优先于变量声明提升

- let: 声明的变量范围是块作用域；具有暂时性死区，不可进行变量提升；let不可重复声明同一个变量，但与var声明的变量一样可重复赋值；let在全局作用域申明的变量不能成为window的属性

  ```js
  // let 跟 var 的作用差不多，但有着非常重要的区别。最明显的区别是，let 声明的范围是块作用域， 而 var 声明的范围是函数作用域。
  if (true) { 
    var name = 'Matt';
    console.log(name); // Matt
  }
  console.log(name);   // Matt
  
  if (true) {
    let age = 26;
    console.log(age);  // 26
  }
  console.log(age);  // ReferenceError: age 没有定义
  ```

  

- const: 基本与let一致，但不能给变量重新赋值，且声明变量的同时也要进行变量初始化；

### js类型检查

- typeof
- instanceof
- Object.prototype.toString.call(targetValue)

### this的指向问题

- 定义：this是当前函数执行的主体，即谁执行了函数，不等于执行上下文也不是当前作用域

- 在标准函数中this引用的是调用这个函数时的对象，(全局上下文中就是window，o.Foo(), Foo中的this就是o，匿名函数自调用一般是window | undefined)；回调函数的this一般也是window或undefined

- 箭头函数中的 this 会保留定义该函数时的上下文；

- 事件绑定：无论是哪一级绑定事件一般都是被操作元素

- 构造函数调用(new)
    - **创建一个新对象**
    - **新对象的[[ProtoType]] (__ proto __)赋值为构造函数的prototype属性(即新建的实例的属性方法是在原型对象上)**
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

### 判断数组的方法，优劣

- Object.prototype.toString.call(TragetObj): 任何类型都可以判断，包括null 和undefined

   `Object.prototype.toString.call('sdsd') ： '[object String]'`

  `Object.prototype.toString.call(null) '[object Null]'`

  `Object.prototype.toString.call(undefined)： '[object Undefined]'`

- instanceof： 判断对象的原型链中是不是能找到类型的prototype

- Array.isArray(): ES5新增， 当检测 Array 实例时，Array.isArray 优于 instanceof ，因为 Array.isArray 可以 检测出 iframes

### 函数式编程、高阶函数、函数柯里化

- 函数所有参数是按值传入的，原始值传入函数不影响外部值，对象按值传入函数(把对象作为参数传递，那么传递的值就是这个对象的引用)，但以引用的方式来访问这个传入的对象（函数的参数就是局部变量）

  - 默认参数：传入undefined相当于不传会使用默认参数,后定义默认值的参数可以引用先定义的参数,前面定义的参数不能引用后面的
  - arguments : (callee指向arguments所在函数的指针)
  
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
  // 如果fn = (...rest) => {}用扩展运算符来传入参数此时，fn.length的值为0??
  function curry (fn) {
    return function curried(...args) {
      if (args.length < fn.length) {
        return (...rest) => arguments.callee(...args, ...rest)
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

- **访问者模式**：

  - 



### Promise 手动实现、考题
- 具体 code 实现在 ../ownCode/promise.js

- then catch finally, 静态方法：resolve reject all race any allSettled 

- promsie前面的链式调用中如果抛出了throw error，可以被后续catch调用捕获

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

- ownCode/try2Do.js debounce 或 code/jsLoadedOrder/debounce.html

###  什么是浅拷贝，什么是深拷贝？

 　浅拷贝和深拷贝主要是针对引用类型的数据而言，浅拷贝只拷贝引用类型的内存地址，即新对象的引用值与旧对象的值占同一个内存空间，如果改变其中任何一个值都会影响另外一个值；而深拷贝则会对引用类型的值再重新开辟一片内存空间存当前对象，且他们之间相互独立，对各自操作将不会影响另外的值。

- 浅拷贝：针对 Object,Array 这种复杂数据类型，浅拷贝复制一层对象的属性，属性中的值是基本数据类型直接复制值，如果是引用类型复制内存地址的指针，所以在修改复制后的变量里引用类型的里面的值时，会导致原始数据也被修改
  - Object.assign()、Object.create()、扩展运算符、直接赋值、
  - Object.assign({}, target, source) 与 {...target, ...source}一样
  - Object.assign会触发target的setter，可能会出现一些副作用
  
- 深拷贝：针对 Object,Array 这种复杂数据类型，深复制递归复制了所有的层级，新数据和原始数据不存在联系，因此在修改复制后的变量里引用类型的里面的值时，不会导致原始数据也被修改
  - JSON.parse(JSON.stringify())： 无法正确处理undefined、function、symbol、set、map等类型的值，循环引用也不行
  
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
      if (type === '[object Map]') {
        target.forEach((value, key) => {
          cloneObject.set(key, clone(value, mpCahche))
        })
        return cloneObject
      }
      // set
      if (type === '[object Set]') {
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
        cloneObject[keys[i]] = clone(value, mapCahche)
        i++
      }
      return cloneObeject
    }
    
    
    // 新的简洁拷贝， 没有拷贝函数
    function deepClone (data, cahcheMap = new WeakMap) {
      console.log('++++', data.constructor)
      if (data == null) return data
      if (data instanceof Date)  return new Date(data)
      if (data instanceof RegExp) return new RegExp(data)
      if (data instanceof Symbol) return Object(Symbol.prototype.valueOf.call(data))
      if (typeof data !== 'object') return data
      if (cahcheMap.get(data)) return cahcheMap.get(data)
      const cloneObj = new data.constructor()
      console.log('****', cloneObj)
      cahcheMap.set(data, cloneObj)
      if (data instanceof Map) {
        for (let [key, value] of data) {
          cloneObj.set(key, deepClone(value, cahcheMap))
        }
        return cloneObj
      }
      if (data instanceof Set) {
        for (let value of data) {
          cloneObj.add(deepClone(value, cahcheMap))
        }
        return cloneObj
      }
      for (let key in data) {
        console.log('*key***', key)
        if (Object.hasOwnProperty.call(data, key)) {
          cloneObj[key] = deepClone(data[key], cahcheMap)
        }
      }
      return cloneObj
    }
    ```
    
    

### for...of... for...in 区别

- **for in**：遍历对象的可枚举的非Symbol的属性(key)

- **for of**：可迭代的数据值，就是具有 Symbol.iterator方法的对象，[可迭代对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols)（包括 [`Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)，[`Map`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map)，[`Set`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set)，[`String`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)，[`TypedArray`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)，[arguments](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions_and_function_scope/arguments) 对象等等）

  ```js
  /
  * 用for of实现对一个对象的遍历
  *
  /
  const range = {
    from: 1,
    to: 5
  }
  range[Symbol.iterator] = function * () {
    let i = range.from
    while (i <= range.to) {
      yield i
      i++
    }
  }
  //也可以用以下方式实现
  range[Symbol.iterator] = function() {
    let start = range.from
    return {
      next: () => {
        if (start <= range.to) {
          start ++
          return {value: start - 1, done: false}
        } else {
          return {value: start, done: true}
        }
      }
    }
  }
  for (let num of range) {
    console.log(num) // 希望输出num = 1,2,3,4,5
  }
  ```

### Symbol

- 使用这样的形式最多 `const id = Symbol.for('id')`，全局使用
- 还有就是内置的Symbol.iterator
- 每个从Symbol()返回的symbol值都是唯一的，一个symbol值能作为对象属性的标识符
- `typeof Symbol('key'): 'symbol'; typeof 函数: 'function'; typeof Set/Map/null: 'object'`

### Generator对象  yield   function*

- [迭代器协议](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols#iterator)（具有next 方法）和 可迭代协议（[Symbol.iterator]方法）

- function*： 定义一个**生成器函数**，返回一个**`Generator对象`**（生成器的迭代器对象，符合可迭代协议和迭代器协议）

- 迭代器对象有一个next方法，这个方法返回一个`{value: /* yield后的值*/, done: 生成器后续是否还有 yield 语句}`

- 首次调用next方法时会执行到首次yield出现的位置为止，next方法传入的参数会赋给上一次yield 左边的变量

- `yield` 关键字用来暂停和恢复一个生成器函数

- 自动运行Generator对象函数

  ```js
  function autoRunGen (genObj, res = []) {
    let currValue, len = res.length
    if (len > 0 ) {
      currValue = genObj.next(res[len - 1].value)
    } else {
      currValue = genObj.next()
    }
    res.push(currValue)
    if (currValue.done) {
      return res
    } else {
      return autoRunGen(genObj, res)
    }
  }
  ```

- 利用迭代器实现展开多维数组

  ```js
  function* iterArr(arr) {            //迭代器返回一个迭代器对象
    if (Array.isArray(arr)) {         // 内节点
        for(let i=0; i < arr.length; i++) {
            yield* iterArr(arr[i]);   // (*)递归
        }
    } else {                          // 离开
        yield arr;
    }
  }
  // 或者直接将迭代器展开:
  var arr = [ 'a', ['b',[ 'c', ['d', 'e']]]];
  var gen = iterArr(arr);
  arr = [...gen];
  
  // reduce + recursivity
  function flatArr (arr) {
    return arr.reduce((acc, cur) => {
      if (Array.isArray(cur)) {
        return acc.concat(flatArr(cur))
      } else {
        acc.push(cur)
      }
      return acc
    }, [])
  }
  ```
  
   

### Map WeakMap Set WeakSet

- Map

  - `const mapData = new Map(); mapData.set(key, value)`, key 可以是任何值

  - NaN作为key，NaN 是与 `NaN` 相等的（虽然 `NaN !== NaN`） +0 与 -0 相等

  - mapData.size 返回长度，mapData.get(key)

  - ```js
    const myMap = new Map();
    myMap.set(0, '000');
    myMap.set(1, '001');
    myMap.set(NaN, 'not a number');
    for (let [key, value] of myMap) {
      console.log('key = ', key, 'value = ', value) // key =  0 value =  000; key =  1 value =  001 ...
    }
    console.log(myMap.size, myMap.has(NaN))  // 3 true
    for (let key of myMap.keys()) {
      console.log('key = ', key) // key =  0 ; key =  1 ...
    }
    for (let value of myMap.values()) {
      console.log('value = ', value) // value =  000; value =  001..
    }
    
    let kvArray = [["key1", "value1"], ["key2", "value2"]];
    
    // 使用常规的Map构造函数可以将一个二维键值对数组转换成一个Map对象
    let myMap = new Map(kvArray);
    
    myMap.get("key1"); // 返回值为 "value1"
    
    // 使用Array.from函数可以将一个Map对象转换成一个二维键值对数组
    console.log(Array.from(myMap)); // 输出和kvArray相同的数组
    
    // 更简洁的方法来做如上同样的事情，使用展开运算符
    console.log([...myMap]);
    
    // 或者在键或者值的迭代器上使用Array.from，进而得到只含有键或者值的数组
    console.log(Array.from(myMap.keys())); // 输出 ["key1", "key2"]
    ```

  - WeakMap: 键是弱引用对象(在没有其他引用存在时垃圾回收能正确进行，不可枚举)，其键必须是对象, 而值可以是任意, **`WeakMap` 的 key 是不可枚举的**

- Set: 对象允许存储任何类型的唯一值（NaN +0与Map一样）

  - `WeakSet` 只能是**对象的集合**，而不能是任何类型的任意值

### Proxy 和 Reflect

- **proxy**：用于创建一个对象的代理，实现基本操作的拦截和自定义

  - handler.get: (target, prop, receiver), 可返回任意值，receiver一般是proxy对象，也有可能是

  - hadnler.set: (target, prop, newValue, receiver), 返回true才代表属性设置成功，receiver最初被调用的对象，通常是 proxy 本身，但 handler 的 set 方法也有可能在原型链上，或以其他方式被间接地调用（因此不一定是 proxy 本身）

  - 实现array[-2]调用

    ```js
    const proxyArr = (data) => {
      return new Proxy(data, {
        get: (target, prop, receiver) => {
          prop = +prop
          if (prop <= -target.length) {
            console.log('over limit')
            return
          } 
          if (prop < 0) {
            prop = prop + target.length
          }
          console.log(target, prop, receiver, target.length)
          return Reflect.get(data, prop, receiver)
        }
      })
    }
    ```

    

- **reflect**： 内置对象，有与proxy handler相同的静态方法，不能用new来调用，

  - 有时用reflect取值，确保了当一个代理对象是另一个实例的原型对象时，通过这个实例调用getter函数时有正确的this指向

- 一个相关栗子

```js
let user = {
  _name: "Guest",
  get name() {
    console.log('this', this) // 这里this的指向不一定只指向user
    return this._name;
  }
};

let userProxy = new Proxy(user, {
  get(target, prop, receiver) {
    // console.log('receiver', receiver)
    return Reflect.get(target, prop, receiver); // this指向admin
    // return target[prop]; // this指向user
  }
});

let admin = {
  __proto__: userProxy,
  _name: "Admin"
};

console.log('userProxy.name: ', userProxy.name);
console.log('admin.name: ', admin.name);
```

### axios封装的问题

- 请求头处理，错误处理，数据适配（拦截器对response处理），再加上性能监控
- 发出去的请求怎么中断

### super关键字

- super关键字用于访问和调用一个对象的父对象上的函数

- super 关键字使用的注意几个问题：

  - 在派生类中的构造函数中super()要在this使用之前(原因)，就相当于调用super.prototype.constructor.call(this,name)

  - 只能在派生类的构造函数实例方法和静态方法中使用...

       如果在派生类中显式定义了构造函数，则要么必须在其中调用 super()，要么必须在其中返回 一个对象
          https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/super

### 事件代理

- 就是把一个元素响应事件（`click`、`keydown`......）的函数委托到另一个元素，这是基于事件冒泡实现的

### AJAX原理及实现（Async Javascript and XML）

- `Ajax`的原理简单来说通过`XmlHttpRequest`对象来向服务器发异步请求，从服务器获得数据，然后用`JavaScript`来操作`DOM`而更新页面

- 实现过程

  - 创建 `Ajax`的核心对象 `XMLHttpRequest`对象

  - 通过 `XMLHttpRequest` 对象的 `open()` 方法与服务端建立连接

  - 构建请求所需的数据内容，并通过`XMLHttpRequest` 对象的 `send()` 方法发送给服务器端

  - 通过 `XMLHttpRequest` 对象提供的 `onreadystatechange` 事件监听服务器端你的通信状态

  - 接受并处理服务端向客户端响应的数据结果

  - 将处理结果更新到 `HTML`页面中

    ```js
    const getUrl = (url) => {
        return new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.open('GET', url);
          xhr.onreadystatechange = () => {
            if (this.readystate !== 4) {
              return ;
            } else {
              if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
                resolve(xhr.responseText);
              } else {
                reject(xhr.statusText);
              }
            }
          }
          xhr.responseType = "json";
          xhr.setRequestHeader('Accept', 'application/json');
          xhr.send();
        });
      };
    ```

    

### DOM常见的操作

- createElement
- innerHTML



### 递归和尾递归

- 递归调用的过程当中系统为每一层的返回点、局部量等开辟了栈来存储，递归次数过多容易造成栈溢出

### 内存泄漏

- 意外的全局变量、没有清楚的定时器、没有清楚对DOM的引用等

### 本地存储

见浏览器分享文档

### js中数字精度丢失的问题？(待深入了解)

- 在`JavaScript`中，现在主流的数值类型是`Number`，而`Number`采用的是`IEEE754`规范中64位双精度浮点数编码，其长度为8个字节，即64位比特

- 64位比特又可分为三个部分：

  - 符号位S：第 1 位是正负数符号位（sign），0代表正数，1代表负数
  - 指数位E：中间的 11 位存储指数（exponent），用来表示次方数，可以为正负数。在双精度浮点数中，指数的固定偏移量为1023
  - 尾数位M：最后的 52 位是尾数（mantissa），超出的部分自动进一舍零

- 计算机存储双精度浮点数需要先把十进制数转换为二进制的科学记数法的形式，然后计算机以自己的规则{符号位+(指数位+指数偏移量的二进制)+小数部分}存储二进制的科学记数法

  因为存储时有位数限制（64位），并且某些十进制的浮点数在转换为二进制数时会出现无限循环，会造成二进制的舍入操作(0舍1入)，当再转换为十进制时就造成了计算误差

### 单点登录，如何实现

- 

### ServerLess

1. 排序算法(至少三种)*

2. 数组去重

3. Mixins 和 高阶函数 、Hook

4. sum(1) sum(1)(2)(3)(4) sum(1, 2, 3, 4);

5. 进程与线程？

    进程： 相当于打开一个应用程序(打开浏览器页面浏览器是多进程，多个页面互不干扰)

    线程： 相当于应用程序中具体做事情的人，

    throw error后，后续代码不会执行，但是前面添加的异步代码会执行，死循环主线程会一直占用，所以异步的回调都不会放入主线程执行

6. 打开一个浏览器会有哪些进程

     DOM事件监听

     网络请求处理线程

     定时器

     GUI界面渲染

     js引擎执行线程，主线程

7. weakMap 和 Map的区别， Set和weakSet？
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

8. 数据结构?
          基本数据类型： string number(NaN == NaN false) symbol boolean null(null 值表示一个空对象指针) undefined bigint
          引用类型： object array set map

9. 理解promise

     promise 的executor函数报错时，此时promise实例的状态会是rejected，此时值是报错的原因

      resolve()后续的代码也会执行

     then中的回调函数执行不报错返回的是fulfilled的promise，如果返回的是promise，就是这个返回promise的状态

10. Async

      async函数执行返回的是一个promise，如果函数体内没有报错，返回的就是fulfilled的promise值为函数返回的值，没有就是undefined

      - await一般配合async使用，后面放的是promsie的实例，如果不是则会转为promise的实例
      - await foo() ，此时foo函数会被立即调用，且foo的返回值可以被处理成promise值，await 后面的代码相当于then

11. Date RegExp 等创建的实例都有 toLocalString() toString() valueof() 等方法；
           原始值包装类型：
           Boolean
           Number
           String =>（slice()、substr(子字符串截取的开始位置index， 截取子字符串的长度)和 substring()）

12. 20220217 pm

       - z-index什么情况下失效

         `z-index` 属性设定了一个定位元素及其后代元素或 flex 项目的 z-order

       - 0.1 + 0.2为什么不等于0.3

       - 作用域链闭包this的指向，箭头函数的this

       - null和undefined的区别

       - 有哪些基本数据类型（七种），null是基本数据类型嘛？yes，typeof null = ‘object’

         **null是一个表示"无"的对象，转为数值时为0；undefined是一个表示"无"的原始值，转为数值时为NaN。**

       - instanceof实现

       - Proxy用在React哪些地方

       - React怎么减少渲染，也是优化性能吧

       - setState更新机制，setTimeOut中设置setTate后能拿到新的值吗？

       - 异步的实现方式

       - 强缓存和协商缓存

       - curry以及应用

       - redux原理

       - BFC、回流重绘

       - 怎么查找内存泄漏

       - 手写promise

13. 20220222 am

       - 什么是闭包？事件循环
       - 对promise的理解，throw error的代码会被catch吗？yes，throw error与reject有什么区别
       - 迭代器相关，怎么实现迭代器
       - 为什么要进行长链接？什么是长链接
       - React的setState是同步还是异步
       - 合成事件，什么是事件捕获和冒泡
       - saga相比于redux-thunk的优劣势
       - BFC和块元素和内联元素的区别
       - useMemo和useCallback的区别
       - ts的问题，type和interface的区别，type定义的数据可以实现继承吗
       - ts相比于js特有的数据类型
       - useReducers
       - useRef的使用

14. 20220308 纽酷

       - 一个递归的树级递归编程题
       - 垃圾回收、Fiber架构、webpack打包流程、常用的loader、vdom diff
       - 项目怎么部署的，流程，后端服务

15. 0315 xx

       - 什么是CDN
       - React生命周期
       - css3的新特性
       - 跨域、display visibility opacity三种的区别
       - 前端性能优化

16. 0317 bytedance

      - 什么是CDN,更新的时机，为什么需要，怎么做

      - 热更新的原理

      - loader和plugin的区别

      - 一个async await的时序题

      - 一个 原型链和new的题

        ```js
        function F () {}
        Function.prototype.a = () => {}
        Object.prototype.b = () => {}
        const f = new F()
        console.log(F.a, F.b, f.a, f.b)
        ```

      - 手写 Ts Partial实现

      - 编程题

        ```js
        const foo1 = {
          'A': 1,
          'B.A': 2,
          'B.B': 4,
          'CC.D.E': 3,
          'CC.D.F': 5
        }
        function transferFn (data) {
          let objRes = {}
          for (let key in data) {
            const keys = key.split('.')
            const len = keys.length
            // console.log('keys', keys)
            keys.reduce((acc, cur, index) => {
              acc[cur] = acc[cur] || {}
              if (index === len - 1) {
                acc[cur] = data[key]
              }
              // console.log('acc', acc)
              return acc[cur]
            }, objRes)
          }
          return objRes
        }
        ```

        

      - react子父通信

      - js模块的发展，cmd与esmodule的区别

      - 事件循坏机制

      - 实现跨域的方法

17. 0321bytedance 二面

    - 虚拟列表的实现原理
    - flex 细节，basis的默认值有哪些？auto是什么宽度？basis设置的元素的什么？shrink是怎么计算的
    - setState连续设置多次回多次渲染吗？hooks里面呢？怎么让setState变成可控的，fiber考虑等
    - react hook实现原理
    - infer的用法, ts中几个类型的含义
    - 浏览器渲染机制
    - 编程题“1+2-3+15-2”

18. 0329

      - 上午
        - 一个页面，怎么做首屏渲染优化，怎么做首页图片加载优化等？
        
          - 减少首屏渲染的体积大小
        
          - 减少首屏渲染从开始到可交互的时间
        
            以上两点可以从代码级别的优化：代码分片、懒加载、CDN等，nginx服务器配置
        
          - 从开始到可交互的时间，dom已经加载了，在这里可以进行一些UI上的渲染，让用户感知到页面的变化
        
        - hooks的缺点
        
      - 下午

        - useEffect中返回的函数执行时机？

        - promise原理，说说promise

        - 泛型使用在什么地方
        - 父组件怎么取到子组件的函数？ref怎么取？
        - async await的原理

19. 0330

    - 哪些检查数据类型的方法(Object.prototype.toString)
    - 数组的方法哪些是改变原数组哪些是不改变的
    - object.keys 和 getOwnPropertyNames的区别
      - Object.getOwnPropertyNames()自身属性的名称和可枚举的属性
      - for ... in Object.keys() 只能迭代可枚举的
    - 项目优化点怎么定位，怎么优化
    - webpack常见的plugin loader
    - axios的封装处理，如果请求发出去后怎么中断
    - css选择器的优先级组合选择器

