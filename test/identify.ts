import * as assert from "assert";
import {NumberIdentity} from "../src";
import "./index";

describe('Identity', () => {
    describe('NumberIdentity', () => {
        let identity: NumberIdentity;
        beforeEach(() => {
            identity = new NumberIdentity(10);
        });

        it('can create by number', () => {
            assert(identity.getValue() === 10);
        });

        describe('equals method', () => {

            it('should be true if given self', () => {
                assert(identity.equals(identity));
            });

            it('should be true if given idenfity that has equiv value', () => {
                let right = new NumberIdentity(10);
                assert(identity.equals(right));
            });

            it('should be false if given null', () => {
                assert(!identity.equals(null));
            });

            it('should be false if given idenfity that has not equiv value', () => {
                let right = new NumberIdentity(20);
                assert(!identity.equals(right));
            });

        });
    });
});
