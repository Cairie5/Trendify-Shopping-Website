// src/services/userService.js

const BASE_URL = 'http://127.0.0.1:5000'; // Update to match your backend API

// Get all users (for admin use only)
export const getUsers = async () => {
    const token = localStorage.getItem('token'); // Get token from local storage
    const response = await fetch(`${BASE_URL}/users`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Include the token
        },
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch users: ${response.statusText}`);
    }
    return response.json();
};

// Update user role
export const updateUserRole = async (userId, newRole) => {
    const token = localStorage.getItem('token'); // Get token from local storage
    const response = await fetch(`${BASE_URL}/users/${userId}/role`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Include the token
        },
        body: JSON.stringify({ role: newRole }),
    });
    if (!response.ok) {
        throw new Error(`Failed to update user role: ${response.statusText}`);
    }
    return response.json();
};
