import { put, head } from '@vercel/blob';

const KEY = 'stok-gudang/data.json';

export async function readDoc() {
  try {
    const meta = await head(KEY);
    const res = await fetch(meta.url, { cache: 'no-store' });
    if (!res.ok) throw new Error('blob fetch failed');
    const doc = await res.json();
    return {
      items: Array.isArray(doc.items) ? doc.items : [],
      masuk: Array.isArray(doc.masuk) ? doc.masuk : [],
      keluar: Array.isArray(doc.keluar) ? doc.keluar : [],
    };
  } catch {
    return { items: [], masuk: [], keluar: [] };
  }
}

export async function writeDoc(doc) {
  const clean = {
    items: Array.isArray(doc.items) ? doc.items : [],
    masuk: Array.isArray(doc.masuk) ? doc.masuk : [],
    keluar: Array.isArray(doc.keluar) ? doc.keluar : [],
  };
  await put(KEY, JSON.stringify(clean), {
    access: 'public',
    contentType: 'application/json',
    allowOverwrite: true,
    addRandomSuffix: false,
  });
}
