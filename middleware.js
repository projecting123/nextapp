import { NextResponse } from 'next/server'


export function middleware(request) {
    const pathname = request.nextUrl.pathname
    const jwtToken = request.cookies.get('token')?.value || ''
    const isPublicPath = pathname == "/" || pathname == "/signup" || pathname == "/login"
    if (isPublicPath && jwtToken) {
        return NextResponse.redirect(new URL('/profile', request.nextUrl))
    }

    if (pathname == "/profile" && !jwtToken) {
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }
}

export const config = {
    matcher: ['/', '/signup', '/login', '/profile', '/verifyemail'],
}