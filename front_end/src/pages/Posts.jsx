import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from '../components/post';
import PostOverlay from '../components/postOverlay';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);

    useEffect(() => {
        const getAllData = async () => {
            try {
                const response = await axios.get('/api/posts/allposts');
                console.log("response ", response);

                setPosts(response.data || []);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };
        getAllData();
    }, []);

    const handlePostClick = (post) => {
        setSelectedPost(post);
    };

    const handleOverlayClose = () => {
        setSelectedPost(null);
    };

    useEffect(() => {
        console.log("Updated posts:", posts);
    }, [posts]);

    return (
        <>
            <h2 className="background-content-header">Latest posts</h2>
            <div className="background-content">
                {posts.map(post => (
                    <Post 
                        key={post.id}
                        id={post.id}
                        full_name={post.full_name}
                        text={post.text}
                        date={new Date(post.date).toLocaleDateString()}
                        time={post.time}
                        onClick={handlePostClick}
                    />
                ))}
            </div>
            {selectedPost && <PostOverlay post={selectedPost} onClose={handleOverlayClose} />}
        </>
    );
};

export default Posts;