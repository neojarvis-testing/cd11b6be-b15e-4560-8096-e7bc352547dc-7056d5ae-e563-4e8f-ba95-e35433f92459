import React from 'react';
import './HomePage.css'; // Import external CSS
import BakerNavbar from '../BakerComponents/BakerNavbar';
import CustomerNavbar from '../CustomerComponents/CustomerNavbar';

const HomePage = () => {
    const username = localStorage.getItem('username') || 'Guest';
    const role = localStorage.getItem('role') || 'Customer';

    const renderRoleBasedContent = () => {
        if (role === 'Baker') {
            return (
                <div className="container text-center py-4">
                    <h1>Welcome, Baker!</h1>
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
            {role === 'Baker' ? (
                <BakerNavbar username={username} role={role} />
            ) : (
                <CustomerNavbar username={username} role={role} />
            )}

            <div className="homepage-image-container">
                <img
                    src="/cakecraftcoverimage.jpeg"
                    alt="A beautiful cover of CakeCraft"
                    className="homepage-image"
                />
                <h1 className="homepage-title-with-background">CakeCraft</h1>
            </div>

            <div className="thought">
                <span className="thought-text">
                    Unleash your dessert dreams! Dive into a world of stunning cakes, from festive celebrations to everyday indulgences. Handcrafted with love, each bite is a delight!
                </span>
            </div>
            {renderRoleBasedContent()}

            <footer className="homepage-footer">
                <div className="footer-container">
                    <span className="content">Contact Us</span>
                    <span className="content">Email: example@example.com</span>
                    <span className="content">Phone: 123-456-7890</span>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;