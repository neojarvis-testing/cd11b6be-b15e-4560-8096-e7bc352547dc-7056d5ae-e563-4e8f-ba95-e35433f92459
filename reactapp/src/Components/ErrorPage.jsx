
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ErrorPage.css'; 

const ErrorPage = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/'); 
    };

    return (
        <div className="error-page d-flex flex-column align-items-center justify-content-center text-center vh-100">
            <img
                src="/alert.png" 
                alt="Error"
                className="error-image mb-4"
                style={{ width: '150px', height: '150px' }}
            />
            <h1 className="text-danger mb-3">404 - Page Not Found</h1>
            <p className="text-muted mb-4">
                Oops! Something Went Wrong. Please try again later.
            </p>
            <button className="btn btn-primary px-4 py-2" onClick={handleGoBack}>
                Go to Home
            </button>
        </div>
    );
    };
export default ErrorPage;