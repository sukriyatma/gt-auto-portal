import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const cookie = request.cookies.has("next-auth.session-token") || request.cookies.has("__Secure-next-auth.session-token")
    
    if (!cookie && pathname !== '/auth/login') {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }
    
    if (cookie && pathname === '/auth/login') {
        return NextResponse.redirect(new URL('/monitoring', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/auth/login'],
};