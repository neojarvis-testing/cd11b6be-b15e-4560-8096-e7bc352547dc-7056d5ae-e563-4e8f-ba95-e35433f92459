import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Import jwt-decode
import 'bootstrap/dist/css/bootstrap.min.css';
import API_BASE_URL from '../apiConfig';

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = () => {
        const validEmail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
        let formErrors = {};

        if (!formData.email) {
            formErrors.email = "Email is required";
        } else if (!validEmail.test(formData.email)) {
            formErrors.email = "Please enter a valid email.";
        }

        if (!formData.password) {
            formErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            formErrors.password = "Password must be at least 6 characters.";
        }

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                const response = await axios.post(`${API_BASE_URL}/login`, formData);
                const { token } = response.data; // Assume backend returns a JWT token
                localStorage.setItem('token', token);

                localStorage.setItem("userRole", role);
                localStorage.setItem("username", username);
                localStorage.setItem("jwtToken", token);

                // Navigate based on role
                if (role === "Baker") {
                    navigate("/baker-navbar", { state: { username, role } });
                } else if (role === "Customer") {
                    navigate("/customer-navbar", { state: { username, role } });
                }

    
                // Decode the token
                const decodedToken = jwtDecode(token);
                console.log(decodedToken);
                // Extract and store username and role
                const username = decodedToken.name; // Ensure the backend includes 'username' in the token
                const role = decodedToken.role;
                
                localStorage.setItem('username', username);
                localStorage.setItem('role', role);
    
                // Navigate to the homepage
                navigate('/home');

            } catch (error) {
                console.error("Login failed:", error.response?.data || error.message);
                setErrors({ apiError: "Invalid email or password." });
            }
        }
    };

    return (
        <div className="container-fluid vh-100 d-flex">
            <div className="row w-100">
                <div className="col-md-6 d-flex flex-column justify-content-center align-items-center bg-primary text-white p-5">
                    <h1>CakeCraft</h1>
                    <p className="text-center">
                        Unleash your dessert dreams! Dive into a world of stunning cakes, from festive celebrations to everyday indulgences. Handcrafted with love, each bite is a delight!
                    </p>
                </div>
                <div className="col-md-6 d-flex flex-column justify-content-center align-items-center bg-light p-5">
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit} className="w-75">
                        <div className="form-group mb-3">
                            <label>Email:</label>
                            <input 
                                type="email" 
                                name="email" 
                                value={formData.email} 
                                onChange={handleChange} 
                                className="form-control" 
                                placeholder="Email" 
                            />
                            {errors.email && <span className="text-danger">{errors.email}</span>}
                        </div>
                        <div className="form-group mb-3">
                            <label>Password:</label>
                            <input 
                                type="password" 
                                name="password" 
                                value={formData.password} 
                                onChange={handleChange} 
                                className="form-control" 
                                placeholder="Password" 
                            />
                            {errors.password && <span className="text-danger">{errors.password}</span>}
                        </div>
                        {errors.apiError && <span className="text-danger">{errors.apiError}</span>}
                        <button type="submit" className="btn btn-primary w-100">Login</button>
                    </form>
                    <p className="mt-3">
                        Don't have an account? <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => navigate('/signup')}>Signup</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;