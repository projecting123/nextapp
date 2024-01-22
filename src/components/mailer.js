import nodemailer from "nodemailer";
import Student from "@/model/studentModel";
import bcrypt from "bcryptjs";
import connect from "@/libs/dbConnection";

export default async function mailer(email, emailType) {
  console.log(email, emailType);
  try {
    await connect()
    const student = await Student.where("email").equals(email);
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      },
    });

    const token = await bcrypt.hash(student[0]._id.toString(), 10);
    if (emailType == "registration") {
      await Student.updateOne(
        { _id: student[0]._id },
        {
          verifyToken: token,
          verifyTokenExpiry: Date.now() + 5 * 60 * 1000
        }
      );
    }

    if(emailType == 'forgot-password' || emailType =='reset-password'){
      const OTP = Math.floor(1000 + Math.random() * 9000);
      await Student.updateOne({ _id: student[0]._id }, { verifyOtp: OTP, verifyOtpExpiry: Date.now() + 5 * 60 * 1000})
    }
    const mailOptions = {
      from: "dekalasit@gmail.com",
      to: email,
      subject: `${
        emailType == "registration"
          ? "Activation Link for Registration"
          : "OTP for forgot password"
      }`,
      text: `Click on the link below to activate your account and it is acceptable for 1 minute only.`,
      html: `Hello ${student[0].name} ${
        emailType == "registration"
          ? `Click <a href="${process.env.DOMAIN}/reg-email-verify?token=${token}">here</a> to activate your account.`
          : emailType == "forgot-password" || emailType == "reset-password" && `Your OTP is ${student[0].verifyOtp}`
      }`,
    };

    await transport.sendMail(mailOptions);
    return Response.json({message: 'Email sent successfully', status:'success'});
  } catch (error) {
    return Response.json({
      message: "Some error occurred",
    });
  }
}
