import React from 'react';
import { SubHeader } from '../../components/layout/AppHeader';
import { Moon, Sparkles, Hand, Gem, Disc } from 'lucide-react';

const WIRID_LIST = [
  {
    id: 1, name: 'Tahlil Lengkap', desc: 'Susunan bacaan tahlil untuk arwah dan tawasul', icon: Moon,
    arabic: 'لَا إِلَهَ إِلَّا اللَّهُ مُحَمَّدٌ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ',
    latin: 'La ilaha illallah Muhammadu Rasulullah shallallahu alaihi wasallam',
  },
  {
    id: 2, name: 'Ratib Al-Haddad', desc: 'Kumpulan wirid karya Habib Abdullah bin Alwi al-Haddad', icon: Disc,
    arabic: 'لَا إِلَهَ إِلَّا اللَّهُ لَا إِلَهَ إِلَّا اللَّهُ لَا إِلَهَ إِلَّا اللَّهُ مُحَمَّدٌ رَسُولُ اللَّهِ',
    latin: 'La ilaha illallah, la ilaha illallah, la ilaha illallah, Muhammadur Rasulullah',
  },
  {
    id: 3, name: 'Hizib Nashr', desc: 'Hizib kemenangan karya Imam Asy-Syadzili', icon: Sparkles,
    arabic: 'بِسْمِ اللهِ الرَّحَّمنِ الرَّحِيمِ، اللَّهُمَّ نَصْرَكَ الَّذِي وَعَدْتَ بِهِ نَبِيَّكَ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ',
    latin: 'Bismillahirrahmanirrahim, Allahumma nashrakalladzi wa\'adta bihi Nabiyyaka shallallahu\'alaihi wasallam',
  },
  {
    id: 4, name: 'Istighotsah', desc: 'Kumpulan doa dan tawasul untuk hajat dan keselamatan', icon: Hand,
    arabic: 'يَا اللهُ يَا رَحْمَنُ يَا رَحِيمُ يَا حَيُّ يَا قَيُّومُ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ',
    latin: 'Ya Allah, ya Rahman, ya Rahim, ya Hayyu, ya Qayyumu, ya Dzal Jalali wal Ikram',
  },
  {
    id: 5, name: 'Ratibul Attas', desc: 'Wirid karya Habib Umar bin Abdurrahman Al-Attas', icon: Gem,
    arabic: 'بِسْمِ اللهِ الرَّحْمنِ الرَّحِيمِ. اَلْحَمْدُ لِلّهِ رَبِّ الْعَالَمِيْنَ. الرَّحْمنِ الرَّحِيْمِ. مَالِكِ يَوْمِ الدِّيْنِ...',
    latin: 'Bismillahirrahmanirrahim. Alhamdulillahi Rabbil \'alamin. Arrahmanirrahim...',
  },
  {
    id: 6, name: 'Wirdul Lathif', desc: 'Wirid pagi dan sore karya Imam Al-Haddad', icon: Sparkles,
    arabic: 'بِسْمِ اللهِ الرَّحْمنِ الرَّحِيمِ. قُلْ هُوَ اللهُ أَحَدٌ. اللهُ الصَّمَدُ. لَمْ يَلِدْ وَلَمْ يُولَدْ...',
    latin: 'Bismillahirrahmanirrahim. Qul huwallahu ahad. Allahush shamad...',
  },
];

export default function Wirid() {
  const [selected, setSelected] = React.useState<number | null>(null);
  const item = WIRID_LIST.find(w => w.id === selected);

  return (
    <div className="fade-in">
      <SubHeader title="Wirid & Hizib" />
      <div style={{ background: 'var(--primary-gradient)', padding: '16px', textAlign: 'center' }}>
        <div style={{ color: 'white', fontWeight: 700, fontSize: 15 }}>🌟 Wirid & Hizib Ahlussunnah</div>
        <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12, marginTop: 4 }}>Kumpulan wirid dari ulama terpercaya</div>
      </div>
      <div style={{ padding: 16 }}>
        {selected === null ? (
          WIRID_LIST.map(w => (
            <div key={w.id} className="card-elevated" style={{ marginBottom: 12, cursor: 'pointer' }} onClick={() => setSelected(w.id)}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', flexShrink: 0 }}>
                  <w.icon size={22} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-primary)' }}>{w.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 3 }}>{w.desc}</div>
                </div>
                <div style={{ color: 'var(--text-muted)' }}>›</div>
              </div>
            </div>
          ))
        ) : item ? (
          <div className="slide-up">
            <button onClick={() => setSelected(null)} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, padding: '8px 16px', cursor: 'pointer', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16, fontWeight: 500 }}>← Kembali</button>
            <div className="card-elevated">
              <div style={{ width: 56, height: 56, borderRadius: 16, background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', marginBottom: 16 }}>
                <item.icon size={28} />
              </div>
              <div style={{ fontWeight: 700, fontSize: 18, color: 'var(--text-primary)', marginBottom: 4 }}>{item.name}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 16 }}>{item.desc}</div>
              <div style={{ background: 'var(--primary-xlight)', borderRadius: 12, padding: 16, marginBottom: 12 }}>
                <div style={{ fontFamily: 'Amiri, serif', fontSize: 22, direction: 'rtl', textAlign: 'right', color: 'var(--text-arabic)', lineHeight: 1.8 }}>{item.arabic}</div>
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', fontStyle: 'italic', lineHeight: 1.6 }}>{item.latin}</div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
