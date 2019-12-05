const TimestampService = require('../services/timestampService');

module.exports = (app) => {
  const routeName = '/Timestamp';
  const timestampService = new TimestampService();

  app.get( `${routeName}`, async (req, res) => {
    const timestamp = await timestampService.get();
    res.json(timestamp);
  });
}