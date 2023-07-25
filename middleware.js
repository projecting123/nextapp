import { NextResponse } from 'next/server'
 

export function middleware(request) {
    const pathname = request.nextUrl.pathname
    const isPublic = pathname === '/' || pathname === '/signup' || pathname === '/login'
    const jwtToken = request.cookies.get('token')?.value || ''
    if(isPublic && jwtToken){
        return NextResponse.redirect(new URL('/profile', request.nextUrl))
    }

    if(!isPublic && !jwtToken){
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }
}

export const config = {
  matcher: ['/', '/signup', '/login', '/profile'],
}