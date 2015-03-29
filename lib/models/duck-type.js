'use strict';

var copyObject = require('copy-object'),
    matcher = require('../matcher'),
    butcher = require('../error-butcher');

var DuckType = function (definition) {
    definition = definition || {};

    this.definition = copyObject(definition.error || {}, {}, ['message', 'code', 'stack']);
    this.module = null;
    this.typeOf = [];

    copyObject(definition, this, ['module', 'typeOf']);
};

DuckType.prototype.match = function (error) {
    var decomposed = butcher(error);

    return this.matchBasics(decomposed) && this.matchStack(decomposed);
};

DuckType.prototype.matchBasics = function (decomposed) {
    if (undefined !== this.definition.message
        && !matcher(decomposed.message, this.definition.message)) {
        return false;
    }

    if (undefined !== this.definition.code
        && !matcher(decomposed.code, this.definition.code)) {
        return false;
    }

    return true;
};

DuckType.prototype.matchStack = function (decomposed) {
    var stack = this.definition.stack;

    if (!stack) {
        return true;
    }

    var matches = decomposed.stack.filter(filterStack(stack));

    return !!matches.length;
};

function filterStack(stack) {
    return function (line) {
        if (undefined !== stack.fnc && !matcher(line.fnc, stack.fnc)) {
            return false;
        }

        if (undefined !== stack.file && !matcher(line.file, stack.file)) {
            return false;
        }

        if (undefined !== stack.line && !matcher(line.line, stack.line, true)) {
            return false;
        }

        if (undefined !== stack.char && !matcher(line.char, stack.char, true)) {
            return false;
        }

        return true;
    };
}

module.exports = DuckType;
