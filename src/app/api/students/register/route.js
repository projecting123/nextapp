import mailer from "@/components/mailer";
import connect from "@/libs/dbConnection";
import Student from "@/model/studentModel";
import bcryptjs, { hash } from "bcryptjs";

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();
    await connect();

    // hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const isExistUser = await Student.where("email").equals(email);
    if (isExistUser.length > 0) {
      return Response.json({ message: "Email already exist", status: "error" });
    }

    await Student.create({name: name, email: email, password: hashedPassword})
    const res = await mailer(email, 'registration');
    return Response.json({ message: "Registration successful", status: "success" });
  } catch (error) {
    return Response.json({ message: "Login failed" });
  }
}
