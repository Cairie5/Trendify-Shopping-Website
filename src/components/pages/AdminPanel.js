import React from 'react';
import { Link } from 'react-router-dom';

const AdminPanel = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
    <ul className="space-y-4">
      <li><Link to="/admin/dashboard">Dashboard</Link></li>
      <li><Link to="/admin/products">Product Management</Link></li>
      <li><Link to="/admin/orders">Order Management</Link></li>
      <li><Link to="/admin/users">User Management</Link></li>
      <li><Link to="/admin/reviews">Review Moderation</Link></li>
    </ul>
  </div>
);

export default AdminPanel;
