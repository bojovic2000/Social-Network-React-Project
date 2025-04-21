import React, {useEffect, useState} from 'react';
import SmallPost from '../components/smallPost';
import axios from 'axios';
import stockImage from "../components/stock_user.png"

const MyProfile = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [posts, setPosts] = useState([])
    const [profileImageUrl, setProfileImageUrl] = useState(stockImage);

    useEffect(() => {

        const getAllData = async () => {
            const user = JSON.parse(localStorage.getItem('user'));
            const response = await axios.get(`/api/posts/getuserposts/${user.id}`);
            console.log("response ", response)

            const sortedData = (response.data || []).sort((a, b) => {
                const dateTimeA = new Date(`${a.date}T${a.time}`);
                const dateTimeB = new Date(`${b.date}T${b.time}`);
                return dateTimeB - dateTimeA;
            });

            setPosts(sortedData || []);
        }

        if (user && user.image) {
            setProfileImageUrl(user.image);
        }

        getAllData();
    }, []);

    return (
        <>
            <div className="background-content">
            <h2 className='profile-header'>{user.full_name}</h2>
            <div className="profile-picture"><img src={profileImageUrl} alt="Profile" /></div>
                <div className="profile-container">
                    <div className="user-posts">
                        {posts.map((post, index) => (
                            <SmallPost key={index} text={post.text} date={new Date(post.date).toLocaleDateString()} time={post.time} />
                        ))}
                    </div>
                    <div className="user-info">
                        <div className="info-section">
                            <h3 className="info-header">Date of Birth</h3>
                            <p className="info-data">{new Date(user.dob).toLocaleDateString()}</p>
                        </div>
                        <div className="info-section">
                            <h3 className="info-header">City</h3>
                            <p className="info-data">{user.city}</p>
                        </div>
                        <div className="info-section">
                            <h3 className="info-header">Phone</h3>
                            <p className="info-data">{user.phone}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MyProfile;