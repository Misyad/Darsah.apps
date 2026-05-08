"use client";

import { useEffect, useMemo, useState } from "react";
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
  X,
} from "lucide-react";

type FeatureId = "quran" | "prayer" | "qibla" | "dua" | "zakat" | "calendar" | "kajian" | "article";
type QuranItem = { id: number; surah: string; ayah_count: number; type: string };
type DuaItem = { id?: number; title: string; latin?: string; translation: string };
type KanuzCategory = { category: string; prayers: DuaItem[] };
type ArticleItem = { tag: string; title: string; meta: string; body: string };

const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4001";

const featureItems: Array<{ id: FeatureId; label: string; icon: typeof BookOpen; className: string }> = [
  { id: "quran", label: "Al-Qur'an", icon: BookOpen, className: "feature-quran" },
  { id: "prayer", label: "Jadwal Shalat", icon: Moon, className: "feature-prayer" },
  { id: "qibla", label: "Arah Kiblat", icon: Compass, className: "feature-qibla" },
  { id: "dua", label: "Doa & Wirid", icon: MessageCircle, className: "feature-dua" },
  { id: "zakat", label: "Zakat", icon: Wallet, className: "feature-zakat" },
  { id: "calendar", label: "Kalender", icon: CalendarDays, className: "feature-calendar" },
  { id: "kajian", label: "Kajian", icon: Radio, className: "feature-kajian" },
  { id: "article", label: "Artikel", icon: Newspaper, className: "feature-article" },
];

const prayerTimes = [
  { name: "Subuh", time: "04:32" },
  { name: "Dzuhur", time: "11:54" },
  { name: "Ashar", time: "15:14" },
  { name: "Maghrib", time: "17:49" },
  { name: "Isya", time: "19:01" },
];

const fallbackQuran: QuranItem[] = [
  { id: 1, surah: "Al-Fatihah", ayah_count: 7, type: "Makkiyah" },
  { id: 2, surah: "Al-Baqarah", ayah_count: 286, type: "Madaniyah" },
  { id: 18, surah: "Al-Kahf", ayah_count: 110, type: "Makkiyah" },
  { id: 36, surah: "Yasin", ayah_count: 83, type: "Makkiyah" },
];

const fallbackDuas: DuaItem[] = [
  {
    id: 1,
    title: "Doa Sebelum Makan",
    latin: "Allahumma barik lana fima razaqtana wa qina adzaban nar",
    translation: "Ya Allah, berkahilah rezeki kami dan lindungilah kami dari siksa api neraka.",
  },
  {
    id: 2,
    title: "Doa Bangun Tidur",
    latin: "Alhamdulillahil ladzi ahyana ba'da ma amatana wa ilaihin nusyur",
    translation: "Segala puji bagi Allah yang menghidupkan kami setelah mematikan kami.",
  },
];

const fallbackKanuz: KanuzCategory[] = [
  { category: "Harian", prayers: fallbackDuas },
  {
    category: "Wirid & Ratib",
    prayers: [
      {
        title: "Ratibul Haddad",
        latin: "Al-Fatihah ila hadhratin nabiyyi Muhammadin...",
        translation: "Bacaan pembuka ratib dan wirid pilihan.",
      },
    ],
  },
];

const articles: ArticleItem[] = [
  {
    tag: "Fiqih",
    title: "Tuntunan niat puasa sunnah dan adab harian",
    meta: "5 menit baca",
    body: "Ringkasan tuntunan ibadah harian, mulai dari niat, adab, hingga pengingat amalan ringan.",
  },
  {
    tag: "Khutbah",
    title: "Menjaga amanah keluarga dan lingkungan",
    meta: "Naskah Jumat",
    body: "Materi khutbah singkat tentang amanah, tanggung jawab sosial, dan akhlak bermasyarakat.",
  },
  {
    tag: "NUpedia",
    title: "Mengenal tradisi wirid ba'da shalat",
    meta: "Ensiklopedia",
    body: "Penjelasan praktis tentang wirid setelah shalat dan nilai pendidikan spiritualnya.",
  },
];

