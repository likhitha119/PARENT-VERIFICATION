import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Events.css";
import {
  GraduationCap,
  LayoutDashboard,
  CreditCard,
  MessageSquare,
  Users,
  TrendingUp,
  LogOut,
  Wallet,
  CalendarDays,
} from "lucide-react";
import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";

const EVENTS = [
  {
    name: "MAHOTSAV",
    date: "March 25, 2026",
    day: "Tuesday",
    location: "Main Auditorium",
    tag: "Cultural",
  },
  {
    name: "V-CODE Hackathon",
    date: "March 28, 2026",
    day: "Friday",
    location: "Innovation Lab",
    tag: "Tech",
  },
  {
    name: "Independence Day Rehearsal",
    date: "April 2, 2026",
    day: "Wednesday",
    location: "Open Grounds",
    tag: "Ceremony",
  },
  {
    name: "Techno-Cultural Fest",
    date: "April 5, 2026",
    day: "Saturday",
    location: "Campus Arena",
    tag: "Fest",
  },
  {
    name: "Sports Meet Finals",
    date: "April 8, 2026",
    day: "Tuesday",
    location: "Sports Complex",
    tag: "Sports",
  },
];

const Events = () => {
  const location = useLocation();
  const { handleLogout } = useAuth();

  return (
    <div className="portal-layout">
      <aside className="portal-sidebar">
        <div className="sidebar-header-main">
          <div className="logo-box">
            <GraduationCap size={20} color="white" />
          </div>
          <h2>Parent Portal</h2>
        </div>
        <div className="student-profile-widget">
          <p className="widget-label">STUDENT</p>
          <div className="student-info-box">
            <div className="student-avatar">
              <img
                src="https://api.dicebear.com/7.x/notionists/svg?seed=Ethan&backgroundColor=e2e8f0"
                alt="Ethan"
              />
            </div>
            <div className="student-details">
              <h4>Ethan Wilson</h4>
              <p>Grade 10 - Section B</p>
            </div>
          </div>
        </div>
        <nav className="portal-nav mt-4">
          <Link to="/home" className="nav-link">
            🏠 Home
          </Link>
          <Link
            to="/events"
            className={`nav-link ${location.pathname === "/events" ? "active" : ""}`}
          >
            <CalendarDays size={18} /> Events
          </Link>
          <Link to="/chat" className="nav-link">
            <MessageSquare size={18} /> AI Assistant
          </Link>
          <Link to="/dashboard" className="nav-link">
            <LayoutDashboard size={18} /> Dashboard
          </Link>
          <Link to="/financials" className="nav-link">
            <CreditCard size={18} /> Financials
          </Link>
          <Link to="/faculty" className="nav-link">
            <Users size={18} /> Faculty
          </Link>
          <Link to="/performance" className="nav-link">
            <TrendingUp size={18} /> Performance
          </Link>
          <Link to="/payfee" className="nav-link">
            <Wallet size={18} /> Pay Fee
          </Link>
        </nav>
        <div className="sidebar-logout">
          <button onClick={handleLogout} className="logout-btn">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      <main className="portal-main">
        <Header />

        <div className="content-container">
          <div className="page-title-section">
            <h1>Upcoming Events</h1>
            <p>Stay updated with key college events happening over the next month.</p>
          </div>

          <div className="events-grid">
            {EVENTS.map((event, idx) => (
              <div key={idx} className="event-card">
                <div className="event-card-header">
                  <div className="event-icon">
                    <CalendarDays size={22} />
                  </div>
                  <div>
                    <h3>{event.name}</h3>
                    <p className="event-tag">{event.tag}</p>
                  </div>
                </div>
                <div className="event-meta">
                  <span className="pill">{event.day}</span>
                  <span className="pill primary">{event.date}</span>
                  <span className="pill subtle">{event.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Events;
