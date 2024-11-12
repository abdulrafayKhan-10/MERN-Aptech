import axios from 'axios';

const PRODUCT_API_URL = 'http://localhost:5000/api/products';
const USER_API_URL = 'http://localhost:5000/api/user';
const ROLE_API_URL = 'http://localhost:5000/api/roles';


export const getProducts = async () => {
    return await axios.get(PRODUCT_API_URL);
};

export const createProduct = async (productData) => {
    return await axios.post(PRODUCT_API_URL, productData);
};

export const getProductById = async (id) => {
    return await axios.get(`${PRODUCT_API_URL}/${id}`);
};

export const updateProduct = async (id, productData) => {
    return await axios.put(`${PRODUCT_API_URL}/${id}`, productData);
};

export const deleteProduct = async (id) => {
    return await axios.delete(`${PRODUCT_API_URL}/${id}`);
};

export const createUser = async (userData) =>{
    return await axios.post(USER_API_URL, userData);
}

export const loginUser = async (loginData) => {
    try {
        const response = await axios.post(`${USER_API_URL}/login`, loginData);
        return response;
    } catch (error) {
        console.error('API call error:', error); // Debugging
        throw error;
    }
};


export const getRoles = async () => {
    try {
        const response = await axios.get(`${ROLE_API_URL}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};