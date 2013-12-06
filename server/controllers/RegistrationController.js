var accountModel = require('../models/account-model.js');

io.sockets.on('connection', function (socket) {
	socket.on('register', function (email, displayname, password) {
		
		var response = validate(email, displayname, password);

		if (response.status == 200) {
		
			var newUser = {email: email, displayname: displayname};
			newUser.password = utils.crypt(password);

			accountModel.create(newUser, function (err, id) {
				if (err) {
					response.status = 400;
					response.errors.push('Registration has failed: ' + err);
				} else {
					console.log('\t* Client registered: [ID = ' + id + ', email = ' + email + ']');
					socket.emit('register', response);
				}
			});
		}
	});
});	

/** Validate registration data **/
function validate(email, displayname, password) {
	var	response = {status: 200, errors: []};
	
	if (!displayname || displayname.trim() == '') {
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