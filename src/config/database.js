const mongoose = require('mongoose');

var mongoDbUrl = 'mongodb://iugo:iugo@localhost:27017/admin?ssl=false';
module.exports = mongoose.connect(mongoDbUrl);