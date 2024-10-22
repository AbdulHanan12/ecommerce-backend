const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', ''); 
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);    
    req.user = decoded;  
    next();  
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });  
  }
};

module.exports = auth;