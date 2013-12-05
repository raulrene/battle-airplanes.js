var accountModel = require('../models/account-model.js');

io.sockets.on('connection', function (socket) {
	socket.on('register', function (email, displayName, password) {
		
		var response = validate(email, displayName, password);

		if (response.status == 200) {
		
			var newUser = {email: email, displayName: displayName};
			newUser.password = utils.crypt(password);

			accountModel.create(newUser, function (err, userId) {
				if (err) {
					response.status = 400;
					response.errors.push('Registration has failed');
				} else {
					console.log('\t** Registration success! ID ' + userId);
					socket.emit('register', response);
				}
			});
		}
	});
});	

/** Validate registration data **/
function validate(email, displayName, password) {
	var	response = {status: 200, errors: []};
	
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

	return response;
}