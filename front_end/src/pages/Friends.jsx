import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import stockImage from "../components/stock_user.png"
import axios from 'axios'

const Friends = () => {
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

            while (updatedData.length < 8) {
                updatedData.push({
                    full_name: "",
                    image: ""
                });
            }
            
            setFriends(updatedData || []);
        };
        getAllData();
    }, []);

    const handleNavigate = (path) => navigate(path);

    return (
        <>
        <h2 className="background-content-header">Friends</h2>
        <div className='background-content'>
            <div className="post">
                <h3 className='post-title' onClick={() => handleNavigate('/home/friends/myfriends')}>My Friends {'>'}</h3>
                <div className='friends-preview'>
                {friends.slice(0, 8).map(friend => (
                    <div className="friend-card">
                        <img src={friend.image} alt={friend.full_name} className="friend-image" />
                        <p>{friend.full_name}</p>
                    </div>
                ))}
                </div>
            </div>

            <div className="post">
                <h3 className='post-title' onClick={() => handleNavigate('/home/friends/posts')}>Friends Posts {'>'}</h3>

            </div>
        </div>
        </>
    );
};

export default Friends;
