var express = require('express');
var bodyParser = require('body-parser');
var exSession = require('express-session');
var path = require('path');
var multer = require('multer');
var cookieParser = require('cookie-parser');

var login = require('./controllers/login');



var seller = require('./controllers/seller');

var app = express();
var port = 3000;

//configuration
app.set('view engine', 'ejs');


//middleware
/*---------------------------------------*/


app.use('/login', login);


app.use('/seller', seller);


app.use('/', express.static('asset'));
/*app.use('/pictures', express.static('images'));*/


//router
/**---------------------------------------------- */


app.get('/setCookie', (req, res) => {
    res.cookie('cookie1', 'first cookie');
    res.send("done");
});

app.get('/viewCookie', (req, res) => {
    res.send(req.cookies['cookie1']);
});

app.get('/rmCookie', (req, res) => {
    res.clearCookie('cookie1');
    res.send('Done');
});


//server stratup
app.listen(port, (error) => {
    console.log('server started at ' + port);
});