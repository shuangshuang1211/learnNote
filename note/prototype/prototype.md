- 解决的问题：自定义构造函数定义的方法在每个实例上都会创建一遍；
  •	什么是原型：所谓原型是构造函数的属性，它是一个指针，指向包含构造函数创建的实例所共享的属性和方法的对象，即：
    构造函数.prototype => prototype Obejct
    实例.__proto__([[Prototype]]) => prototype object
    prototype Obejct.constructor => 构造函数
    hasOwnProperty 可以用来判断这个属性是存在于实例上还是原型上
    hasOwnProperty 加 in操作符可以用来判断实例上的一个属性是否存在于原型上 (!object.hasOwnProperty(name) && (name in object); // object 是实例对象)
    Object.getOwnPropertyNames()可以查看对象上所有的属性包括不可枚举的
  •	什么是原型链：用来实现继承，因为每一个实例都会存在一个指针指向构造函数（A）的原型，如果这个构造函数（A）的原型是另一个构造函数（B）的实例，那么A的原型也会存在一个指向B的原型，以此类推，如果B的原型又是C的实例，这样层层递进，就形成了实例到原型的一个关系链，在关系链中其实现本质就是改变了构造函数默认原型指向（重写原型对象，所有函数的默认原型都是Object的实例
  •	原型链继承存在的问题：继承的原型中有引用类型的属性时，当实例中改变了这个属性，则所有继承此原型的实例的这个属性都会改变，还有一个问题是原型继承时，不能向上一层构造函数中传递参数，为避免这两个问题，一般使用组和继承，即可以通过原型链来继承共享属性和方法，通过借用构造函数来实现单个实例属性的继承

组和继承： 存在调用两次父类构造函数的效率问题，一次在调用父类实例给子类原型，一次再子类构造函数

原型式继承：在Object.create(param1, param2)第二个参数省略时其本质就是进行了一次对param1的浅复制
即 function object(o) {
  function F() {};
  F.prototype = o;
  return new F();
}
param2参数形式： {要添加的属性名： {value: '属性对应的值'}}

寄生式继承：创建一个实现继承的函数，增加对象，返回新对象；
function createFunction (o) {
  const clone = object(o);
  clone.newProp = ...;
  return clone;
}

寄生式组和继承： 解决组和继承父类调用两次问题，即实例原型上出现不必要的属性
              基本思路是不通过调 用父类构造函数给子类原型赋值，而是取得父类原型的一个副本
              function inherit(subType, superType) {
                const prototype = object(superType.prototype);
                prototype.constructor = subType;
                subType.prototype = prototype;
              }

类： 类定义不可提升(函数声明可以提升)，var表达式声明可以提升变量不提示值
 class Person {
    constructor() {
    // 添加到 this 的所有内容都会存在于不同的实例上
      this.locate = () => console.log('instance', this);
    }
    // 定义在类的原型对象上
    locate() {
      console.log('prototype', this);
    }
    // 定义在类本身上
    static locate() {
      console.log('class', this);
      // 静态类方法非常适合作为实例工厂
      return new Person();
    }
  }

-  箭头函数没有prototype

- Prototype: 显示原型，通过prototype 属性可以找到原型对象

- __ proto __隐式原型属性，该属性值就是所属类的原型对象

- Object 是一个函数(具有prototype属性)，也是一个对象(有 proto属性)，Object.prototype._ _ proto __ 是 null

- Function 与 Object 

  - 函数：普通函数、构造函数

  - 对象： 键值对

  - 所有函数都是Function的实例对象

  - 每个对象都存在 --proto--属性指向所属类的原型对象

  - 每个函数都有 prototype 属性，指向原型对象

  - Function.prototype 原型(一般的原型对象都是对象)是一个匿名函数，但是它的处理方式和普通原型对象处理方式一样，即它的 --proto-- 属性也是指向了Object.prototype

    Function.prototype.--proto-- === Object.prototype

    Function 是由 new Function 而来的，

    Function.--proto-- === Function.prototype