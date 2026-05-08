import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Moon, Sun, MapPin, Bell, Info, Heart, ChevronRight, LogOut, Share2 } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { SubHeader } from '../components/layout/AppHeader';

export default function Profil() {
  const { theme, toggleTheme, location } = useApp();
  const [notif, setNotif] = useState(true);
  const [adzan, setAdzan] = useState(true);

  const menuGroups = [
    {
      title: 'Pengaturan',
      items: [
        {
          icon: '🌙', label: 'Mode Gelap', desc: theme === 'dark' ? 'Aktif' : 'Nonaktif',
          iconBg: '#1a2e1f', iconColor: '#25a85a',
          action: toggleTheme,
          right: (
            <div className={`toggle-switch ${theme === 'dark' ? 'on' : ''}`} onClick={toggleTheme}>
              <div className="toggle-knob" />
            </div>
          ),
        },
        {
          icon: '🔔', label: 'Notifikasi Shalat', desc: notif ? 'Aktif' : 'Nonaktif',
          iconBg: '#fef9ec', iconColor: '#c8973a',
          action: () => setNotif(n => !n),
          right: (
            <div className={`toggle-switch ${notif ? 'on' : ''}`} onClick={() => setNotif(n => !n)}>
              <div className="toggle-knob" />
            </div>
          ),
        },
        {
          icon: '🔊', label: 'Suara Adzan', desc: adzan ? 'Habib Syech' : 'Nonaktif',
          iconBg: '#e6f7f5', iconColor: '#0d9488',
          action: () => setAdzan(a => !a),
          right: (
            <div className={`toggle-switch ${adzan ? 'on' : ''}`} onClick={() => setAdzan(a => !a)}>
              <div className="toggle-knob" />
            </div>
          ),
        },
        {
          icon: '📍', label: 'Lokasi Shalat', desc: location?.city || 'Belum diset',
          iconBg: '#fff0f3', iconColor: '#e11d48',
          right: <ChevronRight size={16} color="var(--text-muted)" />,
        },
      ],
    },
    {
      title: 'Tentang Aplikasi',
      items: [
        {
          icon: '📖', label: 'Tentang Darsah Apps', desc: 'Versi 1.0.0',
          iconBg: '#e8f5ee', iconColor: '#1a7742',
          right: <ChevronRight size={16} color="var(--text-muted)" />,
        },
        {
          icon: '❤️', label: 'Beri Rating', desc: 'Dukung pengembangan app',
          iconBg: '#fff0f3', iconColor: '#e11d48',
          right: <ChevronRight size={16} color="var(--text-muted)" />,
        },
        {
          icon: '🔗', label: 'Bagikan Aplikasi', desc: 'Ajak teman menggunakan Darsah',
          iconBg: '#eff6ff', iconColor: '#2563eb',
          right: <ChevronRight size={16} color="var(--text-muted)" />,
          action: () => navigator.share?.({ title: 'Darsah Apps', text: 'Aplikasi Islamic Super App terbaik!', url: window.location.origin }),
        },
        {
          icon: '📞', label: 'Hubungi Kami', desc: 'info@darsahapps.id',
          iconBg: '#f3f0ff', iconColor: '#7c3aed',
          right: <ChevronRight size={16} color="var(--text-muted)" />,
        },
      ],
    },
  ];

  return (
    <div className="fade-in">
      <SubHeader title="Profil" />

      {/* Profile Hero */}
      <div className="profile-hero">
        <div className="profile-avatar">👤</div>
        <div className="profile-name">Assalamu'alaikum</div>
        <div className="profile-email">Selamat Datang di Darsah Apps</div>
        <div style={{ marginTop: 12, display: 'flex', gap: 16, justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: 'white' }}>114</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.75)' }}>Surah</div>
          </div>
          <div style={{ width: 1, background: 'rgba(255,255,255,0.2)' }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: 'white' }}>10+</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.75)' }}>Fitur</div>
          </div>
          <div style={{ width: 1, background: 'rgba(255,255,255,0.2)' }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: 'white' }}>∞</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.75)' }}>Konten</div>
          </div>
        </div>
      </div>

      {/* Stats floating card */}
      <div style={{ padding: '0 16px' }}>
        {menuGroups.map(group => (
          <div key={group.title} style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8, paddingLeft: 4 }}>
              {group.title}
            </div>
            <div style={{ background: 'var(--bg-card)', borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
              {group.items.map((item, i) => (
                <div key={i} className="profile-menu-item" onClick={item.action}>
                  <div className="profile-menu-icon" style={{ background: item.iconBg, color: item.iconColor }}>
                    {item.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div className="profile-menu-label">{item.label}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{item.desc}</div>
                  </div>
                  {item.right}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ padding: '8px 16px 32px', textAlign: 'center' }}>
        <div style={{ fontSize: 20, marginBottom: 8 }}>🕌</div>
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--primary)' }}>Darsah Apps</div>
        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>
          Islamic Super App • v1.0.0
        </div>
        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>
          Dibuat dengan ❤️ untuk umat Islam
        </div>
        <div style={{ marginTop: 16, fontFamily: 'Amiri, serif', fontSize: 18, color: 'var(--primary)', direction: 'rtl' }}>
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
        </div>
      </div>
    </div>
  );
}
