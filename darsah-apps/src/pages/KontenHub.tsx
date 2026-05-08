import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Newspaper, BookOpen, Mic, Video, Image, Search, Play, Quote, Mic2 } from 'lucide-react';
import { SubHeader } from '../components/layout/AppHeader';
import { articleList, khutbahList, nupediaList, videoList } from '../data/staticData';

const TABS = [
  { key: 'artikel', label: 'Artikel', icon: Newspaper },
  { key: 'nupedia', label: 'NUpedia', icon: BookOpen },
  { key: 'khutbah', label: 'Khutbah', icon: Mic },
  { key: 'video', label: 'Video', icon: Video },
  { key: 'kalam', label: 'Kalam', icon: Image },
];

const KALAM_QUOTES = [
  { id: 1, text: 'Hubbul wathan minal iman — Cinta tanah air adalah sebagian dari iman.', author: 'KH. Hasyim Asy\'ari', bg: 'var(--primary-gradient)', icon: Quote },
  { id: 2, text: 'Islam adalah agama yang mengajarkan rahmat bagi seluruh alam.', author: 'KH. Abdurrahman Wahid', bg: 'linear-gradient(135deg,#1a5799,#2563eb)', icon: Quote },
  { id: 3, text: 'Tafaqqahu fiddin — Mendalami ilmu agama adalah kewajiban setiap Muslim.', author: 'Sayyidina Ali bin Abi Thalib', bg: 'linear-gradient(135deg,#7c3aed,#9f67f0)', icon: Quote },
  { id: 4, text: 'Amal tanpa ilmu adalah buta, ilmu tanpa amal adalah lumpuh.', author: 'Imam Al-Ghazali', bg: 'linear-gradient(135deg,#c8973a,#f0c96e)', icon: Quote },
  { id: 5, text: 'Barangsiapa menempuh jalan untuk mencari ilmu, Allah akan mudahkan baginya jalan menuju surga.', author: 'HR. Muslim', bg: 'linear-gradient(135deg,#0d9488,#2dd4bf)', icon: Quote },
  { id: 6, text: 'Sebaik-baik manusia adalah yang paling bermanfaat bagi manusia lainnya.', author: 'HR. Ahmad', bg: 'linear-gradient(135deg,#e11d48,#fb7185)', icon: Quote },
];

export default function KontenHub() {
  const [tab, setTab] = useState<string>('artikel');
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const filteredArtikel = articleList.filter(a =>
    a.title.toLowerCase().includes(search.toLowerCase()) || a.category.toLowerCase().includes(search.toLowerCase())
  );
  const filteredKhutbah = khutbahList.filter(k =>
    k.title.toLowerCase().includes(search.toLowerCase())
  );
  const filteredNupedia = nupediaList.filter(n =>
    n.name.toLowerCase().includes(search.toLowerCase()) || n.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fade-in">
      <SubHeader title="Konten" />

      {/* Tab bar */}
      <div style={{ display: 'flex', background: 'var(--bg-card)', borderBottom: '1px solid var(--border)', overflowX: 'auto', scrollbarWidth: 'none' }}>
        {TABS.map(({ key, label, icon: Icon }) => (
          <button key={key} onClick={() => setTab(key)} style={{
            flex: '0 0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center',
            gap: 4, padding: '10px 16px', border: 'none', background: 'transparent', cursor: 'pointer',
            color: tab === key ? 'var(--primary)' : 'var(--text-muted)',
            borderBottom: tab === key ? '2.5px solid var(--primary)' : '2.5px solid transparent',
            fontWeight: tab === key ? 600 : 400, fontSize: 12, transition: 'all 0.2s',
          }}>
            <Icon size={18} />
            {label}
          </button>
        ))}
      </div>

      {/* Search */}
      {tab !== 'kalam' && tab !== 'video' && (
        <div style={{ padding: '10px 16px 0' }}>
          <div className="search-input-wrap">
            <Search size={16} className="search-icon" />
            <input className="search-input" placeholder={`Cari ${tab}...`} value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>
      )}

      {/* Content */}
      <div style={{ padding: '12px 16px 24px' }}>

        {/* ARTIKEL */}
        {tab === 'artikel' && (
          <div className="card">
            {filteredArtikel.map(a => (
              <div key={a.id} className="article-card">
                <div className="article-thumb" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>
                  <Newspaper size={28} />
                </div>
                <div className="article-info">
                  <div className="article-category">{a.category}</div>
                  <div className="article-title">{a.title}</div>
                  <div className="article-date">{a.date} · {a.readTime}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* NUPEDIA */}
        {tab === 'nupedia' && (
          <div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 12 }}>
              Ensiklopedia tokoh, lembaga, dan tradisi NU
            </div>
            {filteredNupedia.map(n => (
              <div key={n.id} className="nupedia-item">
                <div className="nupedia-avatar">{n.initial}</div>
                <div style={{ flex: 1 }}>
                  <div className="nupedia-name">{n.name}</div>
                  <div className="nupedia-role">{n.role}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{n.period}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4, lineHeight: 1.5 }}>{n.desc}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* KHUTBAH */}
        {tab === 'khutbah' && (
          <div>
            {filteredKhutbah.map(k => (
              <div key={k.id} className="card-elevated" style={{ marginBottom: 10, cursor: 'pointer' }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', flexShrink: 0 }}>
                    <Mic2 size={22} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-primary)', lineHeight: 1.4 }}>{k.title}</div>
                    <div style={{ fontSize: 12, color: 'var(--primary)', marginTop: 4 }}>{k.author}</div>
                    <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                      <span className="badge badge-green">{k.category}</span>
                      <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{k.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIDEO */}
        {tab === 'video' && (
          <div>
            {videoList.map(v => (
              <div key={v.id} className="video-card">
                <div className="video-thumb" style={{ background: '#0f172a' }}>
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg,#1a1a2e,#16213e)', flexDirection: 'column', gap: 8 }}>
                    <div style={{ color: 'white', opacity: 0.8 }}><Play size={40} fill="white" /></div>
                    <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11 }}>Tonton di YouTube</div>
                  </div>
                  <a href={`https://youtube.com/watch?v=${v.youtubeId}`} target="_blank" rel="noopener noreferrer"
                    style={{ position: 'absolute', inset: 0 }} aria-label={v.title} />
                </div>
                <div className="video-info">
                  <div className="video-title">{v.title}</div>
                  <div className="video-meta">{v.channel} · {v.duration}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* KALAM */}
        {tab === 'kalam' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {KALAM_QUOTES.map(q => (
              <div key={q.id} style={{
                background: q.bg, borderRadius: 16, padding: 16, cursor: 'pointer',
                boxShadow: 'var(--shadow-md)', transition: 'transform 0.2s',
                display: 'flex', flexDirection: 'column', minHeight: 140,
              }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(0.97)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
              >
                <div style={{ color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}><q.icon size={28} /></div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.9)', fontWeight: 500, lineHeight: 1.5, flex: 1 }}>{q.text}</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.65)', marginTop: 8 }}>— {q.author}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
