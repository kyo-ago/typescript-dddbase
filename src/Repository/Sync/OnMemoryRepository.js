var monapt = require("monapt");
var OnMemoryRepository = (function () {
    function OnMemoryRepository() {
        this.entities = {};
    }
    OnMemoryRepository.prototype.resolveOption = function (identity) {
        return monapt.Option(this.resolve(identity));
    };
    OnMemoryRepository.prototype.resolve = function (identity) {
        return this.entities[identity.getValue()];
    };
    OnMemoryRepository.prototype.store = function (entity) {
        this.entities[entity.getIdentity().getValue()] = entity;
        return entity;
    };
    OnMemoryRepository.prototype.storeList = function (entityList) {
        var _this = this;
        return entityList.map(function (i) { return _this.store(i); });
    };
    OnMemoryRepository.prototype.deleteByEntity = function (entity) {
        this.deleteByIdentity(entity.getIdentity());
        return this;
    };
    OnMemoryRepository.prototype.deleteByIdentity = function (identity) {
        delete this.entities[identity.getValue()];
        return this;
    };
    return OnMemoryRepository;
})();
exports.OnMemoryRepository = OnMemoryRepository;
