var uuid = require('uuid'),
    path = require('path'),
    db = require(path.resolve(__dirname, '../commons/db-connection')).db;


function AccountModel() {

}

AccountModel.new = function() {
    return {'id': null, 'uid': null, 'email': null, 'displayname': null, 'password': null};
}

/** Insert a new user account in the DB and retrieve the id **/
AccountModel.create = function (user, callback) {

    /* Before saving the new user, check if it does not already exist */
    db.query('SELECT * FROM account WHERE email = $1', [user.email], 
        function (err, result) {
            if (err) {
                console.log(err);
                callback(err);
            } else if (result.rowCount > 0) {
                callback('Email is already registered');
            } 
        }
    );

    db.query(
        'INSERT INTO account(uid, email, displayname, password) VALUES ($1, $2, $3, $4) RETURNING id',
        [uuid.v4(), user.email, user.displayname, user.password],
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

/** Get a user account by his ID **/
AccountModel.getById = function (accountId, callback) {
    
    var query = db.query('SELECT * FROM account WHERE id = $1', [accountId]);    

    query.on('row', function(row) {
        var account = AccountModel.new();
        account.id = row.id;
        account.uid = row.uid;
        account.email = row.email;
        account.displayname = row.displayname;
        account.password = row.password;

        callback(null, account);
    });   
};

/** Get a user account by his email **/
AccountModel.getByEmail = function (email, callback) {
   
    var query = db.query(
        
        'SELECT * FROM account WHERE email = $1', [email],
        
        function (err, result) {
            if (err) {
                console.log(err);
                callback(err);
            } else if (result.rowCount == 0) {
                callback('Email does not exist');
            } else {
                var account = AccountModel.new();
                account.id = result.rows[0].id;
                account.uid = result.rows[0].uid;
                account.email = result.rows[0].email;
                account.displayname = result.rows[0].displayname;
                account.password = result.rows[0].password;

                callback(null, account);   
            }
        }
    );     
};


module.exports = AccountModel;