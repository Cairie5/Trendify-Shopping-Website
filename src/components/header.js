import React from 'react';
// import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
        <button className="search-btn">🔍</button>
      </div>
      <div className="user-profile">
        <img src="profile.webp" alt="Profile Picture" className="profile-pic" />
        <span>Administrator</span>
        <span>admin@trendify.com</span>
      </div>
    </header>
  );
}

export default Header;
