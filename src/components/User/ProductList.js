import React, { useEffect, useState } from 'react';
import { getProducts } from '../../services/productService';
import ProductCard from './ProductCard';
import { addToCart } from '../../services/cartService'; // Import your addToCart function

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const fetchedProducts = await getProducts();
                setProducts(fetchedProducts);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleAddToCart = (product) => {
        addToCart(product); // Call your addToCart function
        console.log(`Added to cart: ${product.name}`);
    };

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Available Products</h2>

                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {products.map(product => (
                        <ProductCard 
                            key={product.product_id} 
                            product={product} 
                            onAddToCart={handleAddToCart} // Pass the function here
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductList;
