var db = require('./db');

module.exports = {
    get: function(product_id, callback) {
        var sql = "select * from product where product_id = ?";
        db.getResult(sql, [product_id], function(result) {
            callback(result);
        });
    },
    getAll: function(callback) {
        var sql = "select * from product";
        db.getResult(sql, [], function(results) {
            callback(results);
        });
    },
    /*insert: function(product, callback) {
        var sql = "insert into product values (?, ?)";
        db.execute(sql, [product.product_name, product.quantity], function(status) {
            callback(status);
        });
    },*/
    /*insert: function(product, callback) {
        var sql = "insert into product values (?, ?)";
        db.execute(sql, [product.product_name, product.quantity], function(status) {
            callback(status);
        });
    },*/
    /*insert2: function(product, callback) {
        var sql = "insert into pp values (?, ?)";
        db.execute(sql, [product.user_id, product.exclusive], function(status) {
            callback(status);
        });
    },*/
    insert2: function(product, callback) {
        var sql = "insert into product values (Null,?, ?,?, ?,Null, ?,?, ?,?,?  )";
        db.execute(sql, [ //product.product_id,
            product.user_id,
            product.product_name,
            product.quantity,
            product.price,
            //product.catatgoryID,
            product.image,
            product.average_rating,
            product.description,
            product.published,
            product.exclusive
        ], function(status) {
            callback(status);
        });
    },
    delete: function(product, callback) {
        var sql = "delete from product where product_id = ?";
        db.execute(sql, [product], function(status) {
            callback(status);
        });
    },
    update: function(product, callback) {
        var sql = "update product set product_name = ?, quantity = ?, price = ?, description = ?, published  = ?,exclusive  = ? where product_id = ?";
        db.execute(sql, [product.product_name, product.quantity, product.price, product.description, product.published, product.exclusive, product.product_id], function(status) {
            callback(status);
        });
    },
    insertCoupon: function(coupon, callback) {
        var sql = "insert into coupon values (Null,?, ?)";
        db.execute(sql, [ //product.product_id,
            coupon.coupon_code,
            coupon.percentage
        ], function(status) {
            callback(status);
        });
    },


}