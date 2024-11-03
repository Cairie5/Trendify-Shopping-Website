import React, { useEffect, useState } from 'react';
import { getProducts, createProduct } from '../../services/productService'; // Corrected import

function ProductManagement() {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: "", price: "", stock: "" });

    useEffect(() => {
        const fetchProducts = async () => {
            const fetchedProducts = await getProducts();
            setProducts(fetchedProducts);
        };
        fetchProducts();
    }, []);

    const handleChange = (e) => {
        setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
    };

    const addProduct = async (e) => {
        e.preventDefault();
        const createdProduct = await createProduct(newProduct); // Updated to use createProduct
        setProducts([...products, createdProduct]);
        setNewProduct({ name: "", price: "", stock: "" });
    };

    return (
        <div>
            <h2>Product Management</h2>
            <form onSubmit={addProduct}>
                <input type="text" name="name" placeholder="Product Name" value={newProduct.name} onChange={handleChange} required />
                <input type="number" name="price" placeholder="Price" value={newProduct.price} onChange={handleChange} required />
                <input type="number" name="stock" placeholder="Stock" value={newProduct.stock} onChange={handleChange} required />
                <button type="submit">Add Product</button>
            </form>

            <h3>Product List</h3>
            <ul>
                {products.map(product => (
                    <li key={product.id}>{product.name} - ${product.price}</li>
                ))}
            </ul>
        </div>
    );
}

export default ProductManagement;
