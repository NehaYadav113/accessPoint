const mongoose=require('mongoose');
//Include config
const config = require('../config/config.js');

//Database connection
//console.log(config.username);
 mongoose.connect(config.mongoURI, { useNewUrlParser: true });

module.exports={
	mongoose
};