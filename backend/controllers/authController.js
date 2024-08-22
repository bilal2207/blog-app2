const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const CustomError = require('../errors/customError');

const register = async (req, res, next) => {
  try {
    
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    
    if (user) {
      throw new CustomError('User already exists', 400);
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance without using await
    user = new User({ name, email, password: hashedPassword });

    // Save the new user instance
    await user.save();

    console.log("User registration successful");
    const payload = { user: { id: user.id } };
    
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      throw new CustomError('Invalid credentials', 400);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new CustomError('Invalid credentials', 400);
    }

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login };
