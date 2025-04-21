import React, {useEffect, useState, useRef, useContext} from 'react';
import { useParams } from 'react-router-dom'; // Correct import
import SmallPost from '../components/smallPost';
import axios from 'axios';
import stockImage from "../components/stock_user.png"

const Profile = () => {
    const { friendId } = useParams();
    const [friendData, setFriendData] = useState(null);
    const [posts, setPosts] = useState([]);
    const [showMore, setShowMore] = useState(false);
    const threeDotsRef = useRef(null);
    const moreOptionsRef = useRef(null);
    const [senderMessage, setSenderMessage] = useState(null);
    const [recipientMessage, setRecipientMessage] = useState(null);
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    const [profileImageUrl, setProfileImageUrl] = useState(stockImage);

    useEffect(() => {
        const fetchFriendData = async () => {
            try {
                const responseUser = await axios.get(`/api/auth/getuser/${friendId}`);
                const responsePosts = await axios.get(`/api/posts/getuserposts/${friendId}`);
                const friend = responseUser.data

                if(friend.image){
                    setProfileImageUrl(friend.image)
                }

                setFriendData(responseUser.data.user);
                setPosts(responsePosts.data);
            } catch (error) {
                console.error('Error fetching friend data:', error);
            }
        };

        fetchFriendData();
    }, [friendId]);

    if (!friendData) {
        return <div>Loading...</div>;
    }

    const handleMouseEnter = () => {
        setShowMore(true);
    };

    const handleMouseLeave = (event) => {
        if (event.relatedTarget && moreOptionsRef.current && moreOptionsRef.current.contains(event.relatedTarget)) {
            return;
        }
        setShowMore(false);
    };

    const handleAddFriend = async () => {
        try {
            const response = await axios.post('/api/connections/addfriend', {
                userone_id: loggedInUser.id,
                usertwo_id: friendId,
            });

            if (response.status === 201) {
                setSenderMessage('Friend request sent!');
                //setRecipientMessage('You have received a friend request!');
            } else {
                setSenderMessage('Failed to send friend request.');
            }
        } catch (error) {
            console.error('Error adding friend:', error);
            setSenderMessage('Failed to send friend request.');
        }
    };

    return (
        <>
            <div className="background-content">
                <div className='profile-top-div'>
                <h2 className='profile-header'>{friendData.full_name}</h2>
                <div className="profile-picture">
                    <img src={profileImageUrl} alt="Profile" />
                </div>

                <div
                    ref={threeDotsRef}
                    className="three-dots"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    {showMore && (
                        <div
                        ref={moreOptionsRef}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        className="more-options">
                            <div className="option add-friend" onClick={handleAddFriend}>+</div>
                            <div className="option option2"></div>
                        </div>
                    )}
                    <div className="dots">...</div>
                </div>
            </div>
                <div className="profile-container">
                    <div className="user-posts">
                        {posts.map((post, index) => (
                            <SmallPost key={index} text={post.text} date={new Date(post.date).toLocaleDateString()} time={post.time} />
                        ))}
                    </div>
                    <div className="user-info">
                        <div className="info-section">
                            <h3 className="info-header">Date of Birth</h3>
                            <p className="info-data">{new Date(friendData.dob).toLocaleDateString()}</p>
                        </div>
                        <div className="info-section">
                            <h3 className="info-header">City</h3>
                            <p className="info-data">{friendData.city}</p>
                        </div>
                        <div className="info-section">
                            <h3 className="info-header">Phone</h3>
                            <p className="info-data">{friendData.phone}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;