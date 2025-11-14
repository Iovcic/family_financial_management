import { NextResponse } from 'next/server';
import { clearAuthCookies, getAccessToken } from '../../middleware/auth';
import { fetchData } from '@/app/_api';

export async function POST(req) {
    try {
        const token = await getAccessToken();

        // Notify backend to revoke token
        if (token) {
            await fetchData(`/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
        }

        // Clear cookies
        await clearAuthCookies();

        return NextResponse.json({ message: 'Logged out successfully' });
    } catch (err) {
        return NextResponse.json(
            { message: 'Logout failed', error: err.message },
            { status: 500 }
        );
    }
}