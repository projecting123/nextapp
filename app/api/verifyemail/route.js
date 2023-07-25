import { connect } from "@/dbconfig/db";
import User from "@/model/model";
import { NextResponse } from "next/server";

connect()


export async function POST(request){
    const reqBody = await request.json()
    const {token} =  reqBody
    const user = await User.findOne({ verifyToken: token});
    if(!user){
        return NextResponse.json({message: "User not found", status: 404})
    }
    const dateString = new Date(user.verifyTokenExpiry)
    const milliseconds = Date.parse(dateString);

    if(milliseconds > Date.now()){
        return NextResponse.json({message: 'Token has expired', status: 404})
    }

    user.isvalid = true
    user.verifyToken = undefined
    user.verifyTokenExpiry = undefined
    await user.save()
    return NextResponse.json({message: 'Email is verified.', status: 201})
}