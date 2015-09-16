var ms = require('ms');

var HandlerCB = require('./lib/HandlerCB');
var HandlerTimeout = require('./lib/HandlerTimeout');
var HandlerNow = require('./lib/HandlerNow');

function createChain(callback) {
    callback = callback || function () {};

    var chain = {
        _queue: [],

        _runNext: function () {
            var next = chain._queue.shift();

            if (!next) {
                return callback();
            }

            next.run(function () {
                chain._runNext();
            });
        },

        do: function (fn) {
            chain._queue.push(new HandlerCB(fn));

            return chain;
        },

        doNow: function(fn) {
            chain._queue.push(new HandlerNow(fn));

            return chain;
        },

        for: function (duration, fn) {
            var durationMS = ms(duration);
            chain._queue.push(new HandlerTimeout(durationMS, fn));

            return chain;
        }
    };

    process.nextTick(function () {
        chain._runNext();
    });

    return chain;
}

module.exports = createChain;