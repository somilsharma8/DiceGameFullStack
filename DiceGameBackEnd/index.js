'use strict';

var express = require('express');
var app = express();
var http = require('http');
const server = http.createServer(app);
global.server = server;

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const router = require('./routers/Router');

var cors = require('cors');
app.use(cors());

app.post('*', cors(), function (req, res) {
    console.log('Routing to requested path');

    console.log('Request OriginalURL: ' + req.originalUrl);
    router[req.originalUrl.split('?')[0]](req, res);
});

app.get('*', cors(), function (req, res) {
    console.log('Request URL: ' + req.originalUrl);
});

const port = process.env.port || 8000;
server.listen(port, () => console.log(`Server is listening at port ${port}`));


