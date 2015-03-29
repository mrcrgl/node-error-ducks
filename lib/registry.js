'use strict';

var registry;

var Registry = function () {
    this._items = [];
};

Registry.singleton = function () {
    if (!registry) {
        registry = new Registry();
    }

    return registry;
};

Registry.prototype.add = function (item) {
    if (Array.isArray(item)) {
        return item.map(this.add.bind(this));
    }

    this._items.push(item);
};

Registry.prototype.filter = function (fnc) {
    this._items.filter(fnc);
};

module.exports = Registry;
