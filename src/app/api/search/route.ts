import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  // Mock data response structure as per API specification
  const results = {
    ingredients: [
      { slug: 'niacinamide', name: '나이아신아마이드' },
      { slug: 'panthenol', name: '판테놀' }
    ],
    concerns: [
      { slug: 'barrier', name: '피부 장벽 손상' },
      { slug: 'acne', name: '여드름/트러블' }
    ],
    guides: [
      { slug: 'ceramide-cream-top5', title: '장벽 복구 세라마이드 크림 Top 5' }
    ],
    products: []
  };

  return NextResponse.json({ query, results });
}
