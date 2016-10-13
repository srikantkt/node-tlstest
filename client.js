'use strict';

var request = require('request');
var https = require('https');
var fs = require('fs');
var cmdOptions = require('minimist')(process.argv.slice(2));

var requestOptions = {
    url: cmdOptions.u || 'http://localhost:8080/test', 
    headers: {
        'User-Agent': 'FunkyClient'
    },
    agentOptions: {
        ca: fs.readFileSync('cert.pem'),
        secureProtocol: cmdOptions.m || 'TLSv1_1_method'
    }
};

request.get(requestOptions)
.on('response', (response) => {
    console.info('INFO: received response: ', response.statusCode, response.statusMessage);
    console.info('INFO: received headers: ', response.headers);
    response.on('data', (chunk) => {
        console.info('INFO: received data: ', chunk.toString());
    });
})
.on('error', function(err) {
    console.log(err)
});
