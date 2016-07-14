/// <reference path="../DefinitelyTyped/monapt.d.ts" />
import {Entity} from "./Entity/Entity";
import {Identity} from "./Identity/Identity";
import {NumberIdentity} from "./Identity/NumberIdentity";
import {Repository} from "./Repository/Repository";
import {OnLocalStorageRepository, LocalStorageMapper} from "./Repository/Sync/OnLocalStorageRepository";
import {OnMemoryRepository} from "./Repository/Sync/OnMemoryRepository";
import {SessionStorageMapper, OnSessionStorageRepository} from "./Repository/Sync/OnSessionStorageRepository";
import {AsyncRepository} from "./Repository/Async/AsyncRepository";
import {AsyncOnLocalStorageRepository} from "./Repository/Async/AsyncOnLocalStorageRepotitory";
import {AsyncOnMemoryRepository} from "./Repository/Async/AsyncOnMemoryRepotitory";
import {AsyncOnSessionStorageRepository} from "./Repository/Async/AsyncOnSessionStorageRepotitory";

export {
    Entity,
    Identity,
    NumberIdentity,
    Repository,
    OnLocalStorageRepository,
    LocalStorageMapper,
    OnMemoryRepository,
    SessionStorageMapper,
    OnSessionStorageRepository,
    AsyncRepository,
    AsyncOnLocalStorageRepository,
    AsyncOnMemoryRepository,
    AsyncOnSessionStorageRepository
};
