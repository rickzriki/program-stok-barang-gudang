export default function manifest() {
  return {
    name: 'Program Stok Barang Gudang — PT. Meleo Mahkota Abadi',
    short_name: 'Stok Gudang',
    description: 'Aplikasi pengelolaan stok barang gudang PT. Meleo Mahkota Abadi: stok barang, barang masuk, barang keluar, dan rekap.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#ffffff',
    theme_color: '#14532d',
    lang: 'id',
    icons: [
      { src: '/icon-192', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icon-512', sizes: '512x512', type: 'image/png', purpose: 'any' },
    ],
  };
}
