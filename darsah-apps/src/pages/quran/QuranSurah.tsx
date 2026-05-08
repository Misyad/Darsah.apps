import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HelpCircle, X, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { SubHeader } from '../../components/layout/AppHeader';
import { surahList } from '../../data/staticData';
import { useApp } from '../../contexts/AppContext';

interface Ayah {
  number: number;
  numberInSurah: number;
  text: string;
  translation?: string;
  surah: {
    number: number;
    name: string;
    englishName: string;
  };
  juz: number;
  page: number;
}

const BISMILLAH = "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ";

export default function QuranSurah() {
  const { id } = useParams(); // Start page from URL
  const navigate = useNavigate();
    const { setLastReadSurah } = useApp();
    
    const [loading, setLoading] = useState(true);
    const [pageData, setPageData] = useState<Ayah[]>([]);
    const [currentPage, setCurrentPage] = useState(Number(id) || 1);
    const [showTajwid, setShowTajwid] = useState(true);
    const [showGuide, setShowGuide] = useState(false);
    const [viewMode, setViewMode] = useState<'text' | 'image'>('image'); // Default to image as user seems to prefer it
  
    useEffect(() => {
      fetchPageData(currentPage);
      window.scrollTo(0, 0);
    }, [currentPage]);
  
    const fetchPageData = async (page: number) => {
      setLoading(true);
      try {
        const response = await fetch(`https://api.alquran.cloud/v1/page/${page}/quran-tajweed`);
        const data = await response.json();
        
        if (data.code === 200) {
          setPageData(data.data.ayahs);
          
          // Update last read (using first ayah of the page)
          const firstAyah = data.data.ayahs[0];
          setLastReadSurah({
            number: firstAyah.surah.number,
            name: firstAyah.surah.englishName,
            ayah: firstAyah.numberInSurah
          });
        }
    } catch (error) {
      console.error('Error fetching page data:', error);
    } finally {
      setLoading(false);
    }
  };

  const parseTajweed = (text: string) => {
    if (!showTajwid) return text.replace(/\[.*?\]/g, '').replace(/[\[\]]/g, '');

    const rules: Record<string, string> = {
      'g': 'tajwid-ghunnah',
      'i': 'tajwid-ikhfa',
      'f': 'tajwid-ikhfa',
      'm': 'tajwid-idgham',
      'q': 'tajwid-qalaqah',
      'p': 'tajwid-madda',
      'o': 'tajwid-madda',
      'h': 'tajwid-hamzatul-wasl',
      'a': 'tajwid-hamzatul-wasl',
      's': 'tajwid-silent',
      'u': 'tajwid-ghunnah'
    };

    let result = text;
    let changed = true;
    while (changed) {
      const original = result;
      result = result.replace(/\[([a-z])(?::\d+)?\[([^\[\]]+)\]\]/g, (match, code, content) => {
        const className = rules[code] || '';
        return `<span class="${className}">${content}</span>`;
      });
      changed = result !== original;
    }

    return result.replace(/[\[\]]/g, '');
  };

  const getPageImageUrl = (page: number) => {
    const pad = page.toString().padStart(3, '0');
    return `https://media.qurankemenag.net/khat2/QK_${pad}.webp`;
  };

  if (loading && pageData.length === 0) {
    return (
      <div className="flex-center" style={{ height: '80vh', flexDirection: 'column', gap: 16 }}>
        <div className="loader"></div>
        <div style={{ color: 'var(--text-muted)', fontSize: 14 }}>Memuat Halaman {currentPage}...</div>
      </div>
    );
  }

  // Group ayahs by surah to show headers if surah changes on the page
  const ayahsBySurah: { [key: number]: Ayah[] } = {};
  pageData.forEach(ayah => {
    if (!ayahsBySurah[ayah.surah.number]) ayahsBySurah[ayah.surah.number] = [];
    ayahsBySurah[ayah.surah.number].push(ayah);
  });

  return (
    <div className="fade-in" style={{ paddingBottom: 100 }}>
      <SubHeader
        title={`Halaman ${currentPage}`}
        variant="green"
        rightEl={
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => setViewMode(v => v === 'text' ? 'image' : 'text')}
              style={{
                padding: '4px 10px', borderRadius: 999, border: 'none', cursor: 'pointer',
                fontSize: 11, fontWeight: 600,
                background: viewMode === 'image' ? '#fff' : 'rgba(255,255,255,0.2)',
                color: viewMode === 'image' ? 'var(--primary-dark)' : 'white',
                display: 'flex', alignItems: 'center', gap: 4
              }}
            >
              {viewMode === 'text' ? <BookOpen size={14} /> : <BookOpen size={14} fill="currentColor" />}
              {viewMode === 'text' ? 'Gambar' : 'Teks'}
            </button>
            {viewMode === 'text' && (
              <button
                onClick={() => setShowTajwid(t => !t)}
                style={{
                  padding: '4px 10px', borderRadius: 999, border: 'none', cursor: 'pointer',
                  fontSize: 11, fontWeight: 600,
                  background: showTajwid ? '#ffcc00' : 'rgba(255,255,255,0.15)',
                  color: 'black',
                  display: 'flex', alignItems: 'center', gap: 4
                }}
              >
                Tajwid {showTajwid && <HelpCircle size={12} onClick={(e) => { e.stopPropagation(); setShowGuide(true); }} />}
              </button>
            )}
          </div>
        }
      />

      {/* Mushaf Info Bar */}
      <div style={{ 
        background: '#fff', 
        padding: '8px 16px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        borderBottom: '1px solid #eee',
        fontSize: 11,
        fontWeight: 600,
        color: '#666',
        position: 'sticky',
        top: 56,
        zIndex: 10
      }}>
        <div style={{ background: '#f5f5f5', padding: '2px 8px', borderRadius: 4 }}>
          {pageData[0]?.surah.englishName}
        </div>
        <div>Halaman {currentPage}</div>
        <div style={{ background: '#f5f5f5', padding: '2px 8px', borderRadius: 4 }}>
          Juz {pageData[0]?.juz}
        </div>
      </div>

      <div style={{ background: '#fffcf5', minHeight: '80vh' }}>
        {viewMode === 'image' ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '0 0 20px' }}>
            <img 
              src={getPageImageUrl(currentPage)} 
              alt={`Halaman ${currentPage}`} 
              style={{ width: '100%', maxWidth: 500, height: 'auto', display: 'block' }}
              onLoad={() => setLoading(false)}
            />
          </div>
        ) : (
          <div className="mushaf-container" style={{ opacity: loading ? 0.5 : 1, transition: 'opacity 0.2s' }}>
            {Object.entries(ayahsBySurah).map(([surahNum, ayahs]) => {
              const surahInfo = surahList.find(s => s.number === Number(surahNum));
              return (
                <div key={surahNum}>
                  {/* Surah Header */}
                  {ayahs[0].numberInSurah === 1 && (
                    <div style={{ textAlign: 'center', margin: '20px 0 30px' }}>
                      <div style={{ 
                        border: '2px solid #b49e6f', 
                        borderRadius: 8, 
                        padding: '12px',
                        position: 'relative',
                        background: '#fff',
                        maxWidth: 320,
                        margin: '0 auto'
                      }}>
                        <div style={{ fontSize: 10, color: '#b49e6f', position: 'absolute', top: -8, left: '50%', transform: 'translateX(-50%)', background: '#fff', padding: '0 8px' }}>
                          SURAH KE-{surahNum}
                        </div>
                        <div style={{ fontSize: 24, fontFamily: 'Amiri, serif', color: '#1a1a1a', fontWeight: 700 }}>
                          {surahInfo?.arabicName || ayahs[0].surah.name}
                        </div>
                        <div style={{ fontSize: 11, color: '#888', marginTop: 4 }}>
                          {surahInfo?.name || ayahs[0].surah.englishName} • {surahInfo?.ayatCount || ayahs.length} Ayat
                        </div>
                      </div>
                      
                      {Number(surahNum) !== 1 && Number(surahNum) !== 9 && (
                        <div style={{
                          fontSize: 22, fontFamily: 'Amiri, serif', color: '#1a1a1a',
                          marginTop: 20, direction: 'rtl'
                        }}>
                          {BISMILLAH}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Ayahs flow */}
                  {ayahs.map(ayah => (
                    <React.Fragment key={ayah.number}>
                      <span 
                        className="mushaf-ayah-text" 
                        dangerouslySetInnerHTML={{ __html: parseTajweed(ayah.text) }} 
                      />
                      <span className="ayah-end-symbol">{ayah.numberInSurah}</span>
                    </React.Fragment>
                  ))}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Floating Navigation */}
      <div style={{
        position: 'fixed', bottom: 84, left: 0, right: 0,
        display: 'flex', justifyContent: 'center',
        pointerEvents: 'none', zIndex: 100
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.95)',
          borderRadius: 16,
          padding: '8px',
          display: 'flex',
          gap: 4,
          alignItems: 'center',
          pointerEvents: 'auto',
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          border: '1px solid #eee',
          backdropFilter: 'blur(10px)'
        }}>
          <button 
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage(p => p - 1)}
            style={{ 
              background: currentPage <= 1 ? '#f5f5f5' : 'var(--primary-gradient)', 
              border: 'none', color: 'white', 
              width: 40, height: 40, borderRadius: 12,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', transition: 'all 0.2s'
            }}
          >
            <ChevronRight size={20} />
          </button>
          
          <div style={{ padding: '0 16px', textAlign: 'center' }}>
            <div style={{ fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1 }}>Halaman</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>{currentPage}</div>
          </div>

          <button 
            disabled={currentPage >= 604}
            onClick={() => setCurrentPage(p => p + 1)}
            style={{ 
              background: currentPage >= 604 ? '#f5f5f5' : 'var(--primary-gradient)', 
              border: 'none', color: 'white', 
              width: 40, height: 40, borderRadius: 12,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', transition: 'all 0.2s'
            }}
          >
            <ChevronLeft size={20} />
          </button>
        </div>
      </div>

      {/* Tajwid Guide Modal */}
      {showGuide && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20
        }}>
          <div className="card" style={{ width: '100%', maxWidth: 400, position: 'relative' }}>
            <button onClick={() => setShowGuide(false)} style={{ position: 'absolute', right: 12, top: 12, background: 'none', border: 'none', color: 'var(--text-muted)' }}>
              <X size={20} />
            </button>
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 16 }}>Panduan Warna Tajwid</div>
            <div style={{ display: 'grid', gap: 12 }}>
              {[
                { label: 'Ghunnah / Ikhfa', color: '#ff7e00', desc: 'Dengung 2-3 harakat' },
                { label: 'Idgham Bighunnah', color: '#169777', desc: 'Melebur dengan dengung' },
                { label: 'Iqlab', color: '#26b1ed', desc: 'Tukar menjadi suara "m"' },
                { label: 'Qalaqah', color: '#dd0008', desc: 'Suara memantul' },
                { label: 'Mad (Panjang)', color: '#2e478b', desc: 'Bacaan panjang 2-6 harakat' },
              ].map(g => (
                <div key={g.label} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 16, height: 16, borderRadius: 4, background: g.color }} />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{g.label}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{g.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <button className="btn-primary" onClick={() => setShowGuide(false)} style={{ marginTop: 20, width: '100%' }}>Mengerti</button>
          </div>
        </div>
      )}
    </div>
  );
}
