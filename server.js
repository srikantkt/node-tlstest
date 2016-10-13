'use strict';

var https = require('https');
var http = require('http');
const fs = require('fs');

var body = "Hello World\n";

var responseHandler = (req, res) => {
    console.info('INFO: received request for base url: ', req.url);
    console.info('INFO: ', req.headers);
    res.writeHead(200, {
        'Content-Length': Buffer.byteLength(body),
        'Content-Type': 'text/plain',
        'X-Server': 'FunkyServer/v0.0.1'
    });
    res.end(body);
};

// create HTTP server
var httpServer = http.createServer(responseHandler).listen(8080);
httpServer.timeout = 10000;
httpServer.on('timeout', (socket) => {
    console.error('ERROR: timeout on connection from [%s]:[%d]', socket.remoteAddress, socket.remotePort);
    socket.end();
});

// create HTTPS server
var httpOptions = {
    hostname: 'localhost',
    port: 8443,
    handshakeTimeout: 5000,
    secureProtocol: 'TLSv1_server_method',
    key: fs.readFileSync('key.pem'), 
    cert: fs.readFileSync('cert.pem')
};
var httpsServer = https.createServer(httpOptions, responseHandler).listen(8443);
httpsServer.timeout = 30000;
httpsServer.on('timeout', (socket) => {
    console.error('ERROR: timeout on connection from [%s]:[%d]', socket.remoteAddress, socket.remotePort);
    socket.end();
});
httpsServer.on('tlsClientError', (ex, socket) => {
    console.error('ERROR: TLS negotiation failure on connection ', ex);
    socket.end();
});
