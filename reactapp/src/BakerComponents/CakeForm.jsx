import './CakeForm.css';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import API_BASE_URL from '../apiConfig';
import BakerNavbar from './BakerNavbar';

const CakeForm = ({ mode }) => {
    const navigate = useNavigate();
    const { id } = useParams(); // Get the cake ID from the URL params

    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: '',
        quantity: '',
        cakeImage: '',
    });
    const [showPopup, setShowPopup] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [formError, setFormError] = useState('');
    const username = localStorage.getItem('username') || 'Guest'; 
    const role = localStorage.getItem('role') || 'Customer';
    useEffect(() => {
        const fetchCakeData = async () => {
            if (mode === 'edit' && id) {
                setLoading(true);
                try {
                    const response = await axios.get(`${API_BASE_URL}/cakes/${id}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    });
                    setFormData(response.data);
                } catch (error) {
                    setFormError('Error fetching cake data');
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchCakeData();
    }, [mode, id]);

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
        if (!validateForm()) return;
    
        setLoading(true);
    
        try {
            const token = localStorage.getItem('token');
            const headers = {
                Authorization: `Bearer ${token}`,
            };
    
            if (mode === 'edit') {
                await axios.put(`${API_BASE_URL}/cakes/${id}`, formData, { headers });
                setShowPopup(true);
            } else {
                await axios.post(`${API_BASE_URL}/cakes`, formData, { headers }).then((res)=>console.log(res));
                setShowPopup(true);
            }
    
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error('Error saving cake:', error);
            if (error.response && error.response.status === 400) {
                
                const errorMessage = error.response.data.message || 'Category already exists. Cannot update the cake.';
                setFormError(errorMessage);
            if (error.response && error.response.status === 400 && mode==="add") {
                const errorMessage = error.response.data.message || 'Name already exists. Cannot add the cake.';
                    setFormError(errorMessage);
                }
            } else if (error.response && error.response.status === 401) {
                localStorage.removeItem('token');
                navigate('/');
            } else {
                setFormError('An error occurred while saving the cake. Please try again.');
            }
        }
    };
   
    

    const handlePopupClose = () => {
        setShowPopup(false);
        navigate('/view-cake');
    };

    return (
        <div className="container form-container">
    <BakerNavbar username={username} role={role} />
    <div className="card mx-auto shadow form-card" style={{ maxWidth: '600px' }}>
        <div className="card-body p-4">
            <h2 className="card-title text-center mb-4">{mode === 'edit' ? 'Edit Cake' : 'Create New Cake'}</h2>
            {formError && <p className="text-danger text-center">{formError}</p>}
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
                        min="1"
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
                            style={{ width: '200px', maxHeight: '200px', objectFit: 'cover' }}
                        />
                    </div>
                )}
                <div className="d-flex justify-content-between">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => navigate(-1)}
                    >
                        Back
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                        
                    >
                        {loading ? (
                            <span className="spinner-border spinner-border-sm text-light" role="status" aria-hidden="true"></span>
                        ) : (
                            mode === 'edit' ? 'Update Cake' : 'Add Cake'
                        )}
                    </button>
                </div>
            </form>
        </div>
    </div>

{showPopup && (
    <div className="modal fade show d-block" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content shadow-sm border-0 success-modal">
                <div className="modal-header">
                    <h5 className="modal-title mx-auto">Success</h5>
                </div>
                <div className="modal-body text-center">
                    <p className="mb-0 success-message">
                        {mode === 'edit' ? 'Cake updated successfully!' : 'Cake added successfully!'}
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


