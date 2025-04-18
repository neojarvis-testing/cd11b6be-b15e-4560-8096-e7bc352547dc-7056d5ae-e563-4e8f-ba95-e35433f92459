import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../apiConfig';

const CustomerViewCakes = () => {
    const [cakes, setCakes] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCakes = async () => {
            try {
                const token = localStorage.getItem("jwtToken"); // Retrieve token
                const response = await axios.get(`${API_BASE_URL}/api/cakes`, {
                    headers: {
                        Authorization: `Bearer ${token}` // Pass token in header
                    }
                });
                setCakes(response.data);
            } catch (err) {
                setError('Failed to fetch cakes');
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
    
    
    

    return (
        <div>
            <h2>View Cakes</h2>
            {error && <p>{error}</p>}
            <ul>
                {cakes.map(cake => (
                    <li key={cake.cakeId}>
                        <h3>{cake.name}</h3>
                        <p>{cake.category}</p>
                        <p>{cake.price}</p>
                        <p>{cake.quantity}</p>
                        <img src={cake.cakeImage} alt={cake.name} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CustomerViewCakes;

