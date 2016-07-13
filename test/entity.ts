import {Entity, NumberIdentity} from "../src/index";
import assert = require("assert");

class Person extends Entity<NumberIdentity> {
    constructor(identity: NumberIdentity, public name: string) {
        super(identity);
    }
}

describe('Entity', () => {
    let identity;
    let person;

    beforeEach(() => {
        identity = new NumberIdentity(10);
        person = new Person(identity, 'hoge');
    });

    it('has identity', () => {
        assert(person.getIdentity().getValue() === 10);
    });

    it('has name property', () => {
        assert(person.name === 'hoge');
    });

    describe('equals method', () => {
        it('should be true if given self', () => {
            assert(person.equals(person));
        });

        it('should be true if given entity that has equiv identity.', () => {
            let right = new Person(identity, 'hoge2');
            assert(person.equals(right));
        });

        it('should be false if given null', () => {
            assert(!person.equals(null));
        });

        it('should be false if given entity that has not equiv identity', () => {
            let rightIdenfity = new NumberIdentity(20);
            let right = new Person(rightIdenfity, 'hoge2');
            assert(!person.equals(right));
        });
    });
});
