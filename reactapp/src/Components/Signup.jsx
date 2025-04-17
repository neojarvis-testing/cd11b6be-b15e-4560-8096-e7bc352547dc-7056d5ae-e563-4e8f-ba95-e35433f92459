import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        mobileNumber: '',
        password: '',
        userRole: 'Customer'
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
           ('User created successfully!');
        } catch (err) {
            setError('User creation failed! Please check user details and try again.');
        }
    };

    return (
        <div>
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
                <input type="text" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} placeholder="Mobile Number" required />
                <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
                <select name="userRole" value={formData.userRole} onChange={handleChange}>
                    <option value="Customer">Customer</option>
                    <option value="Baker">Baker</option>
                </select>
                <button type="submit">Signup</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

export default Signup;
