import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Faculty.css';
import { GraduationCap, LayoutDashboard, CreditCard, MessageSquare, Users, Search, Mail, Clock, LogOut, TrendingUp, Wallet } from 'lucide-react';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';

const MOCK_FACULTY = [
  { id: 1, name: "Dr. Rajesh Kumar", role: "COURSE COORDINATOR", dept: "Data Structures", hours: "Mon, Wed • 3:30 PM", email: "r.kumar@university.edu", isPrimary: true, avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Rajesh&backgroundColor=e2e8f0" },
  { id: 2, name: "Prof. Priya Singh", role: "FACULTY", dept: "Machine Learning", hours: "Tue, Thu • 4:00 PM", email: "p.singh@university.edu", isPrimary: false, avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Priya&backgroundColor=e2e8f0" },
  { id: 3, name: "Dr. Amit Patel", role: "FACULTY", dept: "Database Systems", hours: "Wed, Fri • 2:00 PM", email: "a.patel@university.edu", isPrimary: false, avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Amit&backgroundColor=e2e8f0" },
  { id: 4, name: "Prof. Deepak Verma", role: "FACULTY", dept: "Discrete Mathematics", hours: "Mon, Thu • 10:00 AM", email: "d.verma@university.edu", isPrimary: false, avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Deepak&backgroundColor=e2e8f0" },
  { id: 5, name: "Dr. Neha Gupta", role: "FACULTY", dept: "Web Development", hours: "Daily • 5:00 PM", email: "n.gupta@university.edu", isPrimary: false, avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Neha&backgroundColor=e2e8f0" },
  { id: 6, name: "Prof. Arjun Mishra", role: "FACULTY", dept: "Cloud Computing", hours: "Tue, Fri • 4:30 PM", email: "a.mishra@university.edu", isPrimary: false, avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Arjun&backgroundColor=e2e8f0" },
  { id: 7, name: "Dr. Sophia Sharma", role: "FACULTY", dept: "Artificial Intelligence", hours: "Mon, Tue • 11:00 AM", email: "s.sharma@university.edu", isPrimary: false, avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Sophia&backgroundColor=e2e8f0" },
  { id: 8, name: "Prof. Vikram Singh", role: "FACULTY", dept: "Software Engineering", hours: "Wed, Thu • 3:00 PM", email: "v.singh@university.edu", isPrimary: false, avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Vikram&backgroundColor=e2e8f0" },
  { id: 9, name: "Dr. Isha Nair", role: "FACULTY", dept: "Computer Networks", hours: "Fri, Sat • 2:30 PM", email: "i.nair@university.edu", isPrimary: false, avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Isha&backgroundColor=e2e8f0" },
  { id: 10, name: "Prof. Rahul Das", role: "FACULTY", dept: "Operating Systems", hours: "Mon, Wed • 2:00 PM", email: "r.das@university.edu", isPrimary: false, avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Rahul&backgroundColor=e2e8f0" },
  { id: 11, name: "Dr. Ananya Bhat", role: "FACULTY", dept: "Embedded Systems", hours: "Tue, Thu • 5:00 PM", email: "a.bhat@university.edu", isPrimary: false, avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Ananya&backgroundColor=e2e8f0" },
  { id: 12, name: "Prof. Sameer Khan", role: "FACULTY", dept: "Mobile App Development", hours: "Wed, Fri • 4:00 PM", email: "s.khan@university.edu", isPrimary: false, avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Sameer&backgroundColor=e2e8f0" },
  { id: 13, name: "Dr. Kavya Reddy", role: "FACULTY", dept: "Data Science", hours: "Mon, Fri • 3:30 PM", email: "k.reddy@university.edu", isPrimary: false, avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Kavya&backgroundColor=e2e8f0" },
  { id: 14, name: "Prof. Arun Kumar", role: "FACULTY", dept: "Cybersecurity", hours: "Tue, Wed • 2:00 PM", email: "a.kumar@university.edu", isPrimary: false, avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Arun&backgroundColor=e2e8f0" },
  { id: 15, name: "Dr. Pooja Sinha", role: "FACULTY", dept: "IoT (Internet of Things)", hours: "Thu, Sat • 4:00 PM", email: "p.sinha@university.edu", isPrimary: false, avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Pooja&backgroundColor=e2e8f0" },
  { id: 16, name: "Prof. Nikhil Sharma", role: "FACULTY", dept: "Blockchain Technology", hours: "Mon, Thu • 5:30 PM", email: "n.sharma@university.edu", isPrimary: false, avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Nikhil&backgroundColor=e2e8f0" },
  { id: 17, name: "Dr. Meera Sharma", role: "FACULTY", dept: "Advanced Algorithms", hours: "Wed, Fri • 3:00 PM", email: "m.sharma@university.edu", isPrimary: false, avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Meera&backgroundColor=e2e8f0" },
  { id: 18, name: "Prof. Harsh Singh", role: "FACULTY", dept: "Compiler Design", hours: "Tue, Thu • 11:00 AM", email: "h.singh@university.edu", isPrimary: false, avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Harsh&backgroundColor=e2e8f0" },
  { id: 19, name: "Dr. Ritika Gupta", role: "FACULTY", dept: "Image Processing", hours: "Mon, Sat • 4:30 PM", email: "r.gupta@university.edu", isPrimary: false, avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Ritika&backgroundColor=e2e8f0" },
  { id: 20, name: "Prof. Sanjay Verma", role: "FACULTY", dept: "Full Stack Development", hours: "Wed, Fri • 5:00 PM", email: "s.verma@university.edu", isPrimary: false, avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Sanjay&backgroundColor=e2e8f0" }
];

const Faculty = () => {
  const [activeTab, setActiveTab] = useState('All Departments');
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const { handleLogout } = useAuth();

  const tabs = ['All Departments', 'Data Structures', 'Machine Learning', 'Database Systems', 'Discrete Mathematics', 'Web Development', 'Cloud Computing', 'Artificial Intelligence', 'Software Engineering', 'Computer Networks', 'Operating Systems', 'Embedded Systems', 'Mobile App Development', 'Data Science', 'Cybersecurity', 'IoT (Internet of Things)', 'Blockchain Technology', 'Advanced Algorithms', 'Compiler Design', 'Image Processing', 'Full Stack Development'];

  // Logic to filter faculty based on tab and search input
  const filteredFaculty = MOCK_FACULTY.filter(faculty => {
    const matchesTab = activeTab === 'All Departments' || faculty.dept === activeTab;
    const matchesSearch = faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          faculty.dept.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="portal-layout">
      <aside className="portal-sidebar">
        <div className="sidebar-header-main">
          <div className="logo-box"><GraduationCap size={20} color="white" /></div>
          <h2>Parent Portal</h2>
        </div>

        <nav className="portal-nav mt-4">
          <Link to="/home" className="nav-link">🏠 Home</Link>
          <Link to="/chat" className={`nav-link ${location.pathname === '/chat' ? 'active' : ''}`}><MessageSquare size={18} /> AI Assistant</Link>
          <Link to="/dashboard" className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}><LayoutDashboard size={18} /> Dashboard</Link>
          <Link to="/financials" className={`nav-link ${location.pathname === '/financials' ? 'active' : ''}`}><CreditCard size={18} /> Financials</Link>
          <Link to="/faculty" className={`nav-link ${location.pathname === '/faculty' ? 'active' : ''}`}><Users size={18} /> Faculty</Link>
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
            <h1>Faculty & Staff</h1>
            <p>Primary contact list for Ethan's academic and extracurricular support.</p>
          </div>

          <div className="filters-section">
            <div className="tabs-container">
              {tabs.map(tab => (
                <button 
                  key={tab} 
                  className={`tab-btn ${activeTab === tab ? 'active' : ''}`} 
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="search-container">
              <Search size={16} className="search-icon" />
              <input 
                type="text" 
                placeholder="Search by name or subject..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="faculty-grid">
            {filteredFaculty.length > 0 ? (
              filteredFaculty.map(faculty => (
                <div key={faculty.id} className={`faculty-card ${faculty.isPrimary ? 'primary-card' : 'regular-card'}`}>
                  {faculty.isPrimary && <div className="primary-badge-top">PRIMARY CONTACT</div>}
                  <div className="card-inner-top">
                    <div className="faculty-profile">
                      <img src={faculty.avatar} alt={faculty.name} className="faculty-img" />
                      <div className="faculty-info">
                        <div className="name-role-row">
                          <h3>{faculty.name}</h3>
                          <span className="role-badge">{faculty.role}</span>
                        </div>
                        <p className="dept-text">{faculty.dept}</p>
                      </div>
                    </div>
                    {faculty.isPrimary && <button className="primary-msg-btn"><Mail size={16} /> Message</button>}
                  </div>
                  <div className={`card-contact-info ${faculty.isPrimary ? 'horizontal-info' : 'vertical-info'}`}>
                    <div className="info-block">
                      <Clock size={16} className="info-icon" />
                      <div className="info-text">
                        <label>Office Hours</label>
                        <p>{faculty.hours}</p>
                      </div>
                    </div>
                    <div className="info-block">
                      <Mail size={16} className="info-icon" />
                      <div className="info-text">
                        <label>Email</label>
                        <p>{faculty.email}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">
                <p>No faculty members found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Faculty;