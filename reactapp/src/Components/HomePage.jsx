

import React from 'react';
import './HomePage.css'; // Import external CSS
import BakerNavbar from '../BakerComponents/BakerNavbar';
import CustomerNavbar from '../CustomerComponents/CustomerNavbar';

const HomePage = () => {

    const username = localStorage.getItem('username') || 'Guest'; // Get the username from localStorage
    const role = localStorage.getItem('role') || 'Customer'; // Get the user's role from localStorage

    // Render Role-Based Content
    const renderRoleBasedContent = () => {
        if (role === 'Baker') {
            return (
                <div className="container text-center py-4">
                    <h2>Welcome, Baker!</h2>
                </div>
            );
        } else {
            return (
                <div className="container text-center py-4">
                    <h2>Welcome, Customer!</h2>
                </div>
            );
        }
    };


    return (
        <div>
            {/* Dynamic Navbar */}
            {role === 'Baker' ? (
                <BakerNavbar username={username} role={role} />
            ) : (
                <CustomerNavbar username={username} role={role} />
            )}

            {/* Image Section */}
            <div className="homepage-image-container">
                <img
                    src="/cakecraftcoverimage.jpeg"
                    alt="A beautiful cover of CakeCraft"
                    className="homepage-image"
                />
                <h1 className="homepage-title-with-background">CakeCraft</h1>
            </div>

            {/* Role-Based Content */}
            {renderRoleBasedContent()}

            {/* Footer Section */}
            <footer className="homepage-footer">
                <div className="container">
                    <p>Contact Us</p>
                    <p>Email: example@example.com</p>
                    <p>Phone: 123-456-7890</p>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;

