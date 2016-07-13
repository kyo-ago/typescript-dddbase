import {Identity} from "../Identity/Identity";
import {Entity} from "../Entity/Entity";
import monapt = require("monapt");

export interface Repository<ID extends Identity<any>, E extends Entity<ID>> {
    resolveOption(identity: ID): monapt.Option<E>;

    resolve(identity: ID): E;

    store(entity: E): E;

    storeList(entityList: E[]): E[];

    deleteByEntity(entity: E): Repository<ID, E>;

    deleteByIdentity(identity: ID): Repository<ID, E>;
}
