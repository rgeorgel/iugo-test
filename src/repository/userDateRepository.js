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
          userData.type = request.type;

          await userData.save();
        } else {
          await UserData.updateOne({_id: userData[0]._id}, {
            $set: { 
              value: request.value,
              type: request.type
            }
          });
        }

        resolve(true);
      } catch(ex) {
        reject(ex);
      }
    });
  }

  async getAllUserData(userId) {
    try {
      return await UserData.find({
        UserId: userId
      });
    } catch (ex) {
      throw ex;
    }
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