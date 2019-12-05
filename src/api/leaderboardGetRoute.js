const LeaderboardService = require('../services/leaderboardService');

module.exports = (app) => {
  const routeName = '/LeaderboardGet';
  const leaderboardService = new LeaderboardService();

  app.post( `${routeName}`, async (req, res) => {
    const score = await leaderboardService.getLeaderboard(req.body)
      .catch((ex) => {
        res.status(400).json(ex);
        return;
      });

    res.json(score);
  });
}