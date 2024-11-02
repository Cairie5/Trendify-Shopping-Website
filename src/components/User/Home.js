import React from 'react';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-[url('https://th.bing.com/th/id/R.26a407e8b3d62cfe9442783567980bcd?rik=9TzwhuHsz4aIrA&pid=ImgRaw&r=0')] bg-cover bg-center text-white h-screen flex flex-col justify-center items-center">
        <h1 className="text-5xl font-bold mb-4 text-shadow">Welcome to Trendify</h1>
        <p className="text-xl mb-8 text-shadow">Discover the latest trends in fashion, electronics, and more!</p>
        <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded">Shop Now</button>
      </section>

      {/* Featured Categories Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10 text-gray-800">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { title: "Fashion", imgUrl: 'https://th.bing.com/th/id/OIP.qCbbJ7kXwjZKX3b9R-YgYgHaEo?pid=ImgDet&rs=1' },
              { title: "Electronics", imgUrl: 'https://th.bing.com/th/id/OIP.CYHviCV1YAM4Go61UwzctwHaE8?pid=ImgDet&rs=1' },
              { title: "Home & Kitchen", imgUrl: 'https://th.bing.com/th/id/OIP.LVxPY2gRS-dIvWXg0q_h-QHaE7?pid=ImgDet&rs=1' },
            ].map(({ title, imgUrl }, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                <img src={imgUrl} alt={title} className="w-full h-60 object-cover rounded-md mb-4" />
                <h3 className="font-semibold text-xl">{title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bestsellers Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10 text-gray-800">Bestsellers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { title: "Smartwatch", price: "$299", imgUrl: 'https://th.bing.com/th/id/OIP.5LMIxu33zgPCKOj52FwAjwHaE8?pid=ImgDet&rs=1' },
              { title: "Designer Bag", price: "$149", imgUrl: 'https://th.bing.com/th/id/OIP.T8PYR1b2Nq93sh65o5aQ-wHaEK?pid=ImgDet&rs=1' },
              { title: "Wireless Earbuds", price: "$89", imgUrl: 'https://th.bing.com/th/id/OIP.SyYLV6XovBNMUNpqGVe5XwHaE7?pid=ImgDet&rs=1' },
            ].map(({ title, price, imgUrl }, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                <img src={imgUrl} alt={title} className="w-full h-60 object-cover rounded-md mb-4" />
                <h3 className="font-semibold text-xl mb-2">{title}</h3>
                <p className="text-lg font-bold text-gray-800">{price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10 text-gray-800">Customer Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                quote: "Absolutely love my new smartwatch! Trendify never disappoints.",
                author: "Alex Johnson",
                imgUrl: "https://randomuser.me/api/portraits/men/32.jpg",
              },
              {
                quote: "Amazing quality on every item I’ve bought. Trendify has it all!",
                author: "Sarah Williams",
                imgUrl: "https://randomuser.me/api/portraits/women/44.jpg",
              },
              {
                quote: "Fast delivery and awesome customer service. Highly recommend!",
                author: "Chris Brown",
                imgUrl: "https://randomuser.me/api/portraits/men/45.jpg",
              },
            ].map(({ quote, author, imgUrl }, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                <img src={imgUrl} alt={author} className="w-16 h-16 rounded-full mx-auto mb-4" />
                <p className="italic text-gray-600 mb-4">"{quote}"</p>
                <h4 className="font-semibold text-lg text-blue-600">{author}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-blue-400">Trendify</h1>
            <p className="text-gray-400">Your one-stop shop for the latest trends.</p>
          </div>
          <div>
            <h5 className="text-lg font-semibold mb-4">Company</h5>
            <ul>
              <li><a href="#" className="hover:text-blue-400">About Us</a></li>
              <li><a href="#" className="hover:text-blue-400">Careers</a></li>
              <li><a href="#" className="hover:text-blue-400">Press</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-lg font-semibold mb-4">Support</h5>
            <ul>
              <li><a href="#" className="hover:text-blue-400">Help Center</a></li>
              <li><a href="#" className="hover:text-blue-400">Returns</a></li>
              <li><a href="#" className="hover:text-blue-400">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-lg font-semibold mb-4">Follow Us</h5>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400">Instagram</a>
              <a href="#" className="text-gray-400 hover:text-blue-400">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-blue-400">Facebook</a>
            </div>
          </div>
        </div>
        <div className="container mx-auto text-center mt-8 text-gray-500">
          <p>© 2024 Trendify. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
