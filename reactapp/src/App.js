import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Components/HomePage';
import Login from './Components/Login';
import Signup from './Components/Signup';
import CakeForm from './BakerComponents/CakeForm';
import ViewCake from './BakerComponents/ViewCake';
import CustomerViewCake from './CustomerComponents/CustomerViewCake';
import ErrorPage from './Components/ErrorPage';
import PrivateRoute from './Components/PrivateRoute';

const App = () => {
  return (
    <Router>
      <Routes>
       
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<HomePage />} />

       
        <Route
          path="/add-cake"
          element={
            <PrivateRoute requiredRole="Baker">
              <CakeForm mode="add" />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-cake/:id"
          element={
            <PrivateRoute requiredRole="Baker">
              <CakeForm mode="edit" />
            </PrivateRoute>
          }
        />
        <Route
          path="/view-cake"
          element={
            <PrivateRoute requiredRole="Baker">
              <ViewCake />
            </PrivateRoute>
          }
        />

        
        <Route
          path="/customer-view-cake"
          element={
            <PrivateRoute requiredRole="Customer">
              <CustomerViewCake />
            </PrivateRoute>
          }
        />

        
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

export default App;