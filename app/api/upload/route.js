import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';

// Upload foto sparepart ke Vercel Blob. Dipakai oleh kotak "Foto Sparepart"
// di form Tambah/Edit Sparepart. Mengembalikan URL publik blob.
export async function POST(req) {
  try {
    const form = await req.formData();
    const file = form.get('file');
    if (!file || typeof file !== 'object' || typeof file.type !== 'string' || !file.type.startsWith('image/')) {
      return NextResponse.json({ ok: false, error: 'file harus gambar' }, { status: 400 });
    }
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ ok: false, error: 'file terlalu besar (maks 5 MB)' }, { status: 400 });
    }
    const ext = (file.type.split('/')[1] || 'jpg').replace(/[^a-z0-9]/gi, '') || 'jpg';
    const nama = `foto-sparepart/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const blob = await put(nama, file, { access: 'public', contentType: file.type });
    return NextResponse.json({ ok: true, url: blob.url });
  } catch (e) {
    return NextResponse.json({ ok: false, error: 'upload gagal' }, { status: 500 });
  }
}
