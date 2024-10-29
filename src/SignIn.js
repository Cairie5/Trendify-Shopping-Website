import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function SignIn({ onLogin }) {
  const navigate = useNavigate();
  const [emailOrUsername, setEmailOrUsername] = useState(''); // Renamed to reflect that it can be either
  const [password, setPass] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    const userDetails = {
      emailOrUsername: emailOrUsername, // Send this as email or username
      password: password,
    };
    fetch('https://smart-recruiter-api.onrender.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDetails),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            setMessage(data.message);
            setEmailOrUsername(''); // Clear the input
            setPass('');
          });
        } else {
          return response.json().then((user) => {
            if (user) {
              setMessage('Successful log in');
              // Redirect logic remains the same
              setTimeout(() => {
                if (user.role === 'recruiter') {
                  navigate('/recruiterassessments', { replace: true });
                } else if (user.role === 'interviewee') {
                  navigate('/acceptedassessments', { replace: true });
                }
                onLogin(user);
              }, 2000);
            } else {
              setMessage('SignIn Failed');
              setEmailOrUsername(''); // Clear the input
              setPass('');
            }
          });
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const handleEmailOrUsername = (event) => {
    const value = event.target.value;
    if (!isValidEmail(value) && value.length < 3) { // Assuming username should be at least 3 characters
      setError('Email/Username is invalid');
    } else {
      setError(null);
    }
    setEmailOrUsername(value);
  };

  const isValidPassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
  const handlePassword = (event) => {
    if (!isValidPassword(event.target.value)) {
      setError('Password is invalid');
    } else {
      setError(null);
    }
    setPass(event.target.value);
  };

  return (
    <div className="SignInPage w-[1440px] h-[1024px] relative bg-[#f7efe5] rounded-[10px] border border-[#add8e6]">
      <div className="PleaseSignIn left-[32px] top-[24px] absolute text-black text-xl font-medium font-['Quicksand']">Please Sign In</div>
      {message && (
        <div className="message" style={{ color: message.includes('Successful') ? 'green' : 'red' }}>
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="authentication-form" style={{ marginTop: '60px' }}>
        <label className="input-label">
          <text>Email/Username:</text>
        </label>
        <br />
        <input
          className="authentication-input"
          required
          type="text"
          value={emailOrUsername}
          onChange={handleEmailOrUsername} // Update function to handle both
        />
        <p>{error && <span style={{ color: 'red' }}>{error}</span>}</p>
        <br />
        <br />

        <label className="input-label">
          <text>Password:</text>
        </label>
        <br />
        <input
          autoComplete="off"
          required
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={handlePassword}
        />
        <div style={{ marginTop: '20px' }}>
          <Button variant="primary" type="submit">
            Sign In
          </Button>
          <input type="checkbox" onChange={() => setShowPassword(!showPassword)} />
          <label>
            <span>Show Password</span>
          </label>
        </div>
      </form>
      <br />
      <Link to="/signup" className="link_to">
        <h5 style={{ paddingTop: '20px', fontFamily: 'fantasy' }}><span>Create new Account?</span></h5>
      </Link>
    </div>
  );
}

export default SignIn;
