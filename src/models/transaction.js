const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  hash: { type: String, require: true },
  TransactionId: { type: Number, require: true },
  UserId: { type: Number, require: true },
  CurrencyAmount: { type: Number, require: false },
  Verifier: { type: String, require: true },
});

module.exports = mongoose.model('Transaction', TransactionSchema);
