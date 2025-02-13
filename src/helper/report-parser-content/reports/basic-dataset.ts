export default class BasicDateset<T> {
  constructor(data: Partial<T>) {
    Object.assign(this, data);
  }

  static getPropKeys(): string [] {
    const keys = Reflect.ownKeys(new this({}));

    return keys.map((key) => {
      if (typeof key === 'symbol') {
        return key.toString();
      }
      return key;
    });
  }
}
