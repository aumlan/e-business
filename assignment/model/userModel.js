const db = require('./db');

module.exports = {
    validate: function(user, callback) {
        var sql = "select * from admin where username = '" + user.username + "' and password = '" + user.password + "'";
        db.getResults(sql, function(results) {
            if (results.length > 0) {
                callback(true);
            } else {
                callback(false)
            }
        });
    },
    validate2: function(user, callback) {
        var sql = "select * from employer where username = '" + user.username + "' and password = '" + user.password + "'";
        db.getResults(sql, function(results) {
            if (results.length > 0) {
                callback(true);
            } else {
                callback(false)
            }
        });
    },
    getAll: function(callback) {
        var sql = "select * from employer";
        db.getResults(sql, function(results) {
            callback(results)
        });
    },
    insert: function(user, callback) {
        var sql = "insert into employer (name, username,company_name,contact,password) values ('" + user.name + "', '" + user.username + "', '" + user.company_name + "','" + user.contact + "', '" + user.password + "')";
        db.execute(sql, function(status) {
            if (status) {
                callback(true);
            } else {
                callback(false);
            }
        });
    },
    update: function(user, callback) {
        console.log(user);
        var sql = "update employer set password = '" + user.password + "' where username = '" + user.username + "'";
        db.execute(sql, function(status) {
            if (status) {
                callback(true);
            } else {
                callback(false);
            }
        });
    },
    delete: function(user, callback) {
        var sql = "delete from employer where username = '" + user.username + "'";
        db.execute(sql, function(status) {
            if (status) {
                callback(true);
            } else {
                callback(false);
            }
        });
    }
}