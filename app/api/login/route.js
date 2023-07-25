import { connect } from "@/dbconfig/db";
import User from "@/model/model";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
connect();

export async function POST(request) {
    const reqBody = await request.json()
    const{email, password} = reqBody
    const user = await User.findOne({email: email})
    if(!user){
        return NextResponse.json({message: "User not exist.", status: 404})
    }
    if(password !== user.password){
        return NextResponse.json({message: 'Password is wrong', status: 404})
    }

    const tokenData = {
        id: user._id,
        name: user.name,
        email: user.email
    }
    const jwtToken = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {expiresIn: '1d'})
    const res = NextResponse.json({message: 'Login successfull', status: 200})
    res.cookies.set('token', jwtToken, {httpOnly: true})
    return res
}