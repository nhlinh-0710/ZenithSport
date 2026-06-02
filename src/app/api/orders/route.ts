import { NextResponse } from 'next/server';

const PHP_API = 'http://localhost:8080/backend/api';

export async function POST(request: Request) {
  const body = await request.json();
  const token = request.headers.get('Authorization') || '';

  try {
    const res = await fetch(`${PHP_API}/orders.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': token },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({
      success: true,
      order: { id: 'ZS' + Date.now().toString(36).toUpperCase(), status: 'pending' },
    }, { status: 201 });
  }
}

export async function GET(request: Request) {
  const token = request.headers.get('Authorization') || '';

  try {
    const res = await fetch(`${PHP_API}/orders.php`, {
      headers: { 'Authorization': token },
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ orders: [] });
  }
}
