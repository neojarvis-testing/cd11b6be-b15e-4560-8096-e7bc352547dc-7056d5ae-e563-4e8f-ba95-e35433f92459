import React, { useState } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './BakerNavbar.css';

const BakerNavbar = ({ username, role }) => {
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => setShowLogoutModal(true); // Show the logout confirmation modal
    const confirmLogout = () => {
        setShowLogoutModal(false); // Close the modal
        localStorage.clear(); // Clear user session
        navigate('/'); // Redirect to login page
    };
    const cancelLogout = () => setShowLogoutModal(false); // Close the modal without logging out

    return (
        <div>
            {/* Navigation Bar */}
            <Navbar expand="lg" className="baker-navbar fixed-top w-100" style={{ background: 'linear-gradient(to right, #8e44ad, #c0392b)', color: 'white' }}>
                <Container>
                    <Navbar.Brand as={Link} to="/home" className="text-white">
                        CakeCraft
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/home" className="text-white">
                                Home
                            </Nav.Link>
                            {role === 'Baker' && (
                                <>
                                    <Button
                                        variant="primary"
                                        className="mx-2"
                                        onClick={() => navigate('/add-cake')}
                                    >
                                        Add Cake
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        className="mx-2"
                                        onClick={() => navigate('/view-cake')}
                                    >
                                        View Cakes
                                    </Button>
                                </>
                            )}
                            {role === 'Customer' && (
                                <Button
                                    variant="secondary"
                                    className="mx-2"
                                    onClick={() => navigate('/customer-view-cake')}
                                >
                                    View Cakes
                                </Button>
                            )}
                        </Nav>
                        <Nav>
                            <Navbar.Text className="me-3 text-white">
                                {username} / {role}
                            </Navbar.Text>
                            <Nav.Link onClick={handleLogout} className="btn btn-danger text-white">
                                Logout
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>


            {/* Logout Confirmation Modal */}
            {showLogoutModal && (
                <div className="modal show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirm Logout</h5>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to logout?</p>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-danger" onClick={confirmLogout}>
                                    Yes, Logout
                                </button>
                                <button className="btn btn-secondary" onClick={cancelLogout}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BakerNavbar;