import React, { useState } from 'react';
import { SubHeader } from '../../components/layout/AppHeader';
import { Calculator } from 'lucide-react';

const NISAB_EMAS = 85; // gram
const HARGA_EMAS = 1350000; // per gram (estimasi)
const NISAB_RUPIAH = NISAB_EMAS * HARGA_EMAS;
const KADAR_ZAKAT = 0.025;
const BERAS_PER_KG = 12000;
const FIDYAH_PER_HARI = 30000;

type ZakatTab = 'maal' | 'profesi' | 'emas' | 'fitrah' | 'fidyah' | 'pertanian';

export default function Zakat() {
  const [tab, setTab] = useState<ZakatTab>('maal');
  const [result, setResult] = useState<string | null>(null);
  const [resultLabel, setResultLabel] = useState('');

  // Form values
  const [harta, setHarta] = useState('');
  const [gaji, setGaji] = useState('');
  const [emas, setEmas] = useState('');
  const [jiwaDitanggung, setJiwaDitanggung] = useState('1');
  const [hariTinggal, setHariTinggal] = useState('1');
  const [hasilPanen, setHasilPanen] = useState('');

  const fmt = (n: number) => `Rp ${n.toLocaleString('id-ID')}`;
  const fmtKg = (n: number) => `${n.toFixed(2)} kg`;

  const hitungZakat = () => {
    switch (tab) {
      case 'maal': {
        const h = parseFloat(harta.replace(/\D/g, '')) || 0;
        if (h >= NISAB_RUPIAH) {
          setResult(fmt(h * KADAR_ZAKAT));
          setResultLabel(`Wajib Zakat Maal (Harta Rp ${h.toLocaleString('id-ID')})`);
        } else {
          setResult('Belum Wajib Zakat');
          setResultLabel(`Harta belum mencapai nisab (${fmt(NISAB_RUPIAH)})`);
        }
        break;
      }
      case 'profesi': {
        const g = parseFloat(gaji.replace(/\D/g, '')) || 0;
        setResult(fmt(g * KADAR_ZAKAT));
        setResultLabel(`Zakat Profesi per bulan (Gaji ${fmt(g)})`);
        break;
      }
      case 'emas': {
        const e = parseFloat(emas) || 0;
        if (e >= NISAB_EMAS) {
          setResult(fmt(e * HARGA_EMAS * KADAR_ZAKAT));
          setResultLabel(`Zakat Emas ${e}g (Nisab: ${NISAB_EMAS}g)`);
        } else {
          setResult('Belum Wajib Zakat');
          setResultLabel(`Emas belum mencapai nisab (${NISAB_EMAS}g)`);
        }
        break;
      }
      case 'fitrah': {
        const jiwa = parseInt(jiwaDitanggung) || 1;
        setResult(`${jiwa * 2.5} kg beras`);
        setResultLabel(`Zakat Fitrah untuk ${jiwa} jiwa`);
        break;
      }
      case 'fidyah': {
        const hari = parseInt(hariTinggal) || 1;
        setResult(fmt(hari * FIDYAH_PER_HARI));
        setResultLabel(`Fidyah untuk ${hari} hari (±${fmtKg(hari * 0.6)} beras)`);
        break;
      }
      case 'pertanian': {
        const hp = parseFloat(hasilPanen.replace(/\D/g, '')) || 0;
        const kadar = 0.05; // dengan irigasi
        setResult(fmt(hp * kadar));
        setResultLabel(`Zakat Pertanian 5% (Hasil Rp ${hp.toLocaleString('id-ID')})`);
        break;
      }
    }
  };

  const TABS: { key: ZakatTab; label: string; emoji: string }[] = [
    { key: 'maal', label: 'Maal', emoji: '💰' },
    { key: 'profesi', label: 'Profesi', emoji: '💼' },
    { key: 'emas', label: 'Emas', emoji: '🥇' },
    { key: 'fitrah', label: 'Fitrah', emoji: '🌙' },
    { key: 'fidyah', label: 'Fidyah', emoji: '📿' },
    { key: 'pertanian', label: 'Pertanian', emoji: '🌾' },
  ];

  return (
    <div className="fade-in">
      <SubHeader title="Kalkulator Zakat" />

      {/* Nisab info */}
      <div style={{ padding: '12px 16px', background: 'var(--primary-xlight)', borderBottom: '1px solid var(--border-light)' }}>
        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Nisab saat ini (≈ estimasi):</div>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--primary)' }}>
          {fmt(NISAB_RUPIAH)} | {NISAB_EMAS}g emas
        </div>
      </div>

      {/* Tab row */}
      <div className="zakat-tabs">
        {TABS.map(t => (
          <button key={t.key} className={`zakat-tab ${tab === t.key ? 'active' : ''}`}
            onClick={() => { setTab(t.key); setResult(null); }}>
            {t.emoji} {t.label}
          </button>
        ))}
      </div>

      {/* Forms */}
      <div style={{ padding: '0 16px' }}>
        {tab === 'maal' && (
          <>
            <div className="form-group">
              <label className="form-label">Total Harta (Rp) yang dimiliki ≥ 1 tahun</label>
              <input className="form-input" type="number" placeholder="Contoh: 50000000"
                value={harta} onChange={e => setHarta(e.target.value)} />
            </div>
          </>
        )}
        {tab === 'profesi' && (
          <div className="form-group">
            <label className="form-label">Penghasilan Bersih per Bulan (Rp)</label>
            <input className="form-input" type="number" placeholder="Contoh: 5000000"
              value={gaji} onChange={e => setGaji(e.target.value)} />
          </div>
        )}
        {tab === 'emas' && (
          <div className="form-group">
            <label className="form-label">Jumlah Emas (gram)</label>
            <input className="form-input" type="number" placeholder="Contoh: 100"
              value={emas} onChange={e => setEmas(e.target.value)} />
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>Harga emas estimasi: Rp {HARGA_EMAS.toLocaleString('id-ID')}/gram</div>
          </div>
        )}
        {tab === 'fitrah' && (
          <div className="form-group">
            <label className="form-label">Jumlah Jiwa yang Ditanggung</label>
            <input className="form-input" type="number" min="1" placeholder="1"
              value={jiwaDitanggung} onChange={e => setJiwaDitanggung(e.target.value)} />
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>= 2.5 kg beras per jiwa atau senilainya</div>
          </div>
        )}
        {tab === 'fidyah' && (
          <div className="form-group">
            <label className="form-label">Jumlah Hari yang Ditinggal</label>
            <input className="form-input" type="number" min="1" placeholder="1"
              value={hariTinggal} onChange={e => setHariTinggal(e.target.value)} />
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>Fidyah ≈ Rp {FIDYAH_PER_HARI.toLocaleString('id-ID')} per hari (sekali makan kenyang)</div>
          </div>
        )}
        {tab === 'pertanian' && (
          <div className="form-group">
            <label className="form-label">Hasil Panen / Pendapatan Pertanian (Rp)</label>
            <input className="form-input" type="number" placeholder="Contoh: 10000000"
              value={hasilPanen} onChange={e => setHasilPanen(e.target.value)} />
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>5% jika menggunakan irigasi, 10% tanpa irigasi</div>
          </div>
        )}

        <button className="btn-primary" onClick={hitungZakat}>
          <Calculator size={16} style={{ marginRight: 8 }} />
          Hitung Zakat
        </button>

        {result && (
          <div className="result-box">
            <div className="result-label">{resultLabel}</div>
            <div className="result-amount">{result}</div>
            <div style={{ marginTop: 12 }}>
              <button className="btn-primary" style={{ background: 'var(--gold-gradient)' }}>
                💚 Bayar via LAZISNU
              </button>
            </div>
          </div>
        )}

        {/* Info */}
        <div style={{ marginTop: 16, padding: 12, background: 'var(--bg-section)', borderRadius: 12, fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.6 }}>
          <strong style={{ color: 'var(--text-secondary)' }}>ℹ️ Catatan:</strong> Hasil kalkulasi ini merupakan estimasi. Untuk kepastian hukum, konsultasikan dengan ulama atau lembaga amil zakat terpercaya.
        </div>
      </div>
    </div>
  );
}
