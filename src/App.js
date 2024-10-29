import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './SignIn'; // Ensure this path is correct
import SignUp from './SignUp'; // Ensure you create this component
import './App.css'; // Import your CSS file

function App() {
  return (
    <Router>
      <div className="layout">
        <header className="header">
          <img src={`${process.env.PUBLIC_URL}/logo.png`} className="trendify-logo" alt="Company Logo" />
        </header>
        <main>
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            {/* Add other routes as needed */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
