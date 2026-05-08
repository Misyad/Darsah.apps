import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Search, MapPin } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { formatHijriDate, toHijri } from '../../utils/hijriCalendar';

export default function AppHeader() {
  const navigate = useNavigate();
  const { location } = useApp();
  const [dateStr, setDateStr] = useState('');
  const [hijriStr, setHijriStr] = useState('');

  useEffect(() => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    setDateStr(now.toLocaleDateString('id-ID', options));
    const hijri = toHijri(now);
    setHijriStr(`${hijri.day} ${hijri.monthName} ${hijri.year} H`);
  }, []);

  return (
    <header className="app-header" style={{
      background: 'var(--bg-card)',
      color: 'var(--text-primary)',
      borderBottom: '1px solid var(--border)',
      boxShadow: 'none'
    }}>
      <div className="header-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
        <div style={{
          width: 34, height: 34, borderRadius: 10,
          background: 'var(--primary)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 18, fontWeight: 800, color: 'white',
        }}>D</div>
        <div>
          <div className="app-name" style={{ color: 'var(--text-primary)' }}>Darsah Apps</div>
          <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: -2 }}>{hijriStr}</div>
        </div>
      </div>
      <div className="header-actions">
        <button className="header-icon-btn" onClick={() => navigate('/search')} aria-label="Cari" style={{ background: 'var(--border-light)', color: 'var(--text-secondary)' }}>
          <Search size={18} />
        </button>
        <button className="header-icon-btn" aria-label="Notifikasi" style={{ background: 'var(--border-light)', color: 'var(--text-secondary)' }}>
          <Bell size={18} />
        </button>
      </div>
    </header>
  );
}

interface SubHeaderProps {
  title: string;
  rightEl?: React.ReactNode;
  variant?: 'default' | 'green';
}

export function SubHeader({ title, rightEl, variant = 'default' }: SubHeaderProps) {
  const navigate = useNavigate();
  const isGreen = variant === 'green';
  
  return (
    <header className="sub-header" style={{
      background: isGreen ? 'linear-gradient(to right, #1b5e20, #2e7d32)' : 'var(--bg-card)',
      color: isGreen ? 'white' : 'var(--text-primary)',
      borderBottom: isGreen ? 'none' : '1px solid var(--border)',
      boxShadow: isGreen ? '0 2px 8px rgba(0,0,0,0.1)' : 'none'
    }}>
      <button className="back-btn" onClick={() => navigate(-1)} aria-label="Kembali" style={{ 
        background: isGreen ? 'rgba(255,255,255,0.15)' : 'var(--border-light)', 
        color: isGreen ? 'white' : 'var(--text-secondary)' 
      }}>
        ←
      </button>
      <span className="sub-header-title" style={{ color: isGreen ? 'white' : 'var(--text-primary)' }}>{title}</span>
      {rightEl}
    </header>
  );
}
