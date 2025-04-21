import db from '../config/db.js';

export const getAllPosts = async () => {
    const [posts] = await db.query('SELECT posts.*, users.full_name FROM posts LEFT JOIN users ON posts.user_id = users.id ORDER BY posts.date DESC, posts.time DESC;');
    return posts;
};

export const getFriendsPosts = async (id) => {
    console.log("fposts model: ", id)
    const [posts] = await db.query('SELECT DISTINCT posts.id, posts.*, users.full_name FROM posts JOIN connections ON posts.user_id = connections.userone_id OR posts.user_id = connections.usertwo_id JOIN users ON posts.user_id = users.id  WHERE (connections.userone_id = ? OR connections.usertwo_id = ?) AND connections.accepted = "1" AND posts.user_id != ? ORDER BY posts.date DESC, posts.time DESC;', [id, id, id]);
    return posts;
}

export const getUserPosts = async (id) => {
    const [posts] = await db.query('SELECT * FROM posts WHERE user_id = ? ORDER BY date DESC, time DESC', id);
    return posts;
}

export const searchPosts = async (param) => {
    const term = `%${param}%`;
    
    const [posts] = await db.query(
        'SELECT * FROM `posts` WHERE text LIKE ? ORDER BY date DESC, time DESC LIMIT 3;',
        term);

    console.log("users model: ", posts)
    return posts;
}

export const getCommentsByPostId = async (id) => {
    const [posts] = await db.query('SELECT posts_comments.*, users.full_name FROM `posts_comments` JOIN users ON users.id = posts_comments.user_id WHERE posts_comments.post_id = ? ORDER BY posts_comments.date DESC, posts_comments.time DESC;', id);
    return posts;
}

export const addComment = async (post_id, user_id, text) => {
    await db.query('INSERT INTO `posts_comments`(`post_id`, `user_id`, `comment`) VALUES (?,?,?)', [post_id, user_id, text]);
}