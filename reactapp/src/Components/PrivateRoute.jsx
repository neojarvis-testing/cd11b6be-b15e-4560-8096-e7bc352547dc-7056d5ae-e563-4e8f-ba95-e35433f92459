import React from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // Correct import for jwtDecode

const getUserRole = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const decodedToken = jwtDecode(token);
    return decodedToken.role; // Assuming the role is stored in the 'role' field
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
};

const PrivateRoute = ({ children, requiredRole }) => {
  const role = getUserRole();

  if (!role) {
    return <Navigate to="/" replace />;
  }

  if (role !== requiredRole) {
    return (
      <div className="text-center mt-5">
        <h1 className="text-danger">Access Denied</h1>
        <p>You do not have permission to access this page.</p>
      </div>
    );
  }

  return children;
};

export default PrivateRoute;

