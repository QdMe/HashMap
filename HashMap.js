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
    // If the head of the bucket is null, set it to the new node
    if (!current.value) {
      this.buckets[bucket] = newNode;
      return;
    }
    // If the head equals the key, update its value with the new value
    if (current.value.key === key) {
      current.value.value = value;
      return;
    }
    // Otherwise,loop over the remaining list
    while (current.nextNode) {
      // If a key already exists in that bucket, replace its value with the new one
      if (current.value.key === key) {
        current.value.value = value;
        return;
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
    // Loop over the list
    while (current.value) {
      // If a key was found, return its value
      if (current.value.key === key) {
        return current.value.value;
      }
      current = current.nextNode;
    }
    // Otherwise, return null
    return null;
  }
}
let map = new HashMap();
// if (index < 0 || index >= buckets.length) {
//   throw new Error("Trying to access index out of bounds");
// }
// console.log(map.buckets);
map.set("Sita", "Jones");
map.set("Rama", "Williams");
console.log(map.get("Rama"));

// console.log(map.hash("Rama"));
// console.log(map.hash("sita"));
// console.log(map.hash("hello"));

export default HashMap;
