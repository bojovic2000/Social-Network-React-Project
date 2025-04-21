import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from '../components/post';

const FriendsPosts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const getAllData = async () => {
            const user = JSON.parse(localStorage.getItem('user'));
            const response = await axios.get(`/api/posts/getfriendsposts/${user.id}`);
            console.log("response ", response)


            setPosts(response.data || []);
        };
        getAllData();
    }, []);

    useEffect(() => {
        console.log("Updated posts:", posts);
    }, [posts]);

    return (
        <>
            <h2 className="background-content-header">Friends posts</h2>
            <div className="background-content">
                {posts.map(post => (
                    <Post 
                        key={post.id} 
                        full_name={post.full_name}
                        text={post.text}
                        date={new Date(post.date).toLocaleDateString()}
                        time={post.time}
                    />
                ))}
            </div>
        </>
    );
};

export default FriendsPosts;