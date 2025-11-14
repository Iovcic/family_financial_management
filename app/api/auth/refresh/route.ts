import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { setAuthCookies } from '../../middleware/auth';
import { fetchData } from '@/app/_api';

export async function POST(req) {
    try {
        const cookieStore = await cookies();
        const refreshToken = cookieStore.get('refreshToken')?.value;

        if (!refreshToken) {
            return NextResponse.json(
                { message: 'No refresh token' },
                { status: 401 }
            );
        }

        const res = await fetchData(`/refresh`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken }),
        });

        const data = await res.json();

        if (!res.ok) {
            return NextResponse.json(data, { status: res.status });
        }

        // Set new tokens
        await setAuthCookies(data.accessToken, data.refreshToken);

        return NextResponse.json({ message: 'Token refreshed' });
    } catch (err) {
        return NextResponse.json(
            { message: 'Token refresh failed', error: err.message },
            { status: 500 }
        );
    }
}