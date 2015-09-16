var expect = require('chai').expect;
var sinon = require('sinon');

var HandlerCB = require('../lib/HandlerCB');
var HandlerTimeout = require('../lib/HandlerTimeout');
var HandlerNow = require('../lib/HandlerNow');
var createChain = require('../chain');

describe('Handlers', function () {
    describe('HandlerCB', function () {
        it('should call the callback', function (done) {
            var handler = new HandlerCB(function (callback) {
                setTimeout(callback, 100);
            });

            handler.run(done);
        });
    });

    describe('HandlerNow', function () {
        var spy;

        before(function(done) {
            spy = sinon.spy();

            (new HandlerNow(spy)).run(done);
        });

        it('should call the callback', function () {
            expect(spy.args.length).to.equal(1);
        });
    });

    describe('HandlerTimeout', function () {
        var clock;
        before(function () {
            clock = sinon.useFakeTimers();
        });

        after(function () {
            clock.restore();
        });

        it('should call the handler and the callback after the specified time', function (done) {
            var spy = sinon.spy();
            var handler = new HandlerTimeout(100, spy);

            handler.run(done);
            expect(spy.args.length).to.equal(1);

            clock.tick(100);
        });
    });

    describe('chain', function () {
        var chain, spy1, spy2, spy3, secondCall, thirdCall, finalSpy;

        before(function (done) {
            spy1 = sinon.spy(function (callback) {
                process.nextTick(callback);
            });
            spy2 = sinon.spy(function () {
                secondCall = Date.now();
            });
            spy3 = sinon.spy(function (callback) {
                thirdCall = Date.now();
                setTimeout(callback, 100);
            });
            finalSpy = sinon.spy(function () {
                done();
            });

            chain = createChain(finalSpy)
                .do(spy1)
                .for('100ms', spy2)
                .do(spy3);
        });

        it('should call the first do invocation', function () {
            expect(spy1.args.length).to.equal(1);
        });

        it('should call the for invocation', function () {
            expect(spy2.args.length).to.equal(1);
        });

        it('should call the second do invocation', function () {
            expect(spy3.args.length).to.equal(1);
        });

        it('should execute the for section for 100ms', function () {
            expect(thirdCall - secondCall).to.be.within(90, 110);
        });
    });
});