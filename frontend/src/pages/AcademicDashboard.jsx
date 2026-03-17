import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './AcademicDashboard.css';
import { 
  GraduationCap, LayoutDashboard, CreditCard, MessageSquare, 
  Users, TrendingUp, AlertCircle, CalendarDays, BookOpen, Clock, LogOut, X, FileText, User, CheckCircle, Wallet
} from 'lucide-react';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';

const ATTENDANCE_DATA = [
  { name: "Data Structures", total: 42, attended: 40, percent: 95, status: "EXCELLENT", color: "green" },
  { name: "Machine Learning", total: 38, attended: 32, percent: 84, status: "GOOD", color: "blue" },
  { name: "Database Systems", total: 40, attended: 30, percent: 75, status: "MINIMUM", color: "orange" },
  { name: "Discrete Mathematics", total: 40, attended: 38, percent: 95, status: "EXCELLENT", color: "green" },
  { name: "Web Development", total: 36, attended: 34, percent: 94, status: "EXCELLENT", color: "green" },
  { name: "Cloud Computing", total: 35, attended: 28, percent: 80, status: "GOOD", color: "blue" },
  { name: "Artificial Intelligence", total: 38, attended: 30, percent: 79, status: "GOOD", color: "blue" },
  { name: "Software Engineering", total: 40, attended: 35, percent: 87, status: "GOOD", color: "blue" },
  { name: "Computer Networks", total: 42, attended: 32, percent: 76, status: "MINIMUM", color: "orange" },
  { name: "Operating Systems", total: 40, attended: 38, percent: 95, status: "EXCELLENT", color: "green" },
  { name: "Embedded Systems", total: 39, attended: 28, percent: 72, status: "MINIMUM", color: "orange" },
  { name: "Mobile App Development", total: 36, attended: 33, percent: 92, status: "EXCELLENT", color: "green" },
  { name: "Data Science", total: 38, attended: 31, percent: 82, status: "GOOD", color: "blue" },
  { name: "Cybersecurity", total: 40, attended: 37, percent: 92, status: "EXCELLENT", color: "green" },
  { name: "IoT (Internet of Things)", total: 35, attended: 26, percent: 74, status: "MINIMUM", color: "orange" },
  { name: "Blockchain Technology", total: 32, attended: 25, percent: 78, status: "GOOD", color: "blue" },
  { name: "Advanced Algorithms", total: 42, attended: 40, percent: 95, status: "EXCELLENT", color: "green" },
  { name: "Compiler Design", total: 38, attended: 29, percent: 76, status: "MINIMUM", color: "orange" },
  { name: "Image Processing", total: 36, attended: 34, percent: 94, status: "EXCELLENT", color: "green" },
  { name: "Full Stack Development", total: 40, attended: 36, percent: 90, status: "EXCELLENT", color: "green" },
];

