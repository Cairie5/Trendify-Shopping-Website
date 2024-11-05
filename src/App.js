import React from 'react';
import Sidebar from './components/sidebar';
import Header from './components/header';
import Dashboard from './components/dashboard';
import './App.css';

function App() {
  return (
    <div className="app">
      <Sidebar />
      <div className="main-content">
        <Header />
        <Dashboard />
        <footer className="App-footer">
          <img src={process.env.PUBLIC_URL + '/logo.png'} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </footer>
      </div>
    </div>
  );
}

export default App;