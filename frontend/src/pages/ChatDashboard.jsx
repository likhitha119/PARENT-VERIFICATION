import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './ChatDashboard.css';
import { GraduationCap, MessageSquare, LayoutDashboard, Users, CreditCard, Bell, Search, Bot, Plus, Mic, Send, TrendingUp, LogOut, Wallet } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const INITIAL_MESSAGES = [
  { id: 1, sender: 'bot', text: "Hello! I am the EduParent AI Assistant. I can check Ethan's grades, attendance, fees, results, semester dates, holidays, and marks (internal & external). What would you like to know today?", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
];

const ChatDashboard = () => {
  const location = useLocation();
  const { handleLogout } = useAuth();
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(() => scrollToBottom(), [messages, isTyping]);

  // --- SMART LOCAL BOT LOGIC ---
  const generateBotResponse = (userInput) => {
    const text = userInput.toLowerCase();
    
    if (text.includes('cgpa') || text.includes('grade') || text.includes('marks')) {
      return { type: 'card', data: { title: "CURRENT CGPA", score: "8.42", maxScore: "/ 10.0", description: "Ethan is ranked #12 in his department. His highest score is 92/100 in Data Structures." } };
    } 
    if (text.includes('fee') || text.includes('pay') || text.includes('due')) {
      return { type: 'text', text: "Ethan currently has a pending fee amount of $450.00. The deadline for Term 3 fees is next Monday, Nov 20." };
    }
    if (text.includes('attend') || text.includes('present') || text.includes('absent')) {
      return { type: 'text', text: "Ethan's overall attendance is 88% (Good standing). He has 95% attendance in Data Structures, but his Database Systems attendance is slightly lower at 75%." };
    }
    if (text.includes('backlog') || text.includes('fail')) {
       return { type: 'text', text: "Ethan has 0 active backlogs. He has successfully cleared all previous semester examinations." };
    }
    if (text.includes('result') || text.includes('final exam') || text.includes('exam result')) {
      return { type: 'text', text: "📊 SEMESTER 6 FINAL RESULTS - Ethan Wilson (2021CS1042)\n\n✓ Subject-wise Performance:\n• Data Structures: 92/100 (A+)\n• Web Development: 90/100 (A+)\n• Discrete Mathematics: 88/100 (A)\n• Machine Learning: 84/100 (A)\n• Database Systems: 76/100 (B+)\n\n📈 Summary:\n• Overall Semester GPA: 8.6/10 (A Grade)\n• Class Rank: #12 in Department\n• Result Status: PUBLISHED ✓\n• Declaration Date: March 10, 2026\n\nAll subjects PASSED. Congratulations!" };
    }
    if (text.includes('semester') || text.includes('sem date') || text.includes('start date')) {
      return { type: 'text', text: "📅 SEMESTER 6 TIMELINE - Ethan Wilson\n\n🔵 Key Dates:\n• Semester Start: January 15, 2026\n• Semester End: April 30, 2026\n• Mid-term Exams: February 20-28, 2026\n• Final Exams: April 8-22, 2026\n• Grade Declaration: May 5, 2026\n\n📚 Course Details:\n• Total Credits: 24\n• Total Duration: 16 Weeks\n• Classes per Week: 25-30 hours\n\n✓ Current Status: ON TRACK (67% completed)" };
    }
    if (text.includes('holiday') || text.includes('break') || text.includes('off')) {
      return { type: 'text', text: "🎉 UPCOMING HOLIDAYS & BREAKS - Ethan's Schedule\n\n📌 Near Term:\n• Foundation Day: March 25, 2026 (No Classes)\n\n☀️ Summer Break:\n• Duration: May 1 - July 31, 2026 (92 Days)\n• Classes Resume: August 1, 2026\n• Semester 7 Registration: July 15-20, 2026\n\n📅 Other Holidays:\n• Independence Day: August 15, 2026\n• Diwali Break: October 25-31, 2026\n• Winter Break: December 20, 2026 - January 5, 2027\n\n⚠️ Note: All holidays are mandatory leaves. Classes resume on first working day after each break." };
    }
    if (text.includes('internal') || text.includes('formative') || text.includes('assignment')) {
      return { type: 'text', text: "📝 INTERNAL/FORMATIVE MARKS - Ethan Wilson (Semester 6)\n\n✍️ Subject-wise Internal Scores (Out of 20):\n• Web Development: 19/20 (95%) ⭐ Excellent\n• Data Structures: 18/20 (90%) ⭐ Excellent\n• Discrete Mathematics: 17/20 (85%) ✓ Good\n• Machine Learning: 16/20 (80%) ✓ Good\n• Database Systems: 15/20 (75%) ✓ Satisfactory\n\n📊 Analysis:\n• Average Internal Score: 17/20 (85%)\n• Class Average: 14.2/20 (71%)\n• Ethan's Position: ABOVE AVERAGE (+14%)\n• Highest Score: Web Development (95%)\n• Improvement Needed: Database Systems (75%)\n\n💡 Components Included:\n• Class Tests (40%), Assignments (40%), Participation (20%)" };
    }
    if (text.includes('external') || text.includes('lab') || text.includes('practical')) {
      return { type: 'text', text: "🔬 EXTERNAL/LAB MARKS - Ethan Wilson (Semester 6)\n\n⚙️ Lab & Practical Scores (Out of 40):\n• Data Structures Lab: 38/40 (95%) ⭐ Outstanding\n• Web Development Lab: 36/40 (90%) ⭐ Excellent\n• Embedded Systems Lab: 35/40 (87.5%) ✓ Very Good\n• Machine Learning Lab: 32/40 (80%) ✓ Good\n• Database Systems Lab: 30/40 (75%) ✓ Satisfactory\n\n📊 Performance Summary:\n• Average External Score: 34.2/40 (85.5%)\n• Class Average: 28.5/40 (71.25%)\n• Ethan's Position: SIGNIFICANTLY ABOVE AVERAGE (+14.25%)\n• Highest Lab: Data Structures (95%)\n• Needs Improvement: Database Systems (75%)\n\n✓ All Labs PASSED with good performance\n💻 Lab Skills: STRONG in practical implementation" };
    }
    return { type: 'text', text: "I'm not quite sure about that specific detail. I can help you with: CGPA, Attendance, Fees, Results, Semester dates, Holidays, Internal/Formative marks, or Lab/External marks. What would you like to know?" };
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue;
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // 1. Add User Message
    setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: userText, time: timeNow }]);
    setInputValue('');
    setIsTyping(true);

    // Use local bot logic directly (most reliable)
    setTimeout(() => {
      const response = generateBotResponse(userText);
      const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      if (response.type === 'card') {
        setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', isCard: true, cardData: response.data, time: now }]);
      } else {
        setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: response.text, time: now }]);
      }
      setIsTyping(false);
    }, 500);
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar - Same as before */}
      <aside className="sidebar">
         <div className="sidebar-header">
          <div className="logo-icon-blue"><GraduationCap size={20} color="white" /></div>
          <div className="logo-text-group"><h2>EduParent</h2><p>Smart Support System</p></div>
        </div>
        <nav className="sidebar-nav">
          <Link to="/home" className="nav-item">🏠 Home</Link>
          <Link to="/chat" className={`nav-item ${location.pathname === '/chat' ? 'active' : ''}`}><MessageSquare size={18} /> AI Assistant</Link>
          <Link to="/dashboard" className="nav-item"><LayoutDashboard size={18} /> Dashboard</Link>
          <Link to="/financials" className="nav-item"><CreditCard size={18} /> Financials</Link>
          <Link to="/faculty" className="nav-item"><Users size={18} /> Faculty</Link>
          <Link to="/performance" className="nav-item"><TrendingUp size={18} /> Performance</Link>
          <Link to="/payfee" className="nav-item"><Wallet size={18} /> Pay Fee</Link>
        </nav>
        <div className="sidebar-logout">
          <button onClick={handleLogout} className="logout-btn"><LogOut size={18} /> Logout</button>
        </div>
      </aside>

      <main className="chat-main">
        <header className="chat-header">
          <div className="status-indicator"><span className="status-dot"></span><span className="status-text">AI Assistant Online</span></div>
          <div className="header-actions"><button className="icon-btn"><Bell size={20} /></button></div>
        </header>

        <div className="chat-scroll-area">
          <div className="chat-container">
            <div className="messages-list">
              {messages.map((msg) => (
                <div key={msg.id} className={`message-row ${msg.sender === 'user' ? 'user-row' : 'bot-row'}`}>
                  {msg.sender === 'bot' && <div className="bot-avatar-small"><Bot size={16} /></div>}
                  <div className="message-content-wrapper">
                    {msg.isCard ? (
                      <div className="message-card shadow-sm">
                        <div className="card-header-inner">
                          <div className="trending-icon"><TrendingUp size={20} /></div>
                          <div className="card-title-group">
                            <p className="card-subtitle">{msg.cardData.title}</p>
                            <h3 className="card-value">{msg.cardData.score} <span className="max-score">{msg.cardData.maxScore}</span></h3>
                          </div>
                        </div>
                        <p className="card-description">{msg.cardData.description}</p>
                      </div>
                    ) : (
                      <div className={`message-bubble ${msg.sender === 'user' ? 'user-bubble' : 'bot-bubble shadow-sm'}`} style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', overflowWrap: 'break-word' }}>{msg.text}</div>
                    )}
                    <div className="message-meta">{msg.sender === 'bot' ? 'Assistant • ' : 'Sent • '} {msg.time}</div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="message-row bot-row">
                   <div className="bot-avatar-small"><Bot size={16} /></div>
                   <div className="message-content-wrapper"><div className="message-bubble bot-bubble shadow-sm text-muted italic">Typing...</div></div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>

        <div className="chat-input-area">
          <div className="input-container shadow-sm">
            <form onSubmit={handleSend} className="input-form">
              <input type="text" placeholder="Try asking: 'What is his CGPA?' or 'Are there pending fees?'" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
              <button type="submit" className="send-btn" disabled={!inputValue.trim()}>Send <Send size={16} /></button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatDashboard;