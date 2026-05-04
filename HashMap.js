import { LinkedList, Node } from "../LinkedList/implementation/LinkedList.js";
class HashMap {
  constructor() {
    this.buckets = [...this.setBuckets(this.capacity)];
  }

  loadFactor = 0.75;
  capacity = 16;

  setBuckets(size) {
    let node = new Node();
    let buckets = [];
    // Loop from 0 to size then and push an empty node to buckets
    for (let i = 0; i < size; i++) buckets.push(node);
    // Return buckets
    return buckets;
  }
  hash(key) {
    if (typeof key !== "string") throw new Error("Key must be string");
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  set(key, value) {
    // Find the correct bucket of the key
    let bucket = this.hash(key);
    let newNode = new Node({ key, value });
    let current = this.buckets[bucket];
    if (current.value === null) {
      this.buckets[bucket] = newNode;
      return;
    }
    while (current.nextNode) {
      // If a key already exists in that bucket, replace its value
      if (current.value.key === key) {
        current.value.value = value;
      }
      current = current.nextNode;
    }
    // Otherwise save the key-value pair in that bucket
    current.nextNode = newNode;
  }
  get(key) {
    // Find the correct bucket of the key
    let bucket = this.hash(key);
    let current = this.buckets[bucket];
    while (current.value) {
      if (current.value.key === key) {
        return current.value.value;
      }
      current = current.nextNode;
    }
    return null;
  }
}
let map = new HashMap();
// if (index < 0 || index >= buckets.length) {
//   throw new Error("Trying to access index out of bounds");
// }
// console.log(map.buckets);
// map.set("fruits", "apple");
// console.log(map.get("fruits"));

// console.log(map.hash("Rama"));
// console.log(map.hash("sita"));
// console.log(map.hash("hello"));

export default HashMap;
