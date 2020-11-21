var express = require('express');
var adminModel = require.main.require('./model/adminModel');
var sellerModel = require.main.require('./model/sellerModel');
var productModel = require.main.require('./model/productModel');
var router = express.Router();



router.get('*', function(req, res, next) {
    if (req.session.uId != null) {
        next();
    } else {
        res.redirect('/login');
    }
});

/*router.get('/', (req, res) => {
    var user = {
        name: req.session.uId
    };
    res.render('seller/index', user);
});*/

router.get('/', (req, res) => {
    sellerModel.get(req.session.uId, function(result) {
        if (result.length > 0) {
            res.render('seller/index', result[0]);
        }
    });
});


