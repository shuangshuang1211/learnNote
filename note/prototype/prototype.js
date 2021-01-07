function Animal (name) {
  this.name = name;
  this.varieties = ['dog', 'bird'];
}
Animal.prototype.sayName = function() { return `${this.name}, is animal`;};

function SubAnimal (name, props) {
  // Animal.call(this, name);
  this.props = props;
}
SubAnimal.prototype = new Animal();
SubAnimal.prototype.constructor = SubAnimal;
SubAnimal.prototype.ownProps = function() {return `I can ${this.props}`;};

var instances1 = new SubAnimal('cat', 'mai memng');
instances1.varieties.push('cat');
console.log('instances1.varieties', instances1.varieties);
console.log('instances1.sayName', instances1.sayName());
console.log('instances1.ownProps', instances1.ownProps());

var instances2 = new SubAnimal('meet', 'sleep');
instances2.varieties.push('pig');
console.log('instances1.varieties', instances2.varieties);
console.log('instances1.sayName', instances2.sayName());
console.log('instances1.ownProps', instances2.ownProps());