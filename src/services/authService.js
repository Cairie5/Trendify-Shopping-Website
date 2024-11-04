const BASE_URL = 'http://127.0.0.1:5000'; // Update to match your backend

export const login = async (email, password) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    throw new Error(`Login failed: ${response.statusText}`);
  }
  const data = await response.json();
  // Store the token in local storage
  localStorage.setItem('token', data.access_token);
  return data; // Return the user data, including the JWT token
};

export const register = async (name, email, password, phoneNumber) => {
  const response = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name,
      email,
      password,
      phone_number: phoneNumber,
    }),
  });
  if (!response.ok) {
    throw new Error(`Registration failed: ${response.statusText}`);
  }
  return response.json();
};

// New function to get user profile
export const getProfile = async () => {
  const token = localStorage.getItem('token'); // Get token from local storage
  const response = await fetch(`${BASE_URL}/profile`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // Include the token
    },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch profile: ${response.statusText}`);
  }
  return response.json();
};
