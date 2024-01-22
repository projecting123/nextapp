import connect from "@/libs/dbConnection";
import Student from "@/model/studentModel";

export async function POST(request) {
  const { email, type } = await request.json();

  try {
    await connect();
    const isExistStudent = await Student.where("email").equals(email);
    if (type == "registration") {
      if (isExistStudent.length > 0) {
        return Response.json({
          message: "Email already exist",
          status: "error",
        });
      }
      return Response.json({
        message: "Email is available",
        status: "success",
      });
    }

    else if(type == "login"){
        if(isExistStudent.length == 0){
            return Response.json({message: "Email is not exist.", status: 'error'})
        }
        return Response.json({message: "Email is available", status:'success'})
    }
  } catch (error) {
    return new Response({ message: "Login failed" });
  }
}
