import { NextResponse } from 'next/server';

const PHP_API = 'http://localhost:8080/backend/api';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const params = searchParams.toString();
  const url = `${PHP_API}/products.php${params ? '?' + params : ''}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    // Fallback to mock data
    const { products } = await import('@/lib/data');
    const category = searchParams.get('category');
    const brand = searchParams.get('brand');
    const search = searchParams.get('search');

    let result = [...products];
    if (category && category !== 'Tất cả') result = result.filter(p => p.category === category);
    if (brand && brand !== 'Tất cả') result = result.filter(p => p.brand === brand);
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }
    return NextResponse.json({ products: result, total: result.length });
  }
}
