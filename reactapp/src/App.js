
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BakerNavbar from './BakerComponents/BakerNavbar';
import CakeForm from './BakerComponents/CakeForm';
import ViewCake from './BakerComponents/ViewCake';
import ErrorPage from './Components/ErrorPage';
import HomePage from './Components/HomePage';
import Login from './Components/Login';
import Signup from './Components/Signup';
import CustomerNavbar from './CustomerComponents/CustomerNavbar';
import CustomerViewCake from './CustomerComponents/CustomerViewCake';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<HomePage />} />

          {/* Baker Routes */}
          <Route path="/baker-navbar" element={<BakerNavbar username="BakerUser" role="Baker" />} />
          <Route path="/add-cake" element={<CakeForm isEditing={false}  />} />
          <Route path="/edit-cake" element={<CakeForm isEditing={true} initialData={JSON.parse(localStorage.getItem('selectedCake')) || {}}/>}/>
          <Route path="/view-cake" element={<ViewCake />} />

          {/* Customer Routes */}
          <Route path="/customer-navbar" element={<CustomerNavbar username="CustomerUser" role="Customer" />} />
          <Route path="/customer-view-cake" element={<CustomerViewCake />} />

          {/* Fallback Route */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
