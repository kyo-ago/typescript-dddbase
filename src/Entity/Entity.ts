import {Identity} from "../Identity/Identity";

export abstract class Entity<ID extends Identity<any>> {

    constructor(private identity: ID) { }

    getIdentity(): ID {
        return this.identity;
    }

    equals(that: Entity<ID>): boolean {
        if (that == null) {
            return false;
        }
        if (this == that) {
            return true;
        }
        return this.identity.equals(that.getIdentity());
    }

}
