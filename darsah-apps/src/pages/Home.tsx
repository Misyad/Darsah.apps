import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, ChevronRight, RefreshCw, BookOpen, Clock, Compass, Hand, Coins, Scroll, Flower, Calendar, Map, Mic2, Library, Disc } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { articleList } from '../data/staticData';
import { toHijri } from '../utils/hijriCalendar';

interface PrayerTimes {
  Fajr: string; Sunrise: string; Dhuhr: string; Asr: string;
  Maghrib: string; Isha: string; Imsak: string; Dhuha: string;
}

const PRAYER_NAMES = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
const PRAYER_LABELS: Record<string, string> = {
  Fajr: 'Subuh', Sunrise: 'Terbit', Dhuha: 'Dhuha',
  Dhuhr: 'Dzuhur', Asr: 'Ashar', Maghrib: 'Maghrib', Isha: 'Isya', Imsak: 'Imsak'
};
const PRAYER_ICONS: Record<string, string> = {
  Fajr: '🌙', Dhuhr: '☀️', Asr: '🌤️', Maghrib: '🌅', Isha: '⭐'
};

const FEATURES = [
  { label: 'Al-Qur\'an', icon: BookOpen, path: '/quran', color: 'feature-icon-green' },
  { label: 'Jadwal Shalat', icon: Clock, path: '/ibadah/shalat', color: 'feature-icon-gold' },
  { label: 'Kiblat', icon: Compass, path: '/ibadah/kiblat', color: 'feature-icon-teal' },
  { label: 'Tasbih', icon: Disc, path: '/ibadah/tasbih', color: 'feature-icon-purple' },
  { label: 'Doa Harian', icon: Hand, path: '/ibadah/doa', color: 'feature-icon-rose' },
  { label: 'Zakat', icon: Coins, path: '/ibadah/zakat', color: 'feature-icon-blue' },
  { label: 'Yasin & Tahlil', icon: Scroll, path: '/ibadah/yasin', color: 'feature-icon-orange' },
  { label: 'Maulid', icon: Flower, path: '/ibadah/maulid', color: 'feature-icon-rose' },
  { label: 'Kalender', icon: Calendar, path: '/ibadah/kalender', color: 'feature-icon-teal' },
  { label: 'Ziarah', icon: Map, path: '/ibadah/ziarah', color: 'feature-icon-green' },
  { label: 'Khutbah', icon: Mic2, path: '/konten/khutbah', color: 'feature-icon-blue' },
  { label: 'NUpedia', icon: Library, path: '/konten/nupedia', color: 'feature-icon-purple' },
];

function getCurrentPrayer(times: PrayerTimes): string {
  const now = new Date();
  const currentMin = now.getHours() * 60 + now.getMinutes();
  const toMin = (t: string) => {
    const [h, m] = t.split(':').map(Number);
    return h * 60 + m;
  };
  const ordered = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
  let current = 'Isha';
  for (const p of ordered) {
    if (currentMin >= toMin((times as any)[p])) current = p;
  }
  return current;
}

function getNextPrayer(times: PrayerTimes): { name: string; time: string } {
  const now = new Date();
  const currentMin = now.getHours() * 60 + now.getMinutes();
  const toMin = (t: string) => { const [h, m] = t.split(':').map(Number); return h * 60 + m; };
  const ordered = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
  for (const p of ordered) {
    if (toMin((times as any)[p]) > currentMin) return { name: p, time: (times as any)[p] };
  }
  return { name: 'Fajr', time: times.Fajr };
}

