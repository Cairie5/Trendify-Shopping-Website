// src/services/orderService.js

const BASE_URL = 'http://127.0.0.1:5000'; // Update to match your backend

export const createOrder = async (orderData) => {
  const response = await fetch(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData),
  });
  if (!response.ok) {
    throw new Error(`Failed to create order: ${response.statusText}`);
  }
  return response.json();
};

export const getOrdersByUserId = async (userId) => {
  const response = await fetch(`${BASE_URL}/orders?userId=${userId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch orders: ${response.statusText}`);
  }
  return response.json();
};
