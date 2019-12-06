const UserDataService = require('../services/userDataService');

module.exports = (app) => {
  const routeName = '/UserSave';
  const userDataService = new UserDataService();

  app.post( `${routeName}`, async (req, res) => {
    await userDataService.save(req.body)
      .catch((ex) => {
        res.status(400).json(ex);
        return;
      });

    res.json({ "Success": true });
  });
}