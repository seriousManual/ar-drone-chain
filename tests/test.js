var expect = require('chai').expect;
var sinon = require('sinon');

var HandlerCB = require('../lib/HandlerCB');
var HandlerTimeout = require('../lib/HandlerTimeout');

describe('Handlers', function() {
    describe('HandlerCB', function() {
        it('should call the callback', function(done) {
            var handler = new HandlerCB(function(callback) {
                setTimeout(callback, 100);
            });

            handler.run(done);
        });
    });

    describe('HandlerTimeout', function() {
        var clock;
        before(function() {
            clock = sinon.useFakeTimers();
        });

        after(function() {
            clock.restore();
        });

        it('should call the handler and the callback after the specified time', function(done) {
            var spy = sinon.spy();
            var handler = new HandlerTimeout(100, spy);

            handler.run(done);
            expect(spy.args.length).to.equal(1);

            clock.tick(100);
        });
    });
});