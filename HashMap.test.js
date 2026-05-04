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
});
