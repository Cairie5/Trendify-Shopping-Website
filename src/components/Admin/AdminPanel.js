// src/components/Admin/AdminPanel.js

import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import AdminLoginModal from './AdminLoginModal'; // Import the AdminLoginModal component
import Dashboard from './Dashboard';
import OrderManagement from './OrderManagement';
import ProductManagement from './ProductManagement';
import UserManagement from './UserManagement';
import ReviewModeration from './ReviewModeration';
import './AdminPanel.css'; // Import your CSS for styling

const AdminPanel = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleLogin = () => {
    setIsAuthenticated(true); // Mark the user as authenticated
    handleCloseModal(); // Close the modal on successful login
  };

  return (
    <div>
      <AdminLoginModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onLogin={handleLogin}
      />

      {isAuthenticated ? (
        <>
          <h1>Admin Panel</h1>
          <nav>
            <ul>
              <li><Link to="/adminpanel/dashboard">Dashboard</Link></li>
              <li><Link to="/adminpanel/orders">Order Management</Link></li>
              <li><Link to="/adminpanel/products">Product Management</Link></li>
              <li><Link to="/adminpanel/users">User Management</Link></li>
              <li><Link to="/adminpanel/reviews">Review Moderation</Link></li>
            </ul>
          </nav>

          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/orders" element={<OrderManagement />} />
            <Route path="/products" element={<ProductManagement />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/reviews" element={<ReviewModeration />} />
            <Route path="/" element={<Dashboard />} /> {/* Default route */}
          </Routes>
        </>
      ) : (
        <div>
          <h1>Admin Panel</h1>
          <p>Please log in to access admin functionalities.</p>
          <button onClick={handleOpenModal}>Login as Admin</button>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
