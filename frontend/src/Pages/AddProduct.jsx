import React, { useState } from 'react';
import { createProduct } from '../api';
import { toast } from 'react-toastify';

const AddProduct = () => {
    const [productData, setProductData] = useState({
        name: '',
        description: '',
        price: '',
        stock: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createProduct(productData);
            toast.success("Product added successfully!");
            setProductData({ name: '', description: '', price: '', stock: '' });
        } catch (error) {
            if (error.response && error.response.status === 409) {
                toast.error('Product already exists');
            } else {
                toast.error('Failed to add product');
            }
            console.error(error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Add Product</h2>
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="form-group mb-3">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={productData.name}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        name="description"
                        value={productData.description}
                        onChange={handleChange}
                        className="form-control"
                    ></textarea>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="price">Price:</label>
                    <input
                        type="number"
                        name="price"
                        value={productData.price}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="stock">Stock:</label>
                    <input
                        type="number"
                        name="stock"
                        value={productData.stock}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Add Product</button>
            </form>
        </div>
    );
};

export default AddProduct;
