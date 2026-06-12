import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Channel from '../models/Channel.js';
import Video from '../models/Video.js';
import Comment from '../models/Comment.js';

dotenv.config();

const data = async () => {
  await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  await Comment.deleteMany();
  await Video.deleteMany();
  await Channel.deleteMany();
  await User.deleteMany();

  const user = await User.create({
    username: 'JohnDoe',
    email: 'john@example.com',
    password: await bcrypt.hash('Password123!', 10),
    avatar: 'https://example.com/avatar/johndoe.png',
  });

  const channel = await Channel.create({
    channelName: 'Code with John',
    owner: user._id,
    description: 'Coding tutorials and tech reviews by John Doe.',
    channelBanner: 'https://example.com/banners/john_banner.png',
    subscribers: 5200,
  });

  user.channels.push(channel._id);
  await user.save();

  const videos = await Video.create([
    {
      title: 'React Router Tutorial',
      description: 'A step-by-step guide to React Router v6.',
      category: 'Education',
      thumbnailUrl: 'https://i.ytimg.com/vi/dGcsHMXbSOA/hqdefault.jpg',
      videoUrl: 'https://www.youtube.com/embed/dGcsHMXbSOA',
      channel: channel._id,
    },
    {
      title: 'JavaScript Tips for Beginners',
      description: 'Essential JavaScript tips every beginner should know.',
      category: 'Education',
      thumbnailUrl: 'https://i.ytimg.com/vi/W6NZfCO5SIk/hqdefault.jpg',
      videoUrl: 'https://www.youtube.com/embed/W6NZfCO5SIk',
      channel: channel._id,
    },
    {
      title: 'CSS Grid Layout Explained',
      description: 'Learn CSS Grid with practical examples.',
      category: 'Technology',
      thumbnailUrl: 'https://i.ytimg.com/vi/jV8B24rSN5o/hqdefault.jpg',
      videoUrl: 'https://www.youtube.com/embed/jV8B24rSN5o',
      channel: channel._id,
    },
    {
      title: 'Top 10 Programming Productivity Hacks',
      description: 'Boost your coding workflow with these simple tricks.',
      category: 'Education',
      thumbnailUrl: 'https://i.ytimg.com/vi/V-_O7nl0Ii0/hqdefault.jpg',
      videoUrl: 'https://www.youtube.com/embed/V-_O7nl0Ii0',
      channel: channel._id,
    },
    {
      title: 'Building a JavaScript Quiz App',
      description: 'Create a quiz application using vanilla JavaScript.',
      category: 'Education',
      thumbnailUrl: 'https://i.ytimg.com/vi/riDzcEQbX6k/hqdefault.jpg',
      videoUrl: 'https://www.youtube.com/embed/riDzcEQbX6k',
      channel: channel._id,
    },
    {
      title: 'Learn React Hooks Fast',
      description: 'A beginner-friendly introduction to React hooks.',
      category: 'Education',
      thumbnailUrl: 'https://i.ytimg.com/vi/f687hBjwFcM/hqdefault.jpg',
      videoUrl: 'https://www.youtube.com/embed/f687hBjwFcM',
      channel: channel._id,
    },
    {
      title: 'Modern JavaScript Features',
      description: 'ES6+ features every developer should know.',
      category: 'Education',
      thumbnailUrl: 'https://i.ytimg.com/vi/NCwa_xi0Uuc/hqdefault.jpg',
      videoUrl: 'https://www.youtube.com/embed/NCwa_xi0Uuc',
      channel: channel._id,
    },
    {
      title: 'Responsive Web Design in 2026',
      description: 'Create responsive layouts that work on all devices.',
      category: 'Technology',
      thumbnailUrl: 'https://i.ytimg.com/vi/srvUrASNj0s/hqdefault.jpg',
      videoUrl: 'https://www.youtube.com/embed/srvUrASNj0s',
      channel: channel._id,
    },
    {
      title: 'Intro to Node.js and Express',
      description: 'Build your first API with Node.js and Express.',
      category: 'Technology',
      thumbnailUrl: 'https://i.ytimg.com/vi/L72fhGm1tfE/hqdefault.jpg',
      videoUrl: 'https://www.youtube.com/embed/L72fhGm1tfE',
      channel: channel._id,
    },
    {
      title: 'Create a Portfolio Website',
      description: 'Build a modern portfolio site using HTML, CSS, and JS.',
      category: 'Technology',
      thumbnailUrl: 'https://i.ytimg.com/vi/j3hhR4BI1EA/hqdefault.jpg',
      videoUrl: 'https://www.youtube.com/embed/j3hhR4BI1EA',
      channel: channel._id,
    },
    {
      title: 'Game Development for Beginners',
      description: 'Learn the basics of game development with simple projects.',
      category: 'Gaming',
      thumbnailUrl: 'https://i.ytimg.com/vi/FbF_olDxi1s/hqdefault.jpg',
      videoUrl: 'https://www.youtube.com/embed/FbF_olDxi1s',
      channel: channel._id,
    },
    {
      title: 'Speedrunning Tips for Gamers',
      description: 'Improve your speedrun performance with strong habits.',
      category: 'Gaming',
      thumbnailUrl: 'https://i.ytimg.com/vi/2gVYf1_rsNQ/hqdefault.jpg',
      videoUrl: 'https://www.youtube.com/embed/2gVYf1_rsNQ',
      channel: channel._id,
    },
    {
      title: 'Travel Vlog: Tokyo Highlights',
      description: 'A first-person tour of Tokyo’s most exciting spots.',
      category: 'Travel',
      thumbnailUrl: 'https://i.ytimg.com/vi/8XJsO3rf-NY/hqdefault.jpg',
      videoUrl: 'https://www.youtube.com/embed/8XJsO3rf-NY',
      channel: channel._id,
    },
    {
      title: 'Healthy Meal Prep for Busy People',
      description: 'Quick meal prep ideas to stay healthy on the go.',
      category: 'Lifestyle',
      thumbnailUrl: 'https://i.ytimg.com/vi/2pL28CcEijU/hqdefault.jpg',
      videoUrl: 'https://www.youtube.com/embed/2pL28CcEijU',
      channel: channel._id,
    },
    {
      title: 'Yoga Morning Routine',
      description: 'Start your day with this easy morning yoga flow.',
      category: 'Lifestyle',
      thumbnailUrl: 'https://i.ytimg.com/vi/v7AYKMP6rOE/hqdefault.jpg',
      videoUrl: 'https://www.youtube.com/embed/v7AYKMP6rOE',
      channel: channel._id,
    },
    {
      title: 'Mindfulness Meditation for Beginners',
      description: 'A guided meditation to calm your mind.',
      category: 'Lifestyle',
      thumbnailUrl: 'https://i.ytimg.com/vi/inpok4MKVLM/hqdefault.jpg',
      videoUrl: 'https://www.youtube.com/embed/inpok4MKVLM',
      channel: channel._id,
    },
    {
      title: 'Latest Tech News Roundup',
      description: 'What happened in tech this week.',
      category: 'News',
      thumbnailUrl: 'https://i.ytimg.com/vi/X4-miY7m-L4/hqdefault.jpg',
      videoUrl: 'https://www.youtube.com/embed/X4-miY7m-L4',
      channel: channel._id,
    },
    {
      title: 'Science Explained: Quantum Computing',
      description: 'A simple overview of quantum computing concepts.',
      category: 'Science',
      thumbnailUrl: 'https://i.ytimg.com/vi/QuR969uMICM/hqdefault.jpg',
      videoUrl: 'https://www.youtube.com/embed/QuR969uMICM',
      channel: channel._id,
    },
    {
      title: 'Street Food Tour',
      description: 'Exploring the best street food in the city.',
      category: 'Food',
      thumbnailUrl: 'https://i.ytimg.com/vi/uEu3sO1Yq-s/hqdefault.jpg',
      videoUrl: 'https://www.youtube.com/embed/uEu3sO1Yq-s',
      channel: channel._id,
    },
    {
      title: 'Guitar Lesson for Beginners',
      description: 'Learn your first chords and simple song.',
      category: 'Music',
      thumbnailUrl: 'https://i.ytimg.com/vi/2KzM0T6iQwY/hqdefault.jpg',
      videoUrl: 'https://www.youtube.com/embed/2KzM0T6iQwY',
      channel: channel._id,
    },
    {
      title: 'Productivity Setup Tour',
      description: 'See how I organize my workspace and tools.',
      category: 'Lifestyle',
      thumbnailUrl: 'https://i.ytimg.com/vi/x8dB2xQfsmM/hqdefault.jpg',
      videoUrl: 'https://www.youtube.com/embed/x8dB2xQfsmM',
      channel: channel._id,
    },
    {
      title: 'Build a Weather App with API',
      description: 'Use JavaScript to display live weather data.',
      category: 'Technology',
      thumbnailUrl: 'https://i.ytimg.com/vi/GuA0_Z1llYU/hqdefault.jpg',
      videoUrl: 'https://www.youtube.com/embed/GuA0_Z1llYU',
      channel: channel._id,
    },
    {
      title: 'Top 5 Sci-Fi Movies of the Year',
      description: 'A review of the best sci-fi films to watch.',
      category: 'Movies',
      thumbnailUrl: 'https://i.ytimg.com/vi/9KpGCCam9G4/hqdefault.jpg',
      videoUrl: 'https://www.youtube.com/embed/9KpGCCam9G4',
      channel: channel._id,
    },
    {
      title: 'Designing a Mobile App UI',
      description: 'Learn modern UI design principles for mobile apps.',
      category: 'Technology',
      thumbnailUrl: 'https://i.ytimg.com/vi/FEW1l3V7yj0/hqdefault.jpg',
      videoUrl: 'https://www.youtube.com/embed/FEW1l3V7yj0',
      channel: channel._id,
    },
    {
      title: 'Home Workout Without Equipment',
      description: 'A full-body home workout you can do anywhere.',
      category: 'Lifestyle',
      thumbnailUrl: 'https://i.ytimg.com/vi/UItWltVZZmE/hqdefault.jpg',
      videoUrl: 'https://www.youtube.com/embed/UItWltVZZmE',
      channel: channel._id,
    },
    {
      title: 'How Search Engines Work',
      description: 'Understand the basics of search and indexing.',
      category: 'Education',
      thumbnailUrl: 'https://i.ytimg.com/vi/0QfA0bEnYUU/hqdefault.jpg',
      videoUrl: 'https://www.youtube.com/embed/0QfA0bEnYUU',
      channel: channel._id,
    },
    {
      title: 'Urban Photography Tips',
      description: 'Capture better street photos with your phone.',
      category: 'Photography',
      thumbnailUrl: 'https://i.ytimg.com/vi/LE8fI5R5iRU/hqdefault.jpg',
      videoUrl: 'https://www.youtube.com/embed/LE8fI5R5iRU',
      channel: channel._id,
    },
    {
      title: 'Exploring the Night Sky',
      description: 'A beginner’s guide to stargazing.',
      category: 'Science',
      thumbnailUrl: 'https://i.ytimg.com/vi/br5N4y1VXn0/hqdefault.jpg',
      videoUrl: 'https://www.youtube.com/embed/br5N4y1VXn0',
      channel: channel._id,
    },
    {
      title: 'Python vs JavaScript in 2026',
      description: 'Compare the two most popular programming languages.',
      category: 'Technology',
      thumbnailUrl: 'https://i.ytimg.com/vi/_uQrJ0TkZlc/hqdefault.jpg',
      videoUrl: 'https://www.youtube.com/embed/_uQrJ0TkZlc',
      channel: channel._id,
    },
  ]);

  channel.videos = videos.map((video) => video._id);
  await channel.save();

  await Comment.create([
    { text: 'Great tutorial!', user: user._id, video: videos[0]._id },
    { text: 'Very helpful explanation.', user: user._id, video: videos[1]._id },
  ]);

  console.log('Seed data created');
  process.exit(0);
};

data().catch((error) => {
  console.error(error);
  process.exit(1);
});
