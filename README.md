# ar-drone-chain

````javascript
var arDrone = require('ar-drone');
var chain = require('ar-drone-chain');

var client  = arDrone.createClient();

var cb = function () {
    console.log('chain has finished');
};

chain(cb)
    .do(client.takeoff.bind(client))
    .for('3s', client.clockwise.bind(client, 0.5))
    .do(function (callback) {
        client.stop();
        client.land(callback);
    });
````
