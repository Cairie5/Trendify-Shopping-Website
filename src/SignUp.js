import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button } from 'react-bootstrap';
import './App.css'; // Make sure to import your CSS file

function SignUp({ onSignUp }) {
  const navigate = useNavigate();
  const [url, setUrl] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [successfulSignup, setSuccessfulSignup] = useState(false);
  const [signUpFailed, setSignUpFailed] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState('');
  const [textToggle, setTextToggle] = useState(true);

  useEffect(() => {
    if (successfulSignup) {
      const timeout = setTimeout(() => {
        navigate('/signin');
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [successfulSignup, navigate]);

  function handleClick(user) {
    setSignUpFailed(false);
    setSelectedUserType(user);
    setTextToggle(!textToggle);
    if (user === 'admin') {
      onSignUp(user);
      setUrl('https://smart-recruiter-api.onrender.com/adminsignup');
    } else if (user === 'customer') {
      onSignUp(user);
      setUrl('https://smart-recruiter-api.onrender.com/customersignup'); // Update with the correct URL for customer signup
    }
  }

  const phonenumberpattern = /^(?:254|0)[17]\d{8}$/;
  const passwordpattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const formSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Must enter email'),
    username: yup.string().required('Must enter a username'),
    password: yup.string().required('Must Enter Password').matches(passwordpattern, 'Password must include alphanumeric characters and symbols'),
    number: yup.string().required('Must Enter Phone Number').matches(phonenumberpattern, 'Phone number is not valid'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      number: '',
      password: '',
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values, null, 2),
      }).then((res) => {
        if (res.status === 200) {
          setSuccessfulSignup(true);
        } else {
          setSignUpFailed(true);
        }
      });
    },
  });

  return (
    <div className="SignUpPage">
      <div className="SignUp">SIGN UP</div>
      <div className="Frame1">
        <div className="PleaseSignUp">Please Sign Up</div>
        <div className="user-options">
          <h5 onClick={() => handleClick('admin')} className={`user-option ${selectedUserType === 'admin' ? 'selected-user' : ''}`}>
            Admin
          </h5>
          <h5 onClick={() => handleClick('customer')} className={`user-option ${selectedUserType === 'customer' ? 'selected-user' : ''}`}>
            Customer
          </h5>
        </div>
        <form onSubmit={formik.handleSubmit} className="authentication-form">
          <label htmlFor="username" className="input-label">Username:</label>
          <input
            className="authentication-input"
            autoComplete="off"
            id="username"
            name="username"
            onChange={formik.handleChange}
            value={formik.values.username}
          />
          <p style={{ color: 'red' }}>{formik.errors.username}</p>

          <label htmlFor="email" className="input-label">Email Address:</label>
          <input
            className="authentication-input"
            autoComplete="off"
            type="email"
            id="email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <p style={{ color: 'red' }}>{formik.errors.email}</p>

          <label htmlFor="number" className="input-label">Phone Number:</label>
          <input
            className="authentication-input"
            autoComplete="off"
            id="number"
            name="number"
            onChange={formik.handleChange}
            value={formik.values.number}
          />
          <p style={{ color: 'red' }}>{formik.errors.number}</p>

          <label htmlFor="password" className="input-label">Password:</label>
          <input
            className="authentication-input"
            autoComplete="off"
            id="password"
            name="password"
            onChange={formik.handleChange}
            type={showPassword ? 'text' : 'password'}
            value={formik.values.password}
          />
          <p style={{ color: 'red' }}>{formik.errors.password}</p>

          <Button variant="secondary" type="submit">Submit</Button>
          <input type="checkbox" onChange={() => setShowPassword(!showPassword)} />
          <label>Show Password</label>
        </form>
        <div>
          <Link to="/signin" className="signin-link">Already have an account? Sign In</Link>
        </div>
        {successfulSignup && <p style={{ color: 'green', textAlign: 'center' }}>Successful signup</p>}
        {signUpFailed && <p style={{ color: 'red', textAlign: 'center' }}>SignUp Failed! Email may already exist</p>}
      </div>
    </div>
  );
}

export default SignUp;
