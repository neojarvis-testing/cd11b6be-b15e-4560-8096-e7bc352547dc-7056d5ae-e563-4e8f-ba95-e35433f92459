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
                    <h1>Welcome, Baker!</h1>

                    <p className="photo-description">
                        Unleash your dessert dreams! Dive into a world of stunning cakes, from festive celebrations to everyday indulgences. Handcrafted with love, each bite is a delight!

                    </p>
                </div>
            );
        } else {
            return (
                <div className="container text-center py-4">
                    <h2>Welcome, Customer!</h2>
                    <p className="photo-description">
                        Unleash your dessert dreams! Dive into a world of stunning cakes, from festive celebrations to everyday indulgences. Handcrafted with love, each bite is a delight!

                    </p>
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

            {/* Thought Section */}
            <div className="thought">
                <span className="thought-text">
                    Unleash your dessert dreams! Dive into a world of stunning cakes, from festive celebrations to everyday indulgences. Handcrafted with love, each bite is a delight!
                </span>
            </div>

            {/* Role-Based Content */}
            {renderRoleBasedContent()}

            {/* Footer Section */}
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