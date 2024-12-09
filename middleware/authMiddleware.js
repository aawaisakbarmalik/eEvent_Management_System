const jwt = require('jsonwebtoken');

// Secret key used for signing the JWT
const JWT_SECRET_KEY = 'your-secret-key';  // Make sure to use a secure and unique key

const authMiddleware = (req, res, next) => {
    // Get token from request header (Authorization: Bearer <token>)
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Access denied, no token provided.' });
    }

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, JWT_SECRET_KEY);
        
        // Attach the user data (decoded token) to the request object
        req.user = decoded;

        // Move to the next middleware or route handler
        next();
    } catch (error) {
        return res.status(400).json({ message: 'Invalid token', error: error.message });
    }
};

module.exports = authMiddleware;
