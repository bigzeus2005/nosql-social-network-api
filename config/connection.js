const { connect, connection } = require('mongoose');

const connectionString = 
  process.env.MONGO_URI || 'mongodb://localhost:27017/socialNetworkDB';

connect(connectionString, {
  useNewParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;