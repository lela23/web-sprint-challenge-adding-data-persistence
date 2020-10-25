const express = require('express');

const server = express();

const welcomeRouter = require('./api/welcome/welcome-router');
const assignmentsRouter = require('./api/assignments/assignments-router');

server.use(express.json());

server.use('/', welcomeRouter);
server.use('/assignments', assignmentsRouter);

module.exports = server;