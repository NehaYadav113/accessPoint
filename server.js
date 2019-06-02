const express=require('express');
const bodyParser=require('body-parser');
const {ObjectID}=require('mongodb');
const {mongoose}=require('./db/mongoose.js');
const mailRoutes = require('./routes/mail');
const {Url}=require('./constants/stringConstants.js');
const path = require('path');


const port=process.env.PORT || Url.BASE_URL;

var app=express();

app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');

//db connection
var db = mongoose.connection;

db.once('open', function(){
	console.log('connected');
});

app.use(bodyParser.json());


//routes
app.use('/', mailRoutes);

app.listen(port,()=>{
	console.log(`Started on port ${port}`);
});
module.exports={
	app
}