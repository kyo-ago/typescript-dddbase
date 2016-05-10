var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AsyncRepository_1 = require("./AsyncRepository");
var OnSessionStorageRepository_1 = require("../Sync/OnSessionStorageRepository");
var AsyncOnSessionStorageRepository = (function (_super) {
    __extends(AsyncOnSessionStorageRepository, _super);
    function AsyncOnSessionStorageRepository(mapper) {
        _super.call(this, new OnSessionStorageRepository_1.OnSessionStorageRepository(mapper));
    }
    return AsyncOnSessionStorageRepository;
})(AsyncRepository_1["default"]);
exports.AsyncOnSessionStorageRepository = AsyncOnSessionStorageRepository;
