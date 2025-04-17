import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Signup = () => {
    const [formData, setFormData] = useState({
        email: '',
        mobile: '',
        password: '',
        confirmPassword: '',
        role: '' // Adding role selection
    });

    const [errors, setErrors] = useState({});
    const [isSuccess, setIsSuccess] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = () => {
        const validEmail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
        const validMobile = /^\d{10}$/;
        let formErrors = {};

        if (!validEmail.test(formData.email)) {
            formErrors.email = "Invalid email format.";
        }
        if (!validMobile.test(formData.mobile)) {
            formErrors.mobile = "Invalid mobile number.";
        }
        if (formData.password !== formData.confirmPassword || !formData.password) {
            formErrors.password = "Passwords do not match.";
        }
        if (!formData.role) {
            formErrors.role = "Please select a role.";
        }

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            setIsSuccess(true);
        }
    };

    const redirectToLogin = () => {
        navigate('/login'); // Navigate to the login page
    };

    return (
        <div className="container-fluid vh-100 d-flex">
            <div className="row w-100">
                <div className="col-md-6 d-flex flex-column justify-content-center align-items-center bg-primary text-white p-5">
                    <h1>CakeCraft</h1>
                    <p className="text-center">
                        Join CakeCraft today! Whether you're a Baker or a User, your sweet journey starts here.
                        Share or savor delightful desserts made with love!
                    </p>
                </div>
                <div className="col-md-6 d-flex flex-column justify-content-center align-items-center bg-light p-5">
                    <h2>Signup</h2>
                    <form onSubmit={handleSubmit} className="w-75">
                        <div className="form-group mb-3">
                            <label>User Email:</label>
                            <input 
                                type="email" 
                                name="email" 
                                value={formData.email} 
                                onChange={handleChange} 
                                className="form-control" 
                                placeholder="Email" 
                                required 
                            />
                            {errors.email && <span className="text-danger">{errors.email}</span>}
                        </div>
                        <div className="form-group mb-3">
                            <label>Mobile Number:</label>
                            <input 
                                type="text" 
                                name="mobile" 
                                value={formData.mobile} 
                                onChange={handleChange} 
                                className="form-control" 
                                placeholder="Mobile Number" 
                                required 
                            />
                            {errors.mobile && <span className="text-danger">{errors.mobile}</span>}
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
                                required 
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label>Confirm Password:</label>
                            <input 
                                type="password" 
                                name="confirmPassword" 
                                value={formData.confirmPassword} 
                                onChange={handleChange} 
                                className="form-control" 
                                placeholder="Confirm Password" 
                                required 
                            />
                            {errors.password && <span className="text-danger">{errors.password}</span>}
                        </div>
                        <div className="form-group mb-3">
                            <label>Role:</label>
                            <select 
                                name="role" 
                                value={formData.role} 
                                onChange={handleChange} 
                                className="form-control" 
                                required 
                            >
                                <option value="">--Select Role--</option>
                                <option value="Baker">Baker</option>
                                <option value="User">User</option>
                            </select>
                            {errors.role && <span className="text-danger">{errors.role}</span>}
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Submit</button>
                    </form>
                    {isSuccess && (
                        <div className="alert alert-success mt-3">
                            Signup successful!
                            <button onClick={redirectToLogin} className="btn btn-link">Ok</button>
                        </div>
                    )}
                    <p className="mt-3">
                        Already have an account? <span style={{ color: 'blue', cursor: 'pointer' }} onClick={redirectToLogin}>Login</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
