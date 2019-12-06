const mongoose = require('mongoose');

class DatabaseCleanerRepository {
  clearCollections () {
    for (let collection in mongoose.connection.collections) {
      mongoose.connection.collections[collection].remove(() => {});
    }

    return;
  }  
}

module.exports = DatabaseCleanerRepository;