import {Identity} from "./Identity";

export class NumberIdentity extends Identity<number> {
    constructor(value: number) {
        super(value);
    }
}
