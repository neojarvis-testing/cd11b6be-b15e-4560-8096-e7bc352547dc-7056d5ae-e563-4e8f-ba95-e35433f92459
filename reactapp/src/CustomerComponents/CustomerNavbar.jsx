import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './CustomerNavbar.css';

const CustomerNavbar = ({ username, role }) => {
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => setShowLogoutModal(true);
    const confirmLogout = () => {
        setShowLogoutModal(false);
        navigate('/');
    };
    const cancelLogout = () => setShowLogoutModal(false);

    return (
        <div>
            {/* Navigation Bar */}
            <Navbar expand="lg" className="customer-navbar">
                <Container>
                    <Navbar.Brand as={Link} to="/customer/home" className="text-white">
                        CakeCraft
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/customer/home" className="text-white">
                                Home
                            </Nav.Link>
                            <NavDropdown title="Cakes" id="basic-nav-dropdown" className="text-white">
                                <NavDropdown.Item as={Link} to="/customer/viewcakes">View Cakes</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/customer/orders">Your Orders</NavDropdown.Item>
                            </NavDropdown>
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

            {/* Main Content */}
            <div className="main-content">
                {/* Image Section */}
                <div className="image-container">
                    <img
                        src="cakecraftcoverimage.jpeg"
                        alt="CakeCraft Cover"
                        className="cover-image"
                    />
                    <div className="image-overlay">
                        <h1 className="image-title">CakeCraft</h1>
                    </div>
                </div>

                {/* Description Section */}
                <div className="description-container">
                    <p className="description-text">
                        Explore a delicious selection of cakes crafted just for you! Order your favorites and enjoy a 
                        delightful experience with CakeCraft.
                    </p>
                </div>
            </div>

            {/* Footer */}
            <footer className="footer">
                <Container>
                    <p>Contact Us</p>
                    <p>Email: example@example.com</p>
                    <p>Phone: 123-456-7890</p>
                </Container>
            </footer>

            {/* Logout Confirmation Modal */}
            {showLogoutModal && (
                <div className="modal show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
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

export default CustomerNavbar;
