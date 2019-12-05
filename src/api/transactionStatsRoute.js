const TransactionService = require('../services/transactionService');
const Error = require('../models/error');

module.exports = (app) => {
  const routeName = '/TransactionStats';
  const transactionService = new TransactionService();

  app.post( `${routeName}`, async (req, res) => {
    const userStats = await transactionService.getUserStats(req.body)
      .catch((ex) => {
        res.status(400).json(ex);
        return;
      });

    res.json(userStats);
  });
}