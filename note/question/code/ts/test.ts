class Animal {
  name: string;
  constructor(theName: string) { this.name = theName; }
  move(distanceInMeters: number = 0) {
      console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}

class Snake extends Animal {
  constructor(name: string) { super(name); }
  move(distanceInMeters = 5) {
      console.log("Slithering...");
      super.move(distanceInMeters);
  }
}

class Horse extends Animal {
  constructor(name: string) { super(name); }
  move(distanceInMeters = 45) {
      console.log("Galloping...");
      super.move(distanceInMeters);
  }
}

let sam = new Snake("Sammy the Python");
let tom: Animal = new Horse("Tommy the Palomino");

sam.move();
tom.move(34);
export {};

const anyV: any = 1;
const unknownV: unknown = anyV;
let data1: boolean
type Pet = {
  name: string;
  age: number
}
const data2: Pet = {
  name: '232',
  age: 23
}
type PetData = typeof data2
console.log('data1', )

interface obj{
	name: string,
  age: number
}
interface Person extends obj{
	add:string
}
const arr:Person[] = [{
	name: 'lagou',
  age: 12,
  add: '123'
}]

/*这里怎么写*/
const onChange=<Key extends keyof Person>(v: Person[Key], index: number, key: Key)=>{
  arr[index][key] = v
}

type Name = { 
  name: string; 
}
interface User extends Name { 
  age: (v: number) =>  void
}

class Usera implements User {
  constructor () {
    
  }
  name = ''
  age (a) {

  }
}