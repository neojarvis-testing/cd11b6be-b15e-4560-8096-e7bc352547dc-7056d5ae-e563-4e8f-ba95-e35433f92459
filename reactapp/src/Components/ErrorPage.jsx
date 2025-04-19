
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ErrorPage.css'; // Import external CSS for styling

const ErrorPage = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/'); // Redirect to the home page
    };
<<<<<<< HEAD
  return (
    <div className="error-page">
        <h1>Oops! Something Went Wrong</h1>
        <p>Please try again later.</p>
        <img src="/alert.png" alt="Error"/>
        <button onClick={handleGoBack}>Go to Home</button>
    </div>
  )
}
=======
>>>>>>> 11438478f433fa6ec5e9efb6deb6c2558ffcd2ac

    return (
        <div className="error-page d-flex flex-column align-items-center justify-content-center text-center vh-100">
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
            <button className="btn btn-primary px-4 py-2" onClick={handleGoBack}>
                Go to Home
            </button>
        </div>
    );
};

export default ErrorPage;