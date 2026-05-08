import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import AppHeader from './components/layout/AppHeader';
import BottomNav from './components/layout/BottomNav';

// Pages
import Home from './pages/Home';
import QuranList from './pages/quran/QuranList';
import QuranSurah from './pages/quran/QuranSurah';
import IbadahHub from './pages/IbadahHub';
import PrayerTimes from './pages/ibadah/PrayerTimes';
import Qibla from './pages/ibadah/Qibla';
import Tasbih from './pages/ibadah/Tasbih';
import Doa from './pages/ibadah/Doa';
import Zakat from './pages/ibadah/Zakat';
import Yasin from './pages/ibadah/Yasin';
import Maulid from './pages/ibadah/Maulid';
import Kalender from './pages/ibadah/Kalender';
import Ziarah from './pages/ibadah/Ziarah';
import Wirid from './pages/ibadah/Wirid';
import KontenHub from './pages/KontenHub';
import Profil from './pages/Profil';

// Pages that have their own SubHeader (no AppHeader)
const SUB_HEADER_ROUTES = [
  '/quran/', '/ibadah/', '/konten/', '/profil'
];

// Pages with NO bottom nav (deep detail pages)
const NO_BOTTOM_NAV: string[] = [];

function AppLayout() {
  const location = useLocation();
  const path = location.pathname;

  const isSubHeaderPage = SUB_HEADER_ROUTES.some(r => path.startsWith(r));
  const showHeader = !isSubHeaderPage && path !== '/';
  const showBottomNav = !NO_BOTTOM_NAV.includes(path);

  // Home page has the prayer hero as "header"
  const isHome = path === '/';

  return (
    <div className="app-container">
      {/* Show AppHeader only on home */}
      {isHome && <AppHeader />}

      {/* For sub-pages the SubHeader is rendered inside each page */}

      <div className={`page-content ${isHome ? '' : 'no-header'}`}>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Quran */}
          <Route path="/quran" element={<QuranList />} />
          <Route path="/quran/:id" element={<QuranSurah />} />

          {/* Ibadah Hub */}
          <Route path="/ibadah" element={<IbadahHub />} />
          <Route path="/ibadah/shalat" element={<PrayerTimes />} />
          <Route path="/ibadah/kiblat" element={<Qibla />} />
          <Route path="/ibadah/tasbih" element={<Tasbih />} />
          <Route path="/ibadah/doa" element={<Doa />} />
          <Route path="/ibadah/zakat" element={<Zakat />} />
          <Route path="/ibadah/yasin" element={<Yasin />} />
          <Route path="/ibadah/maulid" element={<Maulid />} />
          <Route path="/ibadah/kalender" element={<Kalender />} />
          <Route path="/ibadah/ziarah" element={<Ziarah />} />
          <Route path="/ibadah/wirid" element={<Wirid />} />

          {/* Konten */}
          <Route path="/konten" element={<KontenHub />} />
          <Route path="/konten/:tab" element={<KontenHub />} />

          {/* Profil */}
          <Route path="/profil" element={<Profil />} />

          {/* 404 */}
          <Route path="*" element={
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '50vh' }}>
              <div style={{ fontSize: 48 }}>🕌</div>
              <div style={{ fontWeight: 700, fontSize: 18, color: 'var(--text-primary)', marginTop: 16 }}>Halaman tidak ditemukan</div>
              <button onClick={() => window.location.href = '/'} style={{
                marginTop: 16, padding: '10px 24px', background: 'var(--primary-gradient)',
                color: 'white', border: 'none', borderRadius: 999, cursor: 'pointer', fontWeight: 600,
              }}>Kembali ke Beranda</button>
            </div>
          } />
        </Routes>
      </div>

      <BottomNav />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppLayout />
      </AppProvider>
    </BrowserRouter>
  );
}
