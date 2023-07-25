import { connect } from "@/dbconfig/db";
import User from "@/model/model";
import { NextRequest, NextResponse } from "next/server";
import { Mail } from "@/mail/mail";
connect();

export async function POST(request) {
    const reqBody = await request.json()
    const{name, email, password, cpass} = reqBody
    const user = await User.findOne({email: email})
    if(user){
        return NextResponse.json({message: "User already exist.", status: 404})
    }

    try {
        const newUser = await User.create({name, email, password, cpass})
        await Mail({userId: newUser._id, email: email, emailType: "VERIFY"})
        return NextResponse.json({message: "Registration successfull.", status: 201, newUser})
    } catch (error) {
        return NextResponse.json({message: "Something went wrong", status: 404, error: error})
    }
    
}