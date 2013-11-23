var validator = {
 	
 	isValidEmail: function (email) {
        var regex = /^[_A-Za-z0-9-\+]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/;
        return regex.test(email);
    },

	isEmpty: function (field) {
		return field.trim() == '';
    },

    REQUIRED_FIELD: 'This field is required.',
    INVALID_EMAIL: 'Invalid email format.'
};