import React from 'react';
import { useNavigate } from 'react-router-dom';

const SettingsButton = () => {
    const navigate = useNavigate();

    const handleSettings = () => {
        navigate("/home/settings")
    };

    return (
        <p onClick={handleSettings} className="logout-option">
            Settings
        </p>
    );
};

export default SettingsButton;