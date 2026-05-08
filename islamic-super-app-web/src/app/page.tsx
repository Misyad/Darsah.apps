"use client";

import {
  Bell,
  BookOpen,
  CalendarDays,
  ChevronRight,
  Compass,
  HandHeart,
  Home,
  MapPin,
  Menu,
  MessageCircle,
  Moon,
  Newspaper,
  Radio,
  Search,
  Sparkles,
  Star,
  UserRound,
  Wallet,
} from "lucide-react";

const featureItems = [
  { label: "Al-Qur'an", icon: BookOpen, className: "feature-quran" },
  { label: "Jadwal Shalat", icon: Moon, className: "feature-prayer" },
  { label: "Arah Kiblat", icon: Compass, className: "feature-qibla" },
  { label: "Doa & Wirid", icon: MessageCircle, className: "feature-dua" },
  { label: "Zakat", icon: Wallet, className: "feature-zakat" },
  { label: "Kalender", icon: CalendarDays, className: "feature-calendar" },
  { label: "Kajian", icon: Radio, className: "feature-kajian" },
  { label: "Artikel", icon: Newspaper, className: "feature-article" },
];

const prayerTimes = [
  { name: "Subuh", time: "04:32" },
  { name: "Dzuhur", time: "11:54" },
  { name: "Ashar", time: "15:14" },
  { name: "Maghrib", time: "17:49" },
  { name: "Isya", time: "19:01" },
];

const articles = [
  {
    tag: "Fiqih",
    title: "Tuntunan niat puasa sunnah dan adab harian",
    meta: "5 menit baca",
  },
  {
    tag: "Khutbah",
    title: "Menjaga amanah keluarga dan lingkungan",
    meta: "Naskah Jumat",
  },
];

export default function SuperAppHome() {
  return (
    <main className="app-shell">
      <section className="mobile-app" aria-label="NU style Islamic super app">
        <header className="app-header">
          <div>
            <p>Assalamu&apos;alaikum</p>
            <h1>Darsah Apps</h1>
          </div>
          <div className="header-actions">
            <button aria-label="Search">
              <Search size={18} />
            </button>
            <button aria-label="Notifications">
              <Bell size={18} />
            </button>
          </div>
        </header>

        <section className="hero-card">
          <div className="hero-copy">
            <span className="location-chip">
              <MapPin size={14} />
              Jakarta, Indonesia
            </span>
            <h2>Maghrib 17:49</h2>
            <p>Waktu shalat berikutnya dalam 02j 11m. Tetap terhubung dengan ibadah harianmu.</p>
          </div>
          <div className="mosque-illustration" aria-hidden="true">
            <div className="mosque-dome" />
            <div className="mosque-body" />
            <div className="mosque-minaret left" />
            <div className="mosque-minaret right" />
          </div>
        </section>

        <section className="quick-row" aria-label="Daily quick actions">
          <button>
            <Sparkles size={18} />
            <span>Ayat Hari Ini</span>
          </button>
          <button>
            <HandHeart size={18} />
            <span>Infaq Cepat</span>
          </button>
          <button>
            <Star size={18} />
            <span>Bookmark</span>
          </button>
        </section>

        <section className="section-heading">
          <div>
            <p>Layanan</p>
            <h2>Fitur Utama</h2>
          </div>
          <button aria-label="Lihat semua fitur">
            <ChevronRight size={19} />
          </button>
        </section>

        <section className="feature-grid" aria-label="Fitur utama">
          {featureItems.map((item) => (
            <button className="feature-card" key={item.label}>
              <span className={item.className}>
                <item.icon size={22} />
              </span>
              <strong>{item.label}</strong>
            </button>
          ))}
        </section>

        <section className="prayer-card">
          <div className="section-heading compact">
            <div>
              <p>Hari Ini</p>
              <h2>Jadwal Shalat</h2>
            </div>
            <Moon size={20} />
          </div>
          <div className="prayer-list">
            {prayerTimes.map((item) => (
              <div className={item.name === "Maghrib" ? "prayer-item active" : "prayer-item"} key={item.name}>
                <span>{item.name}</span>
                <strong>{item.time}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="daily-card">
          <p>Doa Harian</p>
          <h2>Allahumma inni as&apos;aluka &apos;ilman nafi&apos;an</h2>
          <span>Ya Allah, aku memohon kepada-Mu ilmu yang bermanfaat.</span>
        </section>

        <section className="article-card">
          <div className="section-heading compact">
            <div>
              <p>Khazanah</p>
              <h2>Artikel & Kajian</h2>
            </div>
            <Newspaper size={20} />
          </div>

          <div className="article-list">
            {articles.map((item) => (
              <article className="article-item" key={item.title}>
                <span>{item.tag}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.meta}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <nav className="app-nav" aria-label="Primary navigation">
          <button className="active">
            <Home size={22} />
          </button>
          <button>
            <BookOpen size={21} />
          </button>
          <button>
            <Compass size={21} />
          </button>
          <button>
            <Menu size={21} />
          </button>
          <button>
            <UserRound size={21} />
          </button>
        </nav>
      </section>
    </main>
  );
}
