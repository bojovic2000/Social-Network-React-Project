import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomeButton = () => {
    const navigate = useNavigate();

    const handleHome = () => {
        navigate("/home/")
    };

    return (
        <p onClick={handleHome} className="logout-option">
            Home
        </p>
    );
};

export default HomeButton;