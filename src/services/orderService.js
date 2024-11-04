const BASE_URL = "http://127.0.0.1:5000"; // Replace with your actual Flask API base URL

export const getOrdersByUserId = async () => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    throw new Error('User is not authenticated');
  }

  try {
    const response = await fetch(`${BASE_URL}/orders`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, 
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch orders: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    throw error;
  }
};

export const createOrder = async (items) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    throw new Error('User is not authenticated');
  }

  try {
    const response = await fetch(`${BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ items }), // Send the order items in the body
    });

    if (!response.ok) {
      throw new Error(`Failed to create order: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('Failed to create order:', error);
    throw error;
  }
};