const UPCOMING_TASKS = [
  { 
    id: 1,
    title: "Machine Learning Project Phase 1", 
    due: "Tomorrow, 11:59 PM", 
    dueDate: "March 16, 2026",
    type: "Assignment", 
    icon: BookOpen, 
    color: "blue",
    subject: "Machine Learning",
    faculty: "Prof. Priya Singh",
    facultyEmail: "p.singh@university.edu",
    description: "Implement a supervised learning model using Python with scikit-learn. The project involves data preprocessing, model training, and evaluation.",
    requirements: [
      "Clean and preprocess the provided dataset",
      "Implement at least 3 different ML algorithms",
      "Compare model performance using appropriate metrics",
      "Create visualization plots for results",
      "Write a comprehensive report (5-7 pages)"
    ],
    submissionMode: "Online Portal + PDF Report",
    maxMarks: 40,
    weightage: "40% of internal marks",
    fileFormats: "Python (.py), Jupyter Notebook (.ipynb), PDF Report",
    status: "In Progress",
    statusColor: "orange"
  },
  { 
    id: 2,
    title: "Database Systems Midterm", 
    due: "Friday, 10:00 AM", 
    dueDate: "March 21, 2026",
    type: "Exam", 
    icon: CalendarDays, 
    color: "orange",
    subject: "Database Systems",
    faculty: "Dr. Amit Patel",
    facultyEmail: "a.patel@university.edu",
    description: "Mid-semester examination covering SQL queries, database design, normalization, and transaction management.",
    requirements: [
      "Answer 5 short answer questions (25 marks)",
      "2 long answer questions (20 marks)",
      "1 practical SQL question (15 marks)",
      "Total Duration: 2 hours"
    ],
    submissionMode: "Written Exam - Offline",
    maxMarks: 60,
    weightage: "60% of internal marks",
    fileFormats: "N/A - Written Exam",
    status: "Not Started",
    statusColor: "red"
  },
  {
    id: 3,
    title: "Web Development - Portfolio Project",
    due: "Next Week, 5:00 PM",
    dueDate: "March 23, 2026",
    type: "Project",
    icon: BookOpen,
    color: "green",
    subject: "Web Development",
    faculty: "Dr. Neha Gupta",
    facultyEmail: "n.gupta@university.edu",
    description: "Create a fully responsive personal or business portfolio website using HTML5, CSS3, and JavaScript with modern design principles.",
    requirements: [
      "Responsive design for mobile, tablet, desktop",
      "At least 5 web pages with proper navigation",
      "Contact form with email integration",
      "SEO optimization",
      "Git repository with meaningful commits"
    ],
    submissionMode: "GitHub Link + Live Website URL",
    maxMarks: 50,
    weightage: "50% of internal marks",
    fileFormats: "HTML, CSS, JavaScript files",
    status: "Not Started",
    statusColor: "red"
  },
  {
    id: 4,
    title: "Data Structures - Lab Assignment 3",
    due: "This Saturday, 6:00 PM",
    dueDate: "March 22, 2026",
    type: "Lab Assignment",
    icon: BookOpen,
    color: "blue",
    subject: "Data Structures",
    faculty: "Dr. Rajesh Kumar",
    facultyEmail: "r.kumar@university.edu",
    description: "Implement advanced data structures including Graph, Trie, and AVL Trees with various operations and traversals.",
    requirements: [
      "Implement Graph data structure with DFS and BFS",
      "Implement Trie for efficient string searching",
      "Implement AVL tree with balancing",
      "Create test cases for all operations",
      "Provide complexity analysis"
    ],
    submissionMode: "Online Judge + Code Repository",
    maxMarks: 30,
    weightage: "30% of lab marks",
    fileFormats: "C++/Java source files",
    status: "In Progress",
    statusColor: "orange"
  },
  {
    id: 5,
    title: "Discrete Mathematics - Quiz 2",
    due: "Wednesday, 3:00 PM",
    dueDate: "March 19, 2026",
    type: "Quiz",
    icon: BookOpen,
    color: "purple",
    subject: "Discrete Mathematics",
    faculty: "Prof. Deepak Verma",
    facultyEmail: "d.verma@university.edu",
    description: "Online quiz covering Graph Theory, Combinatorics, and Propositional Logic. 30 minutes duration with randomly shuffled questions.",
    requirements: [
      "Multiple choice questions (20 questions)",
      "Each question worth 1 mark",
      "Negative marking: -0.25 per wrong answer",
      "No negative marks for skipped questions"
    ],
    submissionMode: "Online Quiz Portal",
    maxMarks: 20,
    weightage: "20% of internal marks",
    fileFormats: "N/A - Online Quiz",
    status: "Not Started",
    statusColor: "red"
  }
];

const UPCOMING_EVENTS = [
  { name: "MAHOTSAV", date: "March 25, 2026", day: "Tuesday", color: "blue" },
  { name: "V-CODE Hackathon", date: "March 28, 2026", day: "Friday", color: "green" },
  { name: "Independence Day Rehearsal", date: "April 2, 2026", day: "Wednesday", color: "orange" },
  { name: "Techno-Cultural Fest", date: "April 5, 2026", day: "Saturday", color: "blue" },
  { name: "Sports Meet Finals", date: "April 8, 2026", day: "Tuesday", color: "orange" },
];

// Reusable Circular Progress
const CircularProgress = ({ percentage, text, subtext }) => {
  const sqSize = 100;
  const strokeWidth = 8;
  const radius = (sqSize - strokeWidth) / 2;
  const viewBox = `0 0 ${sqSize} ${sqSize}`;
  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - dashArray * percentage / 100;

  return (
    <div className="circular-progress-container">
      <svg width={sqSize} height={sqSize} viewBox={viewBox} className="circular-progress-svg">
        <circle className="circle-bg" fill="none" strokeWidth={strokeWidth} cx={sqSize / 2} cy={sqSize / 2} r={radius} />
        <circle className="circle-progress" fill="none" strokeWidth={strokeWidth} strokeLinecap="round" strokeDasharray={dashArray} strokeDashoffset={dashOffset} cx={sqSize / 2} cy={sqSize / 2} r={radius} />
      </svg>
      <div className="circular-progress-content">
        <span className="progress-value">{text}</span>
        <span className="progress-label">{subtext}</span>
      </div>
    </div>
  );
};

