import { NextRequest, NextResponse } from 'next/server'
import { getSession } from './features/accounts/actions'
 
// 1. Specify protected and public routes
const protectedRoutes = ['/people']
const publicRoutes = ['/account/login', '/about', '/', '/account/register']
 
export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)
 
  // 3. Decrypt the session from the cookie
  const session = await getSession()
  console.log("middleware sesion", session)
  const isLogin = session !== undefined && session.length > 0
  console.log("middleware is login", isLogin)
  
  // 4. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !isLogin) {
    return NextResponse.redirect(new URL('/account/login', req.nextUrl))
  }
 
  // 5. Redirect to /dashboard if the user is authenticated
  // if (
  //   isPublicRoute &&
  //   session?.userId &&
  //   !req.nextUrl.pathname.startsWith('/dashboard')
  // ) {
  //   return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
  // }
 
  return NextResponse.next()
}
 
// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}