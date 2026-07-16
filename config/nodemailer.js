const nodemailer=require("nodemailer");
const transport=nodemailer.createTransport({
    service:"email",
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS,
        },
})
module.exports=transport;