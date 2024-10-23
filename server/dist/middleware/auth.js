import jwt from 'jsonwebtoken';
export const authenticateToken = (req, res, next) => {
    // TODO: verify the token exists and add the user data to the request object
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized');
    }
    else {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, decoded) => {
            if (err || !decoded || typeof decoded === 'string') {
                return res.status(403).send('Forbidden');
            }
            req.user = decoded;
            return next();
        });
    }
    return; // Ensure all code paths return a value
};
