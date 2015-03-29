'use strict';

/**
 * Match strings, numbers, regex, function, booleans
 *
 * @param value
 * @param comparator
 * @param lazy
 */
var matcher = function (value, comparator, lazy) {

    if ([undefined, null, true, false].indexOf(comparator) !== -1) {
        return (value === comparator);
    }

    if (comparator instanceof RegExp) {
        return !!comparator.exec(value);
    }

    if ('function' === typeof comparator) {
        return !!comparator(value);
    }

    if (lazy && value == comparator) {
        return true;
    }

    if (value === comparator) {
        return true;
    }

    return false;
};

module.exports = matcher;
