import express from 'express';
import Comment from '../models/Comment.js';
import Video from '../models/Video.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/:videoId', async (req, res, next) => {
  try {
    const comments = await Comment.find({ video: req.params.videoId }).populate('user', 'username avatar');
    res.json(comments);
  } catch (error) {
    next(error);
  }
});

router.post('/:videoId', authenticate, async (req, res, next) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ message: 'Comment text is required' });

    const video = await Video.findById(req.params.videoId);
    if (!video) return res.status(404).json({ message: 'Video not found' });

    const comment = new Comment({ text, user: req.user.id, video: req.params.videoId });
    await comment.save();
    video.commentsCount += 1;
    await video.save();

    res.status(201).json(await comment.populate('user', 'username avatar'));
  } catch (error) {
    next(error);
  }
});

router.put('/:id', authenticate, async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });
    if (comment.user.toString() !== req.user.id) return res.status(403).json({ message: 'Not authorized' });

    comment.text = req.body.text || comment.text;
    await comment.save();
    res.json(comment);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', authenticate, async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });
    if (comment.user.toString() !== req.user.id) return res.status(403).json({ message: 'Not authorized' });

    await Video.findByIdAndUpdate(comment.video, { $inc: { commentsCount: -1 } });
    await comment.deleteOne();
    res.json({ message: 'Comment deleted' });
  } catch (error) {
    next(error);
  }
});

export default router;
