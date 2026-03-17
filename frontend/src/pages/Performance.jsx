import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Performance.css';
import {
  GraduationCap, LayoutDashboard, CreditCard,
  MessageSquare, Users, LogOut, TrendingUp, Wallet
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';

const semesterLabels = ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6'];

const subjectData = [
  {
    name: 'Data Structures',
    color: '#2563eb',
    lightColor: '#eff6ff',
    scores: [78, 82, 85, 88, 92, 95],
  },
  {
    name: 'Machine Learning',
    color: '#8b5cf6',
    lightColor: '#f5f3ff',
    scores: [65, 70, 74, 80, 84, 84],
  },
  {
    name: 'Database Systems',
    color: '#f97316',
    lightColor: '#fff7ed',
    scores: [70, 68, 72, 71, 75, 75],
  },
  {
    name: 'Discrete Mathematics',
    color: '#10b981',
    lightColor: '#ecfdf5',
    scores: [80, 84, 88, 90, 93, 95],
  },
  {
    name: 'Web Development',
    color: '#0ea5e9',
    lightColor: '#f0f9ff',
    scores: [75, 80, 85, 88, 91, 94],
  },
  {
    name: 'Cloud Computing',
    color: '#64748b',
    lightColor: '#f8fafc',
    scores: [68, 72, 75, 78, 80, 80],
  },
  {
    name: 'Artificial Intelligence',
    color: '#ec4899',
    lightColor: '#fdf2f8',
    scores: [60, 66, 70, 75, 77, 79],
  },
  {
    name: 'Operating Systems',
    color: '#ef4444',
    lightColor: '#fef2f2',
    scores: [82, 85, 88, 90, 93, 95],
  },
];

const CHART_HEIGHT = 200;
const CHART_WIDTH = 520;
const PADDING = { top: 20, right: 20, bottom: 36, left: 40 };

function LineChart({ scores, color }) {
  const innerW = CHART_WIDTH - PADDING.left - PADDING.right;
  const innerH = CHART_HEIGHT - PADDING.top - PADDING.bottom;
  const min = 0;
  const max = 100;

  const xStep = innerW / (scores.length - 1);
  const yScale = (v) => innerH - ((v - min) / (max - min)) * innerH;

  const points = scores.map((s, i) => ({
    x: PADDING.left + i * xStep,
    y: PADDING.top + yScale(s),
    value: s,
  }));

  const polyline = points.map((p) => `${p.x},${p.y}`).join(' ');

  // filled area path
  const areaPath = [
    `M ${points[0].x} ${PADDING.top + innerH}`,
    ...points.map((p) => `L ${p.x} ${p.y}`),
    `L ${points[points.length - 1].x} ${PADDING.top + innerH}`,
    'Z',
  ].join(' ');

  // y-axis grid lines at 0, 25, 50, 75, 100
  const gridLines = [0, 25, 50, 75, 100];

  return (
    <svg
      viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
      className="perf-svg"
      aria-label="Performance line chart"
    >
      <defs>
        <linearGradient id={`grad-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.18" />
          <stop offset="100%" stopColor={color} stopOpacity="0.01" />
        </linearGradient>
      </defs>

      {/* Grid lines */}
      {gridLines.map((g) => {
        const y = PADDING.top + yScale(g);
        return (
          <g key={g}>
            <line
              x1={PADDING.left} y1={y}
              x2={PADDING.left + innerW} y2={y}
              stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4 3"
            />
            <text x={PADDING.left - 6} y={y + 4} textAnchor="end"
              fontSize="11" fill="#94a3b8">{g}</text>
          </g>
        );
      })}

      {/* X-axis labels */}
      {semesterLabels.map((label, i) => (
        <text
          key={label}
          x={PADDING.left + i * xStep}
          y={CHART_HEIGHT - 6}
          textAnchor="middle"
          fontSize="11"
          fill="#94a3b8"
        >
          {label}
        </text>
      ))}

      {/* Area fill */}
      <path d={areaPath} fill={`url(#grad-${color.replace('#', '')})`} />

      {/* Line */}
      <polyline
        points={polyline}
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* Dots + value labels */}
      {points.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="5" fill="#fff" stroke={color} strokeWidth="2.5" />
          <text
            x={p.x} y={p.y - 10}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill={color}
          >
            {p.value}
          </text>
        </g>
      ))}
    </svg>
  );
}

