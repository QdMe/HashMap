import HashMap from "./HashMap";
describe("HashMap implementation", () => {
  let map;
  beforeEach(() => {
    map = new HashMap();
  });
  describe("hash(key) method", () => {
    test("Returns the correct hash (bucket) of the given string", () => {
      expect(map.hash("hi")).toBe(1);
    });
    test("Returns the correct hash (bucket) of the given string", () => {
      expect(map.hash("hello")).toBe(2);
    });
    test("Returns the correct hash (bucket) for a very large string", () => {
      expect(
        map.hash(
          "However, there is one edge case our hash function still needs to address. For very long keys, our hash code will exceed the maximum integer value allowed by JavaScript. Once that happens, calculations become inaccurate, and the chance of collisions significantly increases. One way to avoid this issue is to apply the modulo % operator on each iteration instead of outside the loop at the end.",
        ),
      ).toBe(7);
    });
    test("Throw error when a non-string key is entered", () => {
      expect(() => map.hash(5)).toThrow();
    });
  });
  describe("set(key,value) method", () => {
    test("Sets the value of a new key", () => {
      map.set("fruits", "apple");
      expect(map.get("fruits")).toBe("apple");
    });
    test("Sets the value of a new key", () => {
      map.set("animals", "cat");
      expect(map.get("animals")).toBe("cat");
    });
    test("Updates the value of an existing-key", () => {
      map.set("animals", "cat");
      map.set("animals", "dog");
      expect(map.get("animals")).toBe("dog");
    });
    test("Sets the value of two different keys that share the same bucket", () => {
      map.set("Sita", "Jones");
      map.set("Rama", "Williams");
      expect(map.get("Sita")).toBe("Jones");
      expect(map.get("Rama")).toBe("Williams");
    });
  });
  describe("get(key) method", () => {
    test("Returns the value of an existing key", () => {
      map.set("fruits", "apple");
      expect(map.get("fruits")).toBe("apple");
    });
    test("Returns the value of an existing key", () => {
      map.set("animals", "cat");
      expect(map.get("animals")).toBe("cat");
    });
    test("Returns null when trying to access a non-existing key", () => {
      expect(map.get("dishes")).toBe(null);
    });
  });
  describe("has(key) method", () => {
    test("Returns true for a key that is in the hash-map", () => {
      map.set("fruits", "apple");
      expect(map.has("fruits")).toBe(true);
    });
    test("Returns true for a key that is in the hash-map", () => {
      map.set("animals", "cat");
      expect(map.has("animals")).toBe(true);
    });
    test("Returns false for a key that is in the hash-map", () => {
      map.set("animals", "cat");
      expect(map.has("city")).toBe(false);
    });
  });
  describe("remove(key) method", () => {
    test("Removes the given key from a one itemed bucket then returns true", () => {
      map.set("animals", "cat");
      expect(map.remove("animals")).toBe(true);
      expect(map.get("animals")).toBe(null);
    });
    test("Removes the given key from a two-itemed bucket then returns true", () => {
      map.set("Sita", "Jones");
      map.set("Rama", "Williams");
      expect(map.remove("Sita")).toBe(true);
      expect(map.get("Sita")).toBe(null);
    });
    test("Returns falls for a key that is not in the hash map", () => {
      expect(map.remove("countries")).toBe(false);
    });
  });
  describe("length() method", () => {
    test("Returns 1 for a single key stored in the hash map", () => {
      map.set("fruits", "apple");
      expect(map.length()).toBe(1);
    });
    test("Returns 2 for two keys stored in the hash map", () => {
      map.set("fruits", "apple");
      map.set("animals", "cat");
      expect(map.length()).toBe(2);
    });
    test("Returns 2 for two keys that are stored in the same bucket", () => {
      map.set("Sita", "Jones");
      map.set("Rama", "Williams");
      expect(map.length()).toBe(2);
    });
    test("Returns 3 for two keys that are stored in the same bucket and one that is not", () => {
      map.set("Sita", "Jones");
      map.set("Rama", "Williams");
      map.set("animals", "cat");
      expect(map.length()).toBe(3);
    });
    test("Returns 0 for an empty hash map", () => {
      expect(map.length()).toBe(0);
    });
  });
  describe("clear() method", () => {
    test("Remove the single entry from the hash map", () => {
      map.set("fruits", "apple");
      map.clear();
      expect(map.length()).toBe(0);
    });
    test("Remove all two entries from the hash map", () => {
      map.set("Sita", "Jones");
      map.set("Rama", "Williams");
      map.clear();
      expect(map.length()).toBe(0);
    });
    test("Remove all three entries from the hash map", () => {
      map.set("fruits", "apple");
      map.set("Sita", "Jones");
      map.set("Rama", "Williams");
      map.clear();
      expect(map.length()).toBe(0);
    });
  });
  describe("keys() method", () => {
    test("Return the only key in the hash map", () => {
      map.set("fruits", "apple");
      expect(map.keys()).toEqual(["fruits"]);
    });
    test("Return the only key in the hash map", () => {
      map.set("animals", "cat");
      expect(map.keys()).toEqual(["animals"]);
    });
    test("Return all the two keys in the hash map", () => {
      map.set("fruits", "apple");
      map.set("animals", "cat");
      expect(map.keys()).toEqual(["animals", "fruits"]);
    });
    test("Return all the four keys in the hash map", () => {
      map.set("fruits", "apple");
      map.set("animals", "cat");
      map.set("Sita", "Jones");
      map.set("Rama", "Williams");
      map.set("Car", "Toyota");
      expect(map.keys()).toEqualIgnoreOrder([
        ("Sita", "Rama", "Car", "animals", "fruits"),
      ]);
    });
  });
});
