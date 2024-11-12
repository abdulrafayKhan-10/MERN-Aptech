import React, { useState, useEffect } from 'react';
import { createUser, getRoles } from '../api';  // Add getRoles to your API functions
import { toast } from 'react-toastify';

const Register = () => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        role: '',
        status: ''
    });

    const [roles, setRoles] = useState([]);  // State for storing roles
    const [loading, setLoading] = useState(true);  // Loading state for roles

    // Fetch roles when component mounts
    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const rolesData = await getRoles();
                setRoles(rolesData);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch roles:', error);
                toast.error('Failed to load roles');
                setLoading(false);
            }
        };

        fetchRoles();
    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createUser(userData);
            toast.success("User registered successfully!");
            setUserData({ name: '', email: '', password: '',role: '', status: ''});
        } catch (error) {
            if (error.code === 11000) { // 11000 is the error code for duplicate key
                return error.code(409).toast.error({ message: 'User already exists' });
              } else {
                toast.error('Failed to register user');
            }
            console.error(error);
        }
    };


    return (
        <div className="container mt-5">
            <h2 className="text-center">Register User</h2>
            <form onSubmit={handleSubmit} className="mt-4">                
                <div className="form-group mb-3">
                <div className="form-group mb-3">
                    <label htmlFor="name">name:</label>
                    <input
                        type="text"
                        name="name"
                        value={userData.name}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="password">password:</label>
                    <input
                        type="password"
                        name="password"
                        value={userData.password}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="status">status:</label>
                    <select
                        name="status"
                        value={userData.status}
                        onChange={handleChange}
                        className="form-control"
                        required
                    >
                        <option value="">Select a status</option>
                        {loading ? (
                            <option disabled>Loading roles...</option>
                        ) : (
                            <>
                            <option value="active">Active</option>
                            <option value="deactive">Non Active</option>
                            </>
                        )}
                    </select>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="role">Role:</label>
                    <select
                        name="role"
                        value={userData.role}
                        onChange={handleChange}
                        className="form-control"
                        required
                    >
                        <option value="">Select a role</option>
                        {loading ? (
                            <option disabled>Loading roles...</option>
                        ) : (
                            roles.map(role => (
                                <option key={role._id} value={role.role}>
                                    {role.role}
                                </option>
                            ))
                        )}
                    </select>
                </div>
                </div>

                <button 
                    type="submit" 
                    className="btn btn-primary w-100"
                    disabled={loading}
                >
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;