1.函数声明(function name{})与函数表达式(const name = function(){})的区别：
  函数声明可以进行变量提升，使用之前可以未声明，而函数表达式必须要进行赋值再使用
2.递归、闭包
  递归： 用函数声明的方式可解决函数引用丢失问题；
  闭包： 有权访问另外函数作用域变量的函数，对于闭包函数的外部函数调用返回这个闭包函数后，此外部函数的活动对象，即
  本地变量对象不会进行销毁(正常来说，除全局变量对象外，函数局部环境变量对象只有在执行的时候才存在，执行完后会立即
  销毁), 
  递归例子：
  求最近父组件
  function commonParentNode(oNode1, oNode2) {
    if (oNode1.contains(oNode2) || oNode1 === oNode2) {
             return oNode1;
     } else {
        return commonParentNode(oNode1.parentNode, oNode2);
    }
  }
  求sum： 
  function digui (num) {
    if (num > 0) {
      const i = num -1;
      return num + digui(i)
    } else {
      return num;
    }
  }
  求阶乘：
  function factorial (num) {
    if (num === 1) {
       return num;
    } else {
      return num * factorial(num -1)
    }
  }
  
3. continue 结束本次循环，break结束整个循环
