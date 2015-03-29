'use strict';

var Registry = require('./registry'),
    DuckType = require('./models/duck-type'),
    butcher = require('./error-butcher');

var api = {
    duck: function (error) {
        var registry = Registry.singleton();

        var matches = registry.filter(function (item) {
            return item.match(error);
        });

        if (matches.length > 1) {
            throw new Error('Error is matching multiple duck types', 'E_OPERATIONAL_ERROR');
        }

        // TODO: Redesign for good access
        return !!matches.length;
    },

    DuckType: DuckType,

    explode: butcher,

    learn: function (duckType) {
        var registry = Registry.singleton();

        registry.add(duckType);
    }
};

module.exports = api;
