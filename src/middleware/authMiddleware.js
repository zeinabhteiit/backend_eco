import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(403).json({ error: 'Token is missing' });

  jwt.verify(token, secret, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Invalid token' });

    req.user = decoded;
    next();
  });
};

// Middleware to check user roles
export const checkRole = (roles) => (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
        return res.status(403).json({ error: 'Access denied' });
    }
    next();
};
