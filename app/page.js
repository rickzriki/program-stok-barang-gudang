'use client';
import { useEffect, useMemo, useState } from 'react';

const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
const today = () => new Date().toISOString().slice(0, 10);
const fmtDate = (s) => {
  try { return new Date(s + 'T00:00:00').toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }); }
  catch { return s; }
};

const S = {
  wrap: { maxWidth: 720, margin: '0 auto', padding: 16 },
  h1: { fontSize: 22, margin: '8px 0 16px' },
  tabs: { display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' },
  card: { background: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, boxShadow: '0 1px 3px rgba(0,0,0,.08)' },
  input: { width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 15, boxSizing: 'border-box', marginBottom: 10 },
  btn: { padding: '10px 16px', borderRadius: 8, border: 0, fontSize: 15, cursor: 'pointer', fontWeight: 600 },
  row: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #f1f5f9' },
  th: { textAlign: 'left', padding: '8px 6px', fontSize: 13, color: '#64748b', borderBottom: '2px solid #e2e8f0' },
  td: { padding: '8px 6px', fontSize: 14, borderBottom: '1px solid #f1f5f9' },
  muted: { color: '#64748b', fontSize: 13 },
  err: { color: '#dc2626', fontSize: 13, marginBottom: 8 },
};

function TabBtn({ active, onClick, children }) {
  return (
    <button onClick={onClick} style={{ ...S.btn, background: active ? '#2563eb' : '#e2e8f0', color: active ? '#fff' : '#334155' }}>
      {children}
    </button>
  );
}

export default function Page() {
  const [doc, setDoc] = useState({ items: [], masuk: [], keluar: [] });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState('stok');
  const [err, setErr] = useState('');

  // forms
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
        <div style={{ fontWeight: 600 }}>{itemName(e.itemId)}</div>
        <div style={S.muted}>{fmtDate(e.tanggal)}{e.ket ? ' · ' + e.ket : ''}</div>
      </div>
      <div style={{ fontWeight: 700, color: jenis === 'masuk' ? '#16a34a' : '#dc2626' }}>
        {jenis === 'masuk' ? '+' : '-'}{e.jumlah}
      </div>
    </div>
  );

  return (
    <div style={S.wrap}>
      <h1 style={S.h1}>📦 Stok Barang Gudang</h1>
      <div style={S.tabs}>
        <TabBtn active={tab==='stok'} onClick={()=>setTab('stok')}>Stok</TabBtn>
        <TabBtn active={tab==='masuk'} onClick={()=>setTab('masuk')}>Barang Masuk</TabBtn>
        <TabBtn active={tab==='keluar'} onClick={()=>setTab('keluar')}>Barang Keluar</TabBtn>
        <TabBtn active={tab==='rekap'} onClick={()=>setTab('rekap')}>Rekap</TabBtn>
      </div>
      {err && <div style={S.err}>{err}</div>}
      {saving && <div style={S.muted}>Menyimpan…</div>}

      {loading ? <div style={S.card}>Memuat data…</div> : (<>
        {tab === 'stok' && (
          <div style={S.card}>
            <h3 style={{marginTop:0}}>Tambah Barang</h3>
            <input style={S.input} placeholder="Nama barang" value={namaBaru} onChange={e=>setNamaBaru(e.target.value)} />
            <input style={S.input} placeholder="Stok awal (opsional)" type="number" min="0" value={stokAwal} onChange={e=>setStokAwal(e.target.value)} />
            <button style={{...S.btn, background:'#2563eb', color:'#fff'}} onClick={tambahBarang}>+ Tambah</button>
            <h3>Daftar Stok</h3>
            {doc.items.length === 0 && <div style={S.muted}>Belum ada barang.</div>}
            {doc.items.map(i => (
              <div key={i.id} style={S.row}>
                <div style={{fontWeight:600}}>{i.nama}</div>
                <div>
                  <span style={{fontWeight:700, marginRight:12}}>{i.stok}</span>
                  <button style={{...S.btn, background:'#fee2e2', color:'#b91c1c', padding:'6px 10px', fontSize:13}} onClick={()=>hapusBarang(i.id)}>Hapus</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {(tab === 'masuk' || tab === 'keluar') && (
          <>
            <div style={S.card}>
              <h3 style={{marginTop:0}}>{tab === 'masuk' ? 'Catat Barang Masuk' : 'Catat Barang Keluar'}</h3>
              <select style={S.input} value={fItem} onChange={e=>setFItem(e.target.value)}>
                <option value="">— Pilih barang —</option>
                {doc.items.map(i => <option key={i.id} value={i.id}>{i.nama} (stok: {i.stok})</option>)}
              </select>
              <input style={S.input} type="number" min="1" placeholder="Jumlah" value={fJumlah} onChange={e=>setFJumlah(e.target.value)} />
              <input style={S.input} type="date" value={fTanggal} onChange={e=>setFTanggal(e.target.value)} />
              <input style={S.input} placeholder="Keterangan (opsional)" value={fKet} onChange={e=>setFKet(e.target.value)} />
              <button style={{...S.btn, background: tab==='masuk' ? '#16a34a' : '#dc2626', color:'#fff'}} onClick={()=>catat(tab)}>Simpan</button>
            </div>
            <div style={S.card}>
              <h3 style={{marginTop:0}}>Riwayat {tab === 'masuk' ? 'Masuk' : 'Keluar'}</h3>
              {(tab === 'masuk' ? doc.masuk : doc.keluar).length === 0 && <div style={S.muted}>Belum ada catatan.</div>}
              {(tab === 'masuk' ? doc.masuk : doc.keluar).map(e => listRow(e, tab))}
            </div>
          </>
        )}

        {tab === 'rekap' && (
          <div style={S.card}>
            <h3 style={{marginTop:0}}>Rekap</h3>
            <div style={{...S.tabs, marginBottom: 12}}>
              <TabBtn active={rekapMode==='minggu'} onClick={()=>setRekapMode('minggu')}>Mingguan</TabBtn>
              <TabBtn active={rekapMode==='bulan'} onClick={()=>setRekapMode('bulan')}>Bulanan</TabBtn>
              <TabBtn active={rekapMode==='tahun'} onClick={()=>setRekapMode('tahun')}>Tahunan</TabBtn>
            </div>
            <table style={{width:'100%', borderCollapse:'collapse'}}>
              <thead><tr>
                <th style={S.th}>Barang</th><th style={S.th}>Masuk</th><th style={S.th}>Keluar</th><th style={S.th}>Stok</th>
              </tr></thead>
              <tbody>
                {rekap.map((r,i) => (
                  <tr key={i}>
                    <td style={S.td}>{r.nama}</td>
                    <td style={{...S.td, color:'#16a34a'}}>+{r.masuk}</td>
                    <td style={{...S.td, color:'#dc2626'}}>-{r.keluar}</td>
                    <td style={{...S.td, fontWeight:700}}>{r.stok}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {rekap.length === 0 && <div style={S.muted}>Belum ada barang.</div>}
          </div>
        )}
      </>)}
      <div style={{...S.muted, textAlign:'center', marginTop:16}}>Data tersimpan otomatis di database.</div>
    </div>
  );
}
