export const metadata = {
  title: 'Program Stok Barang Gudang — PT. Meleo Mahkota Abadi',
  description: 'Aplikasi pencatatan stok barang gudang PT. Meleo Mahkota Abadi',
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
