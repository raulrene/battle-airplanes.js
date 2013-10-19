// Functions visible outside utils.js
module.exports = {

	/** Generate user identifier **/
	generateUserID: function() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
		    return v.toString(16);
		});
	},

	/** Create a new 10x10 tiles board **/
	createBoard: function () {
		var board = new Array(10);

		Array.prototype.repeat = function (value, length){
			while (length) {
				this[--length] = value;
			}
			return this;
		}

		for (var i = 0; i < 10; i++) {
			board[i] = [].repeat(0, 10);
		}
		return board;
	},

	initializeYourTable: function (yourBoard) {
		// Top-left empty square
		var yourTable = '<div class="square identifier"></div>';

		for (var i = 0; i < 10; i++) {
			// Construct X-axis identifiers - letters (top)
			if (i === 0) {
				for (var k = 0; k < 10; k++) {
					yourTable += '<div class="square identifier">' + String.fromCharCode(65 + k) + '</div>';
				}
			}

			// Construct Y-axis identifiers - numbers (left)
			yourTable += '<div class="square identifier">' + (i + 1) + '</div>';

			// Construct the actual content of the board
			for (var j = 0; j < 10; j++) {
				if (yourBoard[i][j] === 0) {
					yourTable += '<div class="square unselected"></div>';
				}
				else if (yourBoard[i][j] === 1) {
					yourTable += '<div class="square selected"></div>';
				}
				else if (yourBoard[i][j] === 2) {
					yourTable += '<div class="square head"></div>';
				}
			}
		}
		return yourTable;
	},

	initializeOpposingTable: function (oppposingBoard) {
		// Top-left empty square
		var opposingTable = '<div class="square identifier"></div>';

		for (var i = 0; i < 10; i++) {

			// Construct X-axis identifiers - letters (top)
			if (i === 0) {
				for (var k = 0; k < 10; k++) {
					opposingTable += '<div class="square identifier">' + String.fromCharCode(65 + k) + '</div>';
				}
			}

			// Construct Y-axis identifiers - numbers (left)
			opposingTable += '<div class="square identifier">' + (i + 1) + '</div>';

			// Construct the actual content of the board
			for (var j = 0; j < 10; j++) {
				var id = i + "_" + j;
				opposingTable += '<div id="' + id + '" class="square unselected" onclick="shoot(\'' + id + '\')"></div>';
			}
		}
		return opposingTable;
	},

	insertDummyPlanesInBoard: function (board) {
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

		return board;
	}
};