'use strict';

var matchStackWithFunction = /^at ([\w\.<>-]+) \(([\w\[\]\.-]+):([\d]+):([\d]+)\)$/,
    matchStackAnonymously = /^at ([\w\[\]\.-]+):([\d]+):([\d]+)$/;

/**
 *
 * @param error
 */
var errorButcher = function (error) {
    var out = {
        code: undefined,
        message: undefined,
        type: undefined,
        stack: []
    };

    out.code = error.code || out.code;
    out.message = error.message || out.message;
    out.type = (error instanceof Error) ? 'Error' : typeof error;

    if ('string' === typeof error.stack) {
        console.log(error.stack);

        error.stack.split('\n').forEach(function (row) {
            row = row.trim();

            if (row.indexOf('at') !== 0) {
                return;
            }

            var res1 = matchStackWithFunction.exec(row);
            if (res1) {
                out.stack.push({
                    fnc: res1[1],
                    file: res1[2],
                    line: res1[3],
                    char: res1[4]
                });
                return;
            }

            var res2 = matchStackAnonymously.exec(row);
            if (res2) {
                out.stack.push({
                    fnc: undefined,
                    file: res2[1],
                    line: res2[2],
                    char: res2[3]
                });
                return;
            }

        });
    }

    return out;
};

module.exports = errorButcher;
