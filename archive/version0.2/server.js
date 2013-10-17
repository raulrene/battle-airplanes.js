var fs = require('fs'), 
	express = require('express'), 
	utils = require('./utils.js');

// Create server on port 1907
var server = express();
server.listen(1907);
console.log('\t* Server started on http://localhost:1907.');

// Global variables
global.boardsFile;
global.yourBoard;
global.opposingBoard;

// Initialize the boards
initializeBoards();

// Read boards.html file to create the basic html 
fs.readFile('../boards.html', function (err, html) {
	if (err) {
		console.log('\t* ERROR reading boards.html!')
	}
	boardsFile = html;
	console.log('\t* Read boards.html successfully.');
});


server.get('/game.html', function (req, res){
	res.writeHead(200, {'content-type' : 'text/html'});
	res.write(boardsFile);
	res.end();
});

server.get('/initializeYourTable.html', function (req, res) {
	var yourTable = utils.initializeYourTable(yourBoard);
	res.writeHead(200, {'content-type' : 'text/html'});
	res.end(yourTable);
});

server.get('/initializeOpposingTable.html', function (req, res) {
    var opposingTable = utils.initializeOpposingTable(opposingBoard);
	res.writeHead(200, {'content-type' : 'text/html'});
	res.end(opposingTable);
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
