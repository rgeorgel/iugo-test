const UserData = require('../models/userData');

class UserDataRepository {
  async save(request) {
    return new Promise(async (resolve, reject) => {
      try {
        const userData = await this.getUserData(request.hash, request.UserId);

        if (userData.length === 0) {
          let userData = new UserData();
          userData.UserId = request.UserId;
          userData.hash = request.hash;
          userData.value = request.value;

          await userData.save();
        } else {
          await UserData.updateOne({_id: userData[0]._id}, {
            $set: { 
              value: request.value
            }
          });
        }

        resolve(true);
      } catch(ex) {
        reject(ex);
      }
    });
  }

  async getUserData(hash, userId) {
    try {
      return await UserData.find({
        UserId: userId,
        hash
      });
    } catch (ex) {
      throw ex;
    }
  }
}

module.exports = UserDataRepository;