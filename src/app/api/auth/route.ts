import { NextResponse } from 'next/server';

const PHP_API = 'http://localhost:8080/backend/api';

export async function POST(request: Request) {
  const body = await request.json();
  const phpBody = { ...body, action: body.action || 'login' };

  try {
    const res = await fetch(`${PHP_API}/auth.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(phpBody),
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    // Fallback mock auth
    if (body.action === 'login' || !body.action) {
      return NextResponse.json({
        user: { id: 1, name: 'Nguyễn Văn A', email: body.email, phone: '0912345678' },
        token: 'mock-token-' + Date.now(),
      });
    }
    if (body.action === 'register') {
      return NextResponse.json({
        user: { id: Date.now(), name: body.name, email: body.email, phone: body.phone || '' },
        token: 'mock-token-' + Date.now(),
      }, { status: 201 });
    }
    if (body.action === 'profile') {
      return NextResponse.json({
        user: {
          id: 1, name: 'Nguyễn Văn A', email: 'demo@zenith.vn', phone: '0912345678',
          addresses: [{ fullName: 'Nguyễn Văn A', phone: '0912345678', street: '123 Nguyễn Huệ', ward: 'Phường Bến Nghé', district: 'Quận 1', city: 'TP. Hồ Chí Minh' }],
        },
      });
    }
    return NextResponse.json({ success: true });
  }
}

export async function GET() {
  return NextResponse.json({ status: 'Auth API running' });
}
