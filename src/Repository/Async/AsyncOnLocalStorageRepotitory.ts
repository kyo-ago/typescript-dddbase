import AsyncRepository from "./AsyncRepository";
import Entity from "../../Entity/Entity";
import Identity from "../../Identity/Identity";
import {LocalStorageMapper, OnLocalStorageRepository} from "../Sync/OnLocalStorageRepository";

export class AsyncOnLocalStorageRepository<ID extends Identity<any>, E extends Entity<ID>> extends AsyncRepository<ID, E> {
    constructor(mapper: LocalStorageMapper<ID, E>) {
        super(new OnLocalStorageRepository(mapper));
    }
}
