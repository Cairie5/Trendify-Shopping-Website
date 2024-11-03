const BASE_URL = 'http://127.0.0.1:5000'; // Update to match your backend API

// Helper function to retrieve cart from local storage
const getCartFromLocalStorage = () => {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
};

// Helper function to save cart to local storage
const saveCartToLocalStorage = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

// Add a product to the cart
export const addToCart = async (product) => {
  // Get the current cart from local storage
  const cart = getCartFromLocalStorage();

  // Check if the product is already in the cart
  const existingProduct = cart.find((item) => item.id === product.id);
  
  if (existingProduct) {
    // If it exists, increase the quantity
    existingProduct.quantity += 1;
  } else {
    // If it does not exist, add it to the cart with a quantity of 1
    cart.push({ ...product, quantity: 1 });
  }

  // Save the updated cart back to local storage
  saveCartToLocalStorage(cart);

  // Send the updated cart to the backend
  await fetch(`${BASE_URL}/cart`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cart),
  });
};

// Get all items in the cart
export const getCartItems = () => {
  return getCartFromLocalStorage();
};

// Remove a product from the cart
export const removeFromCart = async (productId) => {
  const cart = getCartFromLocalStorage();
  
  // Filter out the product to remove it
  const updatedCart = cart.filter((item) => item.id !== productId);
  
  // Save the updated cart
  saveCartToLocalStorage(updatedCart);

  // Send the updated cart to the backend
  await fetch(`${BASE_URL}/cart`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedCart),
  });
};

// Clear the cart
export const clearCart = async () => {
  localStorage.removeItem('cart');

  // Optionally, clear the cart on the backend (if applicable)
  await fetch(`${BASE_URL}/cart`, {
    method: 'DELETE',
  });
};
