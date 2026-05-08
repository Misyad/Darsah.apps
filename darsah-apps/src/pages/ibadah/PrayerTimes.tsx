import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../contexts/AppContext';
import { SubHeader } from '../../components/layout/AppHeader';
import { MapPin, RefreshCw, Clock, MoonStar, CloudMoon, Sunrise, Sun, SunMedium, SunDim, Sunset, Stars } from 'lucide-react';
import { toHijri } from '../../utils/hijriCalendar';

const PRAYERS = [
  { key: 'Imsak', label: 'Imsak', icon: MoonStar },
  { key: 'Fajr', label: 'Subuh', icon: CloudMoon },
  { key: 'Sunrise', label: 'Terbit', icon: Sunrise },
  { key: 'Dhuha', label: 'Dhuha', icon: SunMedium },
  { key: 'Dhuhr', label: 'Dzuhur', icon: Sun },
  { key: 'Asr', label: 'Ashar', icon: SunDim },
  { key: 'Maghrib', label: 'Maghrib', icon: Sunset },
  { key: 'Isha', label: 'Isya', icon: Stars },
];

const MAIN_PRAYERS = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

function getCurrentPrayerKey(times: Record<string, string>): string {
  const now = new Date();
  const cur = now.getHours() * 60 + now.getMinutes();
  const toMin = (t: string) => { const [h, m] = t.split(':').map(Number); return h * 60 + m; };
  let active = 'Isha';
  for (const p of MAIN_PRAYERS) {
    if (times[p] && toMin(times[p]) <= cur) active = p;
  }
  return active;
}

export default function PrayerTimes() {
  const { location, setLocation } = useApp();
  const [times, setTimes] = useState<Record<string, string> | null>(null);
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState('');
  const [currentPrayer, setCurrentPrayer] = useState('');
  const now = new Date();
  const hijri = toHijri(now);

  const fetchTimes = async (lat: number, lng: number, cityName: string) => {
    setLoading(true);
    const d = now;
    try {
      const r = await fetch(`https://api.aladhan.com/v1/timings/${d.getDate()}-${d.getMonth()+1}-${d.getFullYear()}?latitude=${lat}&longitude=${lng}&method=20`);
      const data = await r.json();
      if (data.code === 200) {
        const t = data.data.timings;
        const mapped: Record<string, string> = {
          Imsak: t.Imsak, Fajr: t.Fajr, Sunrise: t.Sunrise,
          Dhuha: t.Sunrise, Dhuhr: t.Dhuhr, Asr: t.Asr,
          Maghrib: t.Maghrib, Isha: t.Isha,
        };
        setTimes(mapped);
        setCurrentPrayer(getCurrentPrayerKey(mapped));
        setLocation({ city: cityName, lat, lng });
        setCity(cityName);
      }
    } catch { } finally { setLoading(false); }
  };

  useEffect(() => {
    if (location) {
      setCity(location.city);
      fetchTimes(location.lat, location.lng, location.city);
    } else {
      navigator.geolocation?.getCurrentPosition(
        async pos => {
          const { latitude, longitude } = pos.coords;
          try {
            const r = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
            const d = await r.json();
            const c = d.address?.city || d.address?.county || 'Lokasi Anda';
            fetchTimes(latitude, longitude, c);
          } catch { fetchTimes(latitude, longitude, 'Lokasi Anda'); }
        },
        () => fetchTimes(-6.2088, 106.8456, 'Jakarta'),
        { timeout: 5000 }
      );
    }
  }, []);

  // Countdown to next prayer
  const [countdown, setCountdown] = useState('');
  useEffect(() => {
    if (!times) return;
    const interval = setInterval(() => {
      const n = new Date();
      const cur = n.getHours() * 60 + n.getMinutes();
      const toMin = (t: string) => { const [h, m] = t.split(':').map(Number); return h * 60 + m; };
      let diff = 0;
      let next = '';
      for (const p of MAIN_PRAYERS) {
        if (times[p] && toMin(times[p]) > cur) { diff = toMin(times[p]) - cur; next = p; break; }
      }
      if (!next && times.Fajr) diff = 1440 - cur + toMin(times.Fajr);
      const h = Math.floor(diff / 60), m = diff % 60;
      setCountdown(`${h}j ${m}m lagi`);
    }, 1000);
    return () => clearInterval(interval);
  }, [times]);

  const dateStr = now.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="fade-in">
      <SubHeader title="Jadwal Shalat" />

      {/* Top Card */}
      <div className="prayer-detail-card">
        <div className="prayer-city">
          <MapPin size={13} />
          <span>{city || 'Memuat lokasi...'}</span>
        </div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', marginTop: 4 }}>
          {dateStr} • {hijri.day} {hijri.monthName} {hijri.year} H
        </div>
        {countdown && (
          <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.85)', fontSize: 13 }}>
            <Clock size={14} />
            <span>{countdown} menuju shalat berikutnya</span>
          </div>
        )}
        {loading && <div style={{ marginTop: 12, color: 'rgba(255,255,255,0.75)', fontSize: 13 }}>Memuat jadwal...</div>}
      </div>

      {/* Prayer list */}
      <div className="prayer-list">
        {PRAYERS.map(({ key, label, icon }) => {
          const isMain = MAIN_PRAYERS.includes(key);
          const isActive = currentPrayer === key;
          return (
            <div key={key} className={`prayer-row ${isActive ? 'active-prayer' : ''}`}
              style={{ opacity: !isMain ? 0.7 : 1 }}>
              <span className="prayer-row-icon" style={{ display: 'flex', alignItems: 'center', color: isActive ? 'white' : 'var(--primary)' }}>
                <icon size={20} />
              </span>
              <span className="prayer-row-name">{label}</span>
              <span className="prayer-row-time">
                {times ? times[key]?.slice(0, 5) : '--:--'}
              </span>
            </div>
          );
        })}
      </div>

      {/* Refresh button */}
      <div style={{ padding: '0 16px 24px', textAlign: 'center' }}>
        <button className="btn-primary" style={{ maxWidth: 200 }}
          onClick={() => location && fetchTimes(location.lat, location.lng, location.city)}>
          <RefreshCw size={14} style={{ marginRight: 6 }} />
          Perbarui Jadwal
        </button>
      </div>
    </div>
  );
}
