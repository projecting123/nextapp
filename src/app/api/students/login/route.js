import connect from "@/libs/dbConnection";
import Student from "@/model/studentModel";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

export async function POST(request) {
  try {
    const formData = await request.json();
    await connect();
    const student = await Student.where("email").equals(formData.email);
    const isSuccess = await bcryptjs.compare(
      formData.password,
      student[0].password
    );

    if (!isSuccess) {
      return Response.json({message: "Password is incorrect", status: 'error'});
    }
    const jsonTokenData = {
      id: student[0]._id,
      name: student[0].name,
      email: student[0].email,
    };

    const token = jwt.sign(jsonTokenData, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const headers = new Headers({
      "Set-Cookie": `token=${token}; Path=/; httpOnly; SamSite=none`,
    });

    return Response.json(
      { message: "Login successful", status: 'success' },
      { headers: headers }
    );
  } catch (error) {
    return new Response({ message: "Login failed" });
  }
}
