require('dotenv').config();
const nodemailer = require("nodemailer");

let sendOtpEmail = async ({email, otp}) => {
    // create  transporter
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_APP, // generated ethereal user
          pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Football shop" <ngovanlan47@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "Thông tin xác thực email", // Subject line
      //text: getBodyHTMLEmail(dataSend)// plain text body
      html: getBodyHTMLEmail(otp)
        // ,
    });
  }

let getBodyHTMLEmail = (otp) => {
    let result = 
        `
        <h3>Mã xác thực email: Chỉ sử dụng một lần!</h3>
        <p>Bạn nhận được email này vì bạn đã đăng lý tài khoản tại Football shop</p>
        <p>Vui lòng nhập mã sau để xác minh</p>
        <div><b>${otp}</b></div>
    
        <div>Nếu bạn không yêu cầu thay đổi này, vui lòng thay đổi mật khẩu hoặc sử dụng tính năng trò chuyện trong giao diện người dùng Atlas để liên hệ với chúng tôi.</div>
        <div>Xin chân thành cảm ơn!</div>
        `
    return result
  }

module.exports = {
    sendOtpEmail
}