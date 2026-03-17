import React, { useState } from 'react';
import './Login.css';
import { Lock, UserSquare2, Mail, Send, ShieldCheck, Info } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { apiFetch } from '../config/api';

const floatingMetrics = [
  { label: 'Total Enrolled', value: '15,000+', meta: 'across 8 colleges' },
  { label: 'Average Attendance', value: '92%', meta: 'this semester' },
  { label: 'Upcoming Event', value: 'Tech Symposium', meta: 'starts June 14' },
  { label: 'Live Campus Status', value: 'All systems go', meta: 'no alerts' },
  { label: 'AI Courses Added', value: '8 modules', meta: 'new this term' },
];

const Login = () => {
  const { handleLogin } = useAuth();
  const [regNumber, setRegNumber] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('request');
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const sendOtp = async () => {
    if (!email.trim()) return;

    setMessage(null);
    setIsLoading(true);

    try {
      const response = await apiFetch('/api/send-otp', {
        method: 'POST',
        body: JSON.stringify({ email: email.trim() }),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || 'Failed to send OTP');
      }

      setStep('verify');
      setMessage({
        type: 'success',
        text: payload.message || 'OTP sent successfully. Please enter it below.',
      });
    } catch (err) {
      setMessage({
        type: 'error',
        text: err.message || 'Unable to send OTP.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!otp.trim()) return;

    setMessage(null);
    setIsLoading(true);

    try {
      const response = await apiFetch('/api/verify-otp', {
        method: 'POST',
        body: JSON.stringify({
          email: email.trim(),
          code: otp.trim(),
        }),
      });

      const payload = await response.json();

      if (!response.ok || !payload.verified) {
        throw new Error(payload.error || 'OTP verification failed');
      }

      handleLogin();
    } catch (err) {
      setMessage({
        type: 'error',
        text: err.message || 'OTP verification failed.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="project-login-page">
      <div className="ambient-layer ambient-layer-1" />
      <div className="ambient-layer ambient-layer-2" />

      <div className="split-screen">
        <section className="left-column">
          <div className="auth-hero">
            
            <h1>Parent verification system</h1>
            <br></br>
            <br></br>
            
          </div>

          <div className="auth-panel">
            <div className="auth-card">
              <div className="card-title">
                <ShieldCheck size={20} />
                <p>OTP authenticated sign-in</p><br></br>
                <br></br>
              </div>

              <form
                className="login-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  step === 'request' ? sendOtp() : verifyOtp();
                }}
              >
                <div className="input-group">
                  <label className="input-label">
                    <UserSquare2 size={16} className="label-icon" />
                    Student Registration Number
                  </label>
                  <input
                    type="text"
                    value={regNumber}
                    onChange={(e) => setRegNumber(e.target.value)}
                    placeholder="e.g. 231FA04001"
                    className="input-field"
                    required
                  />
                </div>

                <div className="input-group">
                  <label className="input-label">
                    <Mail size={16} className="label-icon" />
                    Parent Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="parent@example.com"
                    className="input-field"
                    required
                    disabled={step !== 'request'}
                  />
                </div>

                {step === 'verify' && (
                  <div className="input-group">
                    <label className="input-label">
                      <Lock size={16} className="label-icon" />
                      Enter OTP
                    </label>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="123456"
                      className="input-field"
                      required
                    />
                    
                  </div>
                )}

                {message && (
                  <div className={`message ${message.type}`}>
                    {message.text}
                  </div>
                )}

                <div className="button-row">
                  <button type="submit" className="submit-btn" disabled={isLoading}>
                    <Send size={18} />
                    {step === 'request' ? 'Send OTP' : 'Verify OTP'}
                  </button>
                  {step === 'verify' && (
                    <button
                      type="button"
                      className="secondary-btn"
                      onClick={() => {
                        setStep('request');
                        setOtp('');
                        setMessage(null);
                      }}
                      disabled={isLoading}
                    >
                      Change email
                    </button>
                  )}
                </div>
              </form>

            </div>
            <br></br>
            <br></br>
            <div className="secure-access-section">
              <span className="badge success">
                <ShieldCheck size={14} />
                End-to-end encrypted
              </span><br></br>
              <span className="badge info">
                <Info size={14} />
                Need help?
              </span>
            </div>
          </div>
        </section>

        <section className="right-column">
          <div className="dynamic-panel">
            <p className="dynamic-label">Dynamic University Data</p>
            <p className="dynamic-subtitle">Live campus telemetry & student headlines</p>
            <div className="bubble-grid">
              {floatingMetrics.map((metric, index) => (
                <div key={metric.label} className={`bubble bubble-${index}`}>
                  <p className="bubble-label">{metric.label}</p>
                  <strong>{metric.value}</strong>
                  <span>{metric.meta}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <footer className="page-footer">
        <p>© 2026 Parent Chatbot System.</p>
        <div className="footer-links">
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
        </div>
      </footer>
    </div>
  );
};

export default Login;
