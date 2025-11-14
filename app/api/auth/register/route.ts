import { fetchData } from '@/app/_api';
import { NextResponse } from 'next/server';

export async function POST(req) {
    const { name, email, password } = await req.json();

    try {
        const res = await fetchData(`/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
            return NextResponse.json(data, { status: res.status });
        }

        return NextResponse.json({ message: 'Registration successful' });
    } catch (err) {
        return NextResponse.json(
            { message: 'Registration failed', error: err.message },
            { status: 500 }
        );
    }
}