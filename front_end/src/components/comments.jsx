import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Comments = ({ postId }) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`/api/posts/comments/${postId}`);

                console.log(postId);
                console.log(response);

                setComments(response.data);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchComments();

    }, [postId]);

    const handleCommentReload = async () => {
        try {
            const response = await axios.get(`/api/posts/comments/${postId}`);

            console.log(postId);
            console.log(response);

            setComments(response.data);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    }

    if (comments.length === 0) {
        return (
            <div className="comments-section">
                <h2>Comments</h2>
                <div className="comment">
                    <p>No comments</p>
                </div>
            </div>
        );
    }

    return (
        <div className="comments-section">
            <h2>Comments</h2>
            {comments.map((comment) => (
                <div key={comment.id} className="comment">
                    <h3 className="post-title">{comment.full_name}</h3>
                    <p>{comment.comment}</p>
                    <div className="post-footer">
                        <span className="post-date">{new Date(comment.date).toLocaleDateString()}</span>
                        <span className="post-time">{comment.time}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Comments;