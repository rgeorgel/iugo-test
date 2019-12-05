const LeaderboardRepository = require('../repository/leaderboardRepository');
const Error = require('../models/error');

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

  getLeaderboard (request) {
    return new Promise(async (resolve, reject) => {
      try {
        const leaderboardRepository = new LeaderboardRepository();
        
        const user = await leaderboardRepository.getUser(request.UserId, request.LeaderboardId);

        if (user.length === 0) {
          reject(new Error('User or Leaderboard not found'));
        }

        const biggerScores = await leaderboardRepository.countBiggerScores(request.LeaderboardId, user[0].Score);

        const leaderboardList = await this.getLeaderBoard(request.Offset, request.Limit);

        let response = {
          "UserId": request.UserId,
          "LeaderboardId": request.LeaderboardId,
          "Score": user[0].Score,
          "Rank": biggerScores + 1,
          "Entries": leaderboardList
        };

        resolve(response);
      } catch(ex) {
        reject(ex);
      }
    });
  }

  async getLeaderBoard(offset=0 , limit=20) {
    const leaderboardRepository = new LeaderboardRepository();
    const leaderboardList = await leaderboardRepository.getAll(offset, limit);

    const leaderboard = [];
    for (let i = 0; i < leaderboardList.length; i++) {
      const current = leaderboardList[i];
      leaderboard.push({
        "UserId": current.UserId,
        "Score": current.Score,
        "Rank": offset + i + 1
      });
    }

    return leaderboard;
  }
}

module.exports = LeaderboardService;