**什么是泛型？**

- 定义可复用的接口模板
- 

1. type(类型别名) 和 interface 区别？

   - type 没有新建名字，显示错误的信息会是对象字面量类型，interface会创建一个名字，可以直接显示接口名字
   - type可以实现元组或联合类型等特殊类型
   - type不能 extends或implements 其他类型，也不能被extends或implements

2. 箭头函数能保存函数创建时的 this值，而不是调用时的值;

4. 接口(interface) vs. 类型别名(type)

   * 接口创建了一个新的名字，可以在其它任何地方使用。 类型别名并不创建新名字—比如，错误信息就不会使用别名;
   * 类型别名不能被 extends和 implements（自己也不能 extends和 implements其它类型, 如果无法通过接口来描述一个类型并且需要使用联合类型或元组类型，这时通常会使用类型别名

5. ts 复杂的类型？怎么实现Pick Omit

   ```tsx
   type Partial<T> = {
      [P in keyof T]?: T[P];
    };
   
    type Required<T> = {
      [P in keyof T]-?: T[P];
    };
   
   type Pick<T, K extends keyof T> = {
     [P in K]: T[P];
    };
    type Record<K extends string, T> = {
      [P in K]: T
    }
   ```

   - extends 用法： 继承父类的属性和方法、扩展类型、K extends string/ K extends  keyof T 类型保护

     (类型)A extends 类型B : 类型A是否可以分配给类型B或A=== B？