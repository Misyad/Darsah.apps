import React, { useState } from 'react';
import { Search, MapPin, ExternalLink, Map, Navigation } from 'lucide-react';
import { SubHeader } from '../../components/layout/AppHeader';
import { ziarahList } from '../../data/staticData';

export default function Ziarah() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('Semua');
  const [selected, setSelected] = useState<(typeof ziarahList)[0] | null>(null);

  const types = ['Semua', 'Wali Songo', 'Ulama NU'];
  const filtered = ziarahList.filter(z =>
    (filter === 'Semua' || z.type === filter) &&
    z.name.toLowerCase().includes(search.toLowerCase())
  );

  if (selected) {
    return (
      <div className="fade-in">
        <SubHeader title={selected.name} />
        <div style={{ background: 'var(--primary-gradient)', padding: '24px 16px', textAlign: 'center' }}>
          <div style={{ color: 'white', opacity: 0.5 }}><Map size={64} /></div>
          <div style={{ color: 'white', fontWeight: 700, fontSize: 20, marginTop: 12 }}>{selected.name}</div>
          <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, marginTop: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
            <MapPin size={12} /> {selected.location}
          </div>
          <span style={{ marginTop: 8, display: 'inline-block', background: 'rgba(255,255,255,0.25)', color: 'white', padding: '3px 10px', borderRadius: 999, fontSize: 11, fontWeight: 600 }}>{selected.type}</span>
        </div>
        <div style={{ padding: 16 }}>
          <div className="card" style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Biografi Singkat</div>
            <div style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{selected.desc}</div>
          </div>
          <div className="card" style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Lokasi Makam</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <MapPin size={16} color="var(--primary)" />
              <span style={{ fontSize: 14, color: 'var(--text-primary)' }}>{selected.location}</span>
            </div>
            <div style={{ background: 'var(--bg-section)', borderRadius: 12, padding: '12px', fontSize: 12, color: 'var(--text-muted)', marginBottom: 12 }}>
              🌍 Koordinat: {selected.lat.toFixed(4)}°, {selected.lng.toFixed(4)}°
            </div>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${selected.lat},${selected.lng}`}
              target="_blank" rel="noopener noreferrer"
              className="btn-primary"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, textDecoration: 'none', color: 'white' }}
            >
              <ExternalLink size={16} />
              Buka di Google Maps
            </a>
          </div>
          <div className="card">
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Doa Ziarah</div>
            <div style={{ fontFamily: 'Amiri, serif', fontSize: 18, direction: 'rtl', textAlign: 'right', color: 'var(--text-arabic)', lineHeight: 1.8, marginBottom: 8 }}>
              السَّلَامُ عَلَيْكُمْ أَهْلَ الدِّيَارِ مِنَ الْمُؤْمِنِينَ وَالْمُسْلِمِينَ وَإِنَّا إِنْ شَاءَ اللهُ بِكُمْ لَاحِقُونَ
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', fontStyle: 'italic', lineHeight: 1.6 }}>
              "Assalamu'alaikum ahlad-diyari minal mu'miniina wal muslimiin, wa inna insya Allahu bikum lahiquun."
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 8, borderTop: '1px solid var(--border-light)', paddingTop: 8 }}>
              "Semoga keselamatan atas kalian, wahai para penghuni kubur dari kaum mukminin dan muslimin. Sesungguhnya kami insya Allah akan menyusul kalian."
            </div>
          </div>
          <button onClick={() => setSelected(null)} style={{
            width: '100%', marginTop: 12, padding: 12, border: '1px solid var(--border)',
            borderRadius: 12, cursor: 'pointer', background: 'var(--bg-card)',
            color: 'var(--text-secondary)', fontWeight: 600, fontSize: 14,
          }}>← Kembali ke daftar</button>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <SubHeader title="Ziarah" />
      <div style={{ background: 'var(--primary-gradient)', padding: '16px', textAlign: 'center' }}>
        <div style={{ color: 'white', fontWeight: 700, fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          <Navigation size={18} /> Wisata Ziarah Wali
        </div>
        <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12, marginTop: 4 }}>Temukan makam para ulama & wali</div>
      </div>
      <div style={{ padding: '12px 16px 0' }}>
        <div className="search-input-wrap" style={{ marginBottom: 12 }}>
          <Search size={16} className="search-icon" />
          <input className="search-input" placeholder="Cari nama makam..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          {types.map(t => (
            <button key={t} onClick={() => setFilter(t)} style={{
              padding: '6px 14px', borderRadius: 999, border: 'none', cursor: 'pointer',
              fontWeight: 500, fontSize: 12,
              background: filter === t ? 'var(--primary-gradient)' : 'var(--bg-card)',
              color: filter === t ? 'white' : 'var(--text-secondary)',
              boxShadow: filter === t ? 'var(--shadow-green)' : 'var(--shadow-sm)',
            }}>{t}</button>
          ))}
        </div>
      </div>
      <div style={{ padding: '0 16px 24px' }}>
        {filtered.map(z => (
          <div key={z.id} className="ziarah-item" onClick={() => setSelected(z)}>
            <div className="ziarah-icon" style={{ background: 'var(--primary-light)', color: 'var(--primary)', borderRadius: 12, width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Map size={24} />
            </div>
            <div style={{ flex: 1 }}>
              <div className="ziarah-name">{z.name}</div>
              <div className="ziarah-location"><MapPin size={10} />{z.location}</div>
              <div className="ziarah-desc">{z.desc}</div>
              <div style={{ marginTop: 6 }}><span className="badge badge-green">{z.type}</span></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
