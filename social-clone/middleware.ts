import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const isAuth = request.cookies.get('socialAppToken')
  const { pathname } = request.nextUrl;
  if (pathname === '/' && isAuth) {
    const redirectTo = new URL('/home', request.nextUrl.origin);
    return NextResponse.redirect(redirectTo.toString());
  }

  else if (pathname === '/' && !isAuth) {
    const redirectTo = new URL('/signup', request.nextUrl.origin);
    return NextResponse.redirect(redirectTo.toString());
  }

  else if (isAuth) {
    const redirectTo = new URL('/home', request.nextUrl.origin);
    return NextResponse.redirect(redirectTo.toString());
  }

  return undefined;
}

export const config = {
  matcher: ['/login', '/signup', '/'],
};
