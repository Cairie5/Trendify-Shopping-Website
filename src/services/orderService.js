// src/services/orderService.js

const BASE_URL = 'http://127.0.0.1:5000'; // Update to match your backend
export const getOrdersByUserId = async (userId) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${BASE_URL}/orders?user_id=${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, 
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Error fetching orders:', errorData); // Logs exact backend error
    throw new Error(`Failed to fetch orders: ${response.statusText}`);
  }

  return response.json();
};
