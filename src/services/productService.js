// src/services/productService.js

const BASE_URL = 'http://127.0.0.1:5000'; // Update to match your backend

export const getProducts = async () => {
  const token = localStorage.getItem('token'); // Get token from local storage
  const response = await fetch(`${BASE_URL}/products`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // Include the token
    },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`);
  }
  return response.json();
};

export const getProductById = async (id) => {
  const token = localStorage.getItem('token'); // Get token from local storage
  const response = await fetch(`${BASE_URL}/products/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // Include the token
    },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch product: ${response.statusText}`);
  }
  return response.json();
};

export const createProduct = async (product) => {
  const token = localStorage.getItem('token'); // Get token from local storage
  const response = await fetch(`${BASE_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // Include the token
    },
    body: JSON.stringify(product),
  });
  if (!response.ok) {
    throw new Error(`Failed to create product: ${response.statusText}`);
  }
  return response.json();
};
