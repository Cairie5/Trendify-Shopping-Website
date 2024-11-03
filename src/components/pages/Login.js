import React, { useState } from 'react';
import { Button, TextField, Typography, Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 
import { login } from '../../services/authService'; 
import { keyframes } from '@emotion/react';

// Fade-in animation
const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

// Styles
const customStyles = {
    form: {
        width: '100%',
        maxWidth: '400px',
        padding: '30px',
        background: 'rgba(255, 255, 255, 0.9)', 
        borderRadius: '10px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
        animation: `${fadeIn} 0.8s ease-in-out`,
    },
    title: {
        fontWeight: '600',
        color: '#333',
        marginBottom: '20px',
        fontSize: '1.8rem',
        textAlign: 'center', 
    },
    textField: {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#ccc',
            },
            '&:hover fieldset': {
                borderColor: '#6A5B8A',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#6A5B8A',
            },
        },
    },
    submitButton: {
        marginTop: '20px',
        backgroundColor: '#6A5B8A',
        borderRadius: '8px',
        padding: '12px',
        fontSize: '1.1rem',
        textTransform: 'none',
        '&:hover': {
            backgroundColor: '#5A4D6A',
        },
    },
};

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const data = await login(email, password);
            console.log("Logged in successfully:", data);
            navigate('/'); // Redirect after login
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
        <Box sx={{ height: '100vh', width: '100vw', display: 'flex' }}>
            <Grid container sx={{ height: '100%', width: '100%' }}>
                <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f7f7f7' }}>
                    <Box sx={customStyles.form}>
                        <Typography variant="h4" gutterBottom sx={customStyles.title}>
                            Sign in to your account
                        </Typography>
                        <form onSubmit={handleLogin}>
                            <TextField
                                label="Email"
                                fullWidth
                                margin="normal"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                sx={customStyles.textField}
                            />
                            <TextField
                                label="Password"
                                type="password"
                                fullWidth
                                margin="normal"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                sx={customStyles.textField}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                sx={customStyles.submitButton}
                            >
                                Sign in
                            </Button>
                        </form>
                    </Box>
                </Grid>
                {/* Optionally, you can add a right-side image if desired */}
            </Grid>
        </Box>
    );
};

export default Login;
