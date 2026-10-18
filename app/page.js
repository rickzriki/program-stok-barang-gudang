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
  h2: { fontSize: 28, fontWeight: 800, color: '#111827', margin: '0 0 6px' },
  lead2: { color: '#4b5563', fontSize: 15, margin: '0 0 20px' },
  label: { display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 },
  tableCard: { background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, boxShadow: '0 1px 2px rgba(0,0,0,.05)', overflow: 'hidden' },
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
  th: { textAlign: 'left', padding: '10px 8px', fontSize: 12, fontWeight: 700, letterSpacing: .5, color: '#6b7280', borderBottom: '2px solid #e5e7eb', textTransform: 'uppercase', background: '#f7f8f5' },
  td: { padding: '10px 8px', fontSize: 14, borderBottom: '1px solid #f3f4f6', color: '#1f2937' },
  muted: { color: '#6b7280', fontSize: 13 },
  err: { color: '#dc2626', fontSize: 13, marginBottom: 8 },
  subTabs: { display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' },
  h3b: { fontSize: 22, fontWeight: 800, color: '#111827', margin: '26px 0 12px' },
  segBtn: (active) => ({ padding: '8px 16px', borderRadius: 8, border: 0, fontSize: 14, cursor: 'pointer', fontWeight: 700, fontFamily: 'inherit', background: active ? '#fff' : 'transparent', color: active ? GREEN : '#4b5563', boxShadow: active ? '0 1px 2px rgba(0,0,0,.08)' : 'none' }),
};

