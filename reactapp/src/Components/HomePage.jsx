
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './HomePage.css'; // Import external CSS
import BakerNavbar from '../BakerComponents/BakerNavbar';

const HomePage = () => {
    const username = localStorage.getItem('username') || 'Guest'; // Get the username from localStorage
    const role = localStorage.getItem('role') || 'Customer'; // Get the user's role from localStorage
    const [showLogoutModal, setShowLogoutModal] = useState(false); // State to control the logout modal

    
    const confirmLogout = () => {
        setShowLogoutModal(false); // Close the modal
        localStorage.clear(); // Clear user session
        window.location.href = '/'; // Redirect to the login page
    };
    const cancelLogout = () => setShowLogoutModal(false); // Close the modal without logging out

    return (
        <div>
            <BakerNavbar username={username} role={role} />
            {/* Image Section */}
            <div className="homepage-image-container">
                <img
                    src="/cakecraftcoverimage.jpeg"
                    alt="A beautiful cover of CakeCraft"
                    className="homepage-image"
                />
                <h1 className="homepage-title-with-background">CakeCraft</h1>
            </div>

            {/* Role-Based Welcome Message */}
            <div className="container text-center py-4">
                <h2>Welcome, {role === 'Baker' ? 'Baker' : 'Customer'}!</h2>
            </div>

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
