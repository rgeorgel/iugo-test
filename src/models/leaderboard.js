const mongoose = require('mongoose');

const LeaderboardSchema = new mongoose.Schema({
  UserId: { type: Number, require: true },
  LeaderboardId: { type: Number, require: true },
  Score: { type: Number, require: false },
});

module.exports = mongoose.model('Leaderboard', LeaderboardSchema);
