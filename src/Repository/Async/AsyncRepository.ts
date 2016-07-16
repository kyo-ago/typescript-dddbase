import {Repository} from "../Repository";
import {Entity} from "../../Entity/Entity";
import {Identity} from "../../Identity/Identity";

export class AsyncRepository<ID extends Identity<any>, E extends Entity<ID>> {

    constructor(private core: Repository<ID, E>) {}

    resolve(identity: ID): Promise<E | undefined | null> {
        return new Promise<E | undefined | null>((resolve) => {
            resolve(this.core.resolveOption(identity));
        });
    }

    store(entity: E): Promise<E> {
        return new Promise<E>((resolve) => {
            resolve(this.core.store(entity));
        });
    }

    storeList(entityList: E[]): Promise<E[]> {
        return new Promise<E[]>((resolve) => {
            resolve(this.core.storeList(entityList));
        });
    }

    deleteByEntity(entity: E): Promise<AsyncRepository<ID, E>> {
        return new Promise<AsyncRepository<ID, E>>((resolve) => {
            this.core.deleteByEntity(entity);
            resolve(this);
        });
    }

    deleteByIdentity(identity: ID): Promise<AsyncRepository<ID, E>> {
        return new Promise<AsyncRepository<ID, E>>((resolve) => {
            this.core.deleteByIdentity(identity);
            resolve(this);
        });
    }
}
