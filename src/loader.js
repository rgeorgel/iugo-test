const server = require('./config/server');

require('./config/database');

const port = process.env.port || 3003
server.listen(
  port,
  function() {
    console.log(`The api is running on port ${port}`);
  }
);