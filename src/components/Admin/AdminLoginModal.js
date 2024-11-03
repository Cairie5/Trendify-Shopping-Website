// src/components/Admin/AdminLoginModal.js

import React, { useState } from 'react';
import Modal from 'react-modal'; // Ensure this library is installed
import './AdminLoginModal.css'; // Import any CSS for styling

const AdminLoginModal = ({ open, onClose, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    // Simulate admin credential check (replace with actual API call)
    if (email.includes('@admin') && password === 'admin123') {
      onLogin(1); // Pass a valid user ID for the authenticated admin
    } else {
      setErrorMessage('Invalid email or password');
    }
  };

  return (
    <Modal isOpen={open} onRequestClose={onClose}>
      <h2>Admin Login</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        <button type="button" onClick={onClose}>Close</button>
      </form>
    </Modal>
  );
};

export default AdminLoginModal;
