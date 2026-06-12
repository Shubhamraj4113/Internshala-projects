import express from 'express';
import Video from '../models/Video.js';
import Channel from '../models/Channel.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const { search, category } = req.query;
    const filter = {};
    if (search) filter.title = { $regex: search, $options: 'i' };
    if (category) filter.category = category;

    const videos = await Video.find(filter).populate('channel', 'channelName');
    res.json(videos);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id).populate('channel', 'channelName owner');
    if (!video) return res.status(404).json({ message: 'Video not found' });
    res.json(video);
  } catch (error) {
    next(error);
  }
});

router.post('/', authenticate, async (req, res, next) => {
  try {
    const { title, description, category, thumbnailUrl, videoUrl, channelId } = req.body;
    if (!title || !category || !videoUrl || !channelId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const channel = await Channel.findById(channelId);
    if (!channel) return res.status(404).json({ message: 'Channel not found' });
    if (channel.owner.toString() !== req.user.id) return res.status(403).json({ message: 'Not authorized' });

    const video = new Video({ title, description, category, thumbnailUrl, videoUrl, channel: channelId });
    await video.save();
    channel.videos.push(video._id);
    await channel.save();

    res.status(201).json(video);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', authenticate, async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id).populate('channel');
    if (!video) return res.status(404).json({ message: 'Video not found' });
    if (video.channel.owner.toString() !== req.user.id) return res.status(403).json({ message: 'Not authorized' });

    const updates = req.body;
    Object.assign(video, updates);
    await video.save();
    res.json(video);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', authenticate, async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id).populate('channel');
    if (!video) return res.status(404).json({ message: 'Video not found' });
    if (video.channel.owner.toString() !== req.user.id) return res.status(403).json({ message: 'Not authorized' });

    await Channel.findByIdAndUpdate(video.channel._id, { $pull: { videos: video._id } });
    await video.deleteOne();
    res.json({ message: 'Video deleted' });
  } catch (error) {
    next(error);
  }
});

router.post('/:id/like', authenticate, async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: 'Video not found' });
    video.likes += 1;
    await video.save();
    res.json(video);
  } catch (error) {
    next(error);
  }
});

router.post('/:id/dislike', authenticate, async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: 'Video not found' });
    video.dislikes += 1;
    await video.save();
    res.json(video);
  } catch (error) {
    next(error);
  }
});

export default router;
