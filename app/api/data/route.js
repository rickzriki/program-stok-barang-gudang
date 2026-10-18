import { NextResponse } from 'next/server';
import { readDoc, writeDoc } from '@/lib/db';

export async function GET() {
  const doc = await readDoc();
  return NextResponse.json(doc);
}

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'bad json' }, { status: 400 });
  }
  const doc = {
    items: Array.isArray(body.items) ? body.items : [],
    masuk: Array.isArray(body.masuk) ? body.masuk : [],
    keluar: Array.isArray(body.keluar) ? body.keluar : [],
  };
  await writeDoc(doc);
  return NextResponse.json({ ok: true });
}
