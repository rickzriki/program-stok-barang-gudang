'use client';
import { useEffect, useMemo, useState } from 'react';

const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
const today = () => new Date().toISOString().slice(0, 10);
const fmtDate = (s) => {
  try { return new Date(s + 'T00:00:00').toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }); }
  catch { return s; }
};

/* ---------- Logo PT. Meleo Mahkota Abadi: lencana lingkaran gelap berisi mawar merah ---------- */
function Logo({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" role="img" aria-label="Logo PT. Meleo Mahkota Abadi">
      <circle cx="50" cy="50" r="49" fill="#1f2937" />
      <circle cx="50" cy="50" r="41" fill="#fdf6ec" />
      <path d="M50 74 C40 76 31 72 27 63 C37 63 46 66 50 74 Z" fill="#15803d" />
      <path d="M50 74 C60 76 69 72 73 63 C63 63 54 66 50 74 Z" fill="#16a34a" />
      <g fill="#dc2626">
        <ellipse cx="50" cy="34" rx="11" ry="15" />
        <ellipse cx="65" cy="44" rx="11" ry="15" transform="rotate(72 65 44)" />
        <ellipse cx="59" cy="61" rx="11" ry="15" transform="rotate(144 59 61)" />
        <ellipse cx="41" cy="61" rx="11" ry="15" transform="rotate(216 41 61)" />
        <ellipse cx="35" cy="44" rx="11" ry="15" transform="rotate(288 35 44)" />
      </g>
      <g fill="#b91c1c">
        <ellipse cx="50" cy="40" rx="8" ry="11" />
        <ellipse cx="60" cy="47" rx="8" ry="11" transform="rotate(72 60 47)" />
        <ellipse cx="56" cy="58" rx="8" ry="11" transform="rotate(144 56 58)" />
        <ellipse cx="44" cy="58" rx="8" ry="11" transform="rotate(216 44 58)" />
        <ellipse cx="40" cy="47" rx="8" ry="11" transform="rotate(288 40 47)" />
      </g>
      <circle cx="50" cy="49" r="9" fill="#7f1d1d" />
      <path d="M45 49 a5 5 0 1 1 10 0" fill="none" stroke="#fca5a5" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

/* ---------- Ikon garis kecil untuk navigasi ---------- */
const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' };
const IC = {
  home: (<svg width="17" height="17" viewBox="0 0 24 24" style={stroke}><path d="M3 11l9-8 9 8" /><path d="M5 9.5V20h5v-6h4v6h5V9.5" /></svg>),
  box: (<svg width="17" height="17" viewBox="0 0 24 24" style={stroke}><path d="M21 8l-9-5-9 5v8l9 5 9-5V8z" /><path d="M3 8l9 5 9-5" /><path d="M12 13v8" /></svg>),
  masuk: (<svg width="17" height="17" viewBox="0 0 24 24" style={stroke}><path d="M12 3v12" /><path d="M7 10l5 5 5-5" /><path d="M4 21h16" /></svg>),
  keluar: (<svg width="17" height="17" viewBox="0 0 24 24" style={stroke}><path d="M12 15V3" /><path d="M7 8l5-5 5 5" /><path d="M4 21h16" /></svg>),
  rekap: (<svg width="17" height="17" viewBox="0 0 24 24" style={stroke}><path d="M6 20v-7" /><path d="M12 20V5" /><path d="M18 20v-4" /><path d="M3 20h18" /></svg>),
};

const NAV = [
  { id: 'beranda', label: 'Beranda', icon: IC.home },
  { id: 'stok', label: 'Stok Barang', icon: IC.box },
  { id: 'masuk', label: 'Barang Masuk', icon: IC.masuk },
  { id: 'keluar', label: 'Barang Keluar', icon: IC.keluar },
  { id: 'rekap', label: 'Rekap', icon: IC.rekap },
];

const GREEN = '#15803d';
const GREEN_DARK = '#166534';

const S = {
  header: { background: '#fff', borderBottom: `2px solid ${GREEN_DARK}` },
  headerInner: { maxWidth: 1080, margin: '0 auto', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' },
  brandName: { fontWeight: 800, fontSize: 16, color: '#111827' },
  brandSub: { fontSize: 12, color: '#6b7280' },
  nav: { display: 'flex', gap: 4, marginLeft: 'auto', flexWrap: 'wrap' },
  navBtn: (active) => ({
    display: 'flex', alignItems: 'center', gap: 7, padding: '10px 12px', background: 'none', border: 0,
    borderBottom: active ? `3px solid ${GREEN}` : '3px solid transparent',
    color: active ? GREEN : '#6b7280', fontWeight: active ? 700 : 500, fontSize: 14, cursor: 'pointer',
  }),
  main: { background: '#f3f4f6', minHeight: 'calc(100vh - 65px)' },
  col: { maxWidth: 1080, margin: '0 auto', padding: '28px 16px 40px' },
  h1: { fontSize: 30, fontWeight: 800, color: '#111827', margin: '0 0 6px' },
  companyUnder: { fontSize: 12, fontWeight: 700, letterSpacing: 1.5, color: '#374151', marginTop: 8, textAlign: 'center' },
  lead: { color: '#4b5563', fontSize: 15, margin: '0 0 24px', maxWidth: 640 },
  cardGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 20 },
  card: { background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 20, boxShadow: '0 1px 2px rgba(0,0,0,.05)', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit' },
  tile: (bg) => ({ width: 48, height: 48, borderRadius: 12, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, marginBottom: 12 }),
  cardTitle: { fontWeight: 700, fontSize: 16, color: '#111827', margin: '0 0 6px' },
  cardDesc: { fontSize: 13, color: '#6b7280', margin: '0 0 10px', lineHeight: 1.5 },
  cardCount: { fontSize: 12, color: '#374151', fontFamily: 'ui-monospace, monospace' },
  statGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 20 },
  stat: { background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 16, boxShadow: '0 1px 2px rgba(0,0,0,.05)' },
  statLabel: { fontSize: 11, fontWeight: 600, letterSpacing: 1, color: '#6b7280', marginBottom: 8 },
  statVal: { fontSize: 26, fontWeight: 800, color: '#111827', fontFamily: 'ui-monospace, monospace' },
  note: { background: '#fff', border: '1px solid #e5e7eb', borderLeft: '4px solid #b45309', borderRadius: 8, padding: '14px 16px', fontSize: 14, color: '#4b5563', lineHeight: 1.6 },
  panel: { background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 20, boxShadow: '0 1px 2px rgba(0,0,0,.05)', marginBottom: 16 },
  h3: { margin: '0 0 14px', fontSize: 17, fontWeight: 700, color: '#111827' },
  input: { width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #d1d5db', fontSize: 15, boxSizing: 'border-box', marginBottom: 10, fontFamily: 'inherit' },
  btn: { padding: '10px 18px', borderRadius: 8, border: 0, fontSize: 15, cursor: 'pointer', fontWeight: 700, fontFamily: 'inherit' },
  row: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #f3f4f6' },
  th: { textAlign: 'left', padding: '10px 8px', fontSize: 12, fontWeight: 700, letterSpacing: .5, color: '#6b7280', borderBottom: '2px solid #e5e7eb', textTransform: 'uppercase' },
  td: { padding: '10px 8px', fontSize: 14, borderBottom: '1px solid #f3f4f6', color: '#1f2937' },
  muted: { color: '#6b7280', fontSize: 13 },
  err: { color: '#dc2626', fontSize: 13, marginBottom: 8 },
  subTabs: { display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' },
};

function SubBtn({ active, onClick, children }) {
  return (
    <button onClick={onClick} style={{ ...S.btn, fontSize: 14, padding: '8px 14px', background: active ? GREEN : '#e5e7eb', color: active ? '#fff' : '#374151' }}>
      {children}
    </button>
  );
}

export default function Page() {
  const [doc, setDoc] = useState({ items: [], masuk: [], keluar: [] });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState('beranda');
  const [err, setErr] = useState('');

  const [namaBaru, setNamaBaru] = useState('');
  const [stokAwal, setStokAwal] = useState('');
  const [fItem, setFItem] = useState('');
  const [fJumlah, setFJumlah] = useState('');
  const [fTanggal, setFTanggal] = useState(today());
  const [fKet, setFKet] = useState('');
  const [rekapMode, setRekapMode] = useState('minggu');

  const load = async () => {
    setLoading(true);
    try {
      const r = await fetch('/api/data', { cache: 'no-store' });
      setDoc(await r.json());
    } catch { setErr('Gagal memuat data.'); }
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const save = async (next) => {
    setSaving(true); setErr('');
    try {
      const r = await fetch('/api/data', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(next) });
      if (!r.ok) throw new Error();
      setDoc(next);
    } catch { setErr('Gagal menyimpan. Coba lagi.'); }
    setSaving(false);
  };

  const itemName = (id) => (doc.items.find(i => i.id === id) || {}).nama || '(dihapus)';

  const tambahBarang = () => {
    const nama = namaBaru.trim();
    if (!nama) return setErr('Nama barang wajib diisi.');
    const next = { ...doc, items: [...doc.items, { id: uid(), nama, stok: Math.max(0, parseInt(stokAwal) || 0) }] };
    setNamaBaru(''); setStokAwal('');
    save(next);
  };

  const hapusBarang = (id) => {
    if (!confirm('Hapus barang ini? Riwayat masuk/keluar tetap tersimpan.')) return;
    save({ ...doc, items: doc.items.filter(i => i.id !== id) });
  };

  const catat = (jenis) => {
    const jumlah = parseInt(fJumlah);
    if (!fItem) return setErr('Pilih barang dulu.');
    if (!jumlah || jumlah <= 0) return setErr('Jumlah harus lebih dari 0.');
    const item = doc.items.find(i => i.id === fItem);
    if (!item) return setErr('Barang tidak ditemukan.');
    if (jenis === 'keluar' && item.stok < jumlah) return setErr(`Stok tidak cukup (tersisa ${item.stok}).`);
    const entry = { id: uid(), itemId: fItem, jumlah, tanggal: fTanggal || today(), ket: fKet.trim() };
    const items = doc.items.map(i => i.id === fItem ? { ...i, stok: i.stok + (jenis === 'masuk' ? jumlah : -jumlah) } : i);
    const next = jenis === 'masuk'
      ? { ...doc, items, masuk: [entry, ...doc.masuk] }
      : { ...doc, items, keluar: [entry, ...doc.keluar] };
    setFJumlah(''); setFKet(''); setFTanggal(today());
    save(next);
  };

  const stats = useMemo(() => {
    const now = new Date();
    const thisMonth = (tgl) => { const d = new Date(tgl + 'T00:00:00'); return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear(); };
    return {
      jenis: doc.items.length,
      totalUnit: doc.items.reduce((a, i) => a + (i.stok || 0), 0),
      masukBulan: doc.masuk.filter(e => thisMonth(e.tanggal)).reduce((a, e) => a + e.jumlah, 0),
      keluarBulan: doc.keluar.filter(e => thisMonth(e.tanggal)).reduce((a, e) => a + e.jumlah, 0),
    };
  }, [doc]);

  const rekap = useMemo(() => {
    const now = new Date();
    const inRange = (tgl) => {
      const d = new Date(tgl + 'T00:00:00');
      if (rekapMode === 'minggu') { const a = new Date(now); a.setDate(a.getDate() - 6); a.setHours(0,0,0,0); return d >= a && d <= now; }
      if (rekapMode === 'bulan') return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
      return d.getFullYear() === now.getFullYear();
    };
    const map = {};
    doc.items.forEach(i => { map[i.id] = { nama: i.nama, masuk: 0, keluar: 0, stok: i.stok }; });
    doc.masuk.filter(e => inRange(e.tanggal)).forEach(e => { if (map[e.itemId]) map[e.itemId].masuk += e.jumlah; });
    doc.keluar.filter(e => inRange(e.tanggal)).forEach(e => { if (map[e.itemId]) map[e.itemId].keluar += e.jumlah; });
    return Object.values(map);
  }, [doc, rekapMode]);

  const listRow = (e, jenis) => (
    <div key={e.id} style={S.row}>
      <div>
        <div style={{ fontWeight: 600, color: '#111827' }}>{itemName(e.itemId)}</div>
        <div style={S.muted}>{fmtDate(e.tanggal)}{e.ket ? ' · ' + e.ket : ''}</div>
      </div>
      <div style={{ fontWeight: 700, color: jenis === 'masuk' ? GREEN : '#dc2626', fontFamily: 'ui-monospace, monospace' }}>
        {jenis === 'masuk' ? '+' : '-'}{e.jumlah}
      </div>
    </div>
  );

  const menuCards = [
    { id: 'stok', title: 'Stok Barang', desc: 'Kelola daftar barang dan pantau stok gudang terkini.', tile: '#dcfce7', glyph: '📦', count: `${stats.jenis} jenis barang · ${stats.totalUnit} total unit` },
    { id: 'masuk', title: 'Barang Masuk', desc: 'Catat setiap barang yang masuk ke gudang.', tile: '#dcfce7', glyph: '📥', count: `${doc.masuk.length} catatan masuk` },
    { id: 'keluar', title: 'Barang Keluar', desc: 'Catat setiap barang yang keluar dari gudang.', tile: '#fee2e2', glyph: '📤', count: `${doc.keluar.length} catatan keluar` },
    { id: 'rekap', title: 'Rekap', desc: 'Lihat rekap mingguan, bulanan, dan tahunan per barang.', tile: '#dcfce7', glyph: '📊', count: `${stats.jenis} jenis barang` },
  ];

  const statCards = [
    { label: 'JENIS BARANG', val: stats.jenis },
    { label: 'TOTAL UNIT DI GUDANG', val: stats.totalUnit },
    { label: 'MASUK BULAN INI', val: `${stats.masukBulan} unit` },
    { label: 'KELUAR BULAN INI', val: `${stats.keluarBulan} unit` },
  ];

  return (
    <div>
      <header style={S.header}>
        <div style={S.headerInner}>
          <Logo size={42} />
          <div>
            <div style={S.brandName}>PT. Meleo Mahkota Abadi</div>
            <div style={S.brandSub}>Program Stok Barang Gudang</div>
          </div>
          <nav style={S.nav}>
            {NAV.map(n => (
              <button key={n.id} onClick={() => setTab(n.id)} style={S.navBtn(tab === n.id)}>
                {n.icon}{n.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <div style={S.main}>
        <div style={S.col}>
          {err && <div style={S.err}>{err}</div>}
          {saving && <div style={{ ...S.muted, marginBottom: 8 }}>Menyimpan…</div>}

          {loading ? <div style={S.panel}>Memuat data…</div> : (<>

            {tab === 'beranda' && (<>
              <div style={{ display: 'flex', gap: 20, alignItems: 'center', marginBottom: 24, flexWrap: 'wrap' }}>
                <div>
                  <Logo size={96} />
                  <div style={S.companyUnder}>PT. MELEO<br />MAHKOTA ABADI</div>
                </div>
                <div>
                  <h1 style={S.h1}>Menu Utama</h1>
                  <p style={S.lead}>Kelola stok barang gudang PT. Meleo Mahkota Abadi — catat barang masuk dan keluar, pantau stok terkini, dan lihat rekap per periode.</p>
                </div>
              </div>

              <div style={S.cardGrid}>
                {menuCards.map(c => (
                  <button key={c.id} style={S.card} onClick={() => setTab(c.id)}>
                    <div style={S.tile(c.tile)}>{c.glyph}</div>
                    <div style={S.cardTitle}>{c.title}</div>
                    <p style={S.cardDesc}>{c.desc}</p>
                    <div style={S.cardCount}>{c.count}</div>
                  </button>
                ))}
              </div>

              <div style={S.statGrid}>
                {statCards.map(s => (
                  <div key={s.label} style={S.stat}>
                    <div style={S.statLabel}>{s.label}</div>
                    <div style={S.statVal}>{s.val}</div>
                  </div>
                ))}
              </div>

              <div style={S.note}>
                <strong>Catatan:</strong> setiap perubahan data tersimpan otomatis dan permanen di database.
                Tutup halaman dan buka kembali kapan pun — data stok, riwayat masuk, dan riwayat keluar tetap ada.
              </div>
            </>)}

            {tab === 'stok' && (
              <div style={S.panel}>
                <h3 style={S.h3}>Tambah Barang</h3>
                <input style={S.input} placeholder="Nama barang" value={namaBaru} onChange={e => setNamaBaru(e.target.value)} />
                <input style={S.input} placeholder="Stok awal (opsional)" type="number" min="0" value={stokAwal} onChange={e => setStokAwal(e.target.value)} />
                <button style={{ ...S.btn, background: GREEN, color: '#fff' }} onClick={tambahBarang}>+ Tambah</button>
                <h3 style={{ ...S.h3, marginTop: 20 }}>Daftar Stok</h3>
                {doc.items.length === 0 && <div style={S.muted}>Belum ada barang.</div>}
                {doc.items.map(i => (
                  <div key={i.id} style={S.row}>
                    <div style={{ fontWeight: 600, color: '#111827' }}>{i.nama}</div>
                    <div>
                      <span style={{ fontWeight: 700, marginRight: 12, fontFamily: 'ui-monospace, monospace' }}>{i.stok}</span>
                      <button style={{ ...S.btn, background: '#fee2e2', color: '#b91c1c', padding: '6px 12px', fontSize: 13 }} onClick={() => hapusBarang(i.id)}>Hapus</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {(tab === 'masuk' || tab === 'keluar') && (
              <>
                <div style={S.panel}>
                  <h3 style={S.h3}>{tab === 'masuk' ? 'Catat Barang Masuk' : 'Catat Barang Keluar'}</h3>
                  <select style={S.input} value={fItem} onChange={e => setFItem(e.target.value)}>
                    <option value="">— Pilih barang —</option>
                    {doc.items.map(i => <option key={i.id} value={i.id}>{i.nama} (stok: {i.stok})</option>)}
                  </select>
                  <input style={S.input} type="number" min="1" placeholder="Jumlah" value={fJumlah} onChange={e => setFJumlah(e.target.value)} />
                  <input style={S.input} type="date" value={fTanggal} onChange={e => setFTanggal(e.target.value)} />
                  <input style={S.input} placeholder="Keterangan (opsional)" value={fKet} onChange={e => setFKet(e.target.value)} />
                  <button style={{ ...S.btn, background: tab === 'masuk' ? GREEN : '#dc2626', color: '#fff' }} onClick={() => catat(tab)}>Simpan</button>
                </div>
                <div style={S.panel}>
                  <h3 style={S.h3}>Riwayat {tab === 'masuk' ? 'Masuk' : 'Keluar'}</h3>
                  {(tab === 'masuk' ? doc.masuk : doc.keluar).length === 0 && <div style={S.muted}>Belum ada catatan.</div>}
                  {(tab === 'masuk' ? doc.masuk : doc.keluar).map(e => listRow(e, tab))}
                </div>
              </>
            )}

            {tab === 'rekap' && (
              <div style={S.panel}>
                <h3 style={S.h3}>Rekap</h3>
                <div style={S.subTabs}>
                  <SubBtn active={rekapMode === 'minggu'} onClick={() => setRekapMode('minggu')}>Mingguan</SubBtn>
                  <SubBtn active={rekapMode === 'bulan'} onClick={() => setRekapMode('bulan')}>Bulanan</SubBtn>
                  <SubBtn active={rekapMode === 'tahun'} onClick={() => setRekapMode('tahun')}>Tahunan</SubBtn>
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead><tr>
                    <th style={S.th}>Barang</th><th style={S.th}>Masuk</th><th style={S.th}>Keluar</th><th style={S.th}>Stok</th>
                  </tr></thead>
                  <tbody>
                    {rekap.map((r, i) => (
                      <tr key={i}>
                        <td style={S.td}>{r.nama}</td>
                        <td style={{ ...S.td, color: GREEN, fontFamily: 'ui-monospace, monospace' }}>+{r.masuk}</td>
                        <td style={{ ...S.td, color: '#dc2626', fontFamily: 'ui-monospace, monospace' }}>-{r.keluar}</td>
                        <td style={{ ...S.td, fontWeight: 700, fontFamily: 'ui-monospace, monospace' }}>{r.stok}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {rekap.length === 0 && <div style={S.muted}>Belum ada barang.</div>}
              </div>
            )}

          </>)}
        </div>
      </div>
    </div>
  );
}
