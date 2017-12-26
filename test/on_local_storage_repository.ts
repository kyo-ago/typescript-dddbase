import * as assert from "assert";
import {Entity, NumberIdentity, OnLocalStorageRepository} from "../src";
import "./index";

class Person extends Entity<NumberIdentity> {
    constructor(identity: NumberIdentity, public name: string) {
        super(identity);
    }
}

describe('OnLocalStorageRepository', () => {
    let repository: OnLocalStorageRepository<NumberIdentity, Person>;
    let identity: NumberIdentity;
    let name: string;
    let person: Person;
    let identity2: NumberIdentity;
    let name2: string;
    let person2: Person;

    beforeEach(() => {
        repository = new OnLocalStorageRepository<NumberIdentity, Person>({
            parse: (json: any): Person => {
                return new Person(new NumberIdentity(json['identity']['value']), json['name']);
            },
            stringify: (person: Person): string => {
                return JSON.stringify(person);
            }
        });
        identity = new NumberIdentity(10);
        name = 'hoge';
        person = new Person(identity, name);
        identity2 = new NumberIdentity(20);
        name2 = 'hoge2';
        person2 = new Person(identity2, name2);
    });

    afterEach(() => {
        localStorage.clear();
    });

    describe('#store', () => {
        it('can store entity, And can select it', () => {
            let stored = repository.store(person);
            assert(stored === person);

            let resolved = repository.resolve(identity);
            assert(resolved.getIdentity().getValue() === person.getIdentity().getValue());
            assert(resolved.name === person.name);
        });
    });

    describe('#storeList', () => {
        it('can store entity list, And can select them', () => {
            let persons = [person, person2];
            let stored = repository.storeList(persons);
            assert(stored === persons);

            let resolved = repository.resolve(identity);
            assert(resolved.getIdentity().getValue() === person.getIdentity().getValue());
            assert(resolved.name === person.name);
            let resolved2 = repository.resolve(identity2);
            assert(resolved2.getIdentity().getValue() === person2.getIdentity().getValue());
            assert(resolved2.name === person2.name);
        });
    });

    describe('#resolveOption', () => {
        it('returns Some<Entity> if the entity is stored', () => {
            repository.store(person);

            let option = repository.resolveOption(identity);
            assert(option !== null);
            assert(option.getIdentity().getValue() === person.getIdentity().getValue());
        });

        it('returns None<Entity> if the entity is not stored', () => {
            let option = repository.resolveOption(identity);
            assert(option === null);
        });
    });

    describe('#deleteByEntity', () => {
        it('should delete stored entity if given it', () => {
            repository.store(person);

            repository.deleteByEntity(person);
            let resolved = repository.resolveOption(identity);

            assert(resolved === null);
        });
    });

    describe('#deleteByIdentity', () => {
        it('should delete stored entity if given thats identify', () => {
            repository.store(person);

            repository.deleteByIdentity(identity);
            let resolved = repository.resolveOption(identity);

            assert(resolved === null);
        });
    });
});

