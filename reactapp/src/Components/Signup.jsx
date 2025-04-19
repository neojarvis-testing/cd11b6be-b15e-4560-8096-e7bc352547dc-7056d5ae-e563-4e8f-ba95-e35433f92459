import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import API_BASE_URL from '../apiConfig';
 
const Signup = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
<<<<<<< HEAD
       // confirmPassword: "", // For frontend validation only
=======
        confirmPassword: "",
>>>>>>> 72d3b3aa1c10c50564d8cc49ee268d6cedcbb4bc
        username: "",
        mobileNumber: "",
        userRole: ""
    });
 
    const [errors, setErrors] = useState({});
    const [isSuccess, setIsSuccess] = useState(false); // Tracks if signup is successful
    const navigate = useNavigate();
 
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
 
    const validate = () => {
        const validEmail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
        const validMobile = /^\d{10}$/;
        let formErrors = {};
 
        if (!formData.username) {
            formErrors.username = "Username is required";
        }
        if (!formData.email) {
            formErrors.email = "Email is required";
        } else if (!validEmail.test(formData.email)) {
            formErrors.email = "Invalid email format";
        }
        if (!formData.mobileNumber) {
            formErrors.mobileNumber = "Mobile number is required";
        } else if (!validMobile.test(formData.mobileNumber)) {
            formErrors.mobileNumber = "Mobile Number must be 10 characters long";
        }
        if (!formData.password) {
            formErrors.password = "Password is required";
        } else if (formData.password.length < 8) {
            formErrors.password = "Password must be at least 8 characters long";
        }
        if (!formData.confirmPassword) {
            formErrors.confirmPassword = "Confirm Password is required";
        } else if (formData.password !== formData.confirmPassword) {
            formErrors.confirmPassword = "Passwords do not match";
        }
        if (!formData.userRole) {
            formErrors.userRole = "Please select a role";
        }
 
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };
 
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                const { confirmPassword, ...payload } = formData;
<<<<<<< HEAD

                const response = await axios.post(`${API_BASE_URL}/register`, payload);

=======
 
                const response = await axios.post(
                    `${API_BASE_URL}/register`,
                    payload
                );
>>>>>>> 72d3b3aa1c10c50564d8cc49ee268d6cedcbb4bc
                console.log("Signup successful:", response.data);
                setIsSuccess(true); // Show success modal
            } catch (error) {
                console.error("Signup failed:", error.response?.data || error.message);
                setErrors({ apiError: error.response?.data || "Signup failed. Please try again." });
            }
        }
    };
 
    const redirectToLogin = () => navigate('/'); // Navigate to the login page
 
    return (
        <div
            className="container-fluid vh-100 d-flex align-items-center justify-content-center"
            style={{
                background: "linear-gradient(to bottom, #dcd6f7, #b5aef9)" // Subtle purple gradient
            }}
        >
            <div
                className="shadow-lg rounded"
                style={{
                    width: "100%",
                    maxWidth: "420px", // Compressed form size
                    background: "#ffffff", // Clean form background
                    border: "1px solid #c9c2f0", // Light purple border
                    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)" // Enhanced shadow for the form sides
                }}
            >
                <div className="p-4">
                    <h3 className="text-center mb-4" style={{ color: "#6a5acd", fontWeight: "bold" }}>Signup</h3>
                    <form onSubmit={handleSubmit}>
                        {/* Username Field */}
                        <div className="form-group mb-3">
                            <label style={{ color: "#4b0082", fontWeight: "500" }}>Username:</label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Enter your username"
                            />
                            {errors.username && <span className="text-danger">{errors.username}</span>}
                        </div>
 
                        {/* Email Field */}
                        <div className="form-group mb-3">
                            <label style={{ color: "#4b0082", fontWeight: "500" }}>Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Enter your email"
                            />
                            {errors.email && <span className="text-danger">{errors.email}</span>}
                        </div>
 
                        {/* Mobile Number Field */}
                        <div className="form-group mb-3">
                            <label style={{ color: "#4b0082", fontWeight: "500" }}>Mobile Number:</label>
                            <input
                                type="text"
                                name="mobileNumber"
                                value={formData.mobileNumber}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Enter your mobile number"
                            />
                            {errors.mobileNumber && <span className="text-danger">{errors.mobileNumber}</span>}
                        </div>
 
                        {/* Password Field */}
                        <div className="form-group mb-3">
                            <label style={{ color: "#4b0082", fontWeight: "500" }}>Password:</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Enter your password"
                            />
                            {errors.password && <span className="text-danger">{errors.password}</span>}
                        </div>
 
                        {/* Confirm Password Field */}
                        <div className="form-group mb-3">
                            <label style={{ color: "#4b0082", fontWeight: "500" }}>Confirm Password:</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Confirm your password"
                            />
                            {errors.confirmPassword && <span className="text-danger">{errors.confirmPassword}</span>}
                        </div>
 
                        {/* Role Selection Dropdown */}
                        <div className="form-group mb-3">
                            <label style={{ color: "#4b0082", fontWeight: "500" }}>Role:</label>
                            <select
                                name="userRole"
                                value={formData.userRole}
                                onChange={handleChange}
                                className="form-control"
                            >
                                <option value="">--Select Role--</option>
                                <option value="Baker">Baker</option>
                                <option value="Customer">Customer</option>
                            </select>
                            {errors.userRole && <span className="text-danger">{errors.userRole}</span>}
                        </div>
 
                        {/* API Error Display */}
                        {errors.apiError && <span className="text-danger">{errors.apiError}</span>}
 
                        {/* Submit Button */}
                        <button type="submit" className="btn w-100" style={{ backgroundColor: "#9370db", color: "#fff", fontWeight: "bold", padding: "10px 20px", border: "none" }}>Submit</button>
                    </form>
 
                    {/* Success Modal */}
                    {isSuccess && (
                        <div className="modal show d-block" tabIndex="-1" role="dialog">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Signup Successful</h5>
                                    </div>
                                    <div className="modal-body">
                                        <p>Your account has been created successfully!</p>
                                    </div>
                                    <div className="modal-footer">
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={redirectToLogin}
                                        >
                                            Ok
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
 
                    {/* Login Redirect */}
                    <p className="mt-3 text-center">
                        Already have an account?{" "}
                        <span
                            style={{ color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}
                            onClick={redirectToLogin}
                        >
                            Login
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};
 
export default Signup;