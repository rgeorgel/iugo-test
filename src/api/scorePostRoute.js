const LeaderboardService = require('../services/leaderboardService');

module.exports = (app) => {
  const routeName = '/ScorePost';
  const leaderboardService = new LeaderboardService();

  app.post( `${routeName}`, async (req, res) => {
    const score = await leaderboardService.save(req.body)
      .catch((ex) => {
        res.status(400).json(ex);
        return;
      });

    res.json(score);
  });
}