import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import EventPage from './pages/EventPage';
import ReportPage from './pages/ReportPage';
import Navbar from './components/Navbar';  // Navbar component
import ProtectedRoute from './components/ProtectedRoute';  // ProtectedRoute component

function App() {
  return (
    <Router>
      {/* Navbar is included on every page */}
      <Navbar />
      
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          {/* Use ProtectedRoute for secured pages */}
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/events" element={<ProtectedRoute><EventPage /></ProtectedRoute>} />
          <Route path="/reports" element={<ProtectedRoute><ReportPage /></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
