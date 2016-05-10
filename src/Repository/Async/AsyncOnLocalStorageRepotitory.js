var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AsyncRepository_1 = require("./AsyncRepository");
var OnLocalStorageRepository_1 = require("../Sync/OnLocalStorageRepository");
var AsyncOnLocalStorageRepository = (function (_super) {
    __extends(AsyncOnLocalStorageRepository, _super);
    function AsyncOnLocalStorageRepository(mapper) {
        _super.call(this, new OnLocalStorageRepository_1.OnLocalStorageRepository(mapper));
    }
    return AsyncOnLocalStorageRepository;
})(AsyncRepository_1["default"]);
exports.AsyncOnLocalStorageRepository = AsyncOnLocalStorageRepository;
