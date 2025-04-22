import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; 
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
                const { token } = response.data; 
                localStorage.setItem('token', token);
                const decodedToken = jwtDecode(token);
                console.log(decodedToken);
                const username = decodedToken.name; 
                const role = decodedToken.role;
                localStorage.setItem('username', username);
                localStorage.setItem('role', role);
                navigate('/home');
            } catch (error) {
                console.error("Login failed:", error.response?.data || error.message);
                setErrors({ apiError: "Invalid email or password." });
            }
        }
    };

    return (
        <div className="container-fluid vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: "#f4f0fa" }}>
            <div className="row w-100 shadow-lg rounded overflow-hidden" style={{ maxWidth: "900px", border: "1px solid #e0d4f3" }}>
                <div className="col-md-6 bg-light-purple text-white d-flex flex-column justify-content-center align-items-center p-5" style={{ background: "linear-gradient(135deg, #9370db, #e6e6fa)" }}>
                    <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", textShadow: "1px 1px 5px #6a5acd" }}>CakeCraft</h1>
                    <p className="text-center mt-3" style={{ fontSize: "1.1rem" }}>
                        Unleash your dessert dreams! Dive into a world of stunning cakes, from festive celebrations to everyday indulgences. Handcrafted with love, each bite is a delight!
                    </p>
                </div>
                <div className="col-md-6 bg-white p-5 d-flex flex-column align-items-center">
                    <h2 className="text-center mb-4" style={{ color: "#6a5acd", fontWeight: "bold" }}>Login</h2>
                    <form onSubmit={handleSubmit} className="w-100">
                        <div className="form-group mb-3">
                            <label htmlFor="email" style={{ fontWeight: "500", color: "#4b0082" }}>Email:</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="form-control border-secondary"
                                placeholder="Enter your email"
                            />
                            {errors.email && <span className="text-danger">{errors.email}</span>}
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="password" style={{ fontWeight: "500", color: "#4b0082" }}>Password:</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="form-control border-secondary"
                                placeholder="Enter your password"
                            />
                            {errors.password && <span className="text-danger">{errors.password}</span>}
                        </div>
                        {errors.apiError && <span className="text-danger mb-3 d-block">{errors.apiError}</span>}
                        <button type="submit" className="btn w-100" style={{ backgroundColor: "#9370db", color: "#fff", fontWeight: "bold", padding: "10px 20px", border: "none" }}>Login</button>
                    </form>
                    <p className="mt-4 text-center">
                        Don't have an account?{" "}
                        <span
                            className="text-primary"
                            style={{ cursor: "pointer", fontWeight: "500" }}
                            onClick={() => navigate('/signup')}
                        >
                            Signup
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;