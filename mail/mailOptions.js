var ejs = require("ejs");
var Promise = require('promise');
var path = require('path');
var config = require('../config/config.js');
var exports = module.exports = {};


// coupon code mail options
exports.couponMailOptions = function(ToSend, ToSendName, coupon, language) {
    return new Promise (function(resolve,reject){
        const {CouponContent} = require('./../constants/'+language);
        var couponMail = path.join(process.cwd(),'views','couponMail.ejs');
        console.log(couponMail);
            ejs.renderFile(couponMail, {
                "name": ToSendName,
                "code": coupon.code,
                "usedBy": coupon.expiry_date,
                "discount": coupon.discount,
                content: CouponContent
            }, function (err, data) {
                if (err) {
                    console.log(err);
                    reject(err);
                } else 
                    {
                        console.log("------------------------------------in coupon mail options--------------------");
                        console.log(config.sendAddr);
                        console.log(ToSend);
                        resolve({
                            from: config.sendAddr, // sender address
                            to: ToSend,// list of receivers
                            subject: 'Coupon Code', // Subject line
                            text: 'Hello world?', // plain text body
                            html:  data // html body
                        });
                    };
            });
        })
};

//order details mail options
exports.orderDetMailOptions = function(ToSend, ToSendName, order, language) {
    return new Promise (function(resolve,reject){
                 var address; //order delivery address
                 const {OrderDetailContent} = require('./../constants/'+language);
                if(order.del_mode == "access_points"){
                    address = order.access_pt_address.address;
                }
                else{
                    address = order.address.h_no+" "+order.address.street+" "+order.address.city+" "+order.address.state;
                }
                ejs.renderFile('views/orderMail.ejs', {
                    "name": ToSendName,
                    "orderId": order._id,
                     "price": order.price,
                     "delDate": order.del_date,
                     "delMode": order.del_mode,
                     "delAddress": address,
                      content: OrderDetailContent
                 }, function (err, data){
                       if (err) {
                            console.log(err);
                            reject(err);
                        } else 
                            {
                                console.log("------------------------------------in coupon mail options--------------------");
                                console.log(config.sendAddr);
                                console.log(ToSend);
                                resolve({
                                    from: config.sendAddr, // sender address
                                    to: ToSend,// list of receivers
                                    subject: 'OrderDetails', // Subject line
                                    text: 'Hello world?', // plain text body
                                    html:  data // html body
                                });
                            };
                      });
         })
};
