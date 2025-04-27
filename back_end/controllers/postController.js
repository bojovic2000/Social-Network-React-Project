import * as PostModel from '../models/postModel.js';

export const getPosts = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;

    try {
        const posts = await PostModel.getPaginatedPosts(offset, limit);
        res.json(posts);
        console.log("posts: ", posts.length)
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve posts' });
    }

};

export const getFriendsPosts = async (req, res) => {
    const { id } = req.params;
    console.log("fposts controller: ", id)

    try {
        const posts = await PostModel.getFriendsPosts(id);
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve posts' });
    }
};

export const getUserPosts = async (req, res) => {
    const { id } = req.params;

    try {
        const posts = await PostModel.getUserPosts(id);
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve posts' });
    }
};

export const searchPosts = async (req, res) => {
    const { param } = req.params;

    console.log("param: ", param)

    const posts = await PostModel.searchPosts(param);
    if (!posts) return res.status(404).json({ error: 'Failed to retrieve posts' });

    res.status(200).json(posts);
    
};

export const getComments = async (req, res) => {
    const { id } = req.params;


    const comments = await PostModel.getCommentsByPostId(id);
    if (!comments) return res.status(404).json({ error: 'Failed to retrieve posts' });

    console.log("id: ", id)
    console.log("comments: ", comments)

    res.status(200).json(comments);
    
};

export const addComment = async (req, res) => {
    const { post_id, user_id, text } = req.body;

    console.log("post_id", post_id)

    try{
        await PostModel.addComment(post_id, user_id, text);
        res.status(201).json({ message: 'Comment added.' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add comment' });
    }
    
};