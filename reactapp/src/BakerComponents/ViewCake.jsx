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
    const navigate = useNavigate();
 
    // Fetch cakes from API
    useEffect(() => {
        const fetchCakes = async () => {
            try {
                const token = localStorage.getItem('token'); // Retrieve token from localStorage
                const response = await axios.get(`${API_BASE_URL}/cakes`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Add Authorization header
                    },
                });
                setCakes(response.data);
            } catch (err) {
                console.error('Error fetching cakes:', err);
                setError('Failed to fetch cakes. Please try again later.');
            } finally {
                setLoading(false); // Stop loading spinner
            }
        };
        fetchCakes();
    }, []);
 
    // Handle Edit Button
    const handleEdit = (cake) => {
        console.log('Selected Cake:', cake); // Debugging: Check the selected cake
    localStorage.setItem('selectedCake', JSON.stringify(cake));
    navigate('/edit-cake', { state: { cake } }); // Pass the selected cake details via state
};
 
    // Handle Delete Button
    const handleDelete = async (cakeId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this cake?');
        if (confirmDelete) {
            try {
                const token = localStorage.getItem('token'); // Retrieve token from localStorage
                console.log('Token:', token);
                await axios.delete(`${API_BASE_URL}/cakes/${cakeId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Add Authorization header
                    },
                });
                setCakes(cakes.filter((cake) => cake.cakeId !== cakeId)); // Remove deleted cake from state
                alert('Cake deleted successfully!');
            } catch (err) {
                console.error('Error deleting cake:', err);
                alert('Failed to delete the cake. Please try again later.');
            }
        }
    };
 
    return (
        <div className="container mt-5">
            <BakerNavbar />
            <h2 className="text-center mb-4">Cakes</h2>
 
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
                                No cakes found.
                            </td>
                        </tr>
                    )}
                    {cakes.map((cake) => (
                        <tr key={cake.cakeId}>
                            <td>
                                <img
                                    src={cake.cakeImage || 'https://via.placeholder.com/100'}
                                    alt={cake.name}
                                    style={{ height: '50px', objectFit: 'cover' }}
                                />
                            </td>
                            <td>{cake.name}</td>
                            <td>{cake.category}</td>
                            <td>{cake.quantity}</td>
                            <td>Rs. {cake.price.toFixed(2)}</td>
                            <td>
                            <button
                                className="btn btn-primary btn-sm me-2"
                                onClick={() => handleEdit(cake)}
                            >
                                Edit
                            </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(cake.cakeId)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
 
export default ViewCakes;
 