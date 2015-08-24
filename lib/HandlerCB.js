function HandlerCB(fn) {
    this._fn = fn;
}

HandlerCB.prototype.run = function (callback) {
    this._fn(callback);
};

module.exports = HandlerCB;