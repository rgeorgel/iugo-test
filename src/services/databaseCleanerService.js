const DatabaseCleanerRepository = require('../repository/databaseCleanerRepository');

class DatabaseCleanerService {
  cleanAll() {
    return new Promise(async (resolve, reject) => {
      try {
        const databaseCleanerRepository = new DatabaseCleanerRepository();
        databaseCleanerRepository.clearCollections();

        resolve(true);
      } catch(ex) {
        reject(ex)
      }
    });
  }
}

module.exports = DatabaseCleanerService;