const kajianItems = [
  { title: "Kajian Tafsir Al-Fatihah", speaker: "Ust. Ahmad", time: "20:00 WIB", status: "Live malam ini" },
  { title: "Ngaji Fiqih Ibadah", speaker: "Nyai Fatimah", time: "Ba'da Maghrib", status: "Rekaman tersedia" },
  { title: "Kalam Hikmah", speaker: "KH. Hasan", time: "06:30 WIB", status: "Audio 12 menit" },
];

const hijriMonths = ["Muharram", "Safar", "Rabiul Awal", "Rabiul Akhir", "Jumadil Awal", "Jumadil Akhir", "Rajab", "Sya'ban", "Ramadhan", "Syawal", "Dzulqa'dah", "Dzulhijjah"];

async function fetchJson<T>(path: string, fallback: T): Promise<T> {
  try {
    const response = await fetch(`${apiBase}${path}`, { cache: "no-store" });
    if (!response.ok) return fallback;
    return (await response.json()) as T;
  } catch {
    return fallback;
  }
}

function currency(value: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);
}

export default function SuperAppHome() {
  const [activeFeature, setActiveFeature] = useState<FeatureId>("quran");
  const [quran, setQuran] = useState<QuranItem[]>(fallbackQuran);
  const [duas, setDuas] = useState<DuaItem[]>(fallbackDuas);
  const [kanuz, setKanuz] = useState<KanuzCategory[]>(fallbackKanuz);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [bookmarked, setBookmarked] = useState<string[]>(["Al-Fatihah"]);
  const [notification, setNotification] = useState("Jadwal Maghrib akan masuk pukul 17:49.");
  const [zakatAsset, setZakatAsset] = useState(85000000);
  const [zakatDebt, setZakatDebt] = useState(5000000);
  const [infaqAmount, setInfaqAmount] = useState(50000);
  const [infaqStatus, setInfaqStatus] = useState("Siap menyalurkan infaq.");

  useEffect(() => {
    fetchJson<QuranItem[]>("/api/quran", fallbackQuran).then(setQuran);
    fetchJson<DuaItem[]>("/api/duas", fallbackDuas).then(setDuas);
    fetchJson<KanuzCategory[]>("/api/kanuz-prayers", fallbackKanuz).then(setKanuz);
  }, []);

  const zakatBase = Math.max(zakatAsset - zakatDebt, 0);
  const zakatTotal = Math.round(zakatBase * 0.025);
  const searchableItems = useMemo(
    () => [
      ...featureItems.map((item) => ({ type: "Fitur", title: item.label })),
      ...quran.map((item) => ({ type: "Surah", title: item.surah })),
      ...duas.map((item) => ({ type: "Doa", title: item.title })),
      ...articles.map((item) => ({ type: item.tag, title: item.title })),
    ],
    [duas, quran],
  );
  const searchResults = searchableItems.filter((item) => item.title.toLowerCase().includes(query.toLowerCase())).slice(0, 8);

  function toggleBookmark(title: string) {
    setBookmarked((current) => (current.includes(title) ? current.filter((item) => item !== title) : [...current, title]));
  }

  function renderFeaturePanel() {
    if (activeFeature === "quran") {
      return (
        <div className="panel-list">
          {quran.map((surah) => (
            <button className="content-row" key={surah.id} onClick={() => toggleBookmark(surah.surah)}>
              <span>{surah.id}</span>
              <div>
                <strong>{surah.surah}</strong>
                <small>{surah.ayah_count} ayat - {surah.type}</small>
              </div>
              <Star className={bookmarked.includes(surah.surah) ? "star-active" : ""} size={18} />
            </button>
          ))}
        </div>
      );
    }

    if (activeFeature === "prayer") {
      return (
        <div className="panel-list">
          {prayerTimes.map((item) => (
            <div className={item.name === "Maghrib" ? "content-row selected-row" : "content-row"} key={item.name}>
              <span>{item.name.slice(0, 1)}</span>
              <div>
                <strong>{item.name}</strong>
                <small>{item.name === "Maghrib" ? "Waktu aktif berikutnya" : "Jakarta, simulasi"}</small>
              </div>
              <b>{item.time}</b>
            </div>
          ))}
        </div>
      );
    }

    if (activeFeature === "qibla") {
      return (
        <div className="qibla-panel">
          <div className="compass-dial">
            <Compass size={46} />
            <span>295°</span>
          </div>
          <strong>Arah kiblat dari Jakarta</strong>
          <p>Arahkan perangkat ke barat laut. Kompas ini adalah simulasi visual untuk UI dan bisa dihubungkan ke sensor perangkat nanti.</p>
        </div>
      );
    }

    if (activeFeature === "dua") {
      return (
        <div className="panel-list">
          {kanuz.map((group) => (
            <div className="group-block" key={group.category}>
              <h3>{group.category}</h3>
              {group.prayers.slice(0, 3).map((dua) => (
                <article className="text-card" key={`${group.category}-${dua.title}`}>
                  <strong>{dua.title}</strong>
                  {dua.latin && <p>{dua.latin}</p>}
                  <small>{dua.translation}</small>
                </article>
              ))}
            </div>
          ))}
        </div>
      );
    }

    if (activeFeature === "zakat") {
      return (
        <div className="calculator-card">
          <label>
            Total harta
            <input type="number" value={zakatAsset} onChange={(event) => setZakatAsset(Number(event.target.value))} />
          </label>
          <label>
            Hutang jatuh tempo
            <input type="number" value={zakatDebt} onChange={(event) => setZakatDebt(Number(event.target.value))} />
          </label>
          <div className="calc-result">
            <span>Zakat 2.5%</span>
            <strong>{currency(zakatTotal)}</strong>
          </div>
        </div>
      );
    }

    if (activeFeature === "calendar") {
      return (
        <div className="calendar-grid">
          {hijriMonths.map((month, index) => (
            <button className={month === "Ramadhan" ? "calendar-month active" : "calendar-month"} key={month}>
              <span>{index + 1}</span>
              <strong>{month}</strong>
            </button>
          ))}
        </div>
      );
    }

    if (activeFeature === "kajian") {
      return (
        <div className="panel-list">
          {kajianItems.map((item) => (
            <article className="content-row" key={item.title}>
              <span><Radio size={16} /></span>
              <div>
                <strong>{item.title}</strong>
                <small>{item.speaker} - {item.time}</small>
              </div>
              <b>{item.status}</b>
            </article>
          ))}
        </div>
      );
    }

    return (
      <div className="panel-list">
        {articles.map((item) => (
          <article className="text-card" key={item.title}>
            <span>{item.tag}</span>
            <strong>{item.title}</strong>
            <p>{item.body}</p>
            <small>{item.meta}</small>
          </article>
        ))}
      </div>
    );
  }

  const activeLabel = featureItems.find((item) => item.id === activeFeature)?.label || "Fitur";

  return (
    <main className="app-shell">
      <section className="mobile-app" aria-label="NU style Islamic super app">
        <header className="app-header">
          <div>
            <p>Assalamu&apos;alaikum</p>
            <h1>Darsah Apps</h1>
          </div>
          <div className="header-actions">
            <button aria-label="Search" onClick={() => setSearchOpen(true)}>
              <Search size={18} />
            </button>
            <button aria-label="Notifications" onClick={() => setNotification("Pengingat aktif: Maghrib 17:49, kajian 20:00 WIB.")}>
              <Bell size={18} />
            </button>
          </div>
        </header>

        {notification && (
          <button className="notice-bar" onClick={() => setNotification("")}>
            <Bell size={15} />
            <span>{notification}</span>
            <X size={14} />
          </button>
        )}

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
          <button onClick={() => setActiveFeature("quran")}>
            <Sparkles size={18} />
            <span>Ayat Hari Ini</span>
          </button>
          <button onClick={() => setInfaqStatus(`Infaq ${currency(infaqAmount)} siap diproses melalui payment gateway.`)}>
            <HandHeart size={18} />
            <span>Infaq Cepat</span>
          </button>
          <button onClick={() => setActiveFeature("quran")}>
            <Star size={18} />
            <span>{bookmarked.length} Bookmark</span>
          </button>
        </section>

        <section className="infaq-card">
          <label>
            Nominal infaq cepat
            <input type="number" value={infaqAmount} onChange={(event) => setInfaqAmount(Number(event.target.value))} />
          </label>
          <small>{infaqStatus}</small>
        </section>

        <section className="section-heading">
          <div>
            <p>Layanan</p>
            <h2>Fitur Utama</h2>
          </div>
          <button aria-label="Lihat semua fitur" onClick={() => setSearchOpen(true)}>
            <ChevronRight size={19} />
          </button>
        </section>

        <section className="feature-grid" aria-label="Fitur utama">
          {featureItems.map((item) => (
            <button className={item.id === activeFeature ? "feature-card is-active" : "feature-card"} key={item.id} onClick={() => setActiveFeature(item.id)}>
              <span className={item.className}>
                <item.icon size={22} />
              </span>
              <strong>{item.label}</strong>
            </button>
          ))}
        </section>

        <section className="feature-panel">
          <div className="section-heading compact">
            <div>
              <p>Aktif</p>
              <h2>{activeLabel}</h2>
            </div>
            <button aria-label="Cari konten" onClick={() => setSearchOpen(true)}>
              <Search size={18} />
            </button>
          </div>
          {renderFeaturePanel()}
        </section>

        <section className="daily-card">
          <p>Doa Harian</p>
          <h2>Allahumma inni as&apos;aluka &apos;ilman nafi&apos;an</h2>
          <span>Ya Allah, aku memohon kepada-Mu ilmu yang bermanfaat.</span>
        </section>

        <nav className="app-nav" aria-label="Primary navigation">
          <button className={activeFeature === "quran" ? "active" : ""} onClick={() => setActiveFeature("quran")}>
            <Home size={22} />
          </button>
          <button className={activeFeature === "prayer" ? "active" : ""} onClick={() => setActiveFeature("prayer")}>
            <BookOpen size={21} />
          </button>
          <button className={activeFeature === "qibla" ? "active" : ""} onClick={() => setActiveFeature("qibla")}>
            <Compass size={21} />
          </button>
          <button className={activeFeature === "article" ? "active" : ""} onClick={() => setActiveFeature("article")}>
            <Menu size={21} />
          </button>
          <button onClick={() => setNotification("Profil demo aktif. Login backend bisa disambungkan pada tahap berikutnya.")}>
            <UserRound size={21} />
          </button>
        </nav>

        {searchOpen && (
          <div className="search-sheet" role="dialog" aria-label="Pencarian">
            <div className="search-card">
              <div className="search-top">
                <strong>Cari layanan dan konten</strong>
                <button aria-label="Tutup pencarian" onClick={() => setSearchOpen(false)}>
                  <X size={18} />
                </button>
              </div>
              <input autoFocus placeholder="Cari Quran, doa, artikel..." value={query} onChange={(event) => setQuery(event.target.value)} />
              <div className="panel-list">
                {(query ? searchResults : searchableItems.slice(0, 6)).map((item) => (
                  <button className="content-row" key={`${item.type}-${item.title}`} onClick={() => setSearchOpen(false)}>
                    <span>{item.type.slice(0, 1)}</span>
                    <div>
                      <strong>{item.title}</strong>
                      <small>{item.type}</small>
                    </div>
                    <ChevronRight size={17} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
