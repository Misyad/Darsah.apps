import React, { useState } from 'react';
import { SubHeader } from '../../components/layout/AppHeader';
import { BookOpen, Scroll } from 'lucide-react';

const YASIN_AYAT = [
  { no: 1, arabic: 'يس', latin: 'Yaasiin' },
  { no: 2, arabic: 'وَالْقُرْءَانِ الْحَكِيمِ', latin: 'Wal-qur\'aanil-ḥakiim' },
  { no: 3, arabic: 'إِنَّكَ لَمِنَ الْمُرْسَلِينَ', latin: 'Innaka laminal-mursaliin' },
  { no: 4, arabic: 'عَلَى صِرَاطٍ مُّسْتَقِيمٍ', latin: '\'Alaa shiraathim mustaqiim' },
  { no: 5, arabic: 'تَنزِيلَ الْعَزِيزِ الرَّحِيمِ', latin: 'Tanziilal-\'aziizir-rahiim' },
  { no: 6, arabic: 'لِتُنذِرَ قَوْمًا مَّا أُنذِرَ ءَابَاؤُهُمْ فَهُمْ غَٰفِلُونَ', latin: 'Litundzira qawmam maa undzira aabaaa\'uhum fahum ghaafiluun' },
];

const TAHLIL_TEXT = [
  { label: 'Al-Fatihah', arabic: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ ﴿١﴾ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ﴿٢﴾ الرَّحْمَنِ الرَّحِيمِ ﴿٣﴾ مَالِكِ يَوْمِ الدِّينِ ﴿٤﴾ إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ﴿٥﴾ اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ ﴿٦﴾ صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ ﴿٧﴾', latin: 'Bismillahirrahmanirrahim...' },
  { label: 'Al-Ikhlas (3x)', arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ ﴿١﴾ اللَّهُ الصَّمَدُ ﴿٢﴾ لَمْ يَلِدْ وَلَمْ يُولَدْ ﴿٣﴾ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ ﴿٤﴾', latin: 'Qul huwallahu ahad...' },
  { label: 'Al-Falaq', arabic: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ﴿١﴾ مِن شَرِّ مَا خَلَقَ ﴿٢﴾ وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ ﴿٣﴾ وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ﴿٤﴾ وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ ﴿٥﴾', latin: 'Qul a\'udzubirabbil falaq...' },
  { label: 'An-Nas', arabic: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ ﴿١﴾ مَلِكِ النَّاسِ ﴿٢﴾ إِلَٰهِ النَّاسِ ﴿٣﴾ مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ﴿٤﴾ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ﴿٥﴾ مِنَ الْجِنَّةِ وَالنَّاسِ ﴿٦﴾', latin: 'Qul a\'udzubirabbin nas...' },
  { label: 'Tahlil', arabic: 'لَا إِلَٰهَ إِلَّا اللَّهُ', latin: 'La ilaha illallah (100x)' },
  { label: 'Shalawat', arabic: 'اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِ سَيِّدِنَا مُحَمَّدٍ', latin: 'Allahumma shalli ala sayyidina Muhammad...' },
  { label: "Doa Penutup", arabic: 'سُبْحَانِ رَبِّكَ رَبِّ الْعِزَّةِ عَمَّا يَصِفُونَ وَسَلَامٌ عَلَى الْمُرْسَلِينَ وَالْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ', latin: 'Subhana rabbika rabbil izzati...' },
];

export default function Yasin() {
  const [activeTab, setActiveTab] = useState<'yasin' | 'tahlil'>('yasin');
  const [showLatin, setShowLatin] = useState(true);

  return (
    <div className="fade-in">
      <SubHeader
        title="Yasin & Tahlil"
        rightEl={
          <button onClick={() => setShowLatin(s => !s)} style={{
            background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: 999,
            padding: '5px 10px', color: 'white', cursor: 'pointer', fontSize: 12, fontWeight: 500,
          }}>
            {showLatin ? 'Latin ✓' : 'Latin'}
          </button>
        }
      />

      {/* Tabs */}
      <div style={{ display: 'flex', padding: '12px 16px 0', gap: 8 }}>
        {(['yasin', 'tahlil'] as const).map(t => (
          <button key={t} onClick={() => setActiveTab(t)} style={{
            flex: 1, padding: '10px', borderRadius: 12, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
            background: activeTab === t ? 'var(--primary-gradient)' : 'var(--bg-card)',
            color: activeTab === t ? 'white' : 'var(--text-secondary)',
            boxShadow: activeTab === t ? 'var(--shadow-primary)' : 'var(--shadow-sm)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6
          }}>
            {t === 'yasin' ? <BookOpen size={18} /> : <Scroll size={18} />}
            {t === 'yasin' ? 'Surat Yasin' : 'Tahlilan'}
          </button>
        ))}
      </div>

      {/* Header banner */}
      <div style={{ textAlign: 'center', padding: '20px 16px 12px', borderBottom: '1px solid var(--border-light)' }}>
        <div style={{ fontFamily: 'Amiri, serif', fontSize: 24, color: 'var(--primary)', direction: 'rtl' }}>
          {activeTab === 'yasin' ? 'يس' : 'التهليل'}
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>
          {activeTab === 'yasin' ? 'Surat Ke-36 • 83 Ayat • Makkiyah' : 'Susunan Bacaan Tahlilan Lengkap'}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '16px' }}>
        {activeTab === 'yasin' ? (
          <div>
            <div style={{ background: 'var(--primary-xlight)', borderRadius: 12, padding: 16, marginBottom: 16, textAlign: 'center' }}>
              <div style={{ fontSize: 16, fontFamily: 'Amiri, serif', direction: 'rtl', color: 'var(--text-arabic)' }}>
                بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>Bismillahirrahmanirrahim</div>
            </div>
            {YASIN_AYAT.map(a => (
              <div key={a.no} className="ayah-item">
                <div className="ayah-number-badge">{a.no}</div>
                <div className="ayah-arabic">{a.arabic}</div>
                {showLatin && <div className="ayah-latin">{a.latin}</div>}
              </div>
            ))}
            <div style={{ textAlign: 'center', padding: 16, color: 'var(--text-muted)', fontSize: 13 }}>
              ...Lanjutkan dengan membuka Al-Qur'an Surat Yasin (36)
            </div>
            <button className="btn-primary" onClick={() => window.location.href = '/quran/36'}>
              Baca Lengkap di Al-Qur'an →
            </button>
          </div>
        ) : (
          <div>
            {TAHLIL_TEXT.map((t, i) => (
              <div key={i} style={{ marginBottom: 16, background: 'var(--bg-card)', borderRadius: 12, padding: 16, boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--primary)', marginBottom: 10,
                  padding: '4px 10px', background: 'var(--primary-xlight)', borderRadius: 999, display: 'inline-block' }}>
                  {t.label}
                </div>
                <div style={{ fontFamily: 'Amiri, serif', fontSize: 20, direction: 'rtl', textAlign: 'right', color: 'var(--text-arabic)', lineHeight: 1.8 }}>
                  {t.arabic}
                </div>
                {showLatin && <div style={{ fontSize: 12, color: 'var(--text-muted)', fontStyle: 'italic', marginTop: 8 }}>{t.latin}</div>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
