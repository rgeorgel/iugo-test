const server = require('./config/server');

const port = process.env.port || 3003
server.listen(
  port,
  function() {
    console.log(`The api is running on port ${port}`);
  }
);