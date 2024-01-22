import { cookies } from 'next/headers';
export function middleware(request) {
  const cookiesStore = cookies()
  const token = cookiesStore.get('token')
  const pathname = request.nextUrl.pathname
  const isPublicPath = pathname === '/register' || pathname === '/login'
  const isPrivatePath = pathname === '/dashboard' || pathname === '/logout'
  if(isPublicPath && token?.value){
    return Response.redirect(new URL('/dashboard', request.url))
  }
  else if(isPrivatePath && !token?.value){
    return Response.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: [
    '/',
    '/about',
    '/login',
    '/register',
    '/dashboard',
    '/logout'
  ]
}