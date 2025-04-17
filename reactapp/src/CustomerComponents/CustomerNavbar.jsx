import React from 'react';
import { Link } from 'react-router-dom';

const CustomerNavbar = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/customer/home">Home</Link></li>
                <li><Link to="/customer/view-cakes">View Cakes</Link></li>
                <li><Link to="/logout">Logout</Link></li>
            </ul>
        </nav>
    );
};

export default CustomerNavbar;
