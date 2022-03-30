
// 考察箭头函数中this的指向： 箭头函数this指向定义时的对象
// 考察 . 运算符 与 = 运算符的优先级，. 先执行后 =，=会从右向左执行
var n = 10;
var a = {
  n: 1,
  pro: {
    getValue: () => {
      console.log(this, this.n);
    }
  }
}

a.pro.getValue();

var b = {n: 1};
var c = b;

b.x = b = {n: 2};  // b.x => c.x 后 b = {n: 2}; c.x = {n: 2};
console.log(b.x);
console.log(c.x);


// 题2
var length = 10;
function fn() {
  // console.log('this', this);
  console.log(this.length);
}
var obj = {
  length: 5,
  method: function(fn) {
    fn();
    // console.log('');
    arguments[0]();  // 要注意arguments来调用时，绑定的this是指向的arguments
  }
}
// obj.method(fn, 1); // 打印结果 浏览器环境：10 2

function fn2(xx) {
  this.x = xx;
  return this;
}
// window.x = 5; x = window ; 所以 x = window {x: window} ; window.x = window
var x = fn2(5); // ==> x 是window，且window中有x(指向自己)
// window.x = 6 ==> x = 6; y = window; 所以
var y = fn2(6);
// console.log(x.x); undefiend
// console.log(y.x); // 6

function F() {}
Function.prototype.a = () => {}
Object.prototype.b = () => {}
const f = new F()
console.log(f.a, f.b, F.a, F.b)
