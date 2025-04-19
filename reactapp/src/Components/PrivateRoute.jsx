<<<<<<< HEAD
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ allowedRoles }) => {
    const userRole = localStorage.getItem("userRole");

    return allowedRoles.includes(userRole) ? <Outlet /> : <Navigate to="/unauthorized" />;
};

export default PrivateRoute;
=======
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

  // If no role is found, redirect to login
  if (!role) {
    return <Navigate to="/" replace />;
  }

  // If the user's role does not match the required role, show "Access Denied"
  if (role !== requiredRole) {
    return (
      <div className="text-center mt-5">
        <h1 className="text-danger">Access Denied</h1>
        <p>You do not have permission to access this page.</p>
      </div>
    );
  }

  // If the role matches, render the children
  return children;
};

export default PrivateRoute;
>>>>>>> 11438478f433fa6ec5e9efb6deb6c2558ffcd2ac
