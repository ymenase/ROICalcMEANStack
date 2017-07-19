
/**
 * Module dependencies
 */

 //Import the mongoose module
 var mongoose = require('mongoose')
 //Set up default mongoose connection
 var mongoDB = 'mongodb://localhost/test';
 mongoose.connect(mongoDB);
 //Get the default connection
 var db = mongoose.connection;

 //Bind connection to error event (to get notification of connection errors)
 db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Define Schema
var Schema = mongoose.Schema;

var accountingSchema = new Schema({

  revenue: {
    name : String,
    oneTimePmt: Number,
    monthlyPmt: Number
  },

  expenses: {
    name: String,
    oneTimePmt: Number,
    monthlyPmt: Number
  }

})

//Compile model from Schema
var accountingModel = mongoose.model('accountingModel', accountingSchema);

var testInstance = new accountingModel({
  revenue: {
    name: 'groceries',
    oneTimePmt: 500,
    monthlyPmt: 20
  }
});

testInstance.save(function (err) {
  if (err) return handleError(err);
  // saved!
});

var testInstance2 = new accountingModel({
  revenue: {
    name: 'poo',
    oneTimePmt: 50,
    monthlyPmt: 0
  }
});

testInstance2.save(function (err) {
  if (err) return handleError(err);
  // saved!
});



var testPrint = accountingModel.find({"revenue" : {"name" : "poo", "oneTimePmt" : "50", "monthlyPmt" : "0"} }, "revenue.name", function (err, athletes) {
  if (err) return handleError(err);
  // 'athletes' contains the list of athletes that match the criteria.
});

console.log("********************************\n**************\n" + testPrint);




var express = require('express'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  errorHandler = require('express-error-handler'),
  morgan = require('morgan'),
  routes = require('./routes'),
  api = require('./routes/api'),
  http = require('http'),
  path = require('path');

var app = module.exports = express();


/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

var env = process.env.NODE_ENV || 'development';

// development only
if (env === 'development') {
  app.use(errorHandler());
}

// production only
if (env === 'production') {
  // TODO
}


/**
 * Routes
 */

// serve index and view partials
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

// JSON API
app.get('/api/name', api.name);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);


/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
