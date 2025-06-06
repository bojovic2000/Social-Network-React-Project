const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(403).json({ error: 'Access denied' });
    }

    try {
        const verified = jwt.verify(token, 'secret_key');
        req.user = verified;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};