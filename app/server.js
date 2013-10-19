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

// Default landing URL
app.get('/game', function (req, res){
	res.sendfile(path.resolve('../resources/', 'boards.html'));
});

io.sockets.on('connection', function (socket) {
	// when the client emits 'adduser', this listens and executes
	socket.on('newuser', function(username){
		console.log('\t* Client "' + username + '" connected');

		// Create the boards and insert dummy values in the opposing one
		var yourBoard = utils.createBoard();
		var opposingBoard = utils.insertDummyPlanesInBoard(utils.createBoard());

		// Generate the boards in HTML
		var yourBoardHTML = utils.initializeYourTable(yourBoard);
		var opposingBoardHTML = utils.initializeOpposingTable(opposingBoard);

		// Send them to the client
		socket.emit('boards', yourBoardHTML, opposingBoardHTML);
		console.log('\t* Send boards to client "' + username + '"');
	});

	socket.on('shoot', function(position) {
		var i = position.split("_")[0];
		var j = position.split("_")[1];

		console.log('\t* Client shooted at positiion [' + i + ', ' + j + ']');
	});
});
