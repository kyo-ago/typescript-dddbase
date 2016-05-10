var Identity = (function () {
    function Identity(value) {
        this.value = value;
    }
    Identity.prototype.getValue = function () {
        return this.value;
    };
    Identity.prototype.equals = function (that) {
        if (that == null) {
            return false;
        }
        if (this == that) {
            return true;
        }
        return this.value === that.getValue();
    };
    return Identity;
})();
exports["default"] = Identity;
