import { NextResponse } from 'next/server';
import { setAuthCookies } from '../../middleware/auth';
import { fetchData } from '@/app/_api';

export async function POST(req) {
    const { email, password } = await req.json();

    try {
        const res = await fetchData(`/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });



        // Set httpOnly cookies (secure)
        await setAuthCookies(res.accessToken, res.refreshToken);

        // Return user info (no tokens in response)
        const response = NextResponse.json({
            message: 'Login successful',
            userId: res.userId,
            role: res.role,
        });



        return response;
    } catch (err) {
        console.log('res', err)
        return NextResponse.json(
            { message: 'Login failed', error: err.message },
            { status: 500 }
        );
    }
}