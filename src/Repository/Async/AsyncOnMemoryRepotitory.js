var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AsyncRepository_1 = require("./AsyncRepository");
var OnMemoryRepository_1 = require("../Sync/OnMemoryRepository");
var AsyncOnMemoryRepository = (function (_super) {
    __extends(AsyncOnMemoryRepository, _super);
    function AsyncOnMemoryRepository() {
        _super.call(this, new OnMemoryRepository_1.OnMemoryRepository());
    }
    return AsyncOnMemoryRepository;
})(AsyncRepository_1["default"]);
exports.AsyncOnMemoryRepository = AsyncOnMemoryRepository;
