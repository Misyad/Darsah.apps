import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { SubHeader } from '../../components/layout/AppHeader';
import { doaList } from '../../data/staticData';
import { endpoints } from '../../utils/api';

const CATEGORIES = ['Semua', 'Harian', 'Shalat', 'Muharram', 'Rajab', "Sya'ban", 'Ramadhan', 'Keluarga', 'Masjid', 'Tidur', 'Perjalanan', 'Makan & Minum', 'Kamar Mandi'];

export default function Doa() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Semua');
  const [expanded, setExpanded] = useState<number | null>(null);
  const [doaData, setDoaData] = useState(doaList);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    const fetchDoas = async () => {
      setLoading(true);
      try {
        const res = await fetch(endpoints.duas);
        const data = await res.json();
        if (Array.isArray(data)) setDoaData(data);
      } catch (err) {
        console.error('Failed to fetch from backend, using fallback:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDoas();
  }, []);

  const filtered = doaData.filter(d =>
    (category === 'Semua' || d.category === category) &&
    (d.title.toLowerCase().includes(search.toLowerCase()) || d.arabic.includes(search))
  );

  return (
    <div className="fade-in">
      <SubHeader title="Doa Harian" />

      {/* Search */}
      <div className="search-bar" style={{ top: 60 }}>
        <div className="search-input-wrap">
          <Search size={16} className="search-icon" />
          <input className="search-input" placeholder="Cari doa..."
            value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      {/* Category chips */}
      <div style={{ display: 'flex', gap: 8, padding: '0 16px 12px', overflowX: 'auto', scrollbarWidth: 'none' }}>
        {CATEGORIES.map(cat => (
          <button key={cat} onClick={() => setCategory(cat)}
            style={{
              flexShrink: 0, padding: '6px 14px', borderRadius: 999, border: 'none', cursor: 'pointer',
              fontWeight: 500, fontSize: 12,
              background: category === cat ? 'var(--primary-gradient)' : 'var(--bg-card)',
              color: category === cat ? 'white' : 'var(--text-secondary)',
              boxShadow: category === cat ? 'var(--shadow-green)' : 'var(--shadow-sm)',
            }}>{cat}</button>
        ))}
      </div>

      {/* Doa list */}
      <div style={{ padding: '0 16px 24px' }}>
        {filtered.map(doa => (
          <div key={doa.id} className="doa-item" onClick={() => setExpanded(expanded === doa.id ? null : doa.id)}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="doa-title">{doa.title}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className="badge badge-green">{doa.category}</span>
                <span style={{ color: 'var(--text-muted)', fontSize: 18 }}>{expanded === doa.id ? '▲' : '▼'}</span>
              </div>
            </div>
            {expanded === doa.id && (
              <div className="slide-up" style={{ marginTop: 12 }}>
                <div className="doa-arabic">{doa.arabic}</div>
                <div className="doa-latin">{doa.latin}</div>
                <div className="doa-translation">{doa.translation}</div>
              </div>
            )}
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">🤲</div>
            <div className="empty-title">Doa tidak ditemukan</div>
            <div className="empty-text">Coba kata kunci lain</div>
          </div>
        )}
      </div>
    </div>
  );
}
