import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SubHeader } from '../components/layout/AppHeader';

const IBADAH_MENUS = [
  { label: 'Jadwal Shalat', emoji: '🕰️', path: '/ibadah/shalat', desc: 'Waktu 5 shalat berdasarkan lokasi', color: '#fef9ec', iconColor: '#c8973a' },
  { label: 'Kompas Kiblat', emoji: '🧭', path: '/ibadah/kiblat', desc: 'Arah kiblat dari lokasimu', color: '#e6f7f5', iconColor: '#0d9488' },
  { label: 'Tasbih Digital', emoji: '📿', path: '/ibadah/tasbih', desc: 'Hitung dzikir dengan mudah', color: '#f3f0ff', iconColor: '#7c3aed' },
  { label: 'Doa Harian', emoji: '🤲', path: '/ibadah/doa', desc: 'Kumpulan doa sehari-hari', color: '#fff0f3', iconColor: '#e11d48' },
  { label: 'Kalkulator Zakat', emoji: '💰', path: '/ibadah/zakat', desc: 'Hitung zakat mal, profesi & lebih', color: '#eff6ff', iconColor: '#2563eb' },
  { label: 'Yasin & Tahlil', emoji: '📜', path: '/ibadah/yasin', desc: 'Teks lengkap Yasin dan Tahlilan', color: '#fff7ed', iconColor: '#ea580c' },
  { label: 'Kitab Maulid', emoji: '🌹', path: '/ibadah/maulid', desc: 'Al-Barzanji, Diba\', Simthud Durar', color: '#fff0f3', iconColor: '#e11d48' },
  { label: 'Kalender Hijriah', emoji: '📅', path: '/ibadah/kalender', desc: 'Kalender Islam & Jawa lengkap', color: '#e6f7f5', iconColor: '#0d9488' },
  { label: 'Ziarah Wali', emoji: '🕌', path: '/ibadah/ziarah', desc: 'Lokasi makam wali & ulama', color: '#e8f5ee', iconColor: '#1a7742' },
  { label: 'Wirid & Hizib', emoji: '🌟', path: '/ibadah/wirid', desc: 'Hizib Nahdliyah, Ratib Al-Haddad', color: '#fef9ec', iconColor: '#c8973a' },
];

export default function IbadahHub() {
  const navigate = useNavigate();
  return (
    <div className="fade-in">
      <SubHeader title="Menu Ibadah" />
      <div style={{ background: 'var(--primary-gradient)', padding: '20px 16px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 36 }}>🕌</div>
        <div style={{ color: 'white', fontWeight: 700, fontSize: 16, marginTop: 8 }}>Panduan Ibadah Lengkap</div>
        <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12, marginTop: 4 }}>
          Semua kebutuhan ibadah harian tersedia di sini
        </div>
      </div>
      <div style={{ padding: '16px' }}>
        {IBADAH_MENUS.map(m => (
          <div key={m.path}
            onClick={() => navigate(m.path)}
            style={{
              display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px',
              background: 'var(--bg-card)', borderRadius: 14, marginBottom: 10,
              boxShadow: 'var(--shadow-sm)', cursor: 'pointer', transition: 'all 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = 'var(--shadow-md)')}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = 'var(--shadow-sm)')}
          >
            <div style={{
              width: 48, height: 48, borderRadius: 12, display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: 22, background: m.color, flexShrink: 0,
            }}>
              {m.emoji}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 15, color: 'var(--text-primary)' }}>{m.label}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{m.desc}</div>
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: 18 }}>›</div>
          </div>
        ))}
      </div>
    </div>
  );
}
