import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  category: { type: String, required: true, trim: true },
  thumbnailUrl: { type: String, default: '' },
  videoUrl: { type: String, required: true },
  channel: { type: mongoose.Schema.Types.ObjectId, ref: 'Channel', required: true },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  commentsCount: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('Video', videoSchema);
