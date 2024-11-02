import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
  const location = useLocation();

  return (
    <nav className="flex justify-between items-center p-4 bg-transparent text-[#5c82a1] shadow-none">
      <div className="flex items-center space-x-2">
        <img src="/path-to-your-logo.png" alt="Trendify Logo" className="w-10 h-10" />
        <h1 className="text-2xl font-bold tracking-wider uppercase">Trendify</h1>
      </div>
      <ul className="flex space-x-6 text-lg">
        {['Home', 'Products', 'Cart', 'Login', 'SignUp', 'Admin Panel'].map((item, index) => (
          <Link
            key={index}
            to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '')}`}
            className={`${
              location.pathname === (item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '')}`)
                ? 'text-yellow-400'
                : 'text-[#5c82a1]'
            } hover:text-yellow-400 transition duration-200 font-semibold px-3 py-1 rounded-full`}
          >
            {item}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
