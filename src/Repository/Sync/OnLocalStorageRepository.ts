import {Entity} from "../../Entity/Entity";
import {Identity} from "../../Identity/Identity";
import {Repository} from "../Repository";

export interface LocalStorageMapper<ID extends Identity<ID>, E extends Entity<any>> {
    parse(json: Object): E;
    stringify(entity: E): string;
}

export class OnLocalStorageRepository<ID extends Identity<any>, E extends Entity<any>> implements Repository<ID, E> {

    constructor(mapper: LocalStorageMapper<ID, E>) {
        this.parse = mapper.parse;
        this.stringify = mapper.stringify;
    }

    parse: (json: Object) => E;
    stringify: (entity: E) => string;

    resolveOption(identity: ID): E | null {
        let item = localStorage.getItem(identity.getValue());
        if (!item) {
            return null;
        }
        let json = JSON.parse(item);
        if (json) {
            return this.parse(json);
        }
        return null;
    }

    resolve(identity: ID): E {
        let resolve = this.resolveOption(identity);
        if (resolve) {
            return resolve;
        }
        throw new Error(`Missing identity, ${identity}`);
    }

    store(entity: E): E {
        localStorage.setItem(entity.getIdentity().getValue(), this.stringify(entity));
        return entity;
    }

    storeList(entityList: E[]): E[] {
        entityList.forEach((i) => this.store(i));
        return entityList;
    }

    deleteByEntity(entity: E): OnLocalStorageRepository<ID, E> {
        this.deleteByIdentity(entity.getIdentity());
        return this;
    }

    deleteByIdentity(identity: ID): OnLocalStorageRepository<ID, E> {
        localStorage.removeItem(identity.getValue());
        return this;
    }
}
