import React, { useState, useRef } from 'react';
import Comments from './comments';
import NewComment from './newComment';

const PostOverlay = ({ post, onClose }) => {
    const [showCommentForm, setShowCommentForm] = useState(false);
    const [commentReloadTrigger, setCommentReloadTrigger] = useState(0);
    const commentsRef = useRef(null);

    const handleAddCommentClick = () => {
        setShowCommentForm(true);
        requestAnimationFrame(() => {
            if (commentsRef.current) {
                commentsRef.current.scrollTop = commentsRef.current.scrollHeight;
            }
        });
    };

    const handleCommentReload = () => {
        setShowCommentForm(false);
        setCommentReloadTrigger(prev => prev + 1);
    };


    return (
        <div className="post-overlay" onClick={onClose}>
            <div className="post-overlay-content" onClick={(e) => e.stopPropagation()}>
                <div className="post-overlay-post">
                    <h3 className="post-title">{post.full_name}</h3>
                    <p>{post.text}</p>
                    <div className="post-footer">
                        <span className="post-date">{new Date(post.date).toLocaleDateString()}</span>
                        <span className="post-time">{post.time}</span>
                    </div>
                </div>
                <div className="post-overlay-comments" ref={commentsRef}>
                    <Comments postId={post.id} key={commentReloadTrigger}/>
                    {showCommentForm && (
                        <NewComment  postId={post.id} onAddedComment={handleCommentReload}/>
                    )}
                </div>
                <div className="add-comment-button" onClick={handleAddCommentClick}>
                    +
                </div>
            </div>
        </div>
    );
};

export default PostOverlay;