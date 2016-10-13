# node-tlstest
TLS/SSL testing in node

### Behavior
The server code starts one HTTP server (port 8080) and one HTTPS server (port 8443). The 
server will respond to all requests with the same response. For a
request that is successfully processed, the HTTP status code is 
always 200 and the response body is
```
Hello World
```

### Options
The server TLS options can be modified by changing the HTTPS option
```js
    secureProtocol: 'TLSv1_server_method'
```
Choose one of supported [TLS methods](https://www.openssl.org/docs/manmaster/ssl/ssl.html). 
The server uses a self-signed certificate `cert.pem` by default and the 
corresponding private key file is `key.pem`.

Correspondingly, the client uses the same self-signed certificate `cert.pem` as the CA certificate.
The TLS method can be modified by updating the `secureProtocol` attribute 
```js
    agentOptions: {
        ca: fs.readFileSync('cert.pem'),
        secureProtocol: 'TLSv1_1_method'
    }
```

The client will always succeed if HTTP url is used.

### Usage
* Server
```sh
$ node server.js [-p <HTTP port>] [-s <HTTPS port>] [-m <protocol method>] [-t <connection timeout>]
```

* Client
```sh
$ node client.js [-u <url>] [-m <protocol method>]
```
