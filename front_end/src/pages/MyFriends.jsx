import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import stockImage from "../components/stock_user.png"
import axios from 'axios';

const MyFriends = () => {
    const navigate = useNavigate();
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        const getAllData = async () => {
            const user = JSON.parse(localStorage.getItem('user'));
            if (!user || !user.id) {
                console.error("User ID not found in localStorage");
                return;
            }
            const response = await axios.get(`/api/auth/getfriends/${user.id}`);
            console.log("response ", response)

            const updatedData = response.data.map(friend => ({
                ...friend,
                image: friend.image ? friend.image : stockImage
            }));

            
            
            setFriends(updatedData || []);
        };
        getAllData();
    }, []);

    const handleFriendClick = (friendId) => {
        navigate(`/home/profile/${friendId}`);
    };


    return (
        <>
            <h2 className="background-content-header">My Friends</h2>
            <div className="friends-grid">
                {friends.map((friend, index) => (
                    <div onClick={() => handleFriendClick(friend.user_id)} key={friend.id} className="friend-card-big">
                        <img src={friend.image || '/default-avatar.png'} alt={friend.full_name} />
                        <p>{friend.full_name}</p>
                    </div>
                ))}
            </div>
        </>
    );
};

export default MyFriends;
