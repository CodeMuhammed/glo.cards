#!/usr/bin/env node

var express = require('express');
var path = require('path');
var app = express();
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var cors  = require('cors');

app.use(cors({credentials: true, origin: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

var port = process.env.PORT || 5000;

//configure express static
app.use(express.static(path.join(__dirname , 'public')));

//choose the version of taskcoin api url based on the environment
app.use('/taskcoinapi' , function(req , res){
	    var baseUrl =  process.NODE_ENV == 'production'? 'https://taskcoin-demo.herokuapp.com' : 'http://localhost:5001';
			res.status(200).send({
				  api: baseUrl+'/js/vendors/taskcoin.js',
				  logo: baseUrl+'/img/logo.png'
			});
});

//Start the main Express server
app.listen(port, function() {
    console.log("Listening on " + port);
});
