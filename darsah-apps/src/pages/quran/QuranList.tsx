import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bookmark } from 'lucide-react';
import { SubHeader } from '../../components/layout/AppHeader';
import { surahList } from '../../data/staticData';
import { useApp } from '../../contexts/AppContext';

export default function QuranList() {
  const navigate = useNavigate();
  const { lastReadSurah } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'surah' | 'juz' | 'halaman'>('surah');

  const filtered = surahList.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.arabicName.includes(searchTerm) ||
    s.meaning.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fade-in">
      <SubHeader title="Al-Qur'an" />

      {/* Last Read Banner */}
      {lastReadSurah && (
        <div style={{ padding: '12px 16px 0' }}>
          <div
            className="quran-last-read"
            onClick={() => navigate(`/quran/${lastReadSurah.number}`)}
            style={{ margin: 0 }}
          >
            <div>
              <div className="qr-label">Lanjut Membaca</div>
              <div className="qr-surah">{lastReadSurah.name}</div>
              <div className="qr-ayah">Ayat {lastReadSurah.ayah}</div>
            </div>
            <div className="qr-arabic">{surahList.find(s => s.number === lastReadSurah.number)?.arabicName}</div>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="search-bar" style={{ top: 60 }}>
        <div className="search-input-wrap">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Cari surah..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', padding: '0 16px 8px', gap: 8, overflowX: 'auto' }}>
        {(['surah', 'juz', 'halaman'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '6px 20px', borderRadius: 999, border: 'none', cursor: 'pointer',
              fontWeight: 600, fontSize: 13, transition: 'all 0.2s', whiteSpace: 'nowrap',
              background: activeTab === tab ? 'var(--primary-gradient)' : 'var(--bg-card)',
              color: activeTab === tab ? 'white' : 'var(--text-secondary)',
              boxShadow: activeTab === tab ? 'var(--shadow-green)' : 'var(--shadow-sm)',
            }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Content based on tab */}
      {activeTab === 'surah' ? (
        <ul className="surah-list" style={{ background: 'var(--bg-card)', margin: '0 16px 16px', borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
          {filtered.map(surah => (
            <li key={surah.number}>
              <div className="surah-item" onClick={() => navigate(`/quran/${surah.startPage || surah.number}`)}>
                <div className="surah-number">{surah.number}</div>
                <div className="surah-info">
                  <div className="surah-name">{surah.name}</div>
                  <div className="surah-meta">{surah.type} • {surah.ayatCount} Ayat</div>
                </div>
                <div className="surah-arabic">{surah.arabicName}</div>
              </div>
            </li>
          ))}
        </ul>
      ) : activeTab === 'halaman' ? (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(4, 1fr)', 
          gap: 12, 
          padding: 16,
          background: 'var(--bg-card)',
          margin: '0 16px 16px',
          borderRadius: 16,
          boxShadow: 'var(--shadow-sm)'
        }}>
          {Array.from({ length: 604 }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => navigate(`/quran/${page}`)}
              style={{
                aspectRatio: '1',
                borderRadius: 12,
                border: '1px solid var(--border-light)',
                background: 'white',
                fontSize: 14,
                fontWeight: 600,
                color: 'var(--text-primary)',
                cursor: 'pointer'
              }}
            >
              {page}
            </button>
          ))}
        </div>
      ) : (
        <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>
          Fitur Juz akan segera hadir
        </div>
      )}
    </div>
  );
}
