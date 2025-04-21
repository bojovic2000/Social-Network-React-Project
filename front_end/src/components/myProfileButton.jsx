import React from 'react';
import { useNavigate } from 'react-router-dom';

const FriendsButton = () => {
    const navigate = useNavigate();

    const handleFriends = () => {
        navigate("/home/myprofile")
    };

    return (
        <p onClick={handleFriends} className="logout-option">
            My Profile
        </p>
    );
};

export default FriendsButton;