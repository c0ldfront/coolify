import * as nodemailer from 'nodemailer'

var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "myemailid@gmail.com",
        pass: "randompassword"
    }
 });

var mailOptions = {
    to: "testuseremail@gmail.com",
    subject: "This is a test email from a developer",
    html: "<h1>Welcome to my website</h1>"
}

smtpTransport.sendMail(mailOptions, function (error, response) {
    if (error) {
        console.log(error);
    } else {
        console.log("Message sent: " , response);
    }
})

// import smtp settings for gmail it might be different oauth2 is required now...

function sendEmail(sendTo, subject, emailTemplate) {
    varmailOptions = {

    }
}