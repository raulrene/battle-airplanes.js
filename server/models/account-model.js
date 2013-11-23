var uuid = require('uuid'),
    couchbase = require('couchbase'),
    path = require('path'),
    db = require(path.resolve(__dirname, '../commons/database')).mainBucket;

function cleanUserObj(obj) {
	delete obj.type;
	return obj;
}

function AccountModel() {

}

AccountModel.create = function (user, callback) {
    var userDoc = {
        type: 'user',
        uid: uuid.v4(),
        name: user.name,
        username: user.username,
        password: user.password
    };
    var userDocName = 'user-' + userDoc.uid;

    var refDoc = {
        type: 'username',
        uid: userDoc.uid
    };
    var refDocName = 'username-' + userDoc.username;

    db.add(refDocName, refDoc, function (err) {
        if (err && err.code === couchbase.errors.keyAlreadyExists) {
            return callback('The username specified already exists');
        } else if (err) {
            return callback(err);
        }

        db.add(userDocName, userDoc, function (err, result) {
            if (err) {
                return callback(err);
            }

            callback(null, cleanUserObj(userDoc), result.cas);
        });
    });
};

module.exports = AccountModel;