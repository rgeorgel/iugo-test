const UserDataService = require('../services/userDataService');

module.exports = (app) => {
  const routeName = '/UserLoad';
  const userDataService = new UserDataService();

  app.post( `${routeName}`, async (req, res) => {
    const result = await userDataService.get(req.body)
      .catch((ex) => {
        res.status(400).json(ex);
        return;
      });

    res.json(result);
  });
}