const Performance = () => {
  const location = useLocation();
  const { handleLogout } = useAuth();
  const [activeSubject, setActiveSubject] = useState(null);

  const displayed = activeSubject
    ? subjectData.filter((s) => s.name === activeSubject)
    : subjectData;

  return (
    <div className="portal-layout">
      <aside className="portal-sidebar">
        <div className="sidebar-header-main">
          <div className="logo-box"><GraduationCap size={20} color="white" /></div>
          <h2>Parent Portal</h2>
        </div>
        <div className="student-profile-widget">
          <p className="widget-label">STUDENT</p>
          <div className="student-info-box">
            <div className="student-avatar">
              <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Ethan&backgroundColor=e2e8f0" alt="Ethan" />
            </div>
            <div className="student-details">
              <h4>Ethan Wilson</h4>
              <p>Grade 10 - Section B</p>
            </div>
          </div>
        </div>
        <nav className="portal-nav mt-4">
          <Link to="/home" className="nav-link">🏠 Home</Link>
          <Link to="/chat" className="nav-link"><MessageSquare size={18} /> AI Assistant</Link>
          <Link to="/dashboard" className="nav-link"><LayoutDashboard size={18} /> Dashboard</Link>
          <Link to="/financials" className="nav-link"><CreditCard size={18} /> Financials</Link>
          <Link to="/faculty" className="nav-link"><Users size={18} /> Faculty</Link>
          <Link to="/performance" className={`nav-link ${location.pathname === '/performance' ? 'active' : ''}`}>
            <TrendingUp size={18} /> Performance
          </Link>
          <Link to="/payfee" className="nav-link"><Wallet size={18} /> Pay Fee</Link>
        </nav>
        <div className="sidebar-logout">
          <button onClick={handleLogout} className="logout-btn"><LogOut size={18} /> Logout</button>
        </div>
      </aside>

      <main className="portal-main">
        <Header />

        <div className="content-container">
          <div className="page-title-section">
            <h1>Performance Overview</h1>
            <p>Ethan's subject-wise scores across all semesters.</p>
          </div>

          {/* Subject filter pills */}
          <div className="perf-filter-row">
            <button
              className={`perf-pill ${!activeSubject ? 'perf-pill-active' : ''}`}
              onClick={() => setActiveSubject(null)}
            >
              All Subjects
            </button>
            {subjectData.map((s) => (
              <button
                key={s.name}
                className={`perf-pill ${activeSubject === s.name ? 'perf-pill-active' : ''}`}
                style={activeSubject === s.name ? { background: s.color, borderColor: s.color, color: '#fff' } : {}}
                onClick={() => setActiveSubject(activeSubject === s.name ? null : s.name)}
              >
                <span className="perf-pill-dot" style={{ background: s.color }} />
                {s.name}
              </button>
            ))}
          </div>

          {/* Charts grid */}
          <div className="perf-grid">
            {displayed.map((subject) => {
              const latest = subject.scores[subject.scores.length - 1];
              const prev = subject.scores[subject.scores.length - 2];
              const delta = latest - prev;
              const trend = delta >= 0 ? 'up' : 'down';

              return (
                <div className="perf-card" key={subject.name}>
                  <div className="perf-card-header">
                    <div className="perf-subject-info">
                      <span className="perf-subject-dot" style={{ background: subject.color }} />
                      <span className="perf-subject-name">{subject.name}</span>
                    </div>
                    <div className="perf-latest-score" style={{ color: subject.color }}>
                      {latest}
                      <span className={`perf-trend perf-trend-${trend}`}>
                        {trend === 'up' ? '▲' : '▼'} {Math.abs(delta)}
                      </span>
                    </div>
                  </div>

                  <LineChart scores={subject.scores} color={subject.color} />

                  {/* Semester score row */}
                  <div className="perf-score-row">
                    {subject.scores.map((score, i) => (
                      <div key={i} className="perf-score-cell">
                        <span className="perf-score-sem">{semesterLabels[i]}</span>
                        <span className="perf-score-val" style={{ color: subject.color }}>{score}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Performance;
