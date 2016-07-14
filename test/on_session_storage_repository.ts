import {Entity, NumberIdentity, OnSessionStorageRepository} from "../src/index";
import assert = require("assert");

class Person extends Entity<NumberIdentity> {
    constructor(identity: NumberIdentity, public name: string) {
        super(identity);
    }
}

describe('OnSessionStorageRepository', () => {
    var repository: OnSessionStorageRepository<NumberIdentity, Person>;
    var identity: NumberIdentity;
    var name: string;
    var person: Person;
    var identity2: NumberIdentity;
    var name2: string;
    var person2: Person;

    beforeEach(() => {
        repository = new OnSessionStorageRepository<NumberIdentity, Person>({
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
        sessionStorage.clear();
    });

    describe('#store', () => {
        it('can store entity, And can select it', () => {
            var stored = repository.store(person);
            assert(stored === person);

            var resolved = repository.resolve(identity);
            assert(resolved.getIdentity().getValue() === person.getIdentity().getValue());
            assert(resolved.name === person.name);
        });
    });

    describe('#storeList', () => {
        it('can store entity list, And can select them', () => {
            var persons = [person, person2];
            var stored = repository.storeList(persons);
            assert(stored === persons);

            var resolved = repository.resolve(identity);
            assert(resolved.getIdentity().getValue() === person.getIdentity().getValue());
            assert(resolved.name === person.name);
            var resolved2 = repository.resolve(identity2);
            assert(resolved2.getIdentity().getValue() === person2.getIdentity().getValue());
            assert(resolved2.name === person2.name);
        });
    });

    describe('#resolveOption', () => {
        it('returns Some<Entity> if the entity is stored', () => {
            repository.store(person);

            var option = repository.resolveOption(identity);
            assert(!option.isEmpty);
            assert(option.get().getIdentity().getValue() === person.getIdentity().getValue());
        });

        it('returns None<Entity> if the entity is not stored', () => {
            var option = repository.resolveOption(identity);
            assert(option.isEmpty);
        });
    });

    describe('#deleteByEntity', () => {
        it('should delete stored entity if given it', () => {
            repository.store(person);

            repository.deleteByEntity(person);
            var resolved = repository.resolve(identity);

            assert(resolved === null);
        });
    });

    describe('#deleteByIdentity', () => {
        it('should delete stored entity if given thats identify', () => {
            repository.store(person);

            repository.deleteByIdentity(identity);
            var resolved = repository.resolve(identity);

            assert(resolved === null);
        });
    });
});
