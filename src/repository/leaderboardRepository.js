const Leaderboard = require('../models/leaderboard');

class LeaderboardRepository {
  async save(newScore) {
    return new Promise(async (resolve, reject) => {
      try {
        if (! await this.userHasBiggerScore(newScore.UserId, newScore.LeaderboardId, newScore.Score)) {
          const user = await this.getUser(newScore.UserId, newScore.LeaderboardId);

          if (!user) {
            let leaderboard = new Leaderboard();
            leaderboard.UserId = newScore.UserId;
            leaderboard.LeaderboardId = newScore.LeaderboardId;
            leaderboard.Score = newScore.Score;

            await leaderboard.save();
          } else {
            await Leaderboard.updateOne({_id: user._id}, { $set: { Score: newScore.Score } });
          }
        }

        resolve(true);
      } catch(ex) {
        reject(ex);
      }
    });
  }

  async countBiggerScores(leaderboard, score) {
    try {
      const userLB = await Leaderboard.find({
        LeaderboardId: leaderboard,
        Score: { $gt: score }
      });

      return userLB.length;
    } catch (ex) {
      throw ex;
    }
  }

  async getAll(offset, limit) {
    try {
      return await Leaderboard
        .find()
        .sort({ Score: 'desc' })
        .skip(offset)
        .limit(limit);
    } catch (ex) {
      throw ex;
    }
  }

  async userHasBiggerScore(userId, leaderboard, score) {
    try {
      const userLB = await Leaderboard.find({
        UserId: userId,
        LeaderboardId: leaderboard,
        Score: score
      });

      return userLB.length > 0;
    } catch (ex) {
      throw ex;
    }
  }

  async getUser(userId, leaderboard) {
    try {
      return await Leaderboard.find({
        UserId: userId,
        LeaderboardId: leaderboard
      });
    } catch (ex) {
      throw ex;
    }
  }
}

module.exports = LeaderboardRepository;