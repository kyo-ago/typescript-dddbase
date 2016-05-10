var monapt = require("monapt");
var OnSessionStorageRepository = (function () {
    function OnSessionStorageRepository(mapper) {
        this.parse = mapper.parse;
        this.stringify = mapper.stringify;
    }
    OnSessionStorageRepository.prototype.resolveOption = function (identity) {
        return monapt.Option(this.resolve(identity));
    };
    OnSessionStorageRepository.prototype.resolve = function (identity) {
        var item = sessionStorage.getItem(identity.getValue());
        var json = item ? JSON.parse(item) : null;
        return json ? this.parse(json) : null;
    };
    OnSessionStorageRepository.prototype.store = function (entity) {
        sessionStorage.setItem(entity.getIdentity().getValue(), this.stringify(entity));
        return entity;
    };
    OnSessionStorageRepository.prototype.storeList = function (entityList) {
        var _this = this;
        return entityList.map(function (i) { return _this.store(i); });
    };
    OnSessionStorageRepository.prototype.deleteByEntity = function (entity) {
        this.deleteByIdentity(entity.getIdentity());
        return this;
    };
    OnSessionStorageRepository.prototype.deleteByIdentity = function (identity) {
        sessionStorage.removeItem(identity.getValue());
        return this;
    };
    return OnSessionStorageRepository;
})();
exports.OnSessionStorageRepository = OnSessionStorageRepository;
