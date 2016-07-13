import {Identity} from "../../Identity/Identity";
import {Entity} from "../../Entity/Entity";
import {AsyncRepository} from "./AsyncRepository";
import {OnMemoryRepository} from "../Sync/OnMemoryRepository";

export class AsyncOnMemoryRepository<ID extends Identity<any>, E extends Entity<ID>> extends AsyncRepository<ID, E> {
    constructor() {
        super(new OnMemoryRepository<ID, E>());
    }
}
