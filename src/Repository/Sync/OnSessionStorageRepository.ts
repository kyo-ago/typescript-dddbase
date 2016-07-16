import {Entity} from "../../Entity/Entity";
import {Identity} from "../../Identity/Identity";
import {Repository} from "../Repository";

export interface SessionStorageMapper<ID extends Identity<any>, E extends Entity<ID>> {
    parse(json: Object): E;
    stringify(entity: E): string;
}

export class OnSessionStorageRepository<ID extends Identity<any>, E extends Entity<any>> implements Repository<ID, E> {

    constructor(mapper: SessionStorageMapper<ID, E>) {
        this.parse = mapper.parse;
        this.stringify = mapper.stringify;
    }

    parse: (json: Object) => E;
    stringify: (entity: E) => string;

    resolveOption(identity: ID): E | undefined | null {
        return this.resolve(identity);
    }

    resolve(identity: ID): E {
        var item = sessionStorage.getItem(identity.getValue());
        var json = item ? JSON.parse(item) : null;
        return json ? this.parse(json) : null;
    }

    store(entity: E): E {
        sessionStorage.setItem(entity.getIdentity().getValue(), this.stringify(entity));
        return entity;
    }

    storeList(entityList: E[]): E[] {
        return entityList.map((i) => this.store(i));
    }

    deleteByEntity(entity: E): OnSessionStorageRepository<ID, E> {
        this.deleteByIdentity(entity.getIdentity());
        return this;
    }

    deleteByIdentity(identity: ID): OnSessionStorageRepository<ID, E> {
        sessionStorage.removeItem(identity.getValue());
        return this;
    }
}
