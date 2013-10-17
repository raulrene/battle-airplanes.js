var express = require('express'),
	app = express(),
	http = require('http'),
	server = http.createServer(app),
	io = require('socket.io').listen(server),
	utils = require('./utils.js'),
	config = require('./config.js'),
	path = require('path');

// Server listens on port specified in config.js file
server.listen(config.web.port);
console.log('\t* Server started on http://localhost:' + config.web.port);

// Global variables
global.boardsFile;
global.yourBoard;
global.opposingBoard;

// Initialize the boards
initializeBoards();

// Default landing URL
app.get('/game', function (req, res){
	res.sendfile(path.resolve('../resources/', 'boards.html'));
});

io.sockets.on('connection', function (socket) {
	// when the client emits 'adduser', this listens and executes
	socket.on('adduser', function(username){
		console.log('\t* Client "' + username + '" connected');
	});
});


function initializeBoards() {

	yourBoard = new Array(10);
	opposingBoard = new Array(10);

	Array.prototype.repeat = function (value, length){
		while (length) {
			this[--length] = value;
		}
		return this;
	}

	// Initialize empty boards
	for (var i = 0; i < 10; i++) {
		yourBoard[i] = [].repeat(0, 10);
		opposingBoard[i] = [].repeat(0, 10);
	}
}
