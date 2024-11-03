import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/pages/Login';
import Register from './components/pages/Register';

import Profile from './components/pages/Profile';
import UserHome from './components/User/Home';
import ProductList from './components/User/ProductList';
import ProductDetail from './components/User/ProductDetail';
import Cart from './components/User/Cart';
// import Dashboard from './components/Admin/Dashboard';
// import ProductManagement from './components/Admin/ProductManagement';
// import OrderManagement from './components/Admin/OrderManagement';
// import UserManagement from './components/Admin/UserManagement';
// import ReviewModeration from './components/Admin/ReviewModeration';
import NavBar from './components/NavBar'; // NavBar is within components
import AdminPanel from './components/Admin/AdminPanel';

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<UserHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />

        <Route path="/adminpanel/*" element={<AdminPanel />} />
        {/* <Route path="*" component={NotFound} /> Optional Not Found route */}
        {/* <Route path="/admin" element={<AdminPanel />} /> */}
        {/* <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/products" element={<ProductManagement />} />
        <Route path="/admin/orders" element={<OrderManagement />} />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/admin/reviews" element={<ReviewModeration />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
