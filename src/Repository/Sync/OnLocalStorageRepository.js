var monapt = require("monapt");
var OnLocalStorageRepository = (function () {
    function OnLocalStorageRepository(mapper) {
        this.parse = mapper.parse;
        this.stringify = mapper.stringify;
    }
    OnLocalStorageRepository.prototype.resolveOption = function (identity) {
        return monapt.Option(this.resolve(identity));
    };
    OnLocalStorageRepository.prototype.resolve = function (identity) {
        var json = JSON.parse(localStorage.getItem(identity.getValue()));
        if (json) {
            return this.parse(json);
        }
        return null;
    };
    OnLocalStorageRepository.prototype.store = function (entity) {
        localStorage.setItem(entity.getIdentity().getValue(), this.stringify(entity));
        return entity;
    };
    OnLocalStorageRepository.prototype.storeList = function (entityList) {
        var _this = this;
        return entityList.map(function (i) { return _this.store(i); });
    };
    OnLocalStorageRepository.prototype.deleteByEntity = function (entity) {
        this.deleteByIdentity(entity.getIdentity());
        return this;
    };
    OnLocalStorageRepository.prototype.deleteByIdentity = function (identity) {
        localStorage.removeItem(identity.getValue());
        return this;
    };
    return OnLocalStorageRepository;
})();
exports.OnLocalStorageRepository = OnLocalStorageRepository;
