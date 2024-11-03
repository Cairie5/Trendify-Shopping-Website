import React from 'react';

const Homepage = () => {
  return (
    <div className="container mx-auto p-4">
      {/* Hero Section */}
      <section className="hero bg-cover bg-center h-96" style={{ backgroundImage: 'url(/path/to/featured-image.jpg)' }}>
        <div className="flex flex-col justify-center items-center h-full bg-black bg-opacity-50">
          <h1 className="text-white text-4xl font-bold">Your Fashion, Your Style</h1>
          <button className="mt-4 bg-yellow-500 text-black py-2 px-4 rounded">Shop Now</button>
        </div>
      </section>

      {/* Categories Section */}
      <section className="my-10">
        <h2 className="text-2xl font-semibold mb-4">Shop by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-gray-200 h-40 flex justify-center items-center">
            <h3 className="text-xl">Men</h3>
          </div>
          <div className="bg-gray-200 h-40 flex justify-center items-center">
            <h3 className="text-xl">Women</h3>
          </div>
          <div className="bg-gray-200 h-40 flex justify-center items-center">
            <h3 className="text-xl">Accessories</h3>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="my-10 text-center">
        <h2 className="text-2xl font-semibold">Subscribe to Our Newsletter</h2>
        <p className="mb-4">Get the latest updates and discounts!</p>
        <input type="email" placeholder="Your email" className="border rounded px-4 py-2" />
        <button className="ml-2 bg-yellow-500 text-black py-2 px-4 rounded">Subscribe</button>
      </section>

      {/* Footer */}
      <footer className="my-10 text-center">
        <p className="text-gray-600">© 2024 Trendify. All rights reserved.</p>
        <p>
          <a href="/about" className="text-blue-600">About</a> | 
          <a href="/contact" className="text-blue-600">Contact</a> | 
          <a href="/privacy" className="text-blue-600">Privacy Policy</a>
        </p>
      </footer>
    </div>
  );
};

export default Homepage;
