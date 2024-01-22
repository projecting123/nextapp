import connect from "@/libs/dbConnection";
import Student from "@/model/studentModel";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
export async function GET() {
  const token = cookies().get("token").value;
  try {
    await connect();
    const payloadData = jwt.verify(token, process.env.JWT_SECRET);
    const student = await Student.findOne({ _id: payloadData.id });
    return Response.json({ message: "success", data: student }, { status: 200 });
  } catch (error) {
    return Response.json({message: 'Some error occurred'}, {status: 500})
  }
}
