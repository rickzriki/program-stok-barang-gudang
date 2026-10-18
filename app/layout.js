export const metadata = {
  title: 'Stok Barang Gudang',
  description: 'Aplikasi pencatatan stok barang gudang',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body style={{ margin: 0, fontFamily: 'system-ui, -apple-system, sans-serif', background: '#f1f5f9', color: '#1e293b' }}>
        {children}
      </body>
    </html>
  );
}
