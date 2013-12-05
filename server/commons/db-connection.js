var pg = require('pg'),
	db = require('./config').db;

// Connect to the PG instance
var client = new pg.Client('postgres://' + db.user + ':' + db.password + '@' + db.server + ':' + db.port + '/' + db.database);
client.connect();

// Export the connection to use it from other modules
module.exports.db = client;