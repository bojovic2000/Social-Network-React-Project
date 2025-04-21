import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewComment = ({ postId, onAddedComment}) => {
    const [text, setText] = useState('');
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user.id

    const handleNewComment = async () =>{
        const response = await axios.post('/api/posts/addcomment', {
            post_id: postId,
            user_id: userId,
            text: text,
        });

        if(response.status=="201"){
            onAddedComment()
        }
    }

    return (
        <div className="new-comment">
            <form>
                <input type="text" placeholder="Add your comment..." value={text} onChange={(e) => setText(e.target.value)}/>
            </form>
            <button type="submit" onClick={handleNewComment}>Save</button>
        </div>
    );
};

export default NewComment;