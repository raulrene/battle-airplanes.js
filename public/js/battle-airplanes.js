var socket = null;
var userid = null;
var username = null;

function goToIndexPage() {
	window.location = '/';
}

function goToNewGamePage() {
	window.location = '/game';
}

/** Retrieve the user ID **/
function getUserId() {
	if (userid != null) {
		return userid;
	} else {
		return localStorage.getItem('userid');
	}
}

/** Retrieve the username **/
function getUsername() {
	if (username != null) {
		return username;
	} else {
		return localStorage.getItem('username');
	}
}

/** Persist the user ID **/
function setUser(id, username) {
	userid = id;
	username = username;
	localStorage.setItem('userid', userid);
	localStorage.setItem('username', username);
}

/** On shooting at a certain position **/
function shoot (position) {
	if (socket != null && userid != null) {
		socket.emit('shoot', userid, position);
	}
}

/** Clear local storage items **/
function clearLocalStorage() {
	localStorage.removeItem('userid');
	localStorage.removeItem('username');
}