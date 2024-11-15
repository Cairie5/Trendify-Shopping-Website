import React from 'react';
// import './Sidebar.css';

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <img src="Trendify.png" alt="Logo" className="logo" />
        <h2><i>Stay Ahead, Shop Trendify</i></h2>
      </div>
      <nav className="nav">
        <a href="#" className="nav-item active">Dashboard</a>
        <a href="#" className="nav-item">Analytics</a>
        <a href="#" className="nav-item">Settings</a>
        <a href="#" className="nav-item">Inventory</a>
        <a href="#" className="nav-item">Customers</a>
      </nav>
      <button className="logout">Log Out</button>
    </aside>
  );
}

export default Sidebar;