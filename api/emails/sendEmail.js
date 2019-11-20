// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail');
var SENDGRID_API_KEY = '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';
sgMail.setApiKey(SENDGRID_API_KEY);
let msg = {
  to: 'kidrickjamea@yahoo.com',
  from: 'meakidrick@gmail.com',
  subject: 'Email from sendEmail.js',
  text: `It's Working!!! TEST3`,
  html: `<strong>It's Working!!!TEST2</strong>`,
};

module.exports = msg;