export default function Home() {
  const navigate = useNavigate();
  const { lastReadSurah, location, setLocation } = useApp();
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState('Lokasi Anda');
  const [now, setNow] = useState(new Date());
  const hijri = toHijri(now);

  // Update clock every minute
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(t);
  }, []);

  const fetchPrayerTimes = useCallback(async (lat: number, lng: number) => {
    try {
      const date = new Date();
      const res = await fetch(
        `https://api.aladhan.com/v1/timings/${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}?latitude=${lat}&longitude=${lng}&method=20`
      );
      const data = await res.json();
      if (data.code === 200) {
        const t = data.data.timings;
        setPrayerTimes({
          Fajr: t.Fajr, Sunrise: t.Sunrise, Dhuhr: t.Dhuhr,
          Asr: t.Asr, Maghrib: t.Maghrib, Isha: t.Isha,
          Imsak: t.Imsak, Dhuha: t.Sunrise, // approximate
        });
      }
    } catch { /* offline fallback */ } finally { setLoading(false); }
  }, []);

  useEffect(() => {
    if (location) {
      setCity(location.city);
      fetchPrayerTimes(location.lat, location.lng);
    } else {
      navigator.geolocation?.getCurrentPosition(
        async (pos) => {
          const { latitude: lat, longitude: lng } = pos.coords;
          // Reverse geocode
          try {
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
            const d = await res.json();
            const c = d.address?.city || d.address?.county || d.address?.state || 'Lokasi Anda';
            setCity(c);
            setLocation({ city: c, lat, lng });
          } catch { setCity('Lokasi Anda'); }
          fetchPrayerTimes(lat, lng);
        },
        () => {
          // Default: Jakarta
          fetchPrayerTimes(-6.2088, 106.8456);
          setCity('Jakarta');
        },
        { timeout: 5000 }
      );
    }
  }, []);

  const dateStr = now.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const nextPrayer = prayerTimes ? getNextPrayer(prayerTimes) : null;
  const currentPrayer = prayerTimes ? getCurrentPrayer(prayerTimes) : null;

  // Offline fallback times
  const displayTimes = prayerTimes || {
    Fajr: '04:45', Dhuhr: '12:00', Asr: '15:15', Maghrib: '18:00', Isha: '19:15',
    Sunrise: '06:00', Imsak: '04:30', Dhuha: '06:30'
  };

  return (
    <div className="fade-in">
      {/* --- Prayer Hero (Stitch Modern) --- */}
      <div className="prayer-hero" style={{ background: 'var(--bg-card)', color: 'var(--text-primary)', borderBottom: '1px solid var(--border)', paddingBottom: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div className="date-label" style={{ color: 'var(--text-muted)' }}>{dateStr}</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
              {hijri.day} {hijri.monthName} {hijri.year} H
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--text-muted)', fontSize: 12 }}>
            <MapPin size={12} />
            <span>{city}</span>
          </div>
        </div>

        {nextPrayer && (
          <div className="next-prayer" style={{ marginTop: 12 }}>
            <div className="next-prayer-name" style={{ color: 'var(--text-secondary)' }}>Shalat Berikutnya — {PRAYER_LABELS[nextPrayer.name]}</div>
            <div className="next-prayer-time" style={{ color: 'var(--primary)', fontSize: 48 }}>{nextPrayer.time}</div>
          </div>
        )}
        {loading && !prayerTimes && (
          <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, marginTop: 8 }}>Memuat jadwal shalat...</div>
        )}

        {/* Prayer chips */}
        <div className="prayer-times-row">
          {PRAYER_NAMES.map(p => (
            <div key={p} className={`prayer-time-chip ${currentPrayer === p ? 'active-chip' : ''}`}>
              <div className="chip-name">{PRAYER_LABELS[p]}</div>
              <div className="chip-time">{(displayTimes as any)[p]?.slice(0, 5)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* --- Last Read Quran (Stitch Style) --- */}
      <div className="section" style={{ paddingBottom: 0 }}>
        <div className="quran-last-read" style={{ background: 'var(--primary-light)', color: 'var(--primary-dark)', boxShadow: 'none' }} onClick={() => navigate(`/quran/${lastReadSurah?.number || 1}`)}>
          <div>
            <div className="qr-label" style={{ color: 'var(--primary)' }}>Terakhir Dibaca</div>
            <div className="qr-surah" style={{ color: 'var(--primary-dark)' }}>{lastReadSurah?.name || 'Al-Fatihah'}</div>
            <div className="qr-ayah" style={{ color: 'var(--primary)' }}>Ayat {lastReadSurah?.ayah || 1} · Lanjut membaca →</div>
          </div>
          <div className="qr-arabic" style={{ color: 'var(--primary)' }}>{lastReadSurah?.number === 1 ? 'الفاتحة' : 'القرآن'}</div>
        </div>
      </div>

      {/* --- Feature Grid --- */}
      <div className="section" style={{ paddingBottom: 0 }}>
        <div className="section-title">
          <span>Layanan</span>
        </div>
      </div>
      <div className="features-grid">
        {FEATURES.map(f => (
          <div key={f.path} className="feature-item" onClick={() => navigate(f.path)}>
            <div className={`feature-icon-wrap ${f.color}`}>
              <f.icon size={26} strokeWidth={1.8} />
            </div>
            <span className="feature-label">{f.label}</span>
          </div>
        ))}
      </div>

      {/* --- Artikel Terbaru --- */}
      <div className="section">
        <div className="section-title">
          <span>Artikel Terbaru</span>
          <span className="see-all" onClick={() => navigate('/konten/artikel')}>Lihat semua</span>
        </div>
        <div className="card">
          {articleList.slice(0, 5).map(a => (
            <div key={a.id} className="article-card" onClick={() => navigate(`/konten/artikel/${a.id}`)}>
              <div className="article-thumb">{a.emoji}</div>
              <div className="article-info">
                <div className="article-category">{a.category}</div>
                <div className="article-title">{a.title}</div>
                <div className="article-date">{a.date} · {a.readTime}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
