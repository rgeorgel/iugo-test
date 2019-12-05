const sha1 = require('sha1');
const config = require('../config/config.json');
const TransactionRepository = require('../repository/transactionRepository');
const Error = require('../models/error');

class TransactionService {
  verify (transaction) {
    const encripted = sha1(`${config.transactionSecret}${transaction.TransactionId}${transaction.UserId}${transaction.CurrencyAmount}`);

    return encripted === transaction.Verifier;
  }

  save(transaction) {
    return new Promise(async (resolve, reject) => {
      try {
        const transactionRepository = new TransactionRepository();

        const hash = this.generateHash(transaction);

        if (await transactionRepository.hashExist(hash)) {
          throw new Error('Duplicate transaction');
        }

        transaction.hash = hash;
        transactionRepository.save(transaction);

        resolve(true);
      } catch(ex) {
        reject(ex)
      }
    });
  }

  generateHash(transaction) {
    return `TransactionId=${transaction.TransactionId}UserId=${transaction.UserId}CurrencyAmount=${transaction.CurrencyAmount}`;
  }
}

module.exports = TransactionService;