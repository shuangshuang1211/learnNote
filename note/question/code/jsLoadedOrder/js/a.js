console.log('a开始下载');
// const a = () => {
//   console.log('a');
// };

let a = 'a';
let b = 'b';
const c = 'c';
// function ab(a, b) {
//   a = 'aa';
//   b = 'bb';
//   console.log('this', this);
//   return a + this.c;
//  }
// //  console.log('ab', ab.bind({c: 'newcc'})(a, b));

function test() {
  // if (true) {
  //   let  message = 'h';
  //   console.log('message1', message);
  //   message = 'x';
  //   // let message = 'x';
  //   console.log('message2', message);
  // }
  for (const param of arguments) {
    console.log('param', param);
  }

}
var name = 'Matte';
var age = '30'
test`name${name},age${age}`;
// var name = 'Matte';
// console.log('window.name', window.name);

let num = 0;
outermost:
for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    if (i === 5 && j === 5) {
      break outermost;
    }
    num++;
  }
}
console.log('num', num);

const obj = [{name: 'newanmw', person: {name: 'personName', age: 12}}, 34, 54];
const newObj = [...obj];
newObj[0].person.name = 'newPersonName';
// console.log('newObj', newObj, 'obj', obj);

function setName(obj) {
  obj.name = 'ss';
  obj = {};
  obj.name = 'newss';
}
const person = {};
setName(person);
// console.log('person', person);

const wm = new WeakMap();
class User {
 constructor(id) {
    console.log('1——new', this);
    this.idProperty = Symbol('id');
    this.setId(id);
 }
  setPrivate(property, value) {
    console.log('setPrivate', this);
    const privateMembers = wm.get(this) || {};
    privateMembers[property] = value;
    wm.set(this, privateMembers);
  }
  getPrivate(property) {
    console.log('getPrivate');
    return wm.get(this)[property];
  }
  setId(id) {
    console.log('setId', this);
    this.setPrivate(this.idProperty, id);
  }
  getId() {
    return this.getPrivate(this.idProperty);
  }
}

class Female extends User {
  constructor () {
    super('newfemale');
    this.female = 'female';
  }
}
const female = new Female();
// console.log('female', female);
const user = new User(123);
user.setId(456);
const newId = user.getId();
// console.log('newId', newId);
// console.log('user', user);

const numProp = 1;
const strProp = 'sddfd';
const iteror = strProp[Symbol.iterator]();
console.log('iterator', Symbol.iterator, iteror.next());
