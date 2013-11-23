var accountModel = require('../models/account-model.js');

io.sockets.on('connection', function (socket) {
	socket.on('register', function (email, displayName, password) {
		response = {status: '200', errors: []};

		if (!displayName || displayName.trim() == '') {
	    	response.status = 400;
	    	response.errors.push('Must specify a name');
	    }
		if (!email || email.trim() == '') {
	    	response.status = 400;
	    	response.errors.push('Must specify an email');
		}
		if (!password || password.trim() == '') {
	    	response.status = 400;
	    	response.errors.push('Must specify a password');
		}

		if (response.status != 400) {
			var newUser = {email: email, displayName: displayName};
			
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