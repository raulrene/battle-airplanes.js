io.sockets.on('connection', function (socket) {

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
});