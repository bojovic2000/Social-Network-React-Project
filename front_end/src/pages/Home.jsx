import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import Posts from './Posts';
import Friends from './Friends';
import MyFriends from './MyFriends';
import FriendsPosts from './FriendsPosts';
import MyProfile from './MyProfile';
import Settings from './Settings';
import Profile from './Profile';
import axios from 'axios';

const Home = () => {
    const location = useLocation();
    const [hasUnacceptedRequests, setHasUnacceptedRequests] = useState(false);
    

    useEffect(() => {
        const fetchUnacceptedRequests = async () => {
            const user = JSON.parse(localStorage.getItem('user'));
            const userId = user.id
            try {
                const response = await axios.get(`/api/auth/countrequests/${userId}`);
                console.log("count ", response.data[0][0].count);
                if(response.data[0][0].count > 0){
                    setHasUnacceptedRequests(true);
                }else{
                    setHasUnacceptedRequests(false);
                }
                
            } catch (error) {
                console.error('Error fetching unaccepted requests:', error);
            }
        };

        fetchUnacceptedRequests();
    }, [location]);

    return (
        <div className="login-container">
            <Header hasUnacceptedRequests={hasUnacceptedRequests} isAuthenticated={true}/>
            <div className="content-area">
                <Sidebar isAuthenticated={true}/>
                <div className="background">
                <Routes>
                    <Route path="/" element={<Posts />} />  {/* Default to posts */}
                    <Route path="posts" element={<Posts />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="friends" element={<Friends />} />
                    <Route path="friends/myfriends" element={<MyFriends />} />
                    <Route path="friends/posts" element={<FriendsPosts/>} />
                    <Route path="profile/:friendId" element={<Profile />} />
                    <Route path="myprofile" element={<MyProfile/>} />
                    <Route path="*" element={<Navigate to="/" />} />  {/* Redirect unknown routes */}
                </Routes>
                </div>
            </div>
        </div>
    );
};

export default Home;