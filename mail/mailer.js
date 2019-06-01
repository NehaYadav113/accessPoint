'use strict';
const nodemailer = require('nodemailer');
//Include config
var config = require('../config/config.js');

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
var mail_handler = ((mailOptions) => {
    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.username,
    pass: config.password
  }
});

    // setup email data with unicode symbol
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, response) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', response.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl());

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
});

module.exports = mail_handler;