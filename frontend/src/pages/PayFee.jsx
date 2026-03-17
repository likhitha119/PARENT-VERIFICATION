import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './PayFee.css';
import {
  GraduationCap, LayoutDashboard, CreditCard, MessageSquare,
  Users, TrendingUp, LogOut, Wallet, Download, CheckCircle, X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';

const PAYMENT_METHODS = [
  { id: 'paytm', name: 'Paytm', logo: '💳', color: '#00BAF2' },
  { id: 'phonepe', name: 'PhonePe', logo: '📱', color: '#5F259F' },
  { id: 'googlepay', name: 'Google Pay', logo: '🔵', color: '#4285F4' },
  { id: 'razorpay', name: 'Razorpay', logo: '💎', color: '#3395FF' },
];

const FEE_ITEMS = [
  { label: 'Tuition Fee', amount: 45000, required: true },
  { label: 'Lab Fee', amount: 8000, required: true },
  { label: 'Library Fee', amount: 2500, required: true },
  { label: 'Sports Fee', amount: 1500, required: false },
  { label: 'Transport Fee', amount: 12000, required: false },
];

const PAYMENT_HISTORY = [
  { id: 'TXN001', date: '2026-01-15', amount: 56500, method: 'Razorpay', status: 'Success' },
  { id: 'TXN002', date: '2025-08-10', amount: 56500, method: 'Paytm', status: 'Success' },
  { id: 'TXN003', date: '2025-01-12', amount: 56500, method: 'PhonePe', status: 'Success' },
];

const PayFee = () => {
  const location = useLocation();
  const { handleLogout } = useAuth();
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [selectedFees, setSelectedFees] = useState(
    FEE_ITEMS.filter(f => f.required).map(f => f.label)
  );
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({ upiId: '', phone: '' });
  const [paymentHistory, setPaymentHistory] = useState(PAYMENT_HISTORY);
  const [lastPayment, setLastPayment] = useState(null);

  const toggleFee = (label) => {
    const item = FEE_ITEMS.find(f => f.label === label);
    if (item.required) return;
    setSelectedFees(prev =>
      prev.includes(label) ? prev.filter(f => f !== label) : [...prev, label]
    );
  };

  const totalAmount = FEE_ITEMS
    .filter(f => selectedFees.includes(f.label))
    .reduce((sum, f) => sum + f.amount, 0);

  const handlePayment = () => {
    if (!selectedMethod) {
      alert('Please select a payment method');
      return;
    }
    setShowPaymentForm(true);
  };

  const processPayment = () => {
    if (!paymentDetails.upiId && !paymentDetails.phone) {
      alert('Please enter UPI ID or Phone Number');
      return;
    }

    // Create new transaction
    const newTransaction = {
      id: `TXN${String(paymentHistory.length + 1).padStart(3, '0')}`,
      date: new Date().toISOString().split('T')[0],
      amount: totalAmount,
      method: PAYMENT_METHODS.find(m => m.id === selectedMethod)?.name || selectedMethod,
      status: 'Success',
      upiId: paymentDetails.upiId,
      phone: paymentDetails.phone,
      feeItems: selectedFees.join(', ')
    };

    // Store last payment for success modal
    setLastPayment(newTransaction);

    // Add to history
    setPaymentHistory([newTransaction, ...paymentHistory]);

    // Close form and show success
    setShowPaymentForm(false);
    setShowSuccess(true);
    
    // Reset form
    setPaymentDetails({ upiId: '', phone: '' });
    
    setTimeout(() => {
      setShowSuccess(false);
      setLastPayment(null);
    }, 4000);
  };

  const downloadStatement = (txn) => {
    const content = `
PAYMENT RECEIPT
================
Transaction ID: ${txn.id}
Date: ${txn.date}
Amount: ₹${txn.amount.toLocaleString()}
Payment Method: ${txn.method}
Status: ${txn.status}
${txn.upiId ? `UPI ID: ${txn.upiId}` : ''}
${txn.phone ? `Phone: ${txn.phone}` : ''}
${txn.feeItems ? `Fee Items: ${txn.feeItems}` : ''}
Student: Ethan Wilson
Grade: 10 - Section B
================
    `.trim();
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt_${txn.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

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
          <Link to="/performance" className="nav-link"><TrendingUp size={18} /> Performance</Link>
          <Link to="/payfee" className={`nav-link ${location.pathname === '/payfee' ? 'active' : ''}`}>
            <Wallet size={18} /> Pay Fee
          </Link>
        </nav>
        <div className="sidebar-logout">
          <button onClick={handleLogout} className="logout-btn"><LogOut size={18} /> Logout</button>
        </div>
      </aside>

      <main className="portal-main">
        <Header />

        <div className="content-container">
          <div className="page-title-section">
            <h1>Pay Fee</h1>
            <p>Select fee items and choose your preferred payment method.</p>
          </div>

          <div className="payfee-grid">
            {/* Fee Selection Card */}
            <div className="payfee-card">
              <h3 className="payfee-card-title">Select Fee Items</h3>
              <div className="fee-items-list">
                {FEE_ITEMS.map((item) => (
                  <div
                    key={item.label}
                    className={`fee-item ${selectedFees.includes(item.label) ? 'fee-item-selected' : ''} ${item.required ? 'fee-item-required' : ''}`}
                    onClick={() => toggleFee(item.label)}
                  >
                    <div className="fee-item-left">
                      <div className={`fee-checkbox ${selectedFees.includes(item.label) ? 'checked' : ''}`}>
                        {selectedFees.includes(item.label) && <CheckCircle size={16} />}
                      </div>
                      <div>
                        <p className="fee-item-label">{item.label}</p>
                        {item.required && <span className="fee-required-badge">Required</span>}
                      </div>
                    </div>
                    <p className="fee-item-amount">₹{item.amount.toLocaleString()}</p>
                  </div>
                ))}
              </div>
              <div className="fee-total-row">
                <span className="fee-total-label">Total Amount</span>
                <span className="fee-total-amount">₹{totalAmount.toLocaleString()}</span>
              </div>
            </div>

            {/* Payment Methods Card */}
            <div className="payfee-card">
              <h3 className="payfee-card-title">Payment Method</h3>
              <div className="payment-methods-grid">
                {PAYMENT_METHODS.map((method) => (
                  <div
                    key={method.id}
                    className={`payment-method-card ${selectedMethod === method.id ? 'payment-method-selected' : ''}`}
                    onClick={() => setSelectedMethod(method.id)}
                    style={{ borderColor: selectedMethod === method.id ? method.color : '#e2e8f0' }}
                  >
                    <div className="payment-logo" style={{ fontSize: '32px' }}>{method.logo}</div>
                    <p className="payment-name">{method.name}</p>
                    {selectedMethod === method.id && (
                      <div className="payment-check" style={{ background: method.color }}>
                        <CheckCircle size={14} color="white" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {selectedMethod === 'razorpay' && (
                <div className="razorpay-details">
                  <h4>Razorpay Details</h4>
                  <div className="detail-row">
                    <span>Merchant ID:</span>
                    <span className="detail-value">MER_EDU_2026_001</span>
                  </div>
                  <div className="detail-row">
                    <span>Account Name:</span>
                    <span className="detail-value">EduParent Portal</span>
                  </div>
                  <div className="detail-row">
                    <span>Gateway:</span>
                    <span className="detail-value">Razorpay Secure</span>
                  </div>
                </div>
              )}

              <button className="pay-now-btn" onClick={handlePayment}>
                <Wallet size={20} />
                Pay ₹{totalAmount.toLocaleString()}
              </button>
            </div>
          </div>

          {/* Payment History */}
          <div className="payfee-card mt-4">
            <h3 className="payfee-card-title">Payment History</h3>
            <div className="payment-history-table">
              <table>
                <thead>
                  <tr>
                    <th>Transaction ID</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Method</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentHistory.map((txn) => (
                    <tr key={txn.id}>
                      <td className="fw-bold">{txn.id}</td>
                      <td>{txn.date}</td>
                      <td className="fw-bold">₹{txn.amount.toLocaleString()}</td>
                      <td>{txn.method}</td>
                      <td><span className="status-badge-success">{txn.status}</span></td>
                      <td>
                        <button className="download-btn" onClick={() => downloadStatement(txn)}>
                          <Download size={16} /> Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Payment Details Form Modal */}
      {showPaymentForm && (
        <div className="modal-overlay" onClick={() => setShowPaymentForm(false)}>
          <div className="payment-form-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Enter Payment Details</h2>
              <button className="modal-close" onClick={() => setShowPaymentForm(false)}>
                <X size={24} />
              </button>
            </div>
            <div className="modal-body">
              <div className="payment-summary-box">
                <div className="summary-row">
                  <span>Payment Method:</span>
                  <span className="fw-bold">{PAYMENT_METHODS.find(m => m.id === selectedMethod)?.name}</span>
                </div>
                <div className="summary-row">
                  <span>Total Amount:</span>
                  <span className="fw-bold blue-text">₹{totalAmount.toLocaleString()}</span>
                </div>
                <div className="summary-row">
                  <span>Fee Items:</span>
                  <span className="fw-bold">{selectedFees.join(', ')}</span>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="upiId">UPI ID</label>
                <input
                  type="text"
                  id="upiId"
                  placeholder="example@paytm"
                  value={paymentDetails.upiId}
                  onChange={(e) => setPaymentDetails({ ...paymentDetails, upiId: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-divider">OR</div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  placeholder="9876543210"
                  value={paymentDetails.phone}
                  onChange={(e) => setPaymentDetails({ ...paymentDetails, phone: e.target.value })}
                  className="form-input"
                />
              </div>

              <button className="confirm-payment-btn" onClick={processPayment}>
                <CheckCircle size={20} />
                Confirm Payment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccess && lastPayment && (
        <div className="success-overlay">
          <div className="success-modal">
            <div className="success-icon">
              <CheckCircle size={64} color="#10b981" />
            </div>
            <h2>Payment Successful!</h2>
            <p>Your fee payment has been processed successfully.</p>
            
            <div className="success-details">
              <div className="success-detail-row">
                <span>Transaction ID:</span>
                <span className="fw-bold">{lastPayment.id}</span>
              </div>
              <div className="success-detail-row">
                <span>Amount Paid:</span>
                <span className="fw-bold green-text">₹{lastPayment.amount.toLocaleString()}</span>
              </div>
              <div className="success-detail-row">
                <span>Payment Method:</span>
                <span className="fw-bold">{lastPayment.method}</span>
              </div>
              <div className="success-detail-row">
                <span>Fee Items:</span>
                <span className="fw-bold">{lastPayment.feeItems}</span>
              </div>
              {lastPayment.upiId && (
                <div className="success-detail-row">
                  <span>UPI ID:</span>
                  <span className="fw-bold">{lastPayment.upiId}</span>
                </div>
              )}
              {lastPayment.phone && (
                <div className="success-detail-row">
                  <span>Phone:</span>
                  <span className="fw-bold">{lastPayment.phone}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PayFee;
