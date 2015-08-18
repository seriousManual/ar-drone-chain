var chain = require('../chain');

var client = {
    value: 1,
    takeoff: function(callback) {
        console.log('taking of.............' + this.value);
        setTimeout(function() {
            console.log('takeoff done');
            callback();
        }, 1000);
    },

    land: function(callback) {
        console.log('landing.......................' + this.value);
        setTimeout(function() {
            console.log('landing done');
            callback();
        }, 1000);
    }
};

chain()
    .do(client.takeoff.bind(client))
    .for('3s', function() {
        console.log('for 3s');
    })
    .for('1000ms', function() {
        console.log('for 1000ms');
    })
    .do(client.land.bind(client))
    .do(function() {
        console.log('I\'m done!');
        process.exit();
    });


