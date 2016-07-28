import {Entity} from "../../Entity/Entity";
import {Identity} from "../../Identity/Identity";
import {Repository} from "../Repository";

export class OnMemoryRepository<ID extends Identity<any>, E extends Entity<ID>> implements Repository<ID, E> {
    protected entities: {[key: string]: E} = {};

    resolveOption(identity: ID): E | null {
        return this.resolve(identity);
    }

    resolve(identity: ID): E | null {
        return this.entities[identity.getValue()] || null;
    }

    store(entity: E): E {
        this.entities[entity.getIdentity().getValue()] = entity;
        return entity;
    }

    storeList(entityList: E[]): E[] {
        entityList.forEach((i) => this.store(i));
        return entityList;
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
