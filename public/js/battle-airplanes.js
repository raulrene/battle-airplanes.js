var socket = null;
var userid = null;
var displayname = null;

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
		return localStorage.getItem('user-uid');
	}
}

/** Retrieve the displayname **/
function getDisplayName() {
	if (displayname != null) {
		return displayname;
	} else {
		return localStorage.getItem('user-displayname');
	}
}

/** Persist the user details on the local storage **/
function setUser(id, displayname) {
	userid = id;
	displayname = displayname;
	localStorage.setItem('user-uid', userid);
	localStorage.setItem('user-displayname', displayname);
}

/** On shooting at a certain position **/
function shoot (position) {
	if (socket != null && userid != null) {
		socket.emit('shoot', userid, position);
	}
}

/** Clear local storage items **/
function clearLocalStorage() {
	localStorage.removeItem('user-uid');
	localStorage.removeItem('user-displayname');
}