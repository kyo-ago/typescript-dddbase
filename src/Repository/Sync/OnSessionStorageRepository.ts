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

    resolveOption(identity: ID): E | null {
        let item = sessionStorage.getItem(identity.getValue());
        let json = item ? JSON.parse(item) : null;
        return json ? this.parse(json) : null;
    }

    resolve(identity: ID): E {
        let resolve = this.resolveOption(identity);
        if (resolve) {
            return resolve;
        }
        throw new Error(`Missing identity, ${identity}`);
    }

    store(entity: E): E {
        sessionStorage.setItem(entity.getIdentity().getValue(), this.stringify(entity));
        return entity;
    }

    storeList(entityList: E[]): E[] {
        entityList.forEach((i) => this.store(i));
        return entityList;
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
