import React, { useEffect, useRef, useState } from 'react';
import { SubHeader } from '../../components/layout/AppHeader';
import { useApp } from '../../contexts/AppContext';
import { MapPin } from 'lucide-react';

function calcQiblaAngle(lat: number, lng: number): number {
  const KAABA_LAT = 21.4225;
  const KAABA_LNG = 39.8262;
  const φ1 = lat * Math.PI / 180;
  const φ2 = KAABA_LAT * Math.PI / 180;
  const Δλ = (KAABA_LNG - lng) * Math.PI / 180;
  const y = Math.sin(Δλ) * Math.cos(φ2);
  const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
  return ((Math.atan2(y, x) * 180 / Math.PI) + 360) % 360;
}

export default function Qibla() {
  const { location } = useApp();
  const [qiblaAngle, setQiblaAngle] = useState<number | null>(null);
  const [deviceHeading, setDeviceHeading] = useState(0);
  const [accuracy, setAccuracy] = useState<string>('');
  const [permissionDenied, setPermissionDenied] = useState(false);
  const needleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (location) {
      setQiblaAngle(calcQiblaAngle(location.lat, location.lng));
    } else {
      navigator.geolocation?.getCurrentPosition(pos => {
        const angle = calcQiblaAngle(pos.coords.latitude, pos.coords.longitude);
        setQiblaAngle(angle);
      }, () => {
        // Default Jakarta
        setQiblaAngle(calcQiblaAngle(-6.2088, 106.8456));
      });
    }
  }, [location]);

  useEffect(() => {
    const handler = (e: DeviceOrientationEvent) => {
      const alpha = (e as any).webkitCompassHeading || e.alpha || 0;
      setDeviceHeading(alpha);
    };
    if (typeof DeviceOrientationEvent !== 'undefined' &&
      typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      (DeviceOrientationEvent as any).requestPermission()
        .then((res: string) => {
          if (res === 'granted') window.addEventListener('deviceorientation', handler, true);
          else setPermissionDenied(true);
        });
    } else {
      window.addEventListener('deviceorientation', handler, true);
    }
    return () => window.removeEventListener('deviceorientation', handler, true);
  }, []);

  const needleRotation = qiblaAngle !== null ? qiblaAngle - deviceHeading : 0;

  return (
    <div className="fade-in">
      <SubHeader title="Kompas Kiblat" />
      <div className="compass-wrap" style={{ paddingTop: 32 }}>
        {/* Info */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          {qiblaAngle !== null ? (
            <>
              <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Arah Kiblat</div>
              <div style={{ fontSize: 36, fontWeight: 700, color: 'var(--primary)' }}>
                {Math.round(qiblaAngle)}°
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                <MapPin size={12} />
                {location?.city || 'Jakarta'} → Makkah Al-Mukarramah
              </div>
            </>
          ) : (
            <div style={{ color: 'var(--text-muted)', fontSize: 13 }}>Mendeteksi lokasi...</div>
          )}
        </div>

        {/* Compass */}
        <div className="compass-circle">
          {/* Cardinal directions */}
          {[['U', 0], ['T', 90], ['S', 180], ['B', 270]].map(([dir, deg]) => (
            <div key={dir as string} style={{
              position: 'absolute',
              fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)',
              ...(deg === 0 ? { top: 10, left: '50%', transform: 'translateX(-50%)' } : {}),
              ...(deg === 90 ? { right: 10, top: '50%', transform: 'translateY(-50%)' } : {}),
              ...(deg === 180 ? { bottom: 10, left: '50%', transform: 'translateX(-50%)' } : {}),
              ...(deg === 270 ? { left: 10, top: '50%', transform: 'translateY(-50%)' } : {}),
            }}>
              {dir as string}
              {dir === 'U' && <span style={{ color: '#ef4444' }}>↑</span>}
            </div>
          ))}

          {/* Kaaba indicator (gold) */}
          <div
            ref={needleRef}
            style={{
              position: 'absolute',
              width: 0,
              height: 0,
              top: '50%',
              left: '50%',
              transformOrigin: '0 0',
              transform: `rotate(${needleRotation}deg)`,
              transition: 'transform 0.3s ease',
            }}
          >
            <div style={{
              position: 'absolute',
              width: 3,
              height: 90,
              background: 'linear-gradient(to top, #c8973a 60%, rgba(200,151,58,0.2) 100%)',
              borderRadius: 4,
              left: -1.5,
              bottom: 0,
              boxShadow: '0 0 8px rgba(200,151,58,0.5)',
            }} />
            <div style={{
              position: 'absolute',
              fontSize: 20,
              left: -10,
              bottom: 88,
            }}>🕋</div>
          </div>

          <div className="compass-center" />
        </div>

        <div style={{ marginTop: 24, textAlign: 'center' }}>
          <div style={{ fontSize: 13, color: 'var(--text-muted)', maxWidth: 240 }}>
            {permissionDenied
              ? 'Izinkan akses sensor untuk kompas yang lebih akurat'
              : 'Arahkan layar ke depan dan ikuti penunjuk 🕋 ke arah kiblat'}
          </div>
        </div>

        {/* Distance info */}
        <div style={{
          marginTop: 24, padding: '12px 20px',
          background: 'var(--primary-xlight)',
          borderRadius: 'var(--radius-lg)',
          display: 'flex', gap: 24,
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Koordinat Kabah</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--primary)' }}>21.4225°N, 39.8262°E</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Kota Suci</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--primary)' }}>Makkah Al-Mukarramah</div>
          </div>
        </div>
      </div>
    </div>
  );
}
