import User from "@/model/model";
import { connect } from "@/dbconfig/db";
import bcryptjs from 'bcryptjs'
import nodemailer from 'nodemailer'

connect()


export async function Mail({userId, email, emailType}){

    const hashedToken = await bcryptjs.hash(userId.toString(), 10)
    if(emailType == "VERIFY"){
        await User.findByIdAndUpdate(userId, {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 10000})
    }

    if(emailType == "FORGOT_PASSWORD_VERIFY"){
        await User.findByIdAndUpdate(userId, {forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 10000})
    }

    const transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS
        }
    });


    const mailInfo = {
        from: "dekalasit@gmail.com",
        to: email,
        subject: emailType == "VERIFY" ? "Verification mail from OurHouse" : "Reset Password email from OurHouse",
        html: `<p>Click <a href="${process.env.DOMAIN}/${emailType == "VERIFY" ? "verifyemail" : "resetemailverify"}?token=${hashedToken}">here</a> to ${emailType == "VERIFY" ? "verify your email" : "reset your password"}.</p>`
    }

    const mailresponse = await transporter.sendMail(mailInfo)
    return mailresponse
}