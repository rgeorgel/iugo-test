const express = require('express');
const bodyParser = require('body-parser');
const server = express();
const allowCors = require('./cors');
const logger = require('morgan');

const TimestampRoute = require('../api/timestampRoute');
const TransactionRoute = require('../api/transactionRoute');
const TransactionStatsRoute = require('../api/transactionStatsRoute');
const ScorePostRoute = require('../api/scorePostRoute');
const LeaderboardGetRoute = require('../api/leaderboardGetRoute');
const UserSaveRoute = require('../api/userSaveRoute');
const UserLoadRoute = require('../api/userLoadRoute');
const DatabaseCleanerRoute = require('../api/databaseCleanerRoute');

server.use(logger('dev'));

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(allowCors);

TimestampRoute(server);
TransactionRoute(server);
TransactionStatsRoute(server);
ScorePostRoute(server);
LeaderboardGetRoute(server);
UserSaveRoute(server);
UserLoadRoute(server);
DatabaseCleanerRoute(server);

module.exports = server;