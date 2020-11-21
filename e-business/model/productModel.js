var db = require('./db');

module.exports = {
    get: function(product_id, callback) {
        var sql = "select * from product where product_id = ?";
        db.getResult(sql, [product_id], function(result) {
            callback(result);
        });
    },

    getAll: function(seller_id, callback) {
        var sql = "select * from product where seller_id = ?";
        db.getResult(sql, [seller_id], function(results) {
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
            product.seller_id,
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
    getAllReview: function(product, callback) {
        var sql = "select * from review where product_id = ?";
        db.getResult(sql, [product], function(results) {
            callback(results);
        });
    },
    getAllsellerReview: function(user_id, callback) {
        var sql = "select * from review where user_id = ?";
        db.getResult(sql, [user_id], function(results) {
            callback(results);
        });
    },

    getAllUnpublished: function(seller_id, callback) {
        var sql = "select * from product where seller_id = ? and published = '0' ";
        db.getResult(sql, [seller_id], function(results) {
            callback(results);
        });
    },
    updatePublish: function(product_id, callback) {
        var sql = "update product set published = true where product_id = ?";
        db.execute(sql, [product_id], function(status) {
            callback(status);
        });
    },

    getAllpublished: function(seller_id, callback) {
        var sql = "select * from product where seller_id = ? and published = '1' ";
        db.getResult(sql, [seller_id], function(results) {
            callback(results);
        });
    },
    updateunpublish: function(product_id, callback) {
        var sql = "update product set published = false where product_id = ?";
        db.execute(sql, [product_id], function(status) {
            callback(status);
        });
    },
    getAllPendingOrders: function(seller_id, callback) {
        var sql = "select * from orderlist where user_id = ? and order_status = 'pending'";
        db.getResult(sql, [seller_id], function(results) {
            callback(results);
        });
    },
    getAllDeliverdOrders: function(seller_id, callback) {
        var sql = "select * from orderlist where user_id = ? and order_status = 'deliverd'";
        db.getResult(sql, [seller_id], function(results) {
            callback(results);
        });
    },
    getOrder: function(order_id, callback) {
        var sql = "select * from orderlist where order_id = ?";
        db.getResult(sql, [order_id], function(result) {
            callback(result);
        });
    },
    updatePendingOrders: function(order_id, callback) {
        var sql = "update orderlist set order_status = 'deliverd' where order_id = ?";
        db.execute(sql, [order_id], function(status) {
            callback(status);
        });
    },
    cancelOrders: function(order_id, callback) {
        var sql = "update orderlist set order_status = 'cancel' where order_id = ?";
        db.execute(sql, [order_id], function(status) {
            callback(status);
        });
    },



}