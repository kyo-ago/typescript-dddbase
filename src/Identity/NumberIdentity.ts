import Identity from "./Identity";

export default class NumberIdentity extends Identity<number> {
    constructor(value: number) {
        super(value);
    }
}
