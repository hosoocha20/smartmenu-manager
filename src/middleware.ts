import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest){
    console.log('runinghi')
    const user = ''

    if (!user){
        if (request.nextUrl.pathname.startsWith('/user')) {
            return NextResponse.redirect(
                new URL('/', request.url)
            )
        }

    }
    if (request.nextUrl.pathname.startsWith('/login')) {
        if (user)
            return NextResponse.redirect(new URL('/user/dashboard', request.url));
      }

    return NextResponse.next()
}

export const config = {
    matcher: ['/user/:path*', '/login']
}