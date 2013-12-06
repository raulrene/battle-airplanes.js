var accountModel = require('../models/account-model.js');

// Connect to our Couchbase server

io.sockets.on('connection', function (socket) {
	socket.on('login', function (email, password) {
		
		var response = validate(email, password);

		if (response.status == 200) {

			accountModel.getByEmail(email, function (err, user) {
				if (err) {
					console.log('aaaa');
					response.status = 400;
					response.errors.push('Login has failed');
				} else {
					response.uid = user.uid;
					response.displayname = user.displayname != null ? user.displayname : email;
				}

				socket.emit('login', response);
			});
		}
	});
});	

/** Validate registration data **/
function validate(email, password) {
	var	response = {status: 200, errors: []};

	if (!email || email.trim() == '') {
    	response.status = 400;
    	response.errors.push('Must specify an email');
	}
	if (!password || password.trim() == '') {
    	response.status = 400;
    	response.errors.push('Must specify a password');
	}	

	return response;
}