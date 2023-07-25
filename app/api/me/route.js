import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function GET(request){
    try {
        const token = request.cookies.get('token');
        const data = jwt.verify(token.value, process.env.JWT_SECRET_KEY)
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({message: 'Invalid Token', status: 404})
    }
    
}