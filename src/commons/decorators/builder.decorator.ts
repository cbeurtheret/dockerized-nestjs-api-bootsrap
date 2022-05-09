export function Builder<T extends { new (...args: any[]): {} }>(Base: T) {
  return class extends Base {
    public static classBuilder() {
      return new ClassBuilder<T>(Base);
    }
  };
}

export class ClassBuilder<T> {
  private readonly original: any;

  private capitalize(word: string) {
    const firstLetter = word[0].toUpperCase();
    const restOfTheWord = word.slice(1);
    return `${firstLetter}${restOfTheWord}`;
  }

  constructor(original: any) {
    this.original = original;
    console.log('Class => ', original);
    console.log('Class Prototype => ', Object.getPrototypeOf(original));
    console.log('Class Keys => ', Object.keys(original));
    const buiderProto = Object.getPrototypeOf(this);
    Object.keys(original).forEach((key) => {
      console.log('Class Key => ', key);
      Object.defineProperty(this, key, {
        value: undefined,
        writable: true,
        enumerable: true,
        configurable: true,
      });
      buiderProto[`set${this.capitalize(key)}`] = function (value: any) {
        this[key] = value;
        return this;
      };
    });
    Object.setPrototypeOf(this, buiderProto);
    console.log('Builder Keys => ', Object.keys(this));
    console.log('Builder Prototype => ', Object.getPrototypeOf(this));
    // todo: create an instance property for each original property
    // todo: set instance property value to original value if it exists (default)
    // todo: create a method for each instance property
  }

  build(): T {
    // todo: build an original, passing in the current instance properties
    return new this.original();
  }
}