const AcademicDashboard = () => {
  const location = useLocation();
  const { handleLogout } = useAuth();
  const [selectedTask, setSelectedTask] = useState(null);

  return (
    <div className="portal-layout">
      {/* Standard Sidebar */}
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
          <Link to="/home" className="nav-link">🏠 Home</Link>
          <Link to="/events" className="nav-link"><CalendarDays size={18} /> Events</Link>
          <Link to="/chat" className="nav-link"><MessageSquare size={18} /> AI Assistant</Link>
          <Link to="/dashboard" className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}><LayoutDashboard size={18} /> Dashboard</Link>
          <Link to="/financials" className="nav-link"><CreditCard size={18} /> Financials</Link>
          <Link to="/faculty" className="nav-link"><Users size={18} /> Faculty</Link>
          <Link to="/performance" className="nav-link"><TrendingUp size={18} /> Performance</Link>
          <Link to="/payfee" className="nav-link"><Wallet size={18} /> Pay Fee</Link>
        </nav>
        <div className="sidebar-logout">
          <button onClick={handleLogout} className="logout-btn"><LogOut size={18} /> Logout</button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="portal-main">
        {/* The Reusable Header with Arrows! */}
        <Header /> 

        <div className="content-container">
          <div className="page-title-section">
            <h1>Academic Dashboard</h1>
            <p>Real-time overview of Ethan's grades, attendance, and upcoming coursework.</p>
          </div>

          {/* KPI Cards Grid */}
          <div className="academic-kpi-grid">
            
            <div className="kpi-card shadow-sm">
              <div className="kpi-card-header"><h3>Overall Attendance</h3></div>
              <div className="kpi-card-body flex-center">
                <CircularProgress percentage={88} text="88%" subtext="GOOD" />
              </div>
              <div className="kpi-card-footer green-text"><TrendingUp size={14} /> Above 75% threshold</div>
            </div>

            <div className="kpi-card shadow-sm">
              <div className="kpi-card-header"><h3>Cumulative GPA</h3></div>
              <div className="kpi-card-body pt-lg">
                <div className="metric-value-row"><span className="metric-large">8.42</span><span className="metric-base">/ 10.0</span></div>
                <div className="progress-bar-bg mt-md"><div className="progress-bar-fill blue-fill" style={{ width: '84.2%' }}></div></div>
              </div>
              <div className="kpi-card-footer no-border text-muted">Ranked #12 in department</div>
            </div>

            <div className="kpi-card shadow-sm relative-overflow">
              <AlertCircle size={80} className="bg-watermark-icon" />
              <div className="kpi-card-header"><h3>Active Backlogs</h3></div>
              <div className="kpi-card-body pt-lg relative-z">
                <div className="metric-value-row align-center">
                  <span className="metric-large">0</span>
                  <span className="badge-clear-standing">CLEAR</span>
                </div>
              </div>
              <div className="kpi-card-footer no-border relative-z text-muted wrap-text">All previous exams cleared.</div>
            </div>
            
          </div>

          {/* Lower Grid: Tasks & Attendance Table */}
          <div className="academic-lower-grid">
            
            {/* New Feature: Upcoming Tasks */}
            <div className="dashboard-card shadow-sm">
              <div className="card-header-flex">
                <h3 className="card-title">Upcoming Deadlines</h3>
                <Link to="/tasks" className="view-all-link">View Calendar</Link>
              </div>
              <div className="tasks-list">
                {UPCOMING_TASKS.map((task, i) => (
                  <div key={i} className="task-item" onClick={() => setSelectedTask(task)} style={{ cursor: 'pointer' }}>
                    <div className={`task-icon-box bg-${task.color}-light`}>
                      <task.icon size={18} className={`text-${task.color}`} />
                    </div>
                    <div className="task-details">
                      <h4>{task.title}</h4>
                      <div className="task-meta">
                        <span className="task-type">{task.type}</span>
                        <span className="task-due"><Clock size={12} /> {task.due}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="card-header-flex" style={{ marginTop: '18px' }}>
                <h3 className="card-title">Upcoming Events</h3>
                <span className="view-all-link" style={{ pointerEvents: 'none' }}>Next 30 days</span>
              </div>
              <div className="tasks-list">
                {UPCOMING_EVENTS.map((event, idx) => (
                  <div key={idx} className="task-item">
                    <div className={`task-icon-box bg-${event.color}-light`}>
                      <CalendarDays size={18} className={`text-${event.color}`} />
                    </div>
                    <div className="task-details">
                      <h4>{event.name}</h4>
                      <div className="task-meta">
                        <span className="task-type">{event.day}</span>
                        <span className="task-due"><Clock size={12} /> {event.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Subject Attendance Table */}
            <div className="dashboard-card shadow-sm">
              <h3 className="card-title mb-md">Subject-wise Attendance</h3>
              <div className="table-responsive">
                <table className="custom-table">
                  <thead>
                    <tr><th>SUBJECT</th><th>CLASSES</th><th>PERCENTAGE</th><th>STATUS</th></tr>
                  </thead>
                  <tbody>
                    {ATTENDANCE_DATA.map((row, i) => (
                      <tr key={i}>
                        <td className="fw-bold text-dark">{row.name}</td>
                        <td className="fw-medium text-muted">{row.attended} / {row.total}</td>
                        <td>
                          <div className="table-progress-group">
                            <div className="progress-bar-bg-thin">
                              <div className={`progress-bar-fill bg-${row.color}`} style={{ width: `${row.percent}%` }}></div>
                            </div>
                            <span className="fw-bold">{row.percent}%</span>
                          </div>
                        </td>
                        <td><span className={`status-badge-sm badge-${row.color}`}>{row.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Assignment Details Modal */}
      {selectedTask && (
        <div className="modal-overlay" onClick={() => setSelectedTask(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedTask.title}</h2>
              <button className="modal-close" onClick={() => setSelectedTask(null)}>
                <X size={24} />
              </button>
            </div>

            <div className="modal-body">
              {/* Status Banner */}
              <div className={`status-banner status-${selectedTask.statusColor}`}>
                <CheckCircle size={20} />
                <span>Status: {selectedTask.status}</span>
              </div>

              {/* Subject & Faculty Section */}
              <div className="detail-section">
                <h3>Subject & Faculty Information</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <label>Subject</label>
                    <p>{selectedTask.subject}</p>
                  </div>
                  <div className="info-item">
                    <label>Faculty Instructor</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <User size={16} />
                      <p>{selectedTask.faculty}</p>
                    </div>
                  </div>
                  <div className="info-item">
                    <label>Faculty Email</label>
                    <p style={{ color: '#2563eb', cursor: 'pointer' }}>{selectedTask.facultyEmail}</p>
                  </div>
                  <div className="info-item">
                    <label>Task Type</label>
                    <p>{selectedTask.type}</p>
                  </div>
                </div>
              </div>

              {/* Due Date & Deadline Section */}
              <div className="detail-section">
                <h3>Deadline Information</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <label>Due Date</label>
                    <p>{selectedTask.dueDate}</p>
                  </div>
                  <div className="info-item">
                    <label>Submission Time</label>
                    <p>{selectedTask.due}</p>
                  </div>
                  <div className="info-item">
                    <label>Submission Mode</label>
                    <p>{selectedTask.submissionMode}</p>
                  </div>
                  <div className="info-item">
                    <label>Accepted File Formats</label>
                    <p>{selectedTask.fileFormats}</p>
                  </div>
                </div>
              </div>

              {/* Task Description */}
              <div className="detail-section">
                <h3>Task Description</h3>
                <p className="description-text">{selectedTask.description}</p>
              </div>

              {/* Requirements */}
              <div className="detail-section">
                <h3>Requirements & Guidelines</h3>
                <ul className="requirements-list">
                  {selectedTask.requirements.map((req, idx) => (
                    <li key={idx}>
                      <CheckCircle size={16} />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Marks Section */}
              <div className="detail-section">
                <h3>Evaluation Criteria</h3>
                <div className="marks-grid">
                  <div className="marks-item">
                    <label>Maximum Marks</label>
                    <p className="marks-value">{selectedTask.maxMarks}</p>
                  </div>
                  <div className="marks-item">
                    <label>Weightage</label>
                    <p>{selectedTask.weightage}</p>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="modal-actions">
                <button className="action-btn secondary-btn" onClick={() => setSelectedTask(null)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AcademicDashboard;
