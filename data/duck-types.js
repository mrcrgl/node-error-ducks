'use strict';

var DuckType = require('../lib/models/duck-type');

var duckTypes = [
    new DuckType({
        module: "requests",
        error: {
            message: "Hello Dude",
            code: "xyz",
            stack: {
                file: "some.js",
                lineNumber: 15,
                level: 0
            }
        },
        typeOf: [
            "NetworkError",
            "ConnectionError",
            "TemporaryError"
        ]
    })
];

module.exports = duckTypes;
