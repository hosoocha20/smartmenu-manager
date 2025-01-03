import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { headers, cookies } from 'next/headers';

export function middleware(request: NextRequest){
    console.log('runinghi')
    console.log("Cookies in request:", request.cookies.getAll());
    //const token = request.headers.get('Cookie');
    
    const header = request.headers.get('cookie');
    console.log("Cookie header: ", header);
    const token = header?.split(" ")[1]
    console.log("Token: ", token)
    //const token = request.cookies.get('auth_token')?.value;
    // if (!token) {
    //     console.log("No token found");
        
    // }

    // console.log("Token:", token);
    // console.log(cookies().get('auth_token'))

    // const user = ''

    // if (!user){
    //     if (request.nextUrl.pathname.startsWith('/user')) {
    //         return NextResponse.redirect(
    //             new URL('/', request.url)
    //         )
    //     }

    // }
    // if (request.nextUrl.pathname.startsWith('/login')) {
    //     if (user)
    //         return NextResponse.redirect(new URL('/user/dashboard', request.url));
    //   }
    
    return NextResponse.next()
}

export const config = {
    matcher: ['/user/:path*', '/login']
}