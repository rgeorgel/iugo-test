const Transaction = require('../models/transaction');

class TransactionRepository {
  async save(newTransaction) {
    let transaction = new Transaction();
    transaction.hash = newTransaction.hash;
    transaction.TransactionId = newTransaction.TransactionId;
    transaction.UserId = newTransaction.UserId;
    transaction.CurrencyAmount = newTransaction.CurrencyAmount;
    transaction.Verifier = newTransaction.Verifier;

    await transaction.save();
  }

  async hashExist(hash) {
    try {
      const transactions = await Transaction.find({ hash });

      return transactions.length > 0;
    } catch (ex) {
      throw ex;
    }
  }
}

module.exports = TransactionRepository;