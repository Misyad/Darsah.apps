"use client";

import {
  Bell,
  BookOpen,
  ChevronRight,
  Crown,
  Flame,
  Home,
  Menu,
  Moon,
  Play,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Trophy,
  UserRound,
} from "lucide-react";

const categories = [
  {
    title: "Quran Knowledge",
    meta: "12 Questions",
    icon: BookOpen,
    className: "category-card category-teal",
  },
  {
    title: "Duas & Fiqh",
    meta: "8 Questions",
    icon: Moon,
    className: "category-card category-pink",
  },
  {
    title: "Islamic History",
    meta: "10 Questions",
    icon: Trophy,
    className: "category-card category-purple",
  },
  {
    title: "Seerah Quiz",
    meta: "15 Questions",
    icon: Star,
    className: "category-card category-blue",
  },
];

const leaderboard = [
  { name: "Ahmad", score: "980", rank: "01" },
  { name: "Fatimah", score: "920", rank: "02" },
  { name: "Hasan", score: "875", rank: "03" },
];

export default function QuizHome() {
  return (
    <main className="app-shell">
      <section className="mobile-app" aria-label="Islamic Foundation Quiz App">
        <header className="app-header">
          <div className="brand-chip">
            <Sparkles size={16} />
            <span>Quiz App</span>
          </div>
          <div className="header-actions">
            <button aria-label="Notifications">
              <Bell size={18} />
            </button>
            <button className="coin-balance" aria-label="Coin balance">
              <Crown size={14} />
              <span>420</span>
            </button>
          </div>
        </header>

        <section className="welcome-card">
          <div className="welcome-copy">
            <p>Assalamu&apos;alaikum</p>
            <h1>Choose a quiz to play</h1>
            <span>Keep your Islamic learning streak alive today.</span>
            <button>
              <Play size={15} fill="currentColor" />
              Start Daily Quiz
            </button>
          </div>
          <div className="kaaba-illustration" aria-hidden="true">
            <div className="kaaba-band" />
            <div className="kaaba-door" />
          </div>
        </section>

        <section className="section-heading">
          <div>
            <p>Explore</p>
            <h2>Quiz Categories</h2>
          </div>
          <button aria-label="See all categories">
            <ChevronRight size={19} />
          </button>
        </section>

        <section className="category-grid" aria-label="Quiz categories">
          {categories.map((item) => (
            <button className={item.className} key={item.title}>
              <span className="category-icon">
                <item.icon size={22} />
              </span>
              <strong>{item.title}</strong>
              <small>{item.meta}</small>
            </button>
          ))}
        </section>

        <section className="daily-progress">
          <div className="progress-icon">
            <Flame size={22} />
          </div>
          <div>
            <p>Daily Streak</p>
            <h2>7 days learning streak</h2>
          </div>
          <span>75%</span>
        </section>

        <section className="leaderboard-card">
          <div className="section-heading compact">
            <div>
              <p>Top Learners</p>
              <h2>Leaderboard</h2>
            </div>
            <ShieldCheck size={20} />
          </div>

          <div className="leaderboard-list">
            {leaderboard.map((item) => (
              <div className="leaderboard-row" key={item.rank}>
                <span>{item.rank}</span>
                <strong>{item.name}</strong>
                <small>{item.score} pts</small>
              </div>
            ))}
          </div>
        </section>

        <nav className="app-nav" aria-label="Primary navigation">
          <button>
            <Menu size={21} />
          </button>
          <button className="active">
            <Home size={22} />
          </button>
          <button>
            <Search size={21} />
          </button>
          <button>
            <UserRound size={21} />
          </button>
        </nav>
      </section>
    </main>
  );
}
