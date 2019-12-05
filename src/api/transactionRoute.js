const TransactionService = require('../services/transactionService');
const Error = require('../models/error');

module.exports = (app) => {
  const routeName = '/Transaction';
  const transactionService = new TransactionService();

  app.post( `${routeName}`, async (req, res) => {
    const isValid = await transactionService.verify(req.body);

    if (!isValid) {
      const error = new Error('The verifier code is invalid!');
      res.status(400).json(error);
      return;
    }

    await transactionService.save(req.body)
      .catch((ex) => {
        res.status(400).json(ex);
        return;
      });

    res.json({ "Success": true });
  });
}