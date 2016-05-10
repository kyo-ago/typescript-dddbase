var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Identity_1 = require("./Identity");
var NumberIdentity = (function (_super) {
    __extends(NumberIdentity, _super);
    function NumberIdentity(value) {
        _super.call(this, value);
    }
    return NumberIdentity;
})(Identity_1["default"]);
exports["default"] = NumberIdentity;
