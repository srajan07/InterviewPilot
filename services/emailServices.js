const transporter=require("../config/nodemailer");
async function sendOtpEmail(email,otp){
   const mailOptions= {
        from:process.env.EMAIL_USER,
        to:email,
        subject:"Reset password otp",
        text:`Your otp is ${otp} .It is valid for 5mintues`
    }
  await  transporter.sendMail(mailOptions);
}
module.exports=sendOtpEmail;