const express = require('express');
const bodyParser = require('body-parser');
const server = express();
const allowCors = require('./cors');
const logger = require('morgan');

server.use(logger('dev'));

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(allowCors);

module.exports = server;