# ar-drone-chain

````javascript
var arDrone = require('ar-drone');
var chain = require('ar-drone-chain');

var client  = arDrone.createClient();

chain()
    .do(client.takeoff.bind(client))
    .for('3s', client.clockwise.bind(client, 0.5))
    .do(function() {
        client.stop();
        client.land();
    })
````
