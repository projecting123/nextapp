import { connect } from "@/dbconfig/db";
import User from "@/model/model";
import { NextResponse } from "next/server";

connect()


export async function POST(request){
    const reqBody = await request.json()
    const {token} =  reqBody
    const user = await User.findOne({ verifyToken: token})
    if(!user){
        return NextResponse.json({message: "User not found", type: "not-found"});
    }

    if(new Date(user.verifyTokenExpiry).getTime() > Date.now()){
        return NextResponse.json({message: 'Token has expired', type: "expired"});
    }

    user.isvalid = true
    user.verifyToken = undefined
    user.verifyTokenExpiry = undefined
    await user.save()
    return NextResponse.json({message: 'Email is verified.', status: 201})
}