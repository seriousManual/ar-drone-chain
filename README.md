# ar-drone-chain [![Build Status](https://travis-ci.org/seriousManual/ar-drone-chain.png)](https://travis-ci.org/seriousManual/ar-drone-chain)

ar-drone-chain helps when setting up a chain of commands a ar-drone should complete.

## Commands

Three commands are available:

````
  do      a function that is passed in will be executed.
          a callback is injected, when that callback is called the chain will 
          proceed to the next step
          useful for example when a certain operation takes some predefined 
          time, e.g. taking off
          
  doNow   will execute the executed command immediately and will then proceed
          to the next step.
          useful for commands that take not time, e.g. stopping the drone
          
  for     takes a time span, formatted by the ms module and a function
          the function will be executed, after the specified timespan 
          the next step in the chain will be executed
          useful when a certain operation should be executed for a certain
          time
````

## Example Usage
````javascript
var arDrone = require('ar-drone');
var chain = require('ar-drone-chain');

var client = arDrone.createClient();

var cb = function () {
    console.log('chain has finished');
};

chain(cb)
    .do(client.takeoff.bind(client))
    .for('3s', client.clockwise.bind(client, 0.5))
    .doNow(client.stop)
    .do(client.land.bind(client))
````