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
			board[i] = [].repeat({'plane': null, 'action': 'miss'}, 10);
		}

		console.log(board);
		return board;
	},


	/** Initialize your HTML board from the yourBoard object **/
	initializeYourTable: function (yourBoard) {
		// Top-left empty square
		var yourTable = '<div class="square identifier"></div>';

		for (var i = 0; i < 10; i++) {
			// Construct X-axis identifiers - letters (top)
			if (i == 0) {
				for (var k = 0; k < 10; k++) {
					yourTable += '<div class="square identifier">' + String.fromCharCode(65 + k) + '</div>';
				}
			}

			// Construct Y-axis identifiers - numbers (left)
			yourTable += '<div class="square identifier">' + (i + 1) + '</div>';

			// Construct the actual content of the board
			for (var j = 0; j < 10; j++) {
				if (yourBoard[i][j].action == 'miss') {
					yourTable += '<div class="square unselected"></div>';
				}
				else if (yourBoard[i][j].action == 'hit') {
					yourTable += '<div class="square selected"></div>';
				}
				else if (yourBoard[i][j].action == 'dead') {
					yourTable += '<div class="square head"></div>';
				}
			}
		}
		return yourTable;
	},


	/** Initialize the opponent's HTML board from the opposingBoard object **/
	initializeOpposingTable: function (oppposingBoard) {
		// Top-left empty square
		var opposingTable = '<div class="square identifier"></div>';

		for (var i = 0; i < 10; i++) {

			// Construct X-axis identifiers - letters (top)
			if (i == 0) {
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


	/** Insert dummy planes in a board object **/
	insertDummyPlanesInBoard: function (board) {
		var planeId = 1;

		// Insert airplane 1
		board[0][2] = {'plane': planeId, 'action': 'dead'};
		board[1][0] = {'plane': planeId, 'action': 'hit'};
		board[1][1] = {'plane': planeId, 'action': 'hit'};
		board[1][2] = {'plane': planeId, 'action': 'hit'};
		board[1][3] = {'plane': planeId, 'action': 'hit'};
		board[1][4] = {'plane': planeId, 'action': 'hit'};
		board[2][2] = {'plane': planeId, 'action': 'hit'};
		board[3][1] = {'plane': planeId, 'action': 'hit'};
		board[3][2] = {'plane': planeId, 'action': 'hit'};
		board[3][3] = {'plane': planeId, 'action': 'hit'};

		planeId = 2;

		// Insert airplane 2
		board[6][8] = {'plane': planeId, 'action': 'dead'};
		board[6][7] = {'plane': planeId, 'action': 'hit'};
		board[6][6] = {'plane': planeId, 'action': 'hit'};
		board[6][5] = {'plane': planeId, 'action': 'hit'};
		board[5][7] = {'plane': planeId, 'action': 'hit'};
		board[4][7] = {'plane': planeId, 'action': 'hit'};
		board[7][7] = {'plane': planeId, 'action': 'hit'};
		board[8][7] = {'plane': planeId, 'action': 'hit'};
		board[5][5] = {'plane': planeId, 'action': 'hit'};
		board[7][5] = {'plane': planeId, 'action': 'hit'};

		return board;
	},

	/** 
	* Kill the plane identified by'planeId'and get all the tiles belonging to it
	* Check if there are any more planes to be killed (if the game is won or not)
	**/
	killPlane: function (planeId, board) {
		var response, i, j;
		var response = {'tiles': [], 'won': true};

		for (i = 0; i <10; i++) {
			for (j = 0; j < 10; j++) {
				// Mark all the plane's tiles as dead, and store them to be retrieved	
				if (board[i][j].plane == planeId) {
					board[i][j].action = 'dead';
					response.tiles.push(i + '_' + j);
				}
				// If any more 'hit' actions are found, it means that there are planes that are 'still' alive
				else if (response.won && board[i][j].action == 'hit') {
					response.won = false;
				}
			}
		}

		return response;
	}
};