import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Home.css';
import { GraduationCap, LayoutDashboard, CreditCard, MessageSquare, Users, LogOut, TrendingUp, Wallet, CalendarDays } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header'; 

const Home = () => {
  const location = useLocation();
  const { handleLogout } = useAuth();

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
            <div className="student-avatar"><img src="https://api.dicebear.com/7.x/notionists/svg?seed=Ethan&backgroundColor=e2e8f0" alt="Ethan" /></div>
            <div className="student-details"><h4>Ethan Wilson</h4><p>Grade 10 - Section B</p></div>
          </div>
        </div>
        <nav className="portal-nav mt-4">
          <Link to="/home" className={`nav-link ${location.pathname === '/home' ? 'active' : ''}`}>🏠 Home</Link>
          <Link to="/events" className="nav-link"><CalendarDays size={18} /> Events</Link>
          <Link to="/chat" className="nav-link"><MessageSquare size={18} /> AI Assistant</Link>
          <Link to="/dashboard" className="nav-link"><LayoutDashboard size={18} /> Dashboard</Link>
          <Link to="/financials" className="nav-link"><CreditCard size={18} /> Financials</Link>
          <Link to="/faculty" className="nav-link"><Users size={18} /> Faculty</Link>
          <Link to="/performance" className="nav-link"><TrendingUp size={18} /> Performance</Link>
          <Link to="/payfee" className="nav-link"><Wallet size={18} /> Pay Fee</Link>
        </nav>
        <div className="sidebar-logout">
          <button onClick={handleLogout} className="logout-btn"><LogOut size={18} /> Logout</button>
        </div>
      </aside>

      <main className="portal-main">
        <Header /> {/* Just one line for the header now! */}

        <div className="content-container">
          <div className="page-title-section">
            <h1>Welcome, Robert</h1>
            <p>Select a module below to view Ethan's academic progress and details.</p>
          </div>

          <div className="home-grid">
            <Link to="/dashboard" className="home-card">
              <div className="home-card-icon blue-bg"><LayoutDashboard size={28} /></div>
              <h3>Academic Dashboard</h3>
              <p>View CGPA, attendance metrics, and current subject grades.</p>
            </Link>
            <Link to="/financials" className="home-card">
              <div className="home-card-icon green-bg"><CreditCard size={28} /></div>
              <h3>Financials & Fees</h3>
              <p>Check pending tuition amounts, deadlines, and payment history.</p>
            </Link>
            <Link to="/chat" className="home-card">
              <div className="home-card-icon purple-bg"><MessageSquare size={28} /></div>
              <h3>AI Assistant</h3>
              <p>Ask our smart chatbot instantly about Ethan's school updates.</p>
            </Link>
            <Link to="/faculty" className="home-card">
              <div className="home-card-icon orange-bg"><Users size={28} /></div>
              <h3>Faculty & Staff</h3>
              <p>Find contact information for Ethan's teachers and advisors.</p>
            </Link>
            <Link to="/performance" className="home-card">
              <div className="home-card-icon teal-bg"><TrendingUp size={28} /></div>
              <h3>Performance Overview</h3>
              <p>Track Ethan's subject-wise progress with semester graphs.</p>
            </Link>
            <Link to="/payfee" className="home-card">
              <div className="home-card-icon indigo-bg"><Wallet size={28} /></div>
              <h3>Pay Fee</h3>
              <p>Make secure payments via UPI, Paytm, PhonePe, or Razorpay.</p>
            </Link>
            <Link to="/events" className="home-card">
              <div className="home-card-icon purple-bg"><CalendarDays size={28} /></div>
              <h3>Events</h3>
              <p>See all upcoming college events and key dates.</p>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
