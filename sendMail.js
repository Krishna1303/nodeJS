const dotenv = require('dotenv');

dotenv.config();

var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.EMAIL_PASSWORD
  }
});

const sendMail = async (data)=>{
    var mailOptions = {
        from: process.env.EMAIL_ID,
        to: data.email,
        subject: data.subject,
        text: data.text
      };
    return transporter.sendMail(mailOptions);
}
module.exports = sendMail;