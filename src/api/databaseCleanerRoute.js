const DatadatabaseCleanerService = require('../services/databaseCleanerService');
const Error = require('../models/error');

module.exports = (app) => {
  const routeName = '/DatabaseCleaner';
  const datadatabaseCleanerService = new DatadatabaseCleanerService();

  app.post( `${routeName}`, async (req, res) => {
    await datadatabaseCleanerService.cleanAll()
      .catch((ex) => {
        res.status(400).json(ex);
        return;
      });

    res.json({ "Success": true });
  });
}