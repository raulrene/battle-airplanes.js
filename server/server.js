var express = require('express'),
	http = require('http'),
	config = require(__dirname + '/commons/config.js'),
	path = require('path');

// Make these available in other modules
app = express();
server = http.createServer(app);
io = require('socket.io').listen(server);

// App has static assests in the 'public' folder
app.use(express.static(path.resolve(__dirname, '../public')));

// Server listens on port specified in config.js file
server.listen(config.web.port);
console.log('\t* Server started on http://localhost:' + config.web.port);

// Override routes with the ones from the routes directory
require(__dirname + '/routes');
require(__dirname + '/controllers');

// Global key-value objects to hold players and their associated opponents
global.boardsMap = {}
global.opposingBoardsMap = {}