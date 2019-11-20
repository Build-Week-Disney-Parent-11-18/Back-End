// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
let msg = {
  to: 'kidrickjamea@yahoo.com',
  from: 'meakidrick@gmail.com',
  subject: 'Email from sendEmail.js',
  text: `It's Working!!! TEST3`,
  html: `<strong>It's Working!!!TEST2</strong>`,
};

module.exports = msg;

// +12056192253
