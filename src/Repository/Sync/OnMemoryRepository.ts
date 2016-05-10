import Entity from "../../Entity/Entity";
import Identity from "../../Identity/Identity";
import Repository from "../Repository";
import monapt = require("monapt");

export class OnMemoryRepository<ID extends Identity<any>, E extends Entity<any>> implements Repository<ID, E> {
    private entities: Object = {};

    resolveOption(identity: ID): monapt.Option<E> {
        return monapt.Option(this.resolve(identity));
    }

    resolve(identity: ID): E {
        return this.entities[identity.getValue()];
    }

    store(entity: E): E {
        this.entities[entity.getIdentity().getValue()] = entity;
        return entity;
    }

    storeList(entityList: E[]): E[] {
        return entityList.map((i) => this.store(i));
    }

    deleteByEntity(entity: E): OnMemoryRepository<ID, E> {
        this.deleteByIdentity(entity.getIdentity());
        return this;
    }

    deleteByIdentity(identity: ID): OnMemoryRepository<ID, E> {
        delete this.entities[identity.getValue()];
        return this;
    }
}
