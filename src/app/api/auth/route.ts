import { NextResponse, NextRequest } from "next/server";

export async function POST(request : NextRequest) {

    const { email, password } = await request.json();

    let response = await fetch('', {
        method: "POST",
        body: JSON.stringify({
            email: email,
            password: password
        }),
        headers: {
            'Content-type': 'application/json'
        }
    })

    response = await response.json()
    return NextResponse.json(response)
}