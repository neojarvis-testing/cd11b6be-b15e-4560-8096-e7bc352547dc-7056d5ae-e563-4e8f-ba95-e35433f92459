import './CustomerNavbar.css';
import React, { useState } from 'react';
import { Navbar, Nav, Dropdown, Container, Modal, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const CustomerNavbar = ({ username, role }) => {
    const navigate = useNavigate();
    const [showLogoutModal, setShowLogoutModal] = useState(false); // State to control the logout modal

    // Handle Logout Modal
    const handleLogout = () => setShowLogoutModal(true);
    const confirmLogout = () => {
        setShowLogoutModal(false); // Close the modal
        localStorage.clear(); // Clear user session
        navigate('/'); // Redirect to the login page
    };
    const cancelLogout = () => setShowLogoutModal(false); // Close the modal without logging out

    return (
        <>
            <Navbar expand="lg" className="customer-navbar fixed-top w-100">
                <Container>
                    {/* Left-Aligned Brand */}
                    <Navbar.Brand as={Link} to="/customer/home" className="cakecraft-logo">
                        <i className="bi bi-cake2"></i>
                        CakeCraft
                    </Navbar.Brand>

                    {/* Toggle for Mobile View */}
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    {/* Right-Aligned Navigation Items */}
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link as={Link} to="/home" className="mx-2">
                                Home
                            </Nav.Link>
                            <Dropdown>
                                <Dropdown.Toggle id="dropdown-basic" className="mx-2">
                                    Cakes
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => navigate('/customer-view-cake')}>View Cakes</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <Navbar.Text className="mx-2">
                                {username} / {role}
                            </Navbar.Text>
                            <Nav.Link onClick={handleLogout} className="btn btn-danger text-white mx-2">
                                Logout
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

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
        </>
    );
};

export default CustomerNavbar;