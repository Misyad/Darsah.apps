import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, BookOpen, Compass, Newspaper, User } from 'lucide-react';

const navItems = [
  { path: '/', icon: Home, label: 'Beranda' },
  { path: '/quran', icon: BookOpen, label: 'Al-Qur\'an' },
  { path: '/ibadah', icon: Compass, label: 'Ibadah' },
  { path: '/konten', icon: Newspaper, label: 'Konten' },
  { path: '/profil', icon: User, label: 'Profil' },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="bottom-nav">
      {navItems.map(({ path, icon: Icon, label }) => (
        <button
          key={path}
          className={`nav-item ${isActive(path) ? 'active' : ''}`}
          onClick={() => navigate(path)}
        >
          <span className="nav-item-icon">
            <Icon size={22} strokeWidth={isActive(path) ? 2.5 : 1.8} />
          </span>
          <span className="nav-item-label">{label}</span>
        </button>
      ))}
    </nav>
  );
}
