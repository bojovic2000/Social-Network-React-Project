import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        window.location.reload();
    };

    return (
        <p onClick={handleLogout} className="logout-option">
            Log out
        </p>
    );
};

export default Logout;