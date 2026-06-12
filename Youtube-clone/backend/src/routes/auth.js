import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Channel from '../models/Channel.js';

const router = express.Router();

router.post('/register', async (req, res, next) => {
  try {
    const { username, email, password, avatar } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Username, email, and password are required' });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Email or username is already taken' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword, avatar });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const channel = await Channel.findOne({ owner: user._id });
    const jwtSecret = process.env.JWT_SECRET || 'supersecretjwt';
    const token = jwt.sign({ id: user._id, username: user.username, email: user.email }, jwtSecret, { expiresIn: '7d' });
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        channelId: channel?._id || null,
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;
