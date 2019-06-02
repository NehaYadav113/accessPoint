const express=require('express');
let router = express.Router();
const {ObjectID}=require('mongodb');
const {Order}=require('./../models/order.js');
const {Coupon} = require('./../models/coupon.js');
const {User}=require('./../models/user.js');
const mailer = require('./../mail/mailer');
const mailOptions = require('./../mail/mailOptions');

//post user
router.post('/user',(req,res)=>{
	console.log(req.body);
	var user=new User({
		u_name: req.body.u_name,
		email: req.body.email,
		password: req.body.password,
		address: req.body.address,
		dob: req.body.dob,
		gender: req.body.gender,
		address: req.body.address
		});
	user.save(function(err, usr){
		if(err){
			res.json({"status": "failure"});
		}else{
			res.json({"status": "success"});
		}
	});

});

//post order
router.post('/order',(req,res)=>{
	console.log(req.body);
	var order=new Order({
		size: req.body.size,
		price: req.body.price,
		category_id: req.body.category_id,
		product_id: req.body.product_id,
		del_date: req.body.del_date,
		weight: req.body.weight,
		user_id: req.body.user_id,
		address: req.body.address,
		del_mode: req.body.del_mode,
		access_pt_address: req.body.access_pt_address
	});
	order.save(function(err, order){
		if(err){
			res.json({"status": err});
		}else{
			res.json({"order": order});
		}
	});
});

//sendmail

// coupon code mail
router.post('/sendCouponMail',(req,res)=>{
	var couponCode = req.body.code;
	var email = req.body.email;
	var name = req.body.name;
	var userEmail;
	console.log(req.body);
	//find coupon & target user
	Coupon.findOne({
		code : couponCode
	})
	.then((coupon)=>{
		console.log(coupon);
		mailOptions.couponMailOptions(email, name, coupon).then((options)=>{
				console.log("------------in post route-------------------")
				console.log(options);
				//mailer
				mailer(options);
						res.json({
							"status": "success",
						});
			});
	}).catch((e)=>{
		console.log(e);
		res.json({
			"status": "failure",
			"error": e
		});
	});	
});

//mail when new order created
router.post('/OrderDetMail',(req,res)=>{
	var orderId = req.body._id;
    console.log(orderId);
	var order ;
	Order.findOne({
		_id: orderId
	})
	.then((res)=>{
		//console.log(res);
		order = res;
		console.log(order);
		 var userId = res.user_id
		 return User.findOne({
		 	_id: userId
		})
	})
	.then((user)=>{
		var name = user.u_name;
		var email = user.email;
		mailOptions.orderDetMailOptions(email, name, order).then((options)=>{
				console.log("------------in post route-------------------")
				console.log(options);
				//mailer
				mailer(options);
						res.json({
							"status": "success",
						});
			});
	})
	.catch((e)=>{
		res.json({
			"status": "failure",
			"error":e
		});
	});	
});

module.exports = router;