import db from '../config/db.js';

export const getAllUsers = async () => {
    const [users] = await db.query('SELECT * FROM users');
    return users;
};

export const getUserById = async (id) => {
    const [user] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    return user[0];
};

export const createUser = async (username, email, password) => {
    await db.query(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [username, email, password]
    );
};

export const getUserByEmail = async (email) => {
    const [user] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return user[0];
}

export const getFriendsById = async (id) => {
    const [users] = await db.query(
        'SELECT connections.*, users.id as user_id, users.full_name FROM connections LEFT JOIN users ON (connections.usertwo_id = users.id AND connections.userone_id = ?) OR (connections.userone_id = users.id AND connections.usertwo_id = ?) WHERE (connections.userone_id = ? OR connections.usertwo_id = ?) AND connections.accepted = 1',
        [id, id, id, id]);
    return users;
}

export const updateUser = async (id, full_name, city, dob, phone) => {
    await db.query('UPDATE `users` SET `full_name`= ?,`city`= ?,`dob`= ?,`phone`= ? WHERE id = ?', [full_name, city, dob, phone, id]);
}

export const searchUsers = async (param) => {
    const term = `%${param}%`;
    
    const [users] = await db.query(
        'SELECT * FROM `users` WHERE full_name LIKE ? LIMIT 3;',
        term);

    return users;
}

export const countRequests = async (id) => {
    const count = await db.query(
        'SELECT COUNT(*) as count FROM `connections` WHERE (userone_id = ? OR usertwo_id = ?) AND accepted = 0;',
        [id, id]);
    return count;
}

