// Global variables
var yourBoard;
var opposingBoard;


function insertDummyPlanesInBoard(board) {
	// Insert airplane 1
	board[0][2] = 2;
	board[1][0] = 1;
	board[1][1] = 1;
	board[1][2] = 1;
	board[1][3] = 1;
	board[1][4] = 1;
	board[2][2] = 1;
	board[3][1] = 1;
	board[3][2] = 1;
	board[3][3] = 1;

	// Insert airplane 2
	board[6][8] = 2;
	board[6][7] = 1;
	board[6][6] = 1;
	board[6][5] = 1;
	board[5][7] = 1;
	board[4][7] = 1;
	board[7][7] = 1;
	board[8][7] = 1;
	board[5][5] = 1;
	board[7][5] = 1;
}

function initializeBoards() {

	yourBoard = new Array(10);
	opposingBoard = new Array(10);

	Array.prototype.repeat= function(value, length){
		while(length) this[--length]= value;
		return this;
	}

	// Initialize empty boards
	for (var i = 0; i < 10; i++) {
		yourBoard[i] = [].repeat(0, 10);
		opposingBoard[i] = [].repeat(0, 10);
	}

	insertDummyPlanesInBoard(yourBoard);
	insertDummyPlanesInBoard(opposingBoard);
}


function initializeYourTable() {
	var yourTable = document.getElementById('yourTable');

	// Top-left empty square
	yourTable.innerHTML += '<div class="square identifier"></div>';


	for (var i = 0; i < 10; i++) {

		// Construct X-axis identifiers - letters (top)
		if (i === 0) {
			for (var k = 0; k < 10; k++) {
				yourTable.innerHTML += '<div class="square identifier">' + String.fromCharCode(65 + k) + '</div>';
			}
		}

		// Construct Y-axis identifiers - numbers (left)
		yourTable.innerHTML += '<div class="square identifier">' + (i + 1) + '</div>';

		// Construct the actual content of the board
		for (var j = 0; j < 10; j++) {
			if (yourBoard[i][j] === 0) {
				yourTable.innerHTML += '<div class="square unselected"></div>';
			}
			else if (yourBoard[i][j] === 1) {
				yourTable.innerHTML += '<div class="square selected"></div>';
			}
			else if (yourBoard[i][j] === 2) {
				yourTable.innerHTML += '<div class="square head"></div>';
			}
		}
	}
}

function shoot(id) {
	var i = id.split("_")[0];
	var j = id.split("_")[1];
}

function initializeOpposingTable() {
	var opposingTable = document.getElementById('opposingTable');

	// Top-left empty square
	opposingTable.innerHTML += '<div class="square identifier"></div>';

	for (var i = 0; i < 10; i++) {

		// Construct X-axis identifiers - letters (top)
		if (i === 0) {
			for (var k = 0; k < 10; k++) {
				opposingTable.innerHTML += '<div class="square identifier">' + String.fromCharCode(65 + k) + '</div>';
			}
		}

		// Construct Y-axis identifiers - numbers (left)
		opposingTable.innerHTML += '<div class="square identifier">' + (i + 1) + '</div>';

		// Construct the actual content of the board
		for (var j = 0; j < 10; j++) {
			var id = i + "_" + j;
			opposingTable.innerHTML += '<div id="' + id + '" class="square unselected" onclick="shoot(\'' + id + '\')"></div>';
		}
	}
}