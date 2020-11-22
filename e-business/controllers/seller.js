var express = require('express');
var adminModel = require.main.require('./model/adminModel');
var sellerModel = require.main.require('./model/sellerModel');
var productModel = require.main.require('./model/productModel');
var router = express.Router();


/*

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
});*/

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


//*todo: add product 
router.get('/addProduct', (req, res) => {
    sellerModel.getCatagory(function(result) {
        if (result.length > 0) {
            var product = {
                productList: result
            };
            res.render('seller/addProduct', product);
        }
    });
});

router.post('/addProduct', (req, res) => {
    var product = {
        user_id: req.session.uId,
        //product_id: 55,
        product_name: req.body.name,
        quantity: req.body.quantity,
        price: req.body.price,
        image: "/pictures/" + res.req.file.filename,
        catatgoryID: req.body.catagory,
        average_rating: 0,
        description: req.body.description,
        exclusive: req.body.exclusive,
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
            res.render('seller/deleteProduct');
        }
    });
});

//*todo: add product endddddddddd


//*todo: delete product

router.get('/deleteProduct', (req, res) => {
    productModel.getAll(req.session.uId, function(results) {
        if (results.length > 0) {
            var product = {
                productList: results
            };
            res.render('seller/productList', product);
        } else {
            sellerModel.get(req.session.uId, function(result) {
                if (result.length > 0) {
                    res.render('seller/index', result[0]);
                }
            });
        }

    });
});

router.get('/editProduct/delete/:product_id', (req, res) => {
    productModel.get(req.params.product_id, function(result) {
        if (result.length > 0) {
            res.render('seller/deleteProduct', result[0]);
        } else {
            sellerModel.get(req.session.uId, function(result) {
                if (result.length > 0) {
                    res.render('seller/index', result[0]);
                }
            });
        }
    });
});

router.post('/editProduct/delete/:product_id', (req, res) => {
    productModel.delete(req.params.product_id, function(success) {
        if (success) {
            sellerModel.get(req.session.uId, function(result) {
                if (result.length > 0) {
                    res.render('seller/index', result[0]);
                }
            });
        } else {
            res.redirect("/editProduct/delete/" + req.params.product_id);
        }
    });
});

//*todo: delete product endddddddddd


//*todo: edit product

router.get('/editProduct', (req, res) => {
    productModel.getAll(req.session.uId, function(results) {
        if (results.length > 0) {
            var product = {
                productList: results
            };
            res.render('seller/productList2', product);
        } else {
            sellerModel.get(req.session.uId, function(result) {
                if (result.length > 0) {
                    res.render('seller/index', result[0]);
                }
            });
        }
    });
});

router.get('/editProduct/edit/:product_id', (req, res) => {
    productModel.get(req.params.product_id, function(result) {
        if (result.length > 0) {
            res.render('seller/editProductDetails', result[0]);
        } else {
            sellerModel.get(req.session.uId, function(result) {
                if (result.length > 0) {
                    res.render('seller/index', result[0]);
                }
            });
        }
    });
});

router.post('/editProduct/edit/:product_id', (req, res) => {
    var jj;
    if (res.req.file.filename == '') {
        jj = '';
    } else {
        jj = "/pictures/" + res.req.file.filename;
    }
    var product = {
        user_id: req.session.uId,
        product_id: req.params.product_id,
        product_name: req.body.name,
        quantity: req.body.quantity,
        price: req.body.price,
        image: jj,
        average_rating: 0,
        description: req.body.description,
        exclusive: true,
        published: false
    };
    console.log('*********************');
    console.log(product.exclusive);
    productModel.update(product, function(success) {
        if (success) {
            res.redirect('/seller');
        } else {
            res.redirect('/seller/addProduct');
            /*res.redirect("/editProduct/edit/" + req.params.product_id);*/
        }
    });
});

//*todo: edit product endddddddddd


//*todo: add coupon

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

//*todo: add coupon endddddddddd


//*todo: product Review

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
            productModel.getAll(req.session.uId, function(results) {
                if (results.length > 0) {
                    var product = {
                        productList: results
                    };
                    res.render('seller/reviewProduct', product);
                } else {

                }
            });
        }
    });
});

//*todo: product Review endeeeeeeeee


//*todo: publish product
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

//*todo: Publish product endddddd


//*todo: UNNNpublish product

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

// *todo: UNNNPublish product enddddddd


// *todo: Product Details