export default function Page() {
  const [doc, setDoc] = useState({ items: [], masuk: [], keluar: [] });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState('beranda');
  const [err, setErr] = useState('');

  const [cari, setCari] = useState('');
  const [tampilForm, setTampilForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [fKode, setFKode] = useState('');
  const [fSatuan, setFSatuan] = useState('');
  const [fNama, setFNama] = useState('');
  const [fStokAwal, setFStokAwal] = useState('0');
  const [fStokMin, setFStokMin] = useState('0');
  const [fLokasi, setFLokasi] = useState('');
  const [fItem, setFItem] = useState('');
  const [fJumlah, setFJumlah] = useState('');
  const [fTanggal, setFTanggal] = useState(today());
  const [fKet, setFKet] = useState('');
  const [rekapMode, setRekapMode] = useState('minggu');
  const [rekapTahun, setRekapTahun] = useState(new Date().getFullYear());
  const [periodeAktif, setPeriodeAktif] = useState(null);

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

  const itemName = (id) => {
    const it = doc.items.find(i => i.id === id);
    if (!it) return '(dihapus)';
    return it.kode ? `${it.kode} · ${it.nama}` : it.nama;
  };

  const statusOf = (it) => {
    const stok = it.stok || 0, min = it.stokMin || 0;
    if (stok <= 0) return { t: 'Habis', bg: '#fee2e2', fg: '#b91c1c' };
    if (stok <= min) return { t: 'Menipis', bg: '#fef3c7', fg: '#b45309' };
    return { t: 'Tersedia', bg: '#dcfce7', fg: '#15803d' };
  };
  const statusBadge = (it) => {
    const s = statusOf(it);
    return <span style={{ background: s.bg, color: s.fg, fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 999 }}>{s.t}</span>;
  };

  const stokTampil = doc.items.filter(it => {
    const q = cari.trim().toLowerCase();
    if (!q) return true;
    return (it.nama || '').toLowerCase().includes(q) || (it.kode || '').toLowerCase().includes(q);
  });

  const resetForm = () => {
    setFKode(''); setFSatuan(''); setFNama(''); setFStokAwal('0'); setFStokMin('0'); setFLokasi(''); setEditId(null);
  };
  const bukaFormTambah = () => { resetForm(); setTampilForm(true); };
  const bukaFormEdit = (it) => {
    setEditId(it.id);
    setFKode(it.kode || ''); setFSatuan(it.satuan || ''); setFNama(it.nama || '');
    setFStokAwal(String(it.stok ?? 0)); setFStokMin(String(it.stokMin ?? 0)); setFLokasi(it.lokasi || '');
    setTampilForm(true);
  };
  const tutupForm = () => { setTampilForm(false); resetForm(); };

  const simpanBarang = () => {
    const nama = fNama.trim();
    if (!nama) return setErr('Nama barang wajib diisi.');
    const data = {
      kode: fKode.trim(),
      satuan: fSatuan.trim(),
      nama,
      stok: Math.max(0, parseInt(fStokAwal) || 0),
      stokMin: Math.max(0, parseInt(fStokMin) || 0),
      lokasi: fLokasi.trim(),
    };
    const next = editId
      ? { ...doc, items: doc.items.map(i => i.id === editId ? { ...i, ...data } : i) }
      : { ...doc, items: [...doc.items, { id: uid(), ...data }] };
    tutupForm();
    save(next);
  };

  const hapusBarang = (id) => {
    if (!confirm('Hapus barang ini? Riwayat masuk/keluar tetap tersimpan.')) return;
    save({ ...doc, items: doc.items.filter(i => i.id !== id) });
  };

  const hapusCatatan = (jenis, id) => {
    if (!confirm('Hapus catatan ini? Stok barang akan disesuaikan kembali.')) return;
    const list = jenis === 'masuk' ? doc.masuk : doc.keluar;
    const e = list.find(x => x.id === id);
    if (!e) return;
    const items = doc.items.map(i => i.id === e.itemId ? { ...i, stok: Math.max(0, i.stok + (jenis === 'masuk' ? -e.jumlah : e.jumlah)) } : i);
    save({ ...doc, items, [jenis]: list.filter(x => x.id !== id) });
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

  const dayOfYear = (d) => Math.floor((d - new Date(d.getFullYear(), 0, 0)) / 864e5);
  const weekOf = (d) => Math.ceil(dayOfYear(d) / 7);
  const weekRange = (year, w) => {
    const f = (d) => d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
    const start = new Date(year, 0, (w - 1) * 7 + 1);
    const end = new Date(year, 0, Math.min(w * 7, dayOfYear(new Date(year, 11, 31))));
    return `${f(start)}–${f(end)}`;
  };
  const labelPeriode = (key) => {
    if (key[0] === 'w') return `Minggu ${key.slice(1)}`;
    return new Date(rekapTahun, +key.slice(1), 1).toLocaleDateString('id-ID', { month: 'long' });
  };

  const tahunTersedia = useMemo(() => {
    const ys = new Set([new Date().getFullYear()]);
    [...doc.masuk, ...doc.keluar].forEach(e => ys.add(new Date(e.tanggal + 'T00:00:00').getFullYear()));
    return [...ys].sort((a, b) => b - a);
  }, [doc]);

  const rekapTahunData = useMemo(() => {
    const inYear = (e) => new Date(e.tanggal + 'T00:00:00').getFullYear() === rekapTahun;
    const masuk = doc.masuk.filter(inYear), keluar = doc.keluar.filter(inYear);
    const keyOf = (tgl) => {
      const d = new Date(tgl + 'T00:00:00');
      return rekapMode === 'minggu' ? 'w' + weekOf(d) : 'm' + d.getMonth();
    };
    const per = {};
    const slot = (k) => (per[k] = per[k] || { trxMasuk: 0, totMasuk: 0, trxKeluar: 0, totKeluar: 0 });
    masuk.forEach(e => { const s = slot(keyOf(e.tanggal)); s.trxMasuk++; s.totMasuk += e.jumlah; });
    keluar.forEach(e => { const s = slot(keyOf(e.tanggal)); s.trxKeluar++; s.totKeluar += e.jumlah; });
    const rows = Object.entries(per)
      .map(([key, v]) => ({ key, ...v, selisih: v.totMasuk - v.totKeluar }))
      .sort((a, b) => parseInt(a.key.slice(1), 10) - parseInt(b.key.slice(1), 10));
    const totMasuk = masuk.reduce((a, e) => a + e.jumlah, 0);
    const totKeluar = keluar.reduce((a, e) => a + e.jumlah, 0);
    return { totMasuk, totKeluar, selisih: totMasuk - totKeluar, trx: masuk.length + keluar.length, rows };
  }, [doc, rekapMode, rekapTahun]);

  const rincian = useMemo(() => {
    if (!periodeAktif || periodeAktif.tahun !== rekapTahun || periodeAktif.mode !== rekapMode) return null;
    const inPer = (tgl) => {
      const d = new Date(tgl + 'T00:00:00');
      if (d.getFullYear() !== rekapTahun) return false;
      const k = rekapMode === 'minggu' ? 'w' + weekOf(d) : 'm' + d.getMonth();
      return k === periodeAktif.key;
    };
    const map = {};
    doc.items.forEach(i => { map[i.id] = { nama: i.nama, kode: i.kode, masuk: 0, keluar: 0 }; });
    doc.masuk.filter(e => inPer(e.tanggal)).forEach(e => { if (map[e.itemId]) map[e.itemId].masuk += e.jumlah; });
    doc.keluar.filter(e => inPer(e.tanggal)).forEach(e => { if (map[e.itemId]) map[e.itemId].keluar += e.jumlah; });
    return Object.values(map)
      .filter(r => r.masuk > 0 || r.keluar > 0)
      .map(r => ({ ...r, selisih: r.masuk - r.keluar }));
  }, [doc, periodeAktif, rekapMode, rekapTahun]);

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

            {tab === 'stok' && (<>
              <h2 style={S.h2}>Stok Barang</h2>
              <p style={S.lead2}>Daftar seluruh barang yang tersimpan di gudang beserta jumlah stok saat ini.</p>

              <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
                <div style={{ position: 'relative', flex: '1 1 260px', maxWidth: 480 }}>
                  <span style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', fontSize: 15 }}>⌕</span>
                  <input
                    style={{ ...S.input, marginBottom: 0, paddingLeft: 38 }}
                    placeholder="Cari nama atau kode barang..."
                    value={cari} onChange={e => setCari(e.target.value)}
                  />
                </div>
                <button style={{ ...S.btn, background: GREEN, color: '#fff', marginLeft: 'auto' }} onClick={bukaFormTambah}>+ Tambah Barang</button>
              </div>

              {tampilForm && (
                <div style={S.panel}>
                  <h3 style={S.h3}>{editId ? 'Edit Barang' : 'Tambah Barang Baru'}</h3>
                  <p style={{ ...S.muted, margin: '-8px 0 14px' }}>Isi data barang di bawah ini, lalu simpan.</p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 12px' }}>
                    <div>
                      <label style={S.label}>Kode Barang</label>
                      <input style={S.input} placeholder="BRG-001" value={fKode} onChange={e => setFKode(e.target.value)} />
                    </div>
                    <div>
                      <label style={S.label}>Satuan</label>
                      <input style={S.input} placeholder="pcs, dus, kg, liter" value={fSatuan} onChange={e => setFSatuan(e.target.value)} />
                    </div>
                  </div>
                  <label style={S.label}>Nama Barang</label>
                  <input style={S.input} placeholder="Beras Premium 5 kg" value={fNama} onChange={e => setFNama(e.target.value)} />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 12px' }}>
                    <div>
                      <label style={S.label}>Stok Awal</label>
                      <input style={S.input} type="number" min="0" value={fStokAwal} onChange={e => setFStokAwal(e.target.value)} />
                    </div>
                    <div>
                      <label style={S.label}>Stok Minimum</label>
                      <input style={S.input} type="number" min="0" value={fStokMin} onChange={e => setFStokMin(e.target.value)} />
                      <div style={{ fontSize: 12, color: '#6b7280', margin: '-4px 0 10px', lineHeight: 1.5 }}>
                        Barang ditandai &lsquo;Menipis&rsquo; bila stok mencapai angka ini atau di bawahnya.
                      </div>
                    </div>
                  </div>
                  <label style={S.label}>Lokasi di Gudang (boleh kosong)</label>
                  <input style={S.input} placeholder="Rak A1, Blok B" value={fLokasi} onChange={e => setFLokasi(e.target.value)} />
                  <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                    <button style={{ ...S.btn, background: GREEN, color: '#fff' }} onClick={simpanBarang}>Simpan Barang</button>
                    <button style={{ ...S.btn, background: '#fff', color: '#374151', border: '1px solid #d1d5db' }} onClick={tutupForm}>Batal</button>
                  </div>
                </div>
              )}

              <div style={S.tableCard}>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 760 }}>
                    <thead><tr>
                      <th style={S.th}>Kode</th>
                      <th style={S.th}>Nama Barang</th>
                      <th style={S.th}>Lokasi</th>
                      <th style={S.th}>Stok</th>
                      <th style={S.th}>Satuan</th>
                      <th style={S.th}>Status</th>
                      <th style={{ ...S.th, textAlign: 'right' }}>Aksi</th>
                    </tr></thead>
                    <tbody>
                      {stokTampil.map(it => (
                        <tr key={it.id}>
                          <td style={{ ...S.td, fontFamily: 'ui-monospace, monospace', color: '#374151' }}>{it.kode || '—'}</td>
                          <td style={{ ...S.td, fontWeight: 600 }}>{it.nama}</td>
                          <td style={S.td}>{it.lokasi || '—'}</td>
                          <td style={{ ...S.td, fontWeight: 700, fontFamily: 'ui-monospace, monospace' }}>{it.stok}</td>
                          <td style={S.td}>{it.satuan || '—'}</td>
                          <td style={S.td}>{statusBadge(it)}</td>
                          <td style={{ ...S.td, textAlign: 'right', whiteSpace: 'nowrap' }}>
                            <button
                              style={{ ...S.btn, background: '#e5e7eb', color: '#374151', padding: '6px 12px', fontSize: 13, marginRight: 8 }}
                              onClick={() => bukaFormEdit(it)}
                            >Edit</button>
                            <button
                              style={{ ...S.btn, background: '#fee2e2', color: '#b91c1c', padding: '6px 12px', fontSize: 13 }}
                              onClick={() => hapusBarang(it.id)}
                            >Hapus</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {stokTampil.length === 0 && (
                  <div style={{ padding: '44px 20px', textAlign: 'center' }}>
                    <div style={{ fontWeight: 700, fontSize: 16, color: '#111827', marginBottom: 8 }}>Belum ada barang</div>
                    <div style={S.muted}>Klik tombol &ldquo;Tambah Barang&rdquo; untuk memasukkan barang pertama ke gudang.</div>
                  </div>
                )}
              </div>
            </>)}

            {(tab === 'masuk' || tab === 'keluar') && (<>
              <h2 style={S.h2}>{tab === 'masuk' ? 'Barang Masuk' : 'Barang Keluar'}</h2>
              <p style={S.lead2}>
                {tab === 'masuk'
                  ? 'Catat barang yang diterima gudang. Stok barang akan bertambah otomatis sesuai jumlah yang dicatat.'
                  : 'Catat barang yang dikeluarkan dari gudang. Stok barang akan berkurang otomatis sesuai jumlah yang dicatat.'}
              </p>

              <div style={S.panel}>
                <h3 style={S.h3}>{tab === 'masuk' ? 'Catat Barang Masuk' : 'Catat Barang Keluar'}</h3>
                <p style={{ ...S.muted, margin: '-8px 0 14px', fontSize: 14 }}>
                  {tab === 'masuk'
                    ? 'Pilih barang, isi jumlah dan tanggal penerimaan.'
                    : 'Pilih barang, isi jumlah dan tanggal pengeluaran. Jumlah tidak boleh melebihi stok yang tersedia.'}
                </p>
                <label style={S.label}>Barang</label>
                <select style={S.input} value={fItem} onChange={e => setFItem(e.target.value)}>
                  {doc.items.length === 0
                    ? <option value="">— Belum ada barang, tambahkan dulu di menu Stok Barang —</option>
                    : <>
                      <option value="">— Pilih barang —</option>
                      {doc.items.map(i => <option key={i.id} value={i.id}>{i.kode ? i.kode + ' · ' : ''}{i.nama} (stok: {i.stok})</option>)}
                    </>}
                </select>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 12px' }}>
                  <div>
                    <label style={S.label}>{tab === 'masuk' ? 'Jumlah Masuk' : 'Jumlah Keluar'}</label>
                    <input style={S.input} type="number" min="1" placeholder={tab === 'masuk' ? 'mis. 50' : 'mis. 10'} value={fJumlah} onChange={e => setFJumlah(e.target.value)} />
                  </div>
                  <div>
                    <label style={S.label}>{tab === 'masuk' ? 'Tanggal Masuk' : 'Tanggal Keluar'}</label>
                    <input style={S.input} type="date" value={fTanggal} onChange={e => setFTanggal(e.target.value)} />
                  </div>
                </div>
                <label style={S.label}>Keterangan <span style={{ ...S.muted, fontWeight: 400 }}>(boleh kosong)</span></label>
                <input
                  style={S.input}
                  placeholder={tab === 'masuk' ? 'mis. Kiriman dari pemasok, no. surat jalan' : 'mis. Dikirim ke toko cabang, diambil kurir'}
                  value={fKet} onChange={e => setFKet(e.target.value)}
                />
                <button style={{ ...S.btn, background: GREEN, color: '#fff', marginTop: 4 }} onClick={() => catat(tab)}>
                  {tab === 'masuk' ? 'Simpan Barang Masuk' : 'Simpan Barang Keluar'}
                </button>
              </div>

              <h3 style={S.h3b}>Riwayat {tab === 'masuk' ? 'Barang Masuk' : 'Barang Keluar'}</h3>
              <div style={S.tableCard}>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 640 }}>
                    <thead><tr>
                      <th style={S.th}>Tanggal</th>
                      <th style={S.th}>Barang</th>
                      <th style={S.th}>Jumlah</th>
                      <th style={S.th}>Keterangan</th>
                      <th style={{ ...S.th, textAlign: 'right' }}>Aksi</th>
                    </tr></thead>
                    <tbody>
                      {(tab === 'masuk' ? doc.masuk : doc.keluar).map(e => (
                        <tr key={e.id}>
                          <td style={{ ...S.td, whiteSpace: 'nowrap' }}>{fmtDate(e.tanggal)}</td>
                          <td style={{ ...S.td, fontWeight: 600 }}>{itemName(e.itemId)}</td>
                          <td style={{ ...S.td, fontWeight: 700, fontFamily: 'ui-monospace, monospace', color: tab === 'masuk' ? GREEN : '#dc2626' }}>
                            {tab === 'masuk' ? '+' : '-'}{e.jumlah}
                          </td>
                          <td style={S.td}>{e.ket || '—'}</td>
                          <td style={{ ...S.td, textAlign: 'right' }}>
                            <button
                              style={{ ...S.btn, background: '#fee2e2', color: '#b91c1c', padding: '6px 12px', fontSize: 13 }}
                              onClick={() => hapusCatatan(tab, e.id)}
                            >Hapus</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {(tab === 'masuk' ? doc.masuk : doc.keluar).length === 0 && (
                  <div style={{ padding: '44px 20px', textAlign: 'center' }}>
                    <div style={{ fontWeight: 700, fontSize: 16, color: '#111827', marginBottom: 8 }}>
                      {tab === 'masuk' ? 'Belum ada catatan barang masuk' : 'Belum ada catatan barang keluar'}
                    </div>
                    <div style={S.muted}>
                      {tab === 'masuk' ? 'Catatan akan muncul di sini setelah barang masuk disimpan.' : 'Catatan akan muncul di sini setelah barang keluar disimpan.'}
                    </div>
                  </div>
                )}
              </div>
            </>)}

            {tab === 'rekap' && (<>
              <h2 style={S.h2}>Rekap Stok</h2>
              <p style={S.lead2}>Ringkasan pergerakan barang masuk dan keluar per minggu, serta per bulan dalam satu tahun. Klik salah satu baris periode untuk melihat rincian per barang pada periode itu.</p>

              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end', marginBottom: 16, flexWrap: 'wrap' }}>
                <div style={{ display: 'inline-flex', background: '#e5e7eb', borderRadius: 10, padding: 4, gap: 4 }}>
                  <button style={S.segBtn(rekapMode === 'minggu')} onClick={() => { setRekapMode('minggu'); setPeriodeAktif(null); }}>Per Minggu</button>
                  <button style={S.segBtn(rekapMode === 'bulan')} onClick={() => { setRekapMode('bulan'); setPeriodeAktif(null); }}>Per Bulan</button>
                </div>
                <div>
                  <label style={{ ...S.label, marginBottom: 6 }}>Tahun</label>
                  <select style={{ ...S.input, marginBottom: 0, width: 'auto', minWidth: 150 }} value={rekapTahun} onChange={e => { setRekapTahun(+e.target.value); setPeriodeAktif(null); }}>
                    {tahunTersedia.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
              </div>

              <div style={S.statGrid}>
                {[
                  ['TOTAL MASUK', `${rekapTahunData.totMasuk} unit`],
                  ['TOTAL KELUAR', `${rekapTahunData.totKeluar} unit`],
                  ['SELISIH BERSIH', `${rekapTahunData.selisih} unit`],
                  ['JUMLAH TRANSAKSI', `${rekapTahunData.trx}`],
                ].map(([label, val]) => (
                  <div key={label} style={S.stat}>
                    <div style={S.statLabel}>{label}</div>
                    <div style={S.statVal}>{val}</div>
                  </div>
                ))}
              </div>

              <div style={S.tableCard}>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 720 }}>
                    <thead><tr>
                      <th style={S.th}>{rekapMode === 'minggu' ? 'Minggu' : 'Bulan'}</th>
                      <th style={S.th}>Trx Masuk</th>
                      <th style={S.th}>Total Masuk</th>
                      <th style={S.th}>Trx Keluar</th>
                      <th style={S.th}>Total Keluar</th>
                      <th style={{ ...S.th, textAlign: 'right' }}>Selisih</th>
                    </tr></thead>
                    <tbody>
                      {rekapTahunData.rows.map(r => {
                        const aktif = periodeAktif && periodeAktif.key === r.key;
                        return (
                          <tr key={r.key}
                            onClick={() => setPeriodeAktif({ mode: rekapMode, tahun: rekapTahun, key: r.key })}
                            style={{ cursor: 'pointer', background: aktif ? '#f0fdf4' : undefined }}>
                            <td style={{ ...S.td, fontWeight: 600 }}>
                              {labelPeriode(r.key)}
                              {rekapMode === 'minggu' && <span style={{ ...S.muted, fontWeight: 400 }}> · {weekRange(rekapTahun, +r.key.slice(1))}</span>}
                            </td>
                            <td style={{ ...S.td, fontFamily: 'ui-monospace, monospace' }}>{r.trxMasuk}</td>
                            <td style={{ ...S.td, fontFamily: 'ui-monospace, monospace', color: GREEN, fontWeight: 600 }}>+{r.totMasuk}</td>
                            <td style={{ ...S.td, fontFamily: 'ui-monospace, monospace' }}>{r.trxKeluar}</td>
                            <td style={{ ...S.td, fontFamily: 'ui-monospace, monospace', color: '#dc2626', fontWeight: 600 }}>-{r.totKeluar}</td>
                            <td style={{ ...S.td, textAlign: 'right', fontWeight: 700, fontFamily: 'ui-monospace, monospace' }}>{r.selisih > 0 ? '+' : ''}{r.selisih}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                {rekapTahunData.rows.length === 0 && (
                  <div style={{ padding: '44px 20px', textAlign: 'center' }}>
                    <div style={{ fontWeight: 700, fontSize: 16, color: '#111827', marginBottom: 8 }}>Belum ada transaksi pada tahun ini</div>
                    <div style={S.muted}>Rekap akan muncul setelah ada catatan barang masuk atau keluar pada tahun yang dipilih.</div>
                  </div>
                )}
              </div>

              <div style={{ ...S.panel, marginTop: 16 }}>
                <h3 style={S.h3}>Rincian per Barang</h3>
                {!rincian && <p style={{ ...S.muted, margin: 0 }}>Belum ada periode yang dapat ditampilkan pada tahun ini.</p>}
                {rincian && (<>
                  <p style={{ ...S.muted, margin: '-8px 0 12px', fontSize: 14 }}>
                    Periode: <strong style={{ color: '#111827' }}>{labelPeriode(periodeAktif.key)}</strong>
                    {rekapMode === 'minggu' && ` · ${weekRange(rekapTahun, +periodeAktif.key.slice(1))}`} · Tahun {rekapTahun}
                  </p>
                  <div style={S.tableCard}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead><tr>
                        <th style={S.th}>Barang</th>
                        <th style={S.th}>Masuk</th>
                        <th style={S.th}>Keluar</th>
                        <th style={{ ...S.th, textAlign: 'right' }}>Selisih</th>
                      </tr></thead>
                      <tbody>
                        {rincian.map((r, i) => (
                          <tr key={i}>
                            <td style={{ ...S.td, fontWeight: 600 }}>{r.kode ? r.kode + ' · ' : ''}{r.nama}</td>
                            <td style={{ ...S.td, fontFamily: 'ui-monospace, monospace', color: GREEN }}>+{r.masuk}</td>
                            <td style={{ ...S.td, fontFamily: 'ui-monospace, monospace', color: '#dc2626' }}>-{r.keluar}</td>
                            <td style={{ ...S.td, textAlign: 'right', fontWeight: 700, fontFamily: 'ui-monospace, monospace' }}>{r.selisih > 0 ? '+' : ''}{r.selisih}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {rincian.length === 0 && (
                      <div style={{ padding: '36px 20px', textAlign: 'center' }}>
                        <div style={{ fontWeight: 700, fontSize: 15, color: '#111827', marginBottom: 8 }}>Tidak ada pergerakan barang</div>
                        <div style={S.muted}>Pada periode ini belum ada catatan barang masuk atau keluar.</div>
                      </div>
                    )}
                  </div>
                </>)}
              </div>
            </>)}

          </>)}
        </div>
      </div>
    </div>
  );
}
