
import './ViewCake.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import API_BASE_URL from '../apiConfig';
import BakerNavbar from './BakerNavbar';
import { useNavigate } from 'react-router-dom';

const ViewCakes = () => {
    const [cakes, setCakes] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true); // For spinner
    const [showDeleteModal, setShowDeleteModal] = useState(false); // For delete confirmation modal
    const [selectedCakeId, setSelectedCakeId] = useState(null); // Store the cake ID to delete
    const navigate = useNavigate();
    const username = localStorage.getItem('username') || 'Guest'; // Get the username from localStorage
    const role = localStorage.getItem('role') || 'Customer'; // Get the user's role from localStorage

    // Fetch cakes from API
    useEffect(() => {
        const fetchCakes = async () => {
            try {
                const token = localStorage.getItem('token'); 
                // Retrieve token from localStorage
                const response = await axios.get(`${API_BASE_URL}/cakes`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Add Authorization header
                    },
                });
                setCakes(response.data);
            } catch (err) {
                console.error('Error fetching cakes:', err);
                if (err.response && err.response.status === 401) {
                    setError('Unauthorized access. Please log in again.');
                    localStorage.removeItem('token');
                    navigate('/'); // Redirect to login page
                } else {
                    setError('Failed to fetch cakes. Please try again later.');
                }
            } finally {
                setLoading(false); // Stop loading spinner
            }
        };
        fetchCakes();
    }, [navigate]);

    // Handle Edit Button
    const handleEdit = (cake) => {
        if (!cake.cakeId) {
            alert('Invalid cake selected for editing.');
            return;
        }
        navigate(`/edit-cake/${cake.cakeId}`); // Navigate to CakeForm in "edit" mode with cake ID
    };

    const openDeleteModal = (cakeId) => {
        setSelectedCakeId(cakeId); // Set the selected cake ID
        setShowDeleteModal(true); // Show the delete confirmation modal
    };

    const closeDeleteModal = () => {
        setSelectedCakeId(null); // Clear the selected cake ID
        setShowDeleteModal(false); // Hide the delete confirmation modal
    };

    const confirmDelete = async () => {
        if (!selectedCakeId) {
            alert('Invalid cake selected for deletion.');
            return;
        }

        try {
            const token = localStorage.getItem('token'); // Retrieve token from localStorage
            await axios.delete(`${API_BASE_URL}/cakes/${selectedCakeId}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Add Authorization header
                },
            });
            setCakes(cakes.filter((cake) => cake.cakeId !== selectedCakeId)); // Remove deleted cake from state
            
        } catch (err) {
            console.error('Error deleting cake:', err);
            if (err.response && err.response.status === 401) {
                alert('Unauthorized access. Please log in again.');
                localStorage.removeItem('token');
                navigate('/'); // Redirect to login page
            } else {
                alert('Failed to delete the cake. Please try again later.');
            }
        } finally {
            closeDeleteModal(); // Close the delete confirmation modal
        }
    };

    return (
        <div className="container mt-5">
    <BakerNavbar username={username} role={role} />

    {/* Main Content */}
    <div className="table-container">
        <div className="d-flex justify-content-center align-items-center mb-2 mt-4">
            <h2 className="text-center">Cakes</h2>
        </div>

        {/* Display Error */}
        {error && <p className="text-danger text-center">{error}</p>}

        {/* Display Spinner */}
        {loading && (
            <div className="text-center">
                <div className="spinner-border text-primary mb-2" role="status" aria-hidden="true"></div>
                <div className="mt-2">Loading...</div>
            </div>
        )}

        {/* Always Render Table */}
        <table className="table table-bordered table-striped text-center">
            <thead className="thead-dark">
                <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {cakes.length === 0 && !loading && !error && (
                    <tr>
                        <td colSpan="6" className="text-center text-muted">
                            <i>Oops! No cakes found.</i>
                        </td>
                    </tr>
                )}
                {cakes.map((cake) => (
                    <tr key={cake.cakeId}>
                        <td>
                            <img
                                src={cake.cakeImage || 'https://via.placeholder.com/100'}
                                alt={cake.name || 'Cake Image'}
                                style={{ height: '50px', objectFit: 'cover' }}
                            />
                        </td>
                        <td>{cake.name}</td>
                        <td>{cake.category}</td>
                        <td>{cake.quantity}</td>
                        <td>Rs. {parseFloat(cake.price).toFixed(2)}</td>
                        <td>
                            <button
                                className="btn btn-primary btn-sm me-2"
                                onClick={() => handleEdit(cake)}
                                aria-label={`Edit ${cake.name}`}
                            >
                                Edit
                            </button>
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => openDeleteModal(cake.cakeId)}
                                aria-label={`Delete ${cake.name}`}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>

    {/* Delete Confirmation Modal */}
    {showDeleteModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content shadow-sm border-0">
                    <div className="modal-header bg-danger text-white">
                        <h5 className="modal-title mx-auto">Are you sure you want to delete this cake?</h5>
                    </div>
                    <div className="modal-footer justify-content-center">
                        <button
                            type="button"
                            className="btn btn-danger px-4"
                            onClick={confirmDelete}
                        >
                            Yes, Delete
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary px-4"
                            onClick={closeDeleteModal}
                        >
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

export default ViewCakes;