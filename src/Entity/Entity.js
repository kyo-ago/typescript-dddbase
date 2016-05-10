var Entity = (function () {
    function Entity(identity) {
        this.identity = identity;
    }
    Entity.prototype.getIdentity = function () {
        return this.identity;
    };
    Entity.prototype.equals = function (that) {
        if (that == null) {
            return false;
        }
        if (this == that) {
            return true;
        }
        return this.identity.equals(that.getIdentity());
    };
    return Entity;
})();
exports["default"] = Entity;
