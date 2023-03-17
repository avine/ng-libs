export class DemoProp<T> {
  private index = 0;

  get value() {
    return this.values[this.index];
  }

  set value(value: T) {
    const index = this.values.indexOf(value);
    if (index !== -1) {
      this.index = index;
    }
  }

  get length() {
    return this.values.length;
  }

  constructor(private values: T[], public hideDetails = false) {}

  next() {
    this.index = (this.index + 1) % this.values.length;
  }
}

export const demoProp = <T>(values: T[], hideDetails = false) => new DemoProp(values, hideDetails);

type Unpack<T> = T extends (infer U)[] ? U : T;

export class DemoState<T extends { [P in keyof T]: T[P] }> {
  state = {} as { [P in keyof T]: DemoProp<Unpack<T[P]>> };

  constructor(public config: T) {
    for (const prop in config) {
      this.state[prop] = new DemoProp(config[prop]);
    }
  }

  get<P extends keyof T>(prop: P): Unpack<T[P]> {
    return this.state[prop].value;
  }
}
