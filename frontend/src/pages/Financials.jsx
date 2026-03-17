import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Financials.css';
import { GraduationCap, LayoutDashboard, CreditCard, Users, MessageSquare, ClipboardList, CheckCircle2, AlertTriangle, TrendingUp, LogOut, ChevronRight, Download, Wallet } from 'lucide-react';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';
import { Document, Packer, Paragraph, Table, TableCell, TableRow, AlignmentType } from 'docx';
import { saveAs } from 'file-saver';
import { apiFetch } from '../config/api';

const PAYMENT_HISTORY = [
  { id: "#TXN-8821", date: "Oct 12, 2023", desc: "Term 2 Tuition Fee", amount: "₹1,50,000", status: "Success" },
  { id: "#TXN-8740", date: "Sep 05, 2023", desc: "Bus Fee", amount: "₹30,000", status: "Success" },
  { id: "#TXN-8639", date: "Aug 15, 2023", desc: "Hostel Fee", amount: "₹60,000", status: "Success" },
  { id: "#TXN-8538", date: "Jul 20, 2023", desc: "Lab Fee", amount: "₹25,000", status: "Success" },
  { id: "#TXN-8437", date: "Jun 10, 2023", desc: "Sports Fee", amount: "₹5,000", status: "Success" },
];

const Financials = () => {
  const location = useLocation();
  const { handleLogout } = useAuth();
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courseFeeDetails, setCourseFeeDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [studentInfo, setStudentInfo] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await apiFetch('/api/courses');
      const data = await response.json();
      setCourses(data.courses);
      setStudentInfo(data.student);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCourseClick = async (courseId) => {
    try {
      setLoading(true);
      const response = await apiFetch(`/api/course-fees/${courseId}`);
      const data = await response.json();
      setCourseFeeDetails(data);
      setSelectedCourse(courseId);
    } catch (error) {
      console.error('Error fetching course fees:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const downloadPaymentHistoryAsWord = async () => {
    try {
      const rows = [
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph({ text: "TRANSACTION ID", bold: true })],
              shading: { fill: "2563eb", color: "ffffff" },
            }),
            new TableCell({
              children: [new Paragraph({ text: "DATE", bold: true })],
              shading: { fill: "2563eb", color: "ffffff" },
            }),
            new TableCell({
              children: [new Paragraph({ text: "DESCRIPTION", bold: true })],
              shading: { fill: "2563eb", color: "ffffff" },
            }),
            new TableCell({
              children: [new Paragraph({ text: "AMOUNT", bold: true })],
              shading: { fill: "2563eb", color: "ffffff" },
            }),
            new TableCell({
              children: [new Paragraph({ text: "STATUS", bold: true })],
              shading: { fill: "2563eb", color: "ffffff" },
            }),
          ],
        }),
      ];

      PAYMENT_HISTORY.forEach((row) => {
        rows.push(
          new TableRow({
            children: [
              new TableCell({
                children: [new Paragraph({ text: row.id })],
              }),
              new TableCell({
                children: [new Paragraph({ text: row.date })],
              }),
              new TableCell({
                children: [new Paragraph({ text: row.desc })],
              }),
              new TableCell({
                children: [new Paragraph({ text: row.amount })],
              }),
              new TableCell({
                children: [new Paragraph({ text: row.status })],
              }),
            ],
          })
        );
      });

      const doc = new Document({
        sections: [
          {
            children: [
              new Paragraph({
                text: "PAYMENT HISTORY REPORT",
                bold: true,
                size: 32,
                alignment: AlignmentType.CENTER,
              }),
              new Paragraph({
                text: `Student: ${studentInfo?.name || 'Ethan Wilson'}`,
                size: 20,
                spacing: { after: 100 },
              }),
              new Paragraph({
                text: `Generated on: ${new Date().toLocaleDateString()}`,
                size: 18,
                spacing: { after: 200 },
              }),
              new Table({
                rows: rows,
                width: { size: 100, type: "pct" },
              }),
            ],
          },
        ],
      });

      const blob = await Packer.toBlob(doc);
      saveAs(blob, `Payment_History_${studentInfo?.id || 'Student'}.docx`);
    } catch (error) {
      console.error('Error generating Word document:', error);
    }
  };

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

        <div className="content-container-full">
          <div className="page-title-section">
            <h1>Financials & Fees Management</h1>
            <p>View B.Tech courses, fee breakdowns, and payment history.</p>
          </div>

          <div className="summary-cards-container-full">
            <div className="summary-card">
              <div className="card-top-row">
                <p className="card-subtitle">Total Pending Amount</p>
                <div className="icon-wrapper red-bg"><ClipboardList size={18} className="red-icon" /></div>
              </div>
              <h2>₹4,500</h2>
              <div className="card-status red-status"><AlertTriangle size={14} /><span>Due in 5 days</span></div>
            </div>

            <div className="summary-card">
              <div className="card-top-row">
                <p className="card-subtitle">Total Paid (This Year)</p>
                <div className="icon-wrapper green-bg"><CheckCircle2 size={18} className="green-icon" /></div>
              </div>
              <h2>₹2,70,000</h2>
              <div className="card-status green-status"><TrendingUp size={14} /><span>90% of total fees</span></div>
            </div>
          </div>

          <div className="financials-full-grid">
            <div className="left-section">
              <div className="courses-widget">
                <div className="widget-header">
                  <h3>B.Tech Courses & Fees</h3>
                </div>
                <div className="courses-list">
                  {loading && courses.length === 0 ? (
                    <div className="loading-text">Loading courses...</div>
                  ) : (
                    courses.map((course) => (
                      <div
                        key={course.id}
                        className={`course-card ${selectedCourse === course.id ? 'active' : ''}`}
                        onClick={() => handleCourseClick(course.id)}
                      >
                        <div className="course-header">
                          <div className="course-info">
                            <h4>{course.name}</h4>
                            <p className="course-code">{course.code}</p>
                          </div>
                          <ChevronRight size={20} className="course-icon" />
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {courseFeeDetails && (
                <div className="fee-details-widget">
                  <div className="widget-header">
                    <h3>Fee Breakdown - {courseFeeDetails.course.name}</h3>
                  </div>
                  <div className="fee-details-container">
                    <div className="student-info-banner">
                      <p><strong>Student Status:</strong> {courseFeeDetails.student.isHosteler ? 'Hosteler' : 'Day Scholar'}</p>
                    </div>

                    <div className="fee-breakdown">
                      <div className="fee-row">
                        <span className="fee-label">Tuition Fee</span>
                        <span className="fee-amount">{formatCurrency(courseFeeDetails.fees.tuitionFee)}</span>
                      </div>
                      <div className="fee-row">
                        <span className="fee-label">Bus Fee</span>
                        <span className="fee-amount">{formatCurrency(courseFeeDetails.fees.busFee)}</span>
                      </div>
                      {courseFeeDetails.student.isHosteler && (
                        <div className="fee-row">
                          <span className="fee-label">Hostel Fee</span>
                          <span className="fee-amount">{formatCurrency(courseFeeDetails.fees.hostelFee)}</span>
                        </div>
                      )}
                      <div className="fee-row total-row">
                        <span className="fee-label">Total Fee</span>
                        <span className="fee-amount-total">{formatCurrency(courseFeeDetails.totalFee)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="right-section">
              <div className="history-widget-full">
                <div className="widget-header">
                  <h3>Payment History</h3>
                  <button onClick={downloadPaymentHistoryAsWord} className="download-btn" title="Download as Word">
                    <Download size={18} /> Word
                  </button>
                </div>
                <div className="table-responsive-full">
                  <table className="history-table-full">
                    <thead>
                      <tr>
                        <th>TRANSACTION ID</th>
                        <th>DATE</th>
                        <th>DESCRIPTION</th>
                        <th>AMOUNT</th>
                        <th>STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {PAYMENT_HISTORY.map((row, index) => (
                        <tr key={index}>
                          <td className="fw-bold text-dark">{row.id}</td>
                          <td className="text-muted">{row.date}</td>
                          <td className="fw-medium text-dark">{row.desc}</td>
                          <td className="fw-bold text-dark">{row.amount}</td>
                          <td><span className="status-badge success">Success</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Financials;
