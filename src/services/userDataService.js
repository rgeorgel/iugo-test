const UserDataRepository = require('../repository/userDateRepository');
const _ = require('lodash');

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

  get (userData) {
    return new Promise(async (resolve, reject) => {
      try {
        const userDataRepository = new UserDataRepository();
        const allData = await userDataRepository.getAllUserData(userData.UserId);

        let result = {};
        for (let i = 0; i < allData.length; i++) {
          const value = allData[i].type === 'number' ? Number(allData[i].value) : allData[i].value;

          this.mountObjectFromDatabase(allData[i].hash, value, result);
        }

        resolve(result);
      } catch(ex) {
        reject(ex);
      }
    });
  }

  mountObjectFromDatabase (hash, value, obj) {
    const objPath = hash.replace(/\>/g,'.');
    _.set(obj, objPath, value);
  }

  preparehash (obj) {
    // get all keys of object
    let keys = Object.keys(obj);
    for (let i in keys) {
      // save the key to be used as an identifier
      this.hash += `>${keys[i]}`;
      // if is object do the process again because has more levels on the hierarchy
      if (typeof obj[keys[i]] === 'object') {
        this.preparehash(obj[keys[i]]);
      } else {
        // if not it's the final value of this 'path'
        this.listOfHash.push({
          hash: this.hash.substring(1),
          value: obj[keys[i]],
          type: typeof obj[keys[i]]
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