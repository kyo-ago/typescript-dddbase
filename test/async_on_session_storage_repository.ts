import {Entity, NumberIdentity, AsyncOnSessionStorageRepository} from "../src/index";
import assert = require("assert");

class Person extends Entity<NumberIdentity> {
    constructor(identity: NumberIdentity, public name: string) {
        super(identity);
    }
}

describe('AsyncOnSessionStorageRepository', () => {
    var repository: AsyncOnSessionStorageRepository<NumberIdentity, Person>;
    var identity: NumberIdentity;
    var name: string;
    var person: Person;
    var identity2: NumberIdentity;
    var name2: string;
    var person2: Person;

    beforeEach(() => {
        repository = new AsyncOnSessionStorageRepository<NumberIdentity, Person>({
            parse: (json: Object): Person => {
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
        it('should store entity, And future returns stored entity', () => {
            return repository.store(person).then((entity) => {
                assert(entity === person);
            });
        });
    });

    describe('#storeList', () => {
        it('should store entity list, And future returns stored entity list', () => {
            var persons = [person, person2];
            return repository.storeList(persons).then((entityList) => {
                assert(entityList === persons);
                assert(entityList.length === 2);
            });
        });
    });

    describe('#resolve', () => {
        it('returns succeed Futrue<Entity> if the entity is stored', () => {
            return repository.store(person).then(() => {
                return repository.resolve(identity).then((entity) => {
                    assert(entity.getIdentity().getValue() === person.getIdentity().getValue());
                    assert(entity.name === person.name);
                });
            });
        });

        it('returns None<Entity> if the entity is not stored', () => {
            return repository.resolve(identity).catch((error) => {
                assert(error);
            });
        });
    });

    describe('#deleteByEntity', () => {
        it('should delete stored entity if given it', () => {
            return repository.store(person).then(() => {
                return repository.deleteByEntity(person).then((repo) => {
                    return repo.resolve(identity).catch((error) => {
                        assert(error);
                    });
                });
            });
        });
    });

    describe('#deleteByIdentity', () => {
        it('should deelte stored entity if given thats identify', () => {
            return repository.store(person).then(() => {
                return repository.deleteByIdentity(identity).then((repo) => {
                    return repo.resolve(identity).catch((error) => {
                        assert(error);
                    });
                });
            });
        });
    });
});
