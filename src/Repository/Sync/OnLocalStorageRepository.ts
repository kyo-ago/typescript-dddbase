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

    resolveOption(identity: ID): E | undefined | null {
        return this.resolve(identity);
    }

    resolve(identity: ID): E {
        var json = JSON.parse(localStorage.getItem(identity.getValue()));
        if (json) {
            return this.parse(json);
        }
        return null;
    }

    store(entity: E): E {
        localStorage.setItem(entity.getIdentity().getValue(), this.stringify(entity));
        return entity;
    }

    storeList(entityList: E[]): E[] {
        return entityList.map((i) => this.store(i));
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
