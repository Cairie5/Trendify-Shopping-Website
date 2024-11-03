// src/services/reviewService.js

const BASE_URL = 'http://127.0.0.1:5000'; // Update to match your backend API

// Add a review to a product
export const addReview = async (productId, reviewData) => {
  const token = localStorage.getItem('token'); // Get token from local storage
  const response = await fetch(`${BASE_URL}/products/${productId}/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // Include the token
    },
    body: JSON.stringify(reviewData),
  });
  if (!response.ok) {
    throw new Error(`Failed to add review: ${response.statusText}`);
  }
  return response.json();
};

// Get all reviews for a product
export const getReviews = async (productId) => {
  const token = localStorage.getItem('token'); // Get token from local storage
  const response = await fetch(`${BASE_URL}/products/${productId}/reviews`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // Include the token
    },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch reviews: ${response.statusText}`);
  }
  return response.json();
};

// Create an object with exported functions
const reviewService = {
  addReview,
  getReviews,
};

// Export the reviewService object
export default reviewService;
