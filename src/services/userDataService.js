const UserDataRepository = require('../repository/userDateRepository');

class LeaderboardService {
  constructor() {
    this.hash = '';
    this.listOfHash = [];
  }

  save (userData) {
    return new Promise(async (resolve, reject) => {
      try {
        await this.prepareObject(userData);

        resolve(true);
      } catch(ex) {
        reject(ex);
      }
    });
  }

  preparehash (obj) {
    let keys = Object.keys(obj);
    for (let i in keys) {
      this.hash += `${keys[i]}>`;
      if (typeof obj[keys[i]] === 'object') {
        this.preparehash(obj[keys[i]]);
      } else {
        this.listOfHash.push({
          hash: this.hash, 
          value: obj[keys[i]]
        });

        this.hash = '';
      }
    }
  }

  async prepareObject(userData) {
    await this.preparehash(userData.Data);

    for (let i = 0; i < this.listOfHash.length; i++) {
      const userDataRepository = new UserDataRepository();
      await userDataRepository.save({
        UserId: userData.UserId,
        ...this.listOfHash[i]
      });
    }
  }
}

module.exports = LeaderboardService;