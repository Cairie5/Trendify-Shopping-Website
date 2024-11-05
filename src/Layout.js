import React from 'react';
import { Outlet } from 'react-router-dom'; // For rendering child routes
import './Layout.css'; // You can create this CSS file for layout-specific styles

const Layout = () => {
  return (
    <div className="layout">
      {/* Logo displayed on all pages */}
      <header className="header">
        <img src={`${process.env.PUBLIC_URL}/logo.png`} className="App-logo" alt="logo" />
      </header>

      {/* The child components will be rendered here */}
      <main>
<Outlet />
      </main>
    </div>
  );
};

export default Layout;