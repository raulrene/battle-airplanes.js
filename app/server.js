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

// App has static assests in the 'public' folder
app.use(express.static('public'));

// Global key-value objects to hold players and their associated opponents
global.boardsMap = {}
global.opposingBoardsMap = {}

// Default landing URL
app.get('/game', function (req, res){
	res.sendfile(path.resolve('../resources/', 'boards.html'));
});

io.sockets.on('connection', function (socket) {
	// when the client emits 'adduser', this listens and executes
	socket.on('newuser', function(username){
		console.log('\t* Client with username "' + username + '" connected');

		// Generate User ID
		var userid = utils.generateUserID();

		// Create the boards and insert dummy values in the opposing one
		var yourBoard = utils.createBoard();
		var opposingBoard = utils.insertDummyPlanesInBoard(utils.createBoard());

		// Store them
		boardsMap.userid = yourBoard;
		opposingBoardsMap.userid = opposingBoard;

		// Generate the boards in HTML
		var yourBoardHTML = utils.initializeYourTable(yourBoard);
		var opposingBoardHTML = utils.initializeOpposingTable(opposingBoard);

		// Send them to the client
		socket.emit('accept', userid, yourBoardHTML, opposingBoardHTML);
		console.log('\t* Sent ID & Boards to client "' + username + '"');
	});

	socket.on('shoot', function(userid, position) {
		var i = position.split("_")[0];
		var j = position.split("_")[1];
		var action;

		if (opposingBoardsMap.userid[i][j] == 0) {
			// If miss
			action = 'MISS';
		} else if (opposingBoardsMap.userid[i][j] == 1) {
			// If hit
			action = 'HIT';
		} else if (opposingBoardsMap.userid[i][j] == 2) {
			// If hit in the head (aka dead)
			action = 'DEAD';
		}

		console.log('\t* Client "' + userid + '" shot at [' + i + ', ' + j + '], which resulted in a ' + action);

		socket.emit('shoot', position, action);
	});
});
