import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear JWT token
    window.location.href = '/'; // Redirect to login page
  };

  return (
    <nav style={{ padding: '10px', backgroundColor: '#333', color: 'white' }}>
      <ul style={{ listStyleType: 'none', display: 'flex', justifyContent: 'space-around' }}>
        <li>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
        </li>
        <li>
          <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>Dashboard</Link>
        </li>
        <li>
          <Link to="/events" style={{ color: 'white', textDecoration: 'none' }}>Create Event</Link>
        </li>
        <li>
          <Link to="/reports" style={{ color: 'white', textDecoration: 'none' }}>Reports</Link>
        </li>
        <li>
          <button onClick={handleLogout} style={{ backgroundColor: '#f44336', border: 'none', color: 'white' }}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
