import * as UserModel from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import fs from 'fs';
import path from 'path';

export const getUsers = async (req, res) => {
    try {
        const users = await UserModel.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve users' });
    }
};

export const getUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await UserModel.getUserById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        res.json({user, image: fileExists(user.id)});
    } catch (error) {
        res.status(500).json({ error: 'Error fetching user' });
    }
};

export const addUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        await UserModel.createUser(username, email, password);
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await UserModel.getUserByEmail(email);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id }, 'secret_key', { expiresIn: '24h' });
    const { password: _, ...safeUser } = user;

    res.status(200).json({ token, user: { ...safeUser, image: fileExists(user.id) } });
};

export const getFriends = async (req, res) => {
    const { id } = req.params;  

    const users = await UserModel.getFriendsById(id);
    if (!users) return res.status(404).json({ message: 'Friends not found.' });

    const usersWithImages = users.map(user => {
        return { ...user, image: fileExists(user.user_id) };
    });

    res.status(200).json(usersWithImages);
};

export const updateUser = async (req, res) => {
    const { id, full_name, city, dob, phone } = req.body;

    console.log("id: ", id)
    console.log("dob: ", dob)

    try{
        await UserModel.updateUser(id, full_name, city, dob, phone);
        res.status(201).json({ message: 'Settings saved succesfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save settings.' });
    }
    
};

export const searchUsers = async (req, res) => {
    const { param } = req.params;

    console.log("param: ", param)

    const users = await UserModel.searchUsers(param);
    if (!users) return res.status(404).json({ message: 'Users not found.' });

    res.status(200).json(users);
    
};

export const countRequests = async (req, res) => {
    const { id } = req.params;


    const count = await UserModel.countRequests(id);
    //if (!users) return res.status(404).json({ message: 'Users not found.' });

    res.status(200).json(count);
    
};

function fileExists(id) {
    const imagePath = `/uploads/${id}.jpg`;
    const fullPath = path.join(process.cwd(), imagePath);

    if (fs.existsSync(fullPath)){
        console.log("full path ", fullPath)
        console.log("image path ", imagePath)
        return imagePath;
    } else {
        return null;
    }
  }