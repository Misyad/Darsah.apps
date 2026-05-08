import React from 'react';
import { SubHeader } from '../../components/layout/AppHeader';
import { Flower, BookOpen } from 'lucide-react';

const MAULID_LIST = [
  { id: 1, name: 'Maulid Al-Barzanji', author: 'Syaikh Ja\'far Al-Barzanji', desc: 'Kitab maulid paling populer di Indonesia dan Nusantara, berisi kisah Nabi Muhammad SAW sejak lahir hingga wafat.', icon: Flower, pages: 120 },
  { id: 2, name: 'Maulid Ad-Diba\'i', author: 'Imam Abd. al-Rahman al-Diba\'i', desc: 'Maulid yang dibaca dengan nada khusus, populer di kalangan pesantren dan majelis taklim.', icon: Flower, pages: 80 },
  { id: 3, name: 'Simthud Durar', author: 'Habib Ali bin Muhammad al-Habsyi', desc: 'Kitab maulid berbahasa Arab yang disusun oleh ulama besar dari Yaman, berisi pujian indah untuk Nabi SAW.', icon: Flower, pages: 150 },
  { id: 4, name: 'Maulid Ad-Dliyaul Lami\'', author: 'Imam Shalih al-Ja\'fari', desc: 'Maulid yang mengandung banyak doa dan shalawat, sering dibaca di majelis-majelis NU.', icon: Flower, pages: 90 },
  { id: 5, name: 'Qasidah Burdah', author: 'Imam al-Bushiri', desc: 'Syair pujian kepada Nabi Muhammad SAW yang terkenal dengan I\'tidhal (berdiri) saat melantunkan bait tertentu.', icon: Flower, pages: 60 },
  { id: 6, name: 'Maulid Al-Azab', author: 'Habib Umar bin Hafidh', desc: 'Maulid kontemporer yang disusun oleh ulama besar Hadhramaut, populer di kalangan habaib.', icon: Flower, pages: 70 },
];

const CONTENT = {
  1: {
    arabic: 'اللَّهُمَّ صَلِّ وَسَلِّمْ وَبَارِكْ عَلَىٰ سَيِّدِنَا مُحَمَّدٍ وَعَلَى ءَالِهِ وَصَحْبِهِ عَدَدَ مَا فِي عِلْمِ اللهِ صَلَاةً دَائِمَةً بِدَوَامِ مُلْكِ اللهِ',
    latin: 'Allahumma sholli wa sallim wa barik ala Sayyidina Muhammadin wa ala alihi wa shahbihi adada maa fi ilmillahi shalatan daimatan bidawami mulkillahi',
    translation: 'Ya Allah, limpahkanlah shalawat, salam, dan berkah kepada Sayyidina Muhammad dan keluarga serta sahabatnya, sebanyak yang ada dalam ilmu Allah, shalawat yang abadi selama kekal kerjaan Allah.',
  },
};

export default function Maulid() {
  const [selected, setSelected] = React.useState<number | null>(null);

  return (
    <div className="fade-in">
      <SubHeader title="Kitab Maulid" />

      {/* Header info */}
      <div style={{ background: 'var(--primary-gradient)', padding: '20px 16px', textAlign: 'center' }}>
        <div style={{ color: 'white', opacity: 0.5 }}><Flower size={48} /></div>
        <div style={{ color: 'white', fontWeight: 700, fontSize: 16, marginTop: 8 }}>
          Maulid Nabi Muhammad SAW
        </div>
        <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12, marginTop: 4 }}>
          Kumpulan Kitab Maulid Ahlus Sunnah wal Jamaah
        </div>
        <div style={{ marginTop: 12, background: 'rgba(255,255,255,0.15)', borderRadius: 12, padding: '10px 16px', display: 'inline-block' }}>
          <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: 11 }}>Shalawat kepada Nabi</div>
          <div style={{ color: 'white', fontFamily: 'Amiri, serif', fontSize: 18, direction: 'rtl' }}>
            اللَّهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ
          </div>
        </div>
      </div>

      {/* List */}
      <div style={{ padding: 16 }}>
        {selected === null ? (
          <>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 12 }}>
              Pilih kitab maulid untuk dibaca:
            </div>
            {MAULID_LIST.map(m => (
              <div key={m.id} className="card-elevated" style={{ marginBottom: 12, cursor: 'pointer' }}
                onClick={() => setSelected(m.id)}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', flexShrink: 0 }}>
                <m.icon size={26} />
              </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-primary)' }}>{m.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--primary)', marginTop: 2 }}>{m.author}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4, lineHeight: 1.5 }}>{m.desc}</div>
                    <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                      <span className="badge badge-green">{m.pages} halaman</span>
                      <span className="badge badge-gold">Ahlussunnah</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="slide-up">
            <button onClick={() => setSelected(null)} style={{
              background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12,
              padding: '8px 16px', cursor: 'pointer', fontSize: 13, color: 'var(--text-secondary)',
              marginBottom: 16, fontWeight: 500,
            }}>
              ← Kembali ke daftar
            </button>

            <div style={{ fontWeight: 700, fontSize: 17, color: 'var(--text-primary)', marginBottom: 4 }}>
              {MAULID_LIST.find(m => m.id === selected)?.name}
            </div>
            <div style={{ fontSize: 12, color: 'var(--primary)', marginBottom: 16 }}>
              {MAULID_LIST.find(m => m.id === selected)?.author}
            </div>

            {/* Sample content */}
            {CONTENT[1] && (
              <div className="ayah-item">
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--primary)', marginBottom: 8 }}>MUQADDIMAH — SHALAWAT PEMBUKA</div>
                <div className="ayah-arabic">{CONTENT[1].arabic}</div>
                <div className="ayah-latin">{CONTENT[1].latin}</div>
                <div className="ayah-translation">{CONTENT[1].translation}</div>
              </div>
            )}

            <div style={{ textAlign: 'center', padding: 20, color: 'var(--text-muted)', fontSize: 13,
              background: 'var(--bg-section)', borderRadius: 12, marginTop: 12 }}>
              <div style={{ color: 'var(--primary)', opacity: 0.5, marginBottom: 8 }}><BookOpen size={48} /></div>
              <div>Konten lengkap kitab maulid ini tersedia di versi premium Darsah Apps.</div>
              <div style={{ marginTop: 4, fontSize: 11 }}>Insya Allah akan segera hadir.</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
