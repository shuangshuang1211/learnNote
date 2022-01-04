function Animal (name) {
  this.name = name;
  this.varieties = ['dog', 'bird'];
}
Animal.prototype.sayName = function() { return `${this.name}, is animal`;};

function SubAnimal (name, props) {
  // Animal.call(this, name); // 盗用构造函数
  this.props = props;
}
SubAnimal.prototype = new Animal();
// console.log('SubAnimal.prototype.constructor', SubAnimal.prototype.constructor);
SubAnimal.prototype.constructor = SubAnimal;
SubAnimal.prototype.ownProps = function() {return `I can ${this.props}`;};

var instances1 = new SubAnimal('cat', 'mai memng');
instances1.varieties.push('cat');
// console.log('instances1.varieties', instances1.varieties);
// console.log('instances1.sayName', instances1.sayName());
// console.log('instances1.ownProps', instances1.ownProps());

var instances2 = new SubAnimal('meet', 'sleep');
instances2.varieties.push('pig');
// console.log('instances1.varieties', instances2.varieties);
// console.log('instances1.sayName', instances2.sayName());
// console.log('instances1.ownProps', instances2.ownProps());


/// 面试题
  console.log('getName1', getName.toString());
  function Foo() {
    // 没有var的变量会提升到全局作用域，所以执行Foo()后全局作用域的getName 变成 这个
    getName = function () {
      console.log(1);
    }
    console.log('this', this);
    return this;
 }
 Foo.getName = function () {
  console.log(2);
}
Foo.prototype.getName = function () {
  console.log(3);
 }

 // 函数声明提升优于变量声明提升
 var getName = function(){
  console.log(4);
 }

 function getName() {
  console.log(5);
  }

  console.log('getName2', getName.toString());

  Foo.getName(); //2
  Foo().getName(); //  1
  console.log('getName3', getName.toString());
  getName();  // 1
  // 运算符执行的优先级，函数调用、new 参数列表 > new 无参数列表
  new Foo.getName(); //2 先执行Foo.getName() 后 new ... ,所以实际 上是 new function () {console.log(2);} 这里实际上返回的是一个 {}
  const foo = new Foo();
  console.log('foo', foo);
  new Foo().getName();  // new Foo（）和getName（） 优先级一样，会从左到右的执行，所以先new Foo(), 得到Foo的{}实例，{} 的实例上无getName方法，所以会调用原型链上的getName() ?
  const newFoo = new new Foo().getName();
  console.log('newFoo', newFoo);
  new new Foo().getName();  // 考察的是运算符执行的顺序？
  const isbefore = 1 > 0 || 3 && 1 < 0;
  console.log('isbefore', isbefore);