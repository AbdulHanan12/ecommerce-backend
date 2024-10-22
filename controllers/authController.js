const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Signup
exports.signup = async (req, res) => {
  try {
    // return res.json({message: "Hello World"});
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: 'User created successfullyy' });
  } catch (error) {
    res.status(400).json({ message: 'Error creating user', error });
  }
};

// Login
exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
    res.json({ "token": token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


// Logout
exports.logout = async (req, res) => {
  try {
    // Logout here
    
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Auth User
exports.authUser = async (req, res) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', ''); 
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id).select('-password'); // exclude the password from the response
    if (!req.user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json({ user: req.user });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};


// All User
exports.allUser = async (req, res) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', ''); 
    const userAuth = jwt.verify(token, process.env.JWT_SECRET_KEY);
     // Get page and limit from query parameters, or set defaults
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // Calculate skip value
    const skip = (page - 1) * limit;
    const users = await User.find().skip(skip).limit(limit); // exclude the password from the response
    const totalItems = await User.countDocuments();

    return res.status(200).json({
      page,
      limit,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      data: users,
    });
  } catch (error) {
    console.error(error.message);  // Log the specific error message
    res.status(500).json({ message: 'Server Error' });
  }
};