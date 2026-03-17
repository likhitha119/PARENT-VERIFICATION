import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Home from './pages/Home';
import ChatDashboard from './pages/ChatDashboard';
import AcademicDashboard from './pages/AcademicDashboard';
import Financials from './pages/Financials';
import Faculty from './pages/Faculty';
import Profile from './pages/Profile';
import Performance from './pages/Performance';
import PayFee from './pages/PayFee';
import Events from './pages/Events';
import { AuthProvider, useAuth } from './context/AuthContext';

const ProtectedRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={!isAuthenticated ? <Login /> : <Navigate to="/home" />} />

      {isAuthenticated ? (
        <>
          <Route path="/home" element={<Home />} />
          <Route path="/chat" element={<ChatDashboard />} />
          <Route path="/dashboard" element={<AcademicDashboard />} />
          <Route path="/financials" element={<Financials />} />
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/performance" element={<Performance />} />
          <Route path="/payfee" element={<PayFee />} />
          <Route path="/events" element={<Events />} />
          <Route path="*" element={<Navigate to="/home" />} />
        </>
      ) : (
        <Route path="*" element={<Navigate to="/" />} />
      )}
    </Routes>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ProtectedRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
