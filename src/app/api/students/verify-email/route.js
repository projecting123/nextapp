import connect from "@/libs/dbConnection";
import Student from "@/model/studentModel";

export async function POST(request) {
  try {
    const {token} = await request.json();
    await connect();
    const student = await Student.where("verifyToken").equals(token);
    if (student.length > 0) {
      if(Date.now() > student[0].verifyTokenExpiry) {
        return Response.json({ message: 'Verification link expired.', status: 'error'});
      }
      await Student.updateOne({ _id: student[0]._id }, { isVerified: true });
      return Response.json({ message: 'Email verified successfully.', status: 'success'});;
    }
    return Response.json({ message: 'Invalid verification link.', status: 'error'});
  } catch (error) {
    return Response.json({ message: 'Something went wrong.', status: 'error'});
  }
}