router.get('/detailProduct/:product_id', (req, res) => {
    productModel.get(req.params.product_id, function(result) {
        if (result.length > 0) {
            res.render('seller/detailProduct', result[0]);
        }
    });
});

// *todo: Product Details enddddd


// *todo: pending orders

router.get('/pendingOrders', (req, res) => {
    productModel.getAllPendingOrders(req.session.uId, function(results) {
        if (results.length > 0) {
            var product = {
                productList: results
            };
            res.render('seller/pendingOrders', product);
        } else {
            sellerModel.get(req.session.uId, function(result) {
                if (result.length > 0) {
                    res.render('seller/index', result[0]);
                }
            });
        }
    });
});

router.get('/pendingOrders/deliverd/:order_id', (req, res) => {
    productModel.getOrder(req.params.order_id, function(result) {
        if (result.length > 0) {
            req.session.p_id = result[0].product_id;
            req.session.quan = result[0].quantity;
            res.render('seller/deliverdProduct', result[0]);
        }
    });
});

router.post('/pendingOrders/deliverd/:order_id', (req, res) => {
    var pr = {
        p_id: req.session.p_id,
        q_id: req.session.quan
    };

    productModel.updatePendingOrders(req.params.order_id, function(success) {
        if (success) {

            productModel.updatePendingOrdersQuantity(pr, function(success) {
                if (success) {
                    res.redirect('/seller');
                } else {
                    res.redirect("/editProduct/delete/" + req.params.product_id);
                }
            });
        } else {
            res.redirect("/editProduct/delete/" + req.params.product_id);
        }
    });
});

// *todo: pending orders enddddddd


// *todo: cancel orders

router.get('/pendingOrders/cancel/:order_id', (req, res) => {
    productModel.getOrder(req.params.order_id, function(result) {
        if (result.length > 0) {
            res.render('seller/cancelProductOrder', result[0]);
        }
    });
});

router.post('/pendingOrders/cancel/:order_id', (req, res) => {
    productModel.cancelOrders(req.params.order_id, function(success) {
        if (success) {
            res.redirect('/seller');
        } else {
            res.redirect("/editProduct/delete/" + req.params.product_id);
        }
    });
});

// *todo: pending orders enddddd


// *todo: deliverd orders

router.get('/deliverdOrders', (req, res) => {
    productModel.getAllDeliverdOrders(req.session.uId, function(results) {
        if (results.length > 0) {
            var product = {
                productList: results
            };
            res.render('seller/deliverdOrders', product);
        }
    });
});

// *todo: deliverd orders enddddddd





//*todo: report customer

router.get('/reportCustomer', (req, res) => {
    productModel.getAllOrders(req.session.uId, function(results) {
        if (results.length > 0) {
            var product = {
                productList: results
            };
            res.render('seller/reportCustomer', product);
        }
    });
});

router.get('/reportCustomer/report/:customer_id', (req, res) => {
    productModel.getCustomer(req.params.customer_id, function(result) {
        if (result.length > 0) {
            res.render('seller/reportCustomerDetails', result[0]);
        }
    });
});


router.post('/reportCustomer/report/:customer_id', (req, res) => {
    var rp = {
        seller: req.session.uId,
        customer: req.params.customer_id,
        msg: req.body.report
    };


    sellerModel.getUser3(req.params.customer_id, function(result) {
        if (result.length > 0) {
            rp.customer = result[0].user_id;

            productModel.reportCustomer(rp, function(success) {
                if (success) {
                    res.redirect('/seller');
                } else {
                    res.redirect("/editProduct/delete/" + req.params.product_id);
                }
            });

        } else {

            res.redirect('/login');
        }
    });



});


//*todo: report customer endddddddddd


//*todo: add coupon

router.get('/addCatagory', (req, res) => {
    res.render('seller/addCatagory');
});

router.post('/addCatagory', (req, res) => {
    var coupon = {
        user_id: req.session.uId,
        //product_id: 55,
        coupon_code: req.body.catagory_name

    };
    productModel.insertCatagory(coupon, function(success) {
        if (success) {
            sellerModel.get(req.session.uId, function(result) {
                if (result.length > 0) {
                    res.render('seller/index', result[0]);
                }
            });

        } else {
            console.log("***********");
            console.log(coupon.coupon_code);
            res.render('seller/addCatagory');

        }
    });
});

//*todo: add coupon endddddddddd



















































module.exports = router;