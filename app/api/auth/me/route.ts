import { NextResponse } from 'next/server';
import { getAccessToken } from '../../middleware/auth';
import { fetchData } from '@/app/_api';


export async function GET(req) {
    try {
        const token = await getAccessToken();

        if (!token) {
            return NextResponse.json(
                { message: 'Not authenticated' },
                { status: 401 }
            );
        }

        const res = await fetchData(`/me`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        });

        return NextResponse.json(res);
    } catch (err) {
        console.log('res', err)
        return NextResponse.json(
            { message: 'Failed to fetch user', error: err.message },
            { status: 500 }
        );
    }
}