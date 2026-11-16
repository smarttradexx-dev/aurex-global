import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { url } = await request.json();
    if (!url || !url.startsWith('http')) {
      return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
    }

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7'
      }
    });

    const html = await response.text();

    const getMetaTag = (property) => {
      const regex = new RegExp(`<meta[^>]+(?:property|name)=["']${property}["'][^>]+content=["']([^"']+)["']`, 'i');
      const match = html.match(regex);
      if (match) return match[1];
      const reverseRegex = new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["']${property}["']`, 'i');
      const reverseMatch = html.match(reverseRegex);
      return reverseMatch ? reverseMatch[1] : null;
    };

    const title = getMetaTag('og:title') || html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1] || 'منتج من المتجر العالمي';
    const image = getMetaTag('og:image') || '';

    return NextResponse.json({ title: title.trim(), image: image.trim(), success: true });
  } catch (error) {
    return NextResponse.json({ title: 'تم إرفاق رابط المنتج بنجاح', image: '', success: false });
  }
}
