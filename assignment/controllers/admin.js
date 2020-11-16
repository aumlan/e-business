var express = require('express');
//var adminModel = require.main.require('./model/admin-model');
//var restaurantModel = require.main.require('./model/restaurant-model');
//var foodModel = require.main.require('./model/food-model');
var router = express.Router();

router.get('*', function(req, res, next) {
    if (req.session.uId != null) {
        next();
    } else {
        res.redirect('/login');
    }
});

router.get('/', (req, res) => {
    var user = {
        name: req.session.uId
    };
    res.render('admin/index', user);
});





module.exports = router;