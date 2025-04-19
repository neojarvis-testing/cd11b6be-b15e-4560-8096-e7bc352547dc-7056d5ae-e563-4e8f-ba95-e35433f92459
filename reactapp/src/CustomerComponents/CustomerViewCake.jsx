import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



import API_BASE_URL from '../apiConfig';

import CustomerNavbar from './CustomerNavbar';

const CustomerViewCake = () => {
    const [cakes, setCakes] = useState([]); // Cakes fetched from the bakers
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredCakes, setFilteredCakes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const username = localStorage.getItem('username') || 'Guest'; // Get the username from localStorage
    const role = localStorage.getItem('role') || 'Customer'; // Get the user's role from localStorage

    // Fetch cakes submitted by bakers
    useEffect(() => {
        const fetchCakes = async () => {
            try {

                // const token = localStorage.getItem("jwtToken"); // Retrieve token
                // const response = await axios.get(`${API_BASE_URL}/api/cakes`, {
                //     headers: {
                //         Authorization: `Bearer ${token}` // Pass token in header
                //     }

                const token = localStorage.getItem('token'); // Ensure token exists
                if (!token) {
                    throw new Error('No token found. Please login.');
                }
                const response = await axios.get(`${API_BASE_URL}/cakes`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include token in request header
                    },

                });
                setCakes(response.data);
            } catch (err) {
                console.error('Error fetching cakes:', err);
                setError(err.message || 'Failed to fetch cakes. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

    }, []);

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${API_BASE_URL}/login`, { username, password });
            localStorage.setItem("jwtToken", response.data.token); // Store token
            navigate("/customer/viewcakes");
        } catch (error) {
            setError("Login failed");
        }
    };
    
    
    


        fetchCakes();
    }, []);

    // Filter cakes based on search query
    useEffect(() => {
        setFilteredCakes(
            cakes.filter((cake) =>
                cake.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    }, [searchQuery, cakes]);
>>>>>>> 11438478f433fa6ec5e9efb6deb6c2558ffcd2ac

    return (
        <div className="container mt-4">
            <CustomerNavbar username={username} role={role} />
            <h2 className="text-center mt-4 mb-4">Available Cakes</h2>

            {/* Search Input */}
            <input
                type="text"
                className="form-control mb-4"
                placeholder="Search cakes by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />

            {/* Cake Table */}
            {loading ? (
                <div className="text-center my-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <table className="table table-bordered table-striped text-center">
                    <thead className="thead-dark">
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Quantity</th>
                            <th>Price (Rs.)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {error ? (
                            <tr>
                                <td colSpan="5" className="text-danger text-center">
                                    {error}
                                </td>
                            </tr>
                        ) : filteredCakes.length > 0 ? (
                            filteredCakes.map((cake) => (
                                <tr key={cake.cakeId}>
                                    <td>
                                        <img
                                            src={cake.cakeImage || 'https://via.placeholder.com/100'}
                                            alt={cake.name}
                                            style={{ width: '100px', height: '50px', objectFit: 'cover' }}
                                        />
                                    </td>
                                    <td>{cake.name}</td>
                                    <td>{cake.category}</td>
                                    <td>{cake.quantity}</td>
                                    <td>{cake.price.toFixed(2)}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center text-muted">
                                    Oops! No cakes found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default CustomerViewCake;