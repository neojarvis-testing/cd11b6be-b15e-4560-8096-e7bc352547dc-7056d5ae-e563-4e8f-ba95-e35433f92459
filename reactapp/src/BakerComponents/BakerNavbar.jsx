

import React, { useState } from 'react';
import { Navbar, Nav, Dropdown, Container, Modal, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const BakerNavbar = ({ username, role }) => {
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
            <Navbar expand="lg" className="baker-navbar fixed-top w-100" style={{ background: 'linear-gradient(to right, #8e44ad, #c0392b)', color: 'white' }}>
                <Container>
                    {/* Left-Aligned Brand */}
                    <Navbar.Brand as={Link} to="/home" className="text-white">
                        CakeCraft
                    </Navbar.Brand>

                    {/* Toggle for Mobile View */}
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    {/* Right-Aligned Navigation Items */}
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link as={Link} to="/home" className="text-white mx-2">
                                Home
                            </Nav.Link>
                            <Dropdown>
                                <Dropdown.Toggle variant="primary" id="dropdown-basic" className="mx-2">
                                    Cakes
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item as={Link} to="/add-cake">Add Cake</Dropdown.Item>
                                    <Dropdown.Item as={Link} to="/view-cake">View Cakes</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <Navbar.Text className="text-white mx-2">
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

export default BakerNavbar;


