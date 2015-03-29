error ducks
===================

generalized duck-types for foreign modules

Map errors to the following ones:
- ImproperlyConfigured
- Temporary Error (retry should help)
- Connection Error
- Network Error
- Operational Error
- SuspiciousOperation

Load package.json at start to load internally filter sets for specific versions?

Matching is either:
- string comparison (message)
- regexp match (message)
- trace file + line

Modules required to be supported:
- memcached
- requests
- mysql/psql/oracle adapters
- 

API design?

foo(123, function (err, data) {
    if (err) {
        if (duck(err).ConnectionRefused) {

        }
    }
});

-----

[
    {
        "module": "requests",
        "stack": {
            "file": "some.js",
            "lineNumber": 15
        },
        "error": {
            "message": "Hello Dude",
            "code": "xyz",
        },
        "typeOf": [
            "NetworkError",
            "ConnectionError",
            "TemporaryError"
        ]
    }
]