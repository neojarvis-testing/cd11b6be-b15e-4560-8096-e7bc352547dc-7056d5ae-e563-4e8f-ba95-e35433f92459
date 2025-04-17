import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CustomerViewCakes = () => {
    const [cakes, setCakes] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCakes = async () => {
            try {
                const response = await axios.get('/api/cakes');
                setCakes(response.data);
            } catch (err) {
                setError('Failed to fetch cakes');
            }
        };
        fetchCakes();
    }, []);

    return (
        <div>
            <h2>View Cakes</h2>
            {error && <p>{error}</p>}
            <ul>
                {cakes.map(cake => (
                    <li key={cake.cakeId}>
                        <h3>{cake.name}</h3>
                        <p>{cake.category}</p>
                        <p>{cake.price}</p>
                        <p>{cake.quantity}</p>
                        <img src={cake.cakeImage} alt={cake.name} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CustomerViewCakes;
