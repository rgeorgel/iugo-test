const mongoose = require('mongoose');

const UserDataSchema = new mongoose.Schema({
  UserId: { type: Number, require: true },
  hash: { type: String, require: true },
  value: { type: String, require: true },
});

module.exports = mongoose.model('UserData', UserDataSchema);
