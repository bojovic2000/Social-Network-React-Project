import React, { useEffect, useRef, useState, useCallback } from 'react';
import axios from 'axios';
import Post from '../components/post';
import PostOverlay from '../components/postOverlay';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const loadMoreRef = useRef(null);

    const fetchPosts = useCallback(async () => {
        if (loading || !hasMore) return;

        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 800));

        try {
            const response = await axios.get(`/api/posts/allposts?page=${page}&limit=5`);
            const newPosts = response.data || [];

            if (newPosts.length > 0) {
                setPosts(prev => [...prev, ...newPosts]);
                setHasMore(newPosts.length === 5);
                setPage(prev => prev + 1);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error("Error fetching posts:", error);
        } finally {
            setLoading(false);
        }
    }, [page, loading, hasMore]);

    
    const observer = useRef(null);
    const lastPostRef = useCallback(
        (node) => {
            if (loading || !hasMore) return;
            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver(
                (entries) => {
                    if (entries[0].isIntersecting) {
                        fetchPosts();
                    }
                },
                {
                    rootMargin: '100px',
                }
            );

            if (node) observer.current.observe(node);
        },
        [fetchPosts, loading, hasMore]
    );

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    const handlePostClick = (post) => {
        setSelectedPost(post);
    };

    const handleOverlayClose = () => {
        setSelectedPost(null);
    };

    return (
        <>
            <h2 className="background-content-header">Latest posts</h2>
            <div className="background-content">
                {posts.map((post, index) => (
                    <Post
                        key={post.id}
                        id={post.id}
                        full_name={post.full_name}
                        text={post.text}
                        date={new Date(post.date).toLocaleDateString()}
                        time={post.time}
                        onClick={handlePostClick}
                        ref={index === posts.length - 1 ? lastPostRef : null}
                    />
                ))}

                {loading && <p style={{ textAlign: 'center', marginTop: '1rem' }}>Loading more posts...</p>}
                {!hasMore && !loading && <p style={{ textAlign: 'center', marginTop: '1rem' }}>No more posts.</p>}
            </div>
            {selectedPost && <PostOverlay post={selectedPost} onClose={handleOverlayClose} />}
        </>
    );
};

export default Posts;
