import React from 'react';
import { useNavigate } from 'react-router-dom';

const FriendsButton = () => {
    const navigate = useNavigate();

    const handleFriends = () => {
        navigate("/home/friends")
    };

    return (
        <p onClick={handleFriends} className="logout-option">
            Friends
        </p>
    );
};

export default FriendsButton;