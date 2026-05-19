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
    let loadFactor = this.length() / this.capacity;
    // If the load factor is more than 0.75
    if (loadFactor >= this.loadFactor) {
      // Double the capacity
      this.capacity *= 2;
    }
    // Find the correct bucket for the given key
    let bucket = this.hash(key);
    let newNode = new Node({ key, value });
    let current = this.buckets[bucket];
    // If the head of the bucket is null, set it to the new node
    try {
      if (!current.value) {
        this.buckets[bucket] = newNode;
        return;
      }
    } catch (e) {
      return;
    }
    // If the head equals the key, update its value with the new value
    if (current.value.key === key) {
      current.value.value = value;
      return;
    }
    // Otherwise,loop over the remaining list
    while (current.nextNode) {
      // If the key already exists in that bucket, replace its value with the new one
      if (current.value.key === key) {
        current.value.value = value;
        return;
      }
      current = current.nextNode;
    }
    // elephant - moon
    // Otherwise save the key-value pair in that bucket
    if (current.value.key === key) {
      current.value.value = value;
      return;
    }
    current.nextNode = newNode;

    // if the first item is not our item
    // and the second item is empty
    // point the first item to newNode
  }
  get(key) {
    // Find the correct bucket of the key
    let bucket = this.hash(key);
    let current = this.buckets[bucket];
    try {
      // Loop over the list
      while (current) {
        // If a key was found, return its value
        if (current.value.key === key) {
          return current.value.value;
        }
        current = current.nextNode;
      }
      // Otherwise, return null
      return null;
    } catch (error) {
      return null;
    }
  }
  has(key) {
    // Find the correct bucket of the key
    let bucket = this.hash(key);
    let current = this.buckets[bucket];
    // Search the nodes of this bucket
    while (current.value) {
      if (current.value.key === key) return true;
      current = current.nextNode;
    }
    return false;
  }
  remove(key) {
    // Find the correct bucket of the key
    let bucket = this.hash(key);
    let current = this.buckets[bucket];
    // If the bucket is empty => return false
    if (!current.value) return false;
    // If it's the only item => reset node
    if (!current.nextNode) {
      this.buckets[bucket] = new Node();
      return true;
    }
    // If it's the head of a more than one item list => point the head to the second item
    if (current.value.key === key) {
      this.buckets[bucket] = current.nextNode;
      return true;
    }
    // If it's not the head => before point to after
    while (current.nextNode) {
      if (current.value.key === key) {
        let itemBefore = current;
        let itemAfter = current.nextNode.nextNode;
        itemBefore.nextNode = itemAfter;
        return true;
      }
    }
    current = current.nextNode;
  }
  length() {
    let count = 0;
    // Loop over the buckets in the hash map
    this.buckets.forEach((bucket) => {
      // If there is only an item
      if (bucket.value && !bucket.nextNode) {
        count++;
      } else {
        // Else, loop over the bucket until current is equal to null
        let current = bucket;
        try {
          while (current.value) {
            count++;
            current = current.nextNode;
          }
        } catch (e) {}
      }
    });
    return count;
  }
  clear() {
    this.buckets = [...this.setBuckets(this.capacity)];
  }
  keys() {
    let keys = [];
    // Loop over the hash map
    this.buckets.forEach((bucket) => {
      // If the head of the bucket is not empty
      if (bucket.value) {
        let current = bucket;
        // Loop over the items of the bucket
        try {
          while (current.value) {
            keys.push(current.value.key);
            // Push the key to keys
            current = current.nextNode;
          }
        } catch (e) {}
      }
    });
    return keys;
  }
  values() {
    let values = [];
    // Loop over the hash map
    this.buckets.forEach((bucket) => {
      // If the head of the bucket is not empty
      if (bucket.value) {
        let current = bucket;
        // Loop over the items of the bucket
        try {
          while (current.value) {
            values.push(current.value.value);
            // Push the key to values
            current = current.nextNode;
          }
        } catch (e) {}
      }
    });
    return values;
  }
  entries() {
    let pairs = [];
    // Loop over the hash map
    this.buckets.forEach((bucket) => {
      // If the head of the bucket is not empty
      if (bucket.value) {
        let current = bucket;
        // Loop over the items of the bucket
        try {
          while (current.value) {
            let pair = [];
            pair.push(current.value.key);
            pair.push(current.value.value);
            // Push the pair to pairs
            pairs.push(pair);
            current = current.nextNode;
          }
        } catch (e) {}
      }
    });
    return pairs;
  }
}

export default HashMap;
