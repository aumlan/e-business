var express = require('express');
var adminModel = require.main.require('./model/adminModel');
var sellerModel = require.main.require('./model/sellerModel');
var productModel = require.main.require('./model/productModel');
var router = express.Router();



router.get('*', function(req, res, next) {
    if (req.session.uId != null) {
        sellerModel.getUser(req.session.uId, function(result) {
            if (result.length > 0) {
                req.session.uId = result[0].seller_id;

            } else {
                res.redirect('/login');
            }
        });
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


//add product 
router.get('/addProduct', (req, res) => {
    res.render('seller/addProduct');
});

router.post('/addProduct', (req, res) => {
    var product = {
        seller_id: req.session.uId,
        //product_id: 55,
        product_name: req.body.name,
        quantity: req.body.quantity,
        price: req.body.price,
        image: 'imageee',
        //catatgoryID: 1,
        average_rating: 0,
        description: req.body.description,
        exclusive: false,
        published: false
    };

    productModel.insert2(product, function(success) {
        if (success) {
            sellerModel.get(req.session.uId, function(result) {
                if (result.length > 0) {
                    res.render('seller/index', result[0]);
                }
            });

        } else {

            res.render('/seller/addProduct');
        }
    });
});
//add product endddddddddd


//delete product
router.get('/deleteProduct', (req, res) => {
    productModel.getAll(req.session.uId, function(results) {
        if (results.length > 0) {
            var product = {
                productList: results
            };
            res.render('seller/productList', product);
        }
    });
});

router.get('/editProduct/delete/:product_id', (req, res) => {
    productModel.get(req.params.product_id, function(result) {
        if (result.length > 0) {
            res.render('seller/deleteProduct', result[0]);
        }
    });
});

router.post('/editProduct/delete/:product_id', (req, res) => {
    productModel.delete(req.params.product_id, function(success) {
        if (success) {
            res.redirect('/seller');
        } else {
            res.redirect("/editProduct/delete/" + req.params.product_id);
        }
    });
});

//delete product endddddddddd


//edit product
router.get('/editProduct', (req, res) => {
    productModel.getAll(req.session.uId, function(results) {
        if (results.length > 0) {
            var product = {
                productList: results
            };
            res.render('seller/productList2', product);
        }
    });
});

router.get('/editProduct/edit/:product_id', (req, res) => {
    productModel.get(req.params.product_id, function(result) {
        if (result.length > 0) {
            res.render('seller/editProductDetails', result[0]);
        }
    });
});

router.post('/editProduct/edit/:product_id', (req, res) => {
    var product = {
        //user_id: req.session.uId,
        product_id: req.params.product_id,
        product_name: req.body.name,
        quantity: req.body.quantity,
        price: req.body.price,
        image: 'imageee',
        //catatgoryID: 1,
        average_rating: 0,
        description: req.body.description,
        exclusive: false,
        published: false
    };
    productModel.update(product, function(success) {
        if (success) {
            res.redirect('/seller');
        } else {
            res.redirect('/seller/addProduct');
            /*res.redirect("/editProduct/edit/" + req.params.product_id);*/
        }
    });
});
//edit product endddddddddd


//add coupon 
router.get('/addCoupon', (req, res) => {
    res.render('seller/addCoupon');
});

router.post('/addCoupon', (req, res) => {
    var coupon = {
        user_id: req.session.uId,
        //product_id: 55,
        coupon_code: req.body.coupon_code,
        percentage: req.body.percentage
    };

    productModel.insertCoupon(coupon, function(success) {
        if (success) {
            sellerModel.get(req.session.uId, function(result) {
                if (result.length > 0) {
                    res.render('seller/index', result[0]);
                }
            });

        } else {

            res.render('/seller/addProduct');
        }
    });
});
//add coupon endddddddddd


//product Review
router.get('/reviewProduct', (req, res) => {
    productModel.getAll(req.session.uId, function(results) {
        if (results.length > 0) {
            var product = {
                productList: results
            };
            res.render('seller/reviewProduct', product);
        } else {

        }
    });
});

router.get('/reviewProduct/review/:product_id', (req, res) => {
    productModel.getAllReview(req.params.product_id, function(results) {
        if (results.length > 0) {
            var product = {
                productList: results
            };
            res.render('seller/reviewProductDetails', product);
        } else {
            res.render('seller/reviewProductDetails', product);
        }
    });
});

//product Review endeeeeeeeeeeeeeeeeeee



//publish product
router.get('/publishedProduct', (req, res) => {
    productModel.getAllpublished(req.session.uId, function(results) {
        if (results.length > 0) {
            var product = {
                productList: results
            };
            res.render('seller/publishedProduct', product);
        }
    });
});

router.get('/publishedProduct/unpublish/:product_id', (req, res) => {
    productModel.get(req.params.product_id, function(result) {
        if (result.length > 0) {
            res.render('seller/unpublish', result[0]);
        }
    });
});

router.post('/publishedProduct/unpublish/:product_id', (req, res) => {
    productModel.updateunpublish(req.params.product_id, function(success) {
        if (success) {
            res.redirect('/seller');
        } else {
            res.redirect("/publishedProduct/unpublish/" + req.params.product_id);
        }
    });
});

//Publish product endddddddddd


//UNNNpublish product
router.get('/unpublishedProduct', (req, res) => {
    productModel.getAllUnpublished(req.session.uId, function(results) {
        if (results.length > 0) {
            var product = {
                productList: results
            };
            res.render('seller/unpublishedProduct', product);
        }
    });
});

router.get('/unpublishedProduct/publish/:product_id', (req, res) => {
    productModel.get(req.params.product_id, function(result) {
        if (result.length > 0) {
            res.render('seller/publish', result[0]);
        }
    });
});

router.post('/unpublishedProduct/publish/:product_id', (req, res) => {
    productModel.updatePublish(req.params.product_id, function(success) {
        if (success) {
            res.redirect('/seller');
        } else {
            res.redirect("/unpublishedProduct/publish/" + req.params.product_id);
        }
    });
});

//UNNNPublish product endddddddddd





router.get('/detailProduct/:product_id', (req, res) => {
    productModel.get(req.params.product_id, function(result) {
        if (result.length > 0) {
            res.render('seller/detailProduct', result[0]);
        }
    });
});















module.exports = router;