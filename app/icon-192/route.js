import { ICON_192_B64 } from '@/lib/logo';

export async function GET() {
  const buf = Buffer.from(ICON_192_B64, 'base64');
  return new Response(buf, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
