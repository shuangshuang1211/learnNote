# Js + ES6
1. 节流防抖实现？区别作用？
2. require 和import 的区别？
    CommonJs模块输出的是一个值的拷贝，ES6模块输出的是值的引用。
    CommonJs模块是运行时加载，ES6模块是编译时输出接口。
3. 排序算法(至少三种)*
4. 函数柯里化
5. 数组去重
6. 实现 new class 关键字
7. Mixins 和 高阶函数 、Hook
8. sum(1) sum(1)(2)(3)(4) sum(1, 2, 3, 4);
9. node 的模块
10. 模块知识、JS怎么实现继承？

11. ***事件循环的理解？执行栈和任务队列
12. 对Symbol的理解？(是什么，属性方法，用途)
   https://juejin.cn/post/6925619440843227143
  每个从Symbol()返回的symbol值都是唯一的，一个symbol值能作为对象属性的标识符 —— 这是该数据类型仅有的目的
13. super方法的理解？
   https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/super
14. weakMap 和 Map的区别， Set和weakSet？
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
15. 数据结构?
   基本数据类型： string number(NaN == NaN false) symbol boolean null(null 值表示一个空对象指针) undefined
   引用类型： object array set map
16. 强缓存和协商缓存？
   https://segmentfault.com/a/1190000021661656
17. 宏任务和微任务？(问题11一起看)
18. 理解promise
19. var let const 区别？
    var：声明的变量在函数作用域内，提升变量声明到函数作用域顶部，但值不会； 可用var重复申明同一个变   量；var在全局作用域申明的变量在web环境中会成为window的属性(node环境没有BOM)
    let: 声明的变量范围是块作用域；具有暂时性死区，不可进行变量提升；let不可重复声明同一个变量，但与var声明的变量一样可重复赋值；let在全局作用域申明的变量不能成为window的属性
    const: 基本与let一致，但不能给变量重新赋值，且声明变量的同时也要进行变量初始化；
20. 函数参数是按值传入的，原始值传入函数不影响外部值，对象按值传入函数，但以引用的方式来方位这个传入的对象（函数的参数就是局部变量）
21. 执行上下文(代码被解析和执行时所处的环境？比如能获取到的全局对象、this、变量、函数等)、作用域链(各层级代码在执行时获取变量或函数的顺序)
https://juejin.cn/post/6847902225067409422
22. Date RegExp 等创建的实例都有 toLocalString() toString() valueof() 等方法；
    原始值包装类型：
    Boolean
    Number
    String =>（slice()、substr(子字符串截取的开始位置index， 截取子字符串的长度)和 substring()）
23. yield 生成器， Generator 函数赋值时不会执行函数内部内容，第一次调用的next内不需要参数，输入的参数也会忽略，随后输入的next参数是执行下一个yield相关代买需要的输入或输出,每一个yield执行完就停止，等待下一次next的调用再执行yield，执行next()后返回结果中的res.value是yield 表达式或return的返回；
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
24. 实现默认迭代器

# TS
1. type 和 interface 区别？
2. 箭头函数能保存函数创建时的 this值，而不是调用时的值;
3. 什么是泛型？定义可复用的接口模板
4. 接口(interface) vs. 类型别名(type)
   * 接口创建了一个新的名字，可以在其它任何地方使用。 类型别名并不创建新名字—比如，错误信息就不会使用别名;
   * 类型别名不能被 extends和 implements（自己也不能 extends和 implements其它类型, 如果无法通过接口来描述一个类型并且需要使用联合类型或元组类型，这时通常会使用类型别名
5. ts 复杂的类型？怎么实现Pick Omit
   type Partial<T> = {
      [P in keyof T]?: T[P];
    };

    type Required<T> = {
      [P in keyof T]-?: T[P];
    };

    type Pick<T, K extends keyof T> = {
      [P in K]: T[P];
    };