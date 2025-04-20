import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import './ErrorPage.css';

const PrivateRoute = ({ children, requiredRole }) => {
  const role = localStorage.getItem('role');

  if (!role) {
    return <Navigate to="/" replace />;
  }
<<<<<<< HEAD

=======
>>>>>>> 7c7c75f6bf3f531288b5b09cc70b5c92e31a2fb3
  if (role !== requiredRole) {
    return (
      <div className="private-route-container d-flex flex-column justify-content-center align-items-center">
        <h1 className="text-danger">Access Denied</h1>
        <p>You do not have permission to access this page.</p>
        <Link to="/home" className="home-page">
          Go to Home
        </Link>
      </div>
    );
  }

  return children;
};

export default PrivateRoute;

