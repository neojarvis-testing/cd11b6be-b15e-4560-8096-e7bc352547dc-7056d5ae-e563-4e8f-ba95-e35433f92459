import React from 'react';
import './HomePage.css'; // Import external CSS

const HomePage = () => {
    return (
        <div>
            {/* Image Section */}
            <div className="homepage-image-container">
                <img
                    src="cakecraftcoverimage.jpeg"
                    alt="CakeCraft Cover"
                    className="homepage-image"
                />
                <h1 className="homepage-title-with-background">CakeCraft</h1>
            </div>

            {/* Description Section */}
            <div className="container text-center py-4">
                <p className="homepage-description">
                    Unleash your dessert dreams! Dive into a world of stunning cakes, from festive celebrations to
                    everyday indulgences. Handcrafted with love, each bite is a delight!
                </p>
            </div>

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