'use strict';

const express    = require('express'),
      bodyParser = require('body-parser'),
      routes     = require('./routes'),
      conf       = require('./conf');

const server = express();

server.set('case sensitive routing', true);
// If running behind Nginx proxy
server.enable('trust proxy');

// Accept form data
const jsonBody = bodyParser.json(),
      urlBody  = bodyParser.urlencoded({ extended: true });
server.use(jsonBody, urlBody);

// Remove "X-Powered-By" header, enable CORS
server.use((req, res, next) => {
    res.removeHeader('X-Powered-By');
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

// Mount router
server.use(routes);

server.listen(conf.server.port, () => {
    console.log(`Express server listening on ${ conf.server.port }`);
});
