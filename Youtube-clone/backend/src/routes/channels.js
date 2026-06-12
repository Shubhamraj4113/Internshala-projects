import express from 'express';
import Channel from '../models/Channel.js';
import User from '../models/User.js';
import Video from '../models/Video.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authenticate, async (req, res, next) => {
  try {
    const { channelName, description, channelBanner } = req.body;
    if (!channelName) return res.status(400).json({ message: 'Channel name is required' });

    const channel = new Channel({
      channelName,
      owner: req.user.id,
      description,
      channelBanner,
    });
    await channel.save();

    await User.findByIdAndUpdate(req.user.id, { $push: { channels: channel._id } });
    res.status(201).json(channel);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const channel = await Channel.findById(req.params.id)
      .populate('owner', 'username avatar')
      .populate({ path: 'videos', select: 'title thumbnailUrl category likes dislikes videoUrl' });
    if (!channel) return res.status(404).json({ message: 'Channel not found' });
    res.json(channel);
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const channels = await Channel.find().populate('owner', 'username avatar');
    res.json(channels);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', authenticate, async (req, res, next) => {
  try {
    const channel = await Channel.findById(req.params.id);
    if (!channel) return res.status(404).json({ message: 'Channel not found' });
    if (channel.owner.toString() !== req.user.id) return res.status(403).json({ message: 'Not authorized' });

    await Video.deleteMany({ channel: channel._id });
    await channel.deleteOne();
    res.json({ message: 'Channel deleted' });
  } catch (error) {
    next(error);
  }
});

export default router;
