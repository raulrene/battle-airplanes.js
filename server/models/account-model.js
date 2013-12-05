var uuid = require('uuid'),
    path = require('path'),
    db = require(path.resolve(__dirname, '../commons/db-connection')).db;


function AccountModel() {

}

/** Insert a new user account in the DB **/
AccountModel.create = function (user, callback) {

    db.query(
        'INSERT INTO account(uid, email, displayname, password) VALUES ($1, $2, $3, $4) RETURNING id',
        [uuid.v4(), user.email, user.displayName, user.password],
        function (err, result) {
            if (err) {
                console.log(err);
                callback(err);
            } else {
                callback(null, result.rows[0].id);
            }
        }
    );
};

AccountModel.getByEmail = function (email, callback) {
    
};

module.exports = AccountModel;