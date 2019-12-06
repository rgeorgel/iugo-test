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

  flatten (obj, prefix = '') {
    _.forEach(obj, (value, key) => {
      if (_.isObject(value)) {
        this.flatten(value, `${prefix}${key}>`);
      } else {
        this.listOfHash.push({
          hash: `${prefix}${key}`,
          value: value,
          type: typeof value
        });
      }
    });
  }

  async prepareObject(userData) {
    await this.flatten(userData.Data);

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