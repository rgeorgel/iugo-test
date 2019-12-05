const LeaderboardRepository = require('../repository/leaderboardRepository');

class LeaderboardService {
  save (score) {
    return new Promise(async (resolve, reject) => {
      try {
        const leaderboardRepository = new LeaderboardRepository();

        await leaderboardRepository.save(score);

        const user = await leaderboardRepository.getUser(score.UserId, score.LeaderboardId);

        const biggerScores = await leaderboardRepository.countBiggerScores(score.LeaderboardId, user[0].Score);

        let response = Object.assign(score);
        response.Rank = biggerScores + 1;
        response.Score = user[0].Score;

        resolve(response);
      } catch(ex) {
        reject(ex);
      }
    });
  }
}

module.exports = LeaderboardService;