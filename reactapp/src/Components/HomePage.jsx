
import React from 'react';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import './HomePage.css'; // Import external CSS

const HomePage = () => {
    const username = localStorage.getItem('username') || 'Guest'; // Get the username from localStorage
    const role = localStorage.getItem('role') || 'Customer'; // Get the user's role from localStorage
    const navigate = useNavigate();
    const [showLogoutModal, setShowLogoutModal] = useState(false); // State to control the logout modal

    const handleLogout = () => setShowLogoutModal(true); // Show the logout confirmation modal
    const confirmLogout = () => {
        setShowLogoutModal(false); // Close the modal
        localStorage.clear(); // Clear user session
        navigate('/'); // Redirect to the login page
    };
    const cancelLogout = () => setShowLogoutModal(false); // Close the modal without logging out

    return (
        <div>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="/home">
                    CakeCraft
                </a>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ms-auto"> {/* Align items to the right */}
                        <li className="nav-item">
                            <span className="nav-link">
                                {username} / {role}
                            </span>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-danger" onClick={handleLogout}>
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>

            {/* Image Section */}
            <div className="homepage-image-container">
                <img
                    src="/cakecraftcoverimage.jpeg"
                    alt="A beautiful cover image of CakeCraft"
                    className="homepage-image"
                />
                <h1 className="homepage-title-with-background">CakeCraft</h1>
            </div>

            {/* Role-Based Content */}
            {role === 'Baker' ? (
                <div className="container text-center py-4">
                    <h2>Welcome, Baker!</h2>
                    <div className="mt-4">
                        <button
                            className="btn btn-primary mx-2"
                            onClick={() => navigate('/add-cake')}
                        >
                            Add Cake
                        </button>
                        <button
                            className="btn btn-secondary mx-2"
                            onClick={() => navigate('/view-cake')}
                        >
                            View Cakes
                        </button>
                    </div>
                </div>
            ) : (
                <div className="container text-center py-4">
                    <h2>Welcome, Customer!</h2>
                    <div className="mt-4">
                        <button
                            className="btn btn-secondary"
                            onClick={() => navigate('/customer-view-cake')}
                        >
                            View Cakes
                        </button>
                    </div>
                </div>
            )}

            {/* Footer Section */}
            <footer className="homepage-footer">
                <div className="container">
                    <p>Contact Us</p>
                    <p>Email: example@example.com</p>
                    <p>Phone: 123-456-7890</p>
                </div>
            </footer>

            {/* Logout Confirmation Modal */}
            <Modal show={showLogoutModal} onHide={cancelLogout} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Logout</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to logout?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={cancelLogout}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={confirmLogout}>
                        Yes, Logout
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default HomePage;
