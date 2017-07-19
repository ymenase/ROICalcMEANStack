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
