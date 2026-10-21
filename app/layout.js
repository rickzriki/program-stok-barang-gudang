export const metadata = {
  title: 'Program Stok Barang Gudang — PT. Meleo Mahkota Abadi',
  description: 'Aplikasi pencatatan stok barang gudang PT. Meleo Mahkota Abadi',
  icons: {
    icon: '/icon-192',
    apple: '/icon-192',
  },
  appleWebApp: {
    capable: true,
    title: 'Stok Gudang',
    statusBarStyle: 'default',
  },
};

export const viewport = {
  themeColor: '#14532d',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body style={{ margin: 0, fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif', background: '#f3f4f6', color: '#1f2937' }}>
        {children}
      </body>
    </html>
  );
}
