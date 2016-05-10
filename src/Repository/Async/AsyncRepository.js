var AsyncRepository = (function () {
    function AsyncRepository(core) {
        this.core = core;
    }
    AsyncRepository.prototype.resolve = function (identity) {
        var _this = this;
        return new Promise(function (resolve) {
            resolve(_this.core.resolveOption(identity).get());
        });
    };
    AsyncRepository.prototype.store = function (entity) {
        var _this = this;
        return new Promise(function (resolve) {
            resolve(_this.core.store(entity));
        });
    };
    AsyncRepository.prototype.storeList = function (entityList) {
        var _this = this;
        return new Promise(function (resolve) {
            resolve(_this.core.storeList(entityList));
        });
    };
    AsyncRepository.prototype.deleteByEntity = function (entity) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.core.deleteByEntity(entity);
            resolve(_this);
        });
    };
    AsyncRepository.prototype.deleteByIdentity = function (identity) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.core.deleteByIdentity(identity);
            resolve(_this);
        });
    };
    return AsyncRepository;
})();
exports["default"] = AsyncRepository;
