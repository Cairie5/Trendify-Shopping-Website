import React, { useState } from 'react';
import { Button, TextField, Typography, Box, Grid, Snackbar } from '@mui/material';
import { register } from '../../services/authService'; 
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(''); 
  const [errorMessage, setErrorMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State for Snackbar
  const [snackbarMessage, setSnackbarMessage] = useState(''); // State for Snackbar message

  const navigate = useNavigate(); // Initialize useNavigate

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Reset error message before registering
    try {
      const data = await register(name, email, password, phoneNumber); // Include phone number
      console.log("Registered successfully:", data);
      setSnackbarMessage(`Successfully signed up as ${name}`); // Set Snackbar message
      setSnackbarOpen(true); // Open Snackbar
      navigate('/'); // Redirect to home page
    } catch (error) {
      setErrorMessage("Registration failed: " + error.message); // Show error to user
      console.error("Registration failed:", error);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false); // Close Snackbar
  };

  return (
    <Box sx={{ height: '100vh', width: '100vw', display: 'flex' }}>
      <Grid container sx={{ height: '100%', width: '100%' }}>
        {/* Left side: Form */}
        <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f7f7f7' }}>
          <Box sx={{ width: '100%', maxWidth: '400px', padding: '30px', background: 'rgba(255, 255, 255, 0.9)', borderRadius: '10px', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)' }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: '600', color: '#333', marginBottom: '20px', fontSize: '1.8rem', textAlign: 'center' }}>
              Create your account
            </Typography>
            <form onSubmit={handleRegister}>
              <TextField
                label="Name"
                fullWidth
                margin="normal"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: '#ccc' },
                    '&:hover fieldset': { borderColor: '#6A5B8A' },
                    '&.Mui-focused fieldset': { borderColor: '#6A5B8A' },
                  }
                }}
              />
              <TextField
                label="Email"
                fullWidth
                margin="normal"
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: '#ccc' },
                    '&:hover fieldset': { borderColor: '#6A5B8A' },
                    '&.Mui-focused fieldset': { borderColor: '#6A5B8A' },
                  }
                }}
              />
              <TextField
                label="Phone Number"
                fullWidth
                margin="normal"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: '#ccc' },
                    '&:hover fieldset': { borderColor: '#6A5B8A' },
                    '&.Mui-focused fieldset': { borderColor: '#6A5B8A' },
                  }
                }}
              />
              <TextField
                label="Password"
                fullWidth
                margin="normal"
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: '#ccc' },
                    '&:hover fieldset': { borderColor: '#6A5B8A' },
                    '&.Mui-focused fieldset': { borderColor: '#6A5B8A' },
                  }
                }}
              />
              {errorMessage && <Typography color="error" sx={{ textAlign: 'center', marginTop: '10px' }}>{errorMessage}</Typography>} {/* Display error message */}
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ marginTop: '20px', backgroundColor: '#6A5B8A', borderRadius: '8px', padding: '12px', fontSize: '1.1rem', textTransform: 'none', '&:hover': { backgroundColor: '#5A4D6A', } }}
              >
                Register
              </Button>
            </form>
            <p className="mt-10 text-center text-sm text-gray-500">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Log in
              </Link>
            </p>
          </Box>
        </Grid>

        {/* Right side: Image */}
        <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' }, height: '100%' }}>
          <img 
            src="https://img.freepik.com/premium-photo/young-happy-african-american-woman-holding-colorful-shopping-bags-isolated-yellow-background_695242-6063.jpg" 
            alt="Signup visual"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </Grid>
      </Grid>

      {/* Snackbar for success message */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000} // Automatically close after 6 seconds
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default Register;
