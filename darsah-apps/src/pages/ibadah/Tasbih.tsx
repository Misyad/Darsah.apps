import React, { useState } from 'react';
import { SubHeader } from '../../components/layout/AppHeader';
import { useApp } from '../../contexts/AppContext';
import { RotateCcw, Settings } from 'lucide-react';

const TASBIH_OPTIONS = [
  { label: 'SubhanAllah', arabic: 'سُبْحَانَ اللَّهِ' },
  { label: 'Alhamdulillah', arabic: 'الْحَمْدُ لِلَّهِ' },
  { label: 'Allahu Akbar', arabic: 'اللَّهُ أَكْبَرُ' },
  { label: 'La ilaha illallah', arabic: 'لَا إِلَهَ إِلَّا اللَّهُ' },
  { label: 'Astaghfirullah', arabic: 'أَسْتَغْفِرُ اللَّهَ' },
];

const TARGETS = [33, 99, 100, 1000];

export default function Tasbih() {
  const { tasbihCount, incrementTasbih, resetTasbih, tasbihTarget, setTasbihTarget } = useApp();
  const [selectedDzikir, setSelectedDzikir] = useState(0);
  const [showSettings, setShowSettings] = useState(false);

  const progress = Math.min((tasbihCount / tasbihTarget) * 100, 100);
  const isComplete = tasbihCount >= tasbihTarget;
  const rounds = Math.floor(tasbihCount / tasbihTarget);

  return (
    <div className="fade-in">
      <SubHeader
        title="Tasbih Digital"
        rightEl={
          <button onClick={() => setShowSettings(s => !s)}
            style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: 999, padding: '6px 12px', color: 'white', cursor: 'pointer', fontSize: 13, fontWeight: 500 }}>
            <Settings size={14} />
          </button>
        }
      />

      {/* Settings Panel */}
      {showSettings && (
        <div style={{ padding: '12px 16px', background: 'var(--bg-card)', borderBottom: '1px solid var(--border)' }}>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>Target Hitungan:</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {TARGETS.map(t => (
              <button key={t} onClick={() => { setTasbihTarget(t); setShowSettings(false); }}
                style={{
                  padding: '6px 14px', borderRadius: 999, border: 'none', cursor: 'pointer',
                  fontWeight: 600, fontSize: 13,
                  background: tasbihTarget === t ? 'var(--primary-gradient)' : 'var(--bg-section)',
                  color: tasbihTarget === t ? 'white' : 'var(--text-secondary)',
                }}>
                {t}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Dzikir Selector */}
      <div style={{ padding: '16px 16px 0', overflowX: 'auto', display: 'flex', gap: 8, scrollbarWidth: 'none' }}>
        {TASBIH_OPTIONS.map((opt, i) => (
          <button key={i} onClick={() => setSelectedDzikir(i)}
            style={{
              flexShrink: 0, padding: '6px 14px', borderRadius: 999, border: 'none', cursor: 'pointer',
              fontWeight: 500, fontSize: 12, transition: 'all 0.2s',
              background: selectedDzikir === i ? 'var(--primary-gradient)' : 'var(--bg-card)',
              color: selectedDzikir === i ? 'white' : 'var(--text-secondary)',
              boxShadow: selectedDzikir === i ? 'var(--shadow-green)' : 'var(--shadow-sm)',
            }}>
            {opt.label}
          </button>
        ))}
      </div>

      {/* Arabic display */}
      <div style={{ textAlign: 'center', padding: '16px', fontFamily: 'Amiri, serif', fontSize: 28, color: 'var(--primary)', direction: 'rtl' }}>
        {TASBIH_OPTIONS[selectedDzikir].arabic}
      </div>

      {/* Main counter circle */}
      <div className="tasbih-page" style={{ paddingTop: 8 }}>
        {/* Progress ring */}
        <div style={{ position: 'relative', marginBottom: 12 }}>
          <svg width={220} height={220} style={{ position: 'absolute', top: -10, left: -10, transform: 'rotate(-90deg)' }}>
            <circle cx={110} cy={110} r={100} fill="none" stroke="var(--border)" strokeWidth={6} />
            <circle cx={110} cy={110} r={100} fill="none"
              stroke="#25a85a" strokeWidth={6}
              strokeDasharray={`${2 * Math.PI * 100}`}
              strokeDashoffset={`${2 * Math.PI * 100 * (1 - progress / 100)}`}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 0.3s ease' }}
            />
          </svg>
          <div
            className="tasbih-counter-wrap"
            onClick={incrementTasbih}
            style={{ background: isComplete ? 'linear-gradient(135deg,#c8973a,#f0c96e)' : undefined }}
          >
            <div className="tasbih-count">{tasbihCount % tasbihTarget || (isComplete && tasbihCount > 0 ? tasbihTarget : tasbihCount)}</div>
            <div className="tasbih-label">{isComplete ? '✓ Selesai!' : `Target: ${tasbihTarget}`}</div>
          </div>
        </div>

        {rounds > 0 && (
          <div style={{ textAlign: 'center', marginBottom: 16 }}>
            <span className="badge badge-green">{rounds}x putaran selesai • Total: {tasbihCount}</span>
          </div>
        )}

        {/* Controls */}
        <div className="tasbih-controls">
          <button className="tasbih-btn reset" onClick={resetTasbih}>
            <RotateCcw size={16} style={{ marginRight: 6 }} /> Reset
          </button>
        </div>

        {/* Progress bar */}
        <div style={{ width: '100%', marginTop: 24, maxWidth: 280 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-muted)', marginBottom: 6 }}>
            <span>{tasbihCount % tasbihTarget} / {tasbihTarget}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div style={{ height: 6, background: 'var(--border)', borderRadius: 999, overflow: 'hidden' }}>
            <div style={{
              height: '100%', background: 'var(--primary-gradient)', borderRadius: 999,
              width: `${progress}%`, transition: 'width 0.3s ease'
            }} />
          </div>
        </div>

        <div style={{ marginTop: 20, fontSize: 12, color: 'var(--text-muted)', textAlign: 'center' }}>
          Ketuk lingkaran untuk menghitung dzikir
        </div>
      </div>
    </div>
  );
}
