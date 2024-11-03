import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
    const location = useLocation();

    return (
        <AppBar position="static" sx={{ 
            background: 'transparent', // Fully transparent background
            boxShadow: 'none', // No shadow for a clean look
            padding: '1rem', // Equivalent to Tailwind's p-4
        }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="flex items-center space-x-2">
                    <img 
                        src="/path-to-your-logo.png" // Adjust the path to your logo here
                        alt="Trendify Logo" 
                        className="w-10 h-10" // Tailwind equivalent
                    />
                    <Typography 
                        variant="h6" 
                        sx={{ fontWeight: 'bold', color: '#5c82a1', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '1.5rem' }}
                    >
                        Trendify
                    </Typography>
                </div>
                <ul style={{ display: 'flex', listStyleType: 'none', padding: 0, margin: 0, gap: '1.5rem' }}>
                    {['Home', 'Products', 'Cart', 'Login', 'Register', 'AdminPanel'].map((item, index) => {
                        const path = item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '')}`;
                        return (
                            <li key={index}>
                                <Button
                                    component={Link}
                                    to={path}
                                    sx={{
                                        color: location.pathname === path ? '#ffeb3b' : '#5c82a1', // Highlight active link
                                        fontWeight: '600',
                                        transition: 'color 0.3s',
                                        '&:hover': {
                                            color: '#ffeb3b', // Color on hover
                                        },
                                    }}
                                >
                                    {item}
                                </Button>
                            </li>
                        );
                    })}
                </ul>
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;
