var test = require('tape'),
    turnbull = require('../'),
    concat = require('concat-stream'),
    fs = require('fs');

test('Ensure that turnbull streams data slower than a normal stream', function(t){

    t.plan(3);

    var order = [];

    var readStream = fs.createReadStream(__dirname + '/someFile.txt');

    readStream.pipe(turnbull()).pipe(concat(function(file){
        order.push('turnbull');
        t.pass('Stream completed');

        checkComplete();
    }));

    readStream.pipe(concat(function(file){
        order.push('normal');
        t.pass('Stream completed');

        checkComplete();
    }));

    function checkComplete(){
        if(order.length === 2){
            t.deepEqual(order, ['normal', 'turnbull'], 'turnbull was slower than a normal implementation');
        }
    }

});


test('Ensure that turnbull sometimes just drops packets for reasons', function(t){

    t.plan(2);

    var readStream = fs.createReadStream(__dirname + '/someFile.txt');

    var attempts = 100,
        successes = 0;

    for (var i = 0; i < attempts; i++) {
        readStream.pipe(turnbull({
            copper: true,
            latency: 0
        })).pipe(concat(function(file){
            successes++;
        }));
    }

    setTimeout(function(){
        t.ok(successes > 0, 'Some data got through, some didn\'t.');
        t.ok(successes < attempts, 'Not all attempts were successful');
    }, 100);
});