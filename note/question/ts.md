#### **什么是泛型**

- ~~定义可复用的接口模板~~
- 泛型是将类型位置作为动态推断的存在，函数或对象可以灵活的选择运行时内部数据所代表的类型
- 定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性

#### TS相比于JS特有的数据类型

- any：表示任何类型，此类型的变量可以赋值给任何类型的值，也可以接受任何类型的值
- unknown：unknown相比any更加严格，任何类型可以赋值给unknown， 但unknown类型只能赋值给any类型或unknown本身
- never： 类型表示的是那些永不存在的值的类型，`never`类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型， `never`类型是任何类型的子类型，可以赋值给任何类型， *没有*类型是`never`的子类型或可以赋值给`never`类型（除了`never`本身之外）
- void：`void`类型像是与`any`类型相反,表示没有任何类型，一个void类型只能接受 undefined 或 null
- undefined / null： 默认情况下`null`和`undefined`是所有类型的子类型
- Tuple
- enum：为一 组数值赋予友好的名字

#### type(类型别名) 和 interface 区别？

- 都可以描述一个对象或函数 `interface SetUser {  (name: string, age: number): void; }` `type SetUser = (name: string, age: number)=> void;`

- class可以implement一个type 或 interface， type不能extends一个type， interface 可以extedns

  `interface extends interface`:  interface B {...}   interface  A extends B { ... }

  交叉类型： `type extends type`: type A = {...}   type B = {...}  type C = A & B & {...} 

  `interface extends type` 

  ```tsx
  interface Name { 
    name: string; 
  }
  type User = Name & { 
    age: number; 
  }
  or
  type Name = { 
    name: string; 
  }
  interface User extends Name { 
    age: number; 
  }
  ```

- type独有的

  - 类型别名不会新建一个类型 - 它只是引用的那个类型；接口创建了一个新的名字，可以在其它任何地方使用。举例：报错信息
  - type可以声明基本类型、联合类型( |  )、元祖类型

  ```tsx
  type Name = string
  type Pet = Dog | Cat
  // 具体定义数组每个位置的类型
  type PetList = [Dog, Pet]
  ```

  - type 语句中还可以使用 typeof 获取实例的 类型进行赋值

  ```
  // 当你想获取一个变量的类型时，使用 typeof
  let div = document.createElement('div');
  type B = typeof div
  ```

  - 其他骚操作

    ```tsx
    type StringOrNumber = string | number;  
    type Text = string | { text: string };  
    type NameLookup = Dictionary<string, Person>;  
    type Callback<T> = (data: T) => void;  
    type Pair<T> = [T, T];  
    type Coordinates = Pair<number>;  
    type Tree<T> = T | { left: Tree<T>, right: Tree<T> };
    ```

    

- interface 可以声明合并，而type不能

  ```tsx
  interface User {
    name: string
    age: number
  }
  
  interface User {
    sex: string
  }
  
  /*
  User 接口为 {
    name: string
    age: number
    sex: string 
  }
  */
  ```

- 类无法实现定义了联合类型的类型别名

#### 一些常用的类型实现(映射类型)

```tsx
type Partial<T> = {
   [P in keyof T]?: T[P];
 }

type ReadOnly<T> = {
  readonly [P in keyof T]: T[P]
}

 type Required<T> = {
   [P in keyof T]-?: T[P];
 }

type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
 }

 type Record<K extends string, T> = {
   [P in K]: T
 }
type Exclude<T, U> = T extends U ? never : T
type Extract<T, U> = T extends U ? T : never
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>

```

#### extends用法

- 继承父类的属性和方法

- 扩展类型：`interface Person extends Obj { }`

- 类型保护：`K extends string`  `K extends keyof T` `typeA extends typeB: 类型A是否可以分配给类型B or typeA === typeB ? xxx : xxx`

  ```tsx
  interface Obj {
  	name: string,
    age: number
  }
  interface Person extends Obj {
  	add:string
  }
  const arr: Person[] = [{
  	name: 'namexx',
    age: 12,
    add: '123'
  }]
  
  /*这里怎么写*/
  const onChange=<Key extends keyof Person>(v: Person[Key], index: number, key: Key)=>{
    arr[index][key] = v
  }
  ```

  自定义类型保护

  ```tsx
  function isFish(pet: Fish | Bird): pet is Fish {
      return (<Fish>pet).swim !== undefined;  // <Fish>pet 等同于 pet as Fish
  }
  ```

 `keyof T`：**索引类型查询操作符**。 对于任何类型`T`，`keyof T`的结果为`T`上已知的公共属性名的联合

```
let personProps: keyof Person; // 'name' | 'age'
```

`T[K]`，**索引访问操作符**



#### infer关键字

- 推断待推断的类型

