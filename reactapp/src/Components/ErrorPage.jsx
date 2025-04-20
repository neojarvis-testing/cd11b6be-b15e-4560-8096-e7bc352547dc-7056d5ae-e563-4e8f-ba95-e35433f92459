
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ErrorPage.css'; // Import external CSS for styling

const ErrorPage = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/'); // Redirect to the home page
    };

    return (
        <div className="private-route-container d-flex flex-column justify-content-center align-items-center">
            <img
                src="/alert.png" // Ensure the image is in the public folder
                alt="Error"
                className="error-image mb-4"
                style={{ width: '150px', height: '150px' }}
            />
            <h1 className="text-danger mb-3">404 - Page Not Found</h1>
            <p className="text-muted mb-4">
                Oops! Something Went Wrong. Please try again later.
            </p>
            <button className="home-page" onClick={handleGoBack}>
                Go to Home
            </button>
        </div>
    );
};

export default ErrorPage;