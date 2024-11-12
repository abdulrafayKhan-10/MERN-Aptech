import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Nav from './Components/Nav';
import AddProduct from './Pages/AddProduct';
import ProductList from './Pages/ProductList';
import UpdateProduct from './Pages/UpdateProduct';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Home from './Pages/Home';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check if the user is logged in on component mount
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    // Function to handle logout
    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    return (
        <Router>
            <Nav isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
            <div style={{ padding: '2rem' }}>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/login"
                        element={isAuthenticated ? <Navigate to="/" /> : <Login setIsAuthenticated={setIsAuthenticated} />}
                    />
                    <Route
                        path="/register"
                        element={isAuthenticated ? <Navigate to="/" /> : <Register />}
                    />

                    {/* Protected Routes */}
                    {isAuthenticated && (
                        <>
                            <Route path="/add" element={<AddProduct />} />
                            <Route path="/list" element={<ProductList />} />
                            <Route path="/edit/:id" element={<UpdateProduct />} />
                        </>
                    )}

                    {/* Redirect to home if route not found */}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
