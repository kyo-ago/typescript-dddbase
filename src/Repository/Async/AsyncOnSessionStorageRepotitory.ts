import AsyncRepository from "./AsyncRepository";
import Entity from "../../Entity/Entity";
import Identity from "../../Identity/Identity";
import {SessionStorageMapper, OnSessionStorageRepository} from "../Sync/OnSessionStorageRepository";

export class AsyncOnSessionStorageRepository<ID extends Identity<any>, E extends Entity<any>> extends AsyncRepository<ID, E> {
    constructor(mapper: SessionStorageMapper<ID, E>) {
        super(new OnSessionStorageRepository(mapper));
    }
}
