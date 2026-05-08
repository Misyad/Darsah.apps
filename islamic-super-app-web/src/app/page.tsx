"use client";

import {
  ArrowLeft,
  BookOpen,
  CircleHelp,
  Crown,
  Flame,
  Home,
  Menu,
  Moon,
  Play,
  Search,
  Sparkles,
  Star,
  Trophy,
} from "lucide-react";

const categories = [
  {
    title: "Quran Knowledge",
    meta: "12 Questions",
    icon: BookOpen,
    className: "quiz-card quiz-card-teal",
  },
  {
    title: "Duas & Fiqh",
    meta: "8 Questions",
    icon: Moon,
    className: "quiz-card quiz-card-coral",
  },
  {
    title: "Islamic History",
    meta: "10 Questions",
    icon: Trophy,
    className: "quiz-card quiz-card-violet",
  },
  {
    title: "Seerah Quiz",
    meta: "15 Questions",
    icon: Star,
    className: "quiz-card quiz-card-blue",
  },
];

const answers = ["Masjidil Haram", "Baitul Maqdis", "Madinah City", "Jabal Uhud"];

export default function QuizShowcase() {
  return (
    <main className="quiz-showcase">
      <section className="brand-panel" aria-label="Islamic Foundation Quiz App">
        <div className="behance-pill">
          <span>Be</span>
          <small>Case Study</small>
        </div>

        <div className="seal-mark">
          <div className="seal-inner">علم</div>
        </div>
        <p>Islamic Foundation</p>
        <h1>Quiz App</h1>
      </section>

      <section className="phone-stage" aria-label="Quiz app screens">
        <article className="phone phone-home" aria-label="Quiz category screen">
          <div className="phone-topbar">
            <div className="mini-brand">
              <Sparkles size={14} />
              <span>Quiz App</span>
            </div>
            <div className="coin-chip">
              <Crown size={12} />
              <span>420</span>
            </div>
          </div>

          <div className="hero-card">
            <p>Choose a quiz to play</p>
            <h2>Islamic World Knowledge</h2>
            <span>Keep your learning streak alive today.</span>
            <div className="kaaba-card" aria-hidden="true">
              <div className="kaaba-gold" />
            </div>
          </div>

          <div className="category-grid">
            {categories.map((item) => (
              <button className={item.className} key={item.title}>
                <span className="card-icon">
                  <item.icon size={17} />
                </span>
                <strong>{item.title}</strong>
                <small>{item.meta}</small>
              </button>
            ))}
          </div>

          <nav className="bottom-nav" aria-label="Primary">
            <button>
              <Menu size={17} />
            </button>
            <button className="active">
              <Home size={17} />
            </button>
            <button>
              <Search size={17} />
            </button>
          </nav>
        </article>

        <article className="phone phone-question" aria-label="Question screen">
          <div className="question-header">
            <button>
              <ArrowLeft size={17} />
            </button>
            <strong>Islamic World</strong>
            <button>
              <CircleHelp size={17} />
            </button>
          </div>

          <div className="question-card">
            <div>
              <span>Question 04</span>
              <h2>Which city is the first qibla located in?</h2>
            </div>
            <div className="timer">15</div>
          </div>

          <div className="answer-list">
            {answers.map((answer) => (
              <button className={answer === "Baitul Maqdis" ? "selected" : ""} key={answer}>
                {answer}
              </button>
            ))}
          </div>

          <button className="next-question">Next Question</button>

          <div className="result-badge">
            <span>1</span>
            <strong>Right Answer</strong>
          </div>
        </article>

        <article className="phone phone-start" aria-label="Start quiz screen">
          <div className="start-pattern" />
          <div className="start-content">
            <div className="seal-mark large">
              <div className="seal-inner">الله</div>
            </div>
            <p>Welcome to</p>
            <h2>Islamic Foundation Quiz App</h2>
            <button className="start-button">
              <Play size={15} fill="currentColor" />
              Start Quiz
            </button>
            <div className="level-row">
              <button>Easy</button>
              <button className="active">Medium</button>
              <button>Hard</button>
            </div>
          </div>
        </article>
      </section>

      <div className="floating-score" aria-label="Score streak">
        <Flame size={18} />
        <span>7 day streak</span>
      </div>
    </main>
  );
}
