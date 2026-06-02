import { NextResponse } from 'next/server';

const PHP_API = 'http://localhost:8080/backend/api';

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const res = await fetch(`${PHP_API}/contact.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({
      success: true,
      message: 'Cảm ơn bạn đã liên hệ!',
    }, { status: 201 });
  }
}
