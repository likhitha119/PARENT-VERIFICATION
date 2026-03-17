import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Profile.css';
import { GraduationCap, LayoutDashboard, CreditCard, MessageSquare, Users, MapPin, BookOpen, User, LogOut, TrendingUp, Wallet } from 'lucide-react';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const location = useLocation();
  const { handleLogout } = useAuth();

  return (
    <div className="portal-layout">
      <aside className="portal-sidebar">
        <div className="sidebar-header-main">
          <div className="logo-box"><GraduationCap size={20} color="white" /></div>
          <h2>Parent Portal</h2>
        </div>
        <nav className="portal-nav mt-4">
          <Link to="/home" className="nav-link">🏠 Home</Link>
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
        <Header />

        <div className="content-container">
          <div className="page-title-section">
            <h1>Student Profile</h1>
            <p>Comprehensive academic and personal details for LIKHITHA.</p>
          </div>

          <div className="profile-container">
            <div className="profile-header-card shadow-sm">
              <div className="profile-banner"></div>
              <div className="profile-header-content">
                <div className="profile-avatar-large">
                  <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Ethan&backgroundColor=fbd38d" alt="Ethan Wilson" />
                </div>
                <div className="profile-title-block">
                  <h2>Ethan</h2>
                  <p className="profile-roll">Roll Number: 231FA04665</p>
                  <span className="status-badge active-status">Active Student</span>
                </div>
              </div>
            </div>

            <div className="profile-details-grid">
              <div className="detail-card shadow-sm">
                <div className="card-header-small">
                  <BookOpen size={18} className="blue-icon" />
                  <h3>Academic Details</h3>
                </div>
                <div className="detail-list">
                  <div className="detail-item"><label>Program</label><p>B.Tech Computer Science</p></div>
                  <div className="detail-item"><label>Grade / Semester</label><p>Grade 10 • Semester 6</p></div>
                  <div className="detail-item"><label>Section</label><p>Section B</p></div>
                  <div className="detail-item"><label>Class Advisor</label><p className="highlight-text">Ms. Sarah Jenkins</p></div>
                </div>
              </div>

              <div className="detail-card shadow-sm">
                <div className="card-header-small">
                  <User size={18} className="blue-icon" />
                  <h3>Personal Information</h3>
                </div>
                <div className="detail-list">
                  <div className="detail-item"><label>Date of Birth</label><p>August 14, 2006</p></div>
                  <div className="detail-item"><label>Blood Group</label><p>B+</p></div>
                  <div className="detail-item"><label>Emergency Contact</label><p>SURYA(Father)</p></div>
                  <div className="detail-item"><label>Emergency Phone</label><p>+91 9701170663</p></div>
                </div>
              </div>

              <div className="detail-card full-width shadow-sm">
                <div className="card-header-small">
                  <MapPin size={18} className="blue-icon" />
                  <h3>Parent / Guardian Residential Address</h3>
                </div>
                <div className="detail-list horizontal-list">
                  <div className="detail-item"><label>Primary Guardian Address</label><p>Piduguralla<br/>Silicon Valley, CA 94025<br/>United States</p></div>
                  <div className="detail-item"><label>Secondary Guardian Address</label><p>piduguralla<br/>Silicon Valley, CA 94025<br/>United States</p></div>
                </div>
              </div>

              <div className="detail-card full-width shadow-sm">
                <div className="card-header-small">
                  <User size={18} className="blue-icon" />
                  <h3>Parent / Guardian Details</h3>
                </div>
                <div className="detail-list">
                  <div className="detail-item"><label>Primary Guardian</label><p>Robert Wilson (Father)</p></div>
                  <div className="detail-item"><label>Guardian Email</label><p>robert.wilson@email.com</p></div>
                  <div className="detail-item"><label>Primary Phone</label><p>+1 (555) 000-0000</p></div>
                  <div className="detail-item"><label>Secondary Guardian</label><p>Margaret Wilson (Mother)</p></div>
                  <div className="detail-item"><label>Secondary Email</label><p>margaret.wilson@email.com</p></div>
                  <div className="detail-item"><label>Secondary Phone</label><p>+1 (555) 000-0001</p></div>
                </div>
              </div>

              <div className="detail-card full-width shadow-sm">
                <div className="card-header-small">
                  <MapPin size={18} className="blue-icon" />
                  <h3>Student Residential Address</h3>
                </div>
                <div className="detail-list horizontal-list">
                  <div className="detail-item"><label>Primary Address</label><p>1234 Education Lane, Apt 4B<br/>Silicon Valley, CA 94025<br/>United States</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;