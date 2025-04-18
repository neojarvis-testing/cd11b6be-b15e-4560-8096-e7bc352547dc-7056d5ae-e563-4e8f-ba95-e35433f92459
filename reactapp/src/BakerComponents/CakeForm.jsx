import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import API_BASE_URL from '../apiConfig';
import BakerNavbar from './BakerNavbar';
 
const CakeForm = ({ isEditing, initialData = {} }) => {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: '',
        quantity: '',
        cakeImage: null,
    });
    const [fileName, setFileName] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
 
    // Populate formData when editing and initialData is provided
    useEffect(() => {
        if (isEditing && initialData) {
            setFormData({
                name: initialData.name || '',
                category: initialData.category || '',
                price: initialData.price || '',
                quantity: initialData.quantity || '',
                cakeImage: initialData.cakeImage || null,
            });
        }
    }, [isEditing, initialData]);
 
    const validateForm = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.category) newErrors.category = 'Category is required';
        if (!formData.price) newErrors.price = 'Price is required';
        if (!formData.quantity) newErrors.quantity = 'Quantity is required';
        if (!formData.cakeImage) newErrors.cakeImage = 'Cake image is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
 
    const handleChange = (e) => {
        const { name, value, files } = e.target;
 
        if (files && files.length > 0) {
            const file = files[0];
            setFileName(file.name);
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    [name]: reader.result, // Store the base64-encoded image
                }));
            };
            reader.readAsDataURL(file);
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }));
        }
    };
 
    const handleSubmit = async (e) => {
        e.preventDefault();
   
        // Validate form before submission
        if (!validateForm()) return;
   
        setLoading(true);
   
        try {
            const token = localStorage.getItem('token');
            const headers = {
                Authorization: `Bearer ${token}`,
            };
   
            console.log('Payload:', formData); // Debugging: Log the payload
   
            if (isEditing) {
                // PUT request to update the cake
                const response = await axios.put(
                    `${API_BASE_URL}/cakes/${initialData.cakeId}`,
                    formData,
                    { headers }
                );
                console.log('Cake updated successfully:', response.data);
            } else {
                // POST request to create a new cake
                const response = await axios.post(
                    `${API_BASE_URL}/cakes`,
                    formData,
                    { headers }
                );
                console.log('Cake added successfully:', response.data);
            }
   
            setLoading(false);
            setShowPopup(true);
        } catch (error) {
            setLoading(false);
            console.error('Error saving cake:', error);
   
            if (error.response) {
                console.error('Error response:', error.response.data); // Log backend error details
            }
   
            if (error.response && error.response.status === 401) {
                console.error('Unauthorized: Redirecting to login');
                localStorage.removeItem('token');
                navigate('/');
            }
        }
    };
 
    const handlePopupClose = () => {
        setShowPopup(false);
        navigate('/view-cake');
    };
 
    return (
        <div className="container mt-5">
            <BakerNavbar username="DemoBaker" role="Baker" />
            <button className="btn btn-link mb-3" onClick={() => navigate(-1)}>
                Back
            </button>
            <div className="card mx-auto" style={{ maxWidth: '600px' }}>
                <div className="card-body p-4">
                    <h2 className="card-title text-center mb-4">{isEditing ? 'Edit Cake' : 'Create New Cake'}</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <label htmlFor="name">Name<span className="text-danger">*</span></label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="form-control"
                                value={formData.name}
                                onChange={handleChange}
                            />
                            {errors.name && <small className="text-danger">{errors.name}</small>}
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="category">Category<span className="text-danger">*</span></label>
                            <select
                                id="category"
                                name="category"
                                className="form-control"
                                value={formData.category}
                                onChange={handleChange}
                            >
                                <option value="">Select a category</option>
                                <option value="Cake">Cake</option>
                                <option value="Bread">Bread</option>
                                <option value="Brownie">Brownie</option>
                                <option value="Pastry">Pastry</option>
                                <option value="Cookies">Cookies</option>
                            </select>
                            {errors.category && <small className="text-danger">{errors.category}</small>}
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="price">Price<span className="text-danger">*</span></label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                className="form-control"
                                value={formData.price}
                                onChange={handleChange}
                            />
                            {errors.price && <small className="text-danger">{errors.price}</small>}
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="quantity">Quantity<span className="text-danger">*</span></label>
                            <input
                                type="number"
                                id="quantity"
                                name="quantity"
                                className="form-control"
                                value={formData.quantity}
                                onChange={handleChange}
                            />
                            {errors.quantity && <small className="text-danger">{errors.quantity}</small>}
                        </div>
                        <div className="form-group mb-4">
                            <label htmlFor="cakeImage">Cake Image<span className="text-danger">*</span></label>
                            <div className="input-group">
                                <input
                                    type="file"
                                    id="cakeImage"
                                    name="cakeImage"
                                    className="form-control"
                                    onChange={handleChange}
                                />
                            </div>
                            {errors.cakeImage && <small className="text-danger">{errors.cakeImage}</small>}
                        </div>
                        {formData.cakeImage && (
                            <div className="text-center mb-4">
                                <img
                                    src={formData.cakeImage}
                                    alt="Cake Preview"
                                    style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }}
                                />
                            </div>
                        )}
                        <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                            {loading ? (
                                <span className="spinner-border spinner-border-sm text-light" role="status" aria-hidden="true"></span>
                            ) : (
                                isEditing ? 'Update Cake' : 'Add Cake'
                            )}
                        </button>
                    </form>
                </div>
            </div>
 
            {/* Success Modal */}
            {showPopup && (
                <div className="modal fade show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content shadow-sm border-0">
                            <div className="modal-header bg-success text-white">
                                <h5 className="modal-title mx-auto">🎉 Success!</h5>
                            </div>
                            <div className="modal-body text-center">
                                <p className="mb-0">
                                    {isEditing ? 'Cake updated successfully!' : 'Cake added successfully!'}
                                </p>
                            </div>
                            <div className="modal-footer justify-content-center">
                                <button type="button" className="btn btn-success px-4" onClick={handlePopupClose}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
 
export default CakeForm;
 







