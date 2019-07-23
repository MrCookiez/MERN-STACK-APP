const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
    // Get token
    const token = req.header('x-auth-token');
    // Check if not token
    if (!token) {
        return res.status(401).json({
            msg: 'No token, authentication denied'
        });
    }
    // Verify token
    try {
        const decode = jwt.verify(token, config.get('jwtSecret'));

        req.user = decode.user;
        next();
    } catch (err) {
        res.status(401).json({
            msg: 'Token is not valid'
        });
    }
}