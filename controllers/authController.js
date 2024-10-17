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
