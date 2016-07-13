export class Identity<T> {
    constructor(private value: T) { }

    getValue(): T {
        return this.value;
    }

    equals(that: Identity<T>): boolean {
        if (that == null) {
            return false;
        }
        if (this == that) {
            return true;
        }

        return this.value === that.getValue();
    }
}
