import HashMap from "./HashMap.js";
const test = new HashMap();
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");
// overwriting some pairs
test.set("apple", "green");
test.set("dog", "white");
test.set("ice cream", "orange");

// Adding another element to increase the load factor which should double the capacity
test.set("moon", "silver");

console.log(test.length());
console.log(test.capacity);
