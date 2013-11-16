var express = require('express'),
	app = express(),
	http = require('http'),
	server = http.createServer(app),
	io = require('socket.io').listen(server),
	utils = require('./utils.js'),
	config = require('./config.js'),
	path = require('path'),
	accountModel = require('./models/account-model.js');

// Server listens on port specified in config.js file
server.listen(config.web.port);
console.log('\t* Server started on http://localhost:' + config.web.port);

// App has static assests in the 'public' folder
app.use(express.static('../public'));

// Global key-value objects to hold players and their associated opponents
global.boardsMap = {}
global.opposingBoardsMap = {}

// Default landing URL
app.get('/', function (req, res){
	res.sendfile(path.resolve('../resources', 'index.html'));
});

// Game URL
app.get('/game', function (req, res){
	res.sendfile(path.resolve('../resources/', 'boards.html'));
});

app.get('/users', function (req, res){
	res.sendfile(path.resolve('../resources/', 'account.html'));
});

io.sockets.on('connection', function (socket) {
	// when the client emits 'adduser', this listens and executes
	socket.on('newuser', function (username){
		console.log('\t* Client with username "' + username + '" connected');

		// Generate user ID and send it to the client
		socket.emit('accept', utils.generateUserID());
	});

	socket.on('get-boards', function (userid) {
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
		socket.emit('boards', yourBoardHTML, opposingBoardHTML);

		console.log('\t* Sent boards to client "' + userid + '"');
	});

	socket.on('shoot', function (userid, position) {
		var i = position.split("_")[0];
		var j = position.split("_")[1];
		var planeTiles, response, won;
		var board = opposingBoardsMap.userid;
		var action = board[i][j].action;

		// If dead, mark the plane as killed, retrieve all the tiles containing the plane and check if the game is over
		if (action == 'dead') {
			response = utils.killPlane(board[i][j].plane, board);
			won = response.won;
			planeTiles = response.tiles;
		}

		console.log('\t* Client "' + userid + '" shot at [' + i + ', ' + j + '], which resulted in a ' + action);

		socket.emit('shoot-result', position, action, planeTiles, won);
	});

	socket.on('register', function (username, name, password) {
		response = {status: '200', errors: []};

		if (!name || name.trim() == '') {
	    	response.status = 400;
	    	response.errors.push('Must specify a name');
	    }
		if (!username || username.trim() == '') {
	    	response.status = 400;
	    	response.errors.push('Must specify a username');
		}
		if (!password || password.trim() == '') {
	    	response.status = 400;
	    	response.errors.push('Must specify a password');
		}

		if (response.status != 400) {
			var newUser = {username: username, name: name};
			
			newUser.password = utils.crypt(password);

			accountModel.create(newUser, function (err, user) {
				if (err) {
				  return next(err);
				}

				delete user.password;
			});
		}

		socket.emit('register', response);
	});
});
