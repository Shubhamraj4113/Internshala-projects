import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import api from '../api/api.js';

const categories = ['All', 'Education', 'Music', 'Technology', 'Gaming', 'Lifestyle', 'News'];

const sampleVideos = [
  {
    _id: 'video01',
    title: 'React in 10 Minutes',
    category: 'Education',
    thumbnailUrl: 'https://i.ytimg.com/vi/dGcsHMXbSOA/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/dGcsHMXbSOA',
    channel: { channelName: 'Tech Academy' },
    views: '1.2M views',
    uploaded: '2 days ago',
  },
  {
    _id: 'video02',
    title: 'Build a Responsive UI with CSS Grid',
    category: 'Technology',
    thumbnailUrl: 'https://i.ytimg.com/vi/7kVeCqQCxlk/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/7kVeCqQCxlk',
    channel: { channelName: 'Design Daily' },
    views: '932K views',
    uploaded: '1 week ago',
  },
  {
    _id: 'video03',
    title: 'JavaScript Best Practices 2026',
    category: 'Education',
    thumbnailUrl: 'https://i.ytimg.com/vi/PoRJizFvM7s/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/PoRJizFvM7s',
    channel: { channelName: 'Code Lab' },
    views: '680K views',
    uploaded: '3 days ago',
  },
  {
    _id: 'video04',
    title: 'Top 10 Gaming Highlights',
    category: 'Gaming',
    thumbnailUrl: 'https://i.ytimg.com/vi/4yM5Tov7uH0/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/4yM5Tov7uH0',
    channel: { channelName: 'GameSpot' },
    views: '2.5M views',
    uploaded: '4 days ago',
  },
  {
    _id: 'video05',
    title: 'Music Mix 2026',
    category: 'Music',
    thumbnailUrl: 'https://i.ytimg.com/vi/SlPhMPnQ58k/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/SlPhMPnQ58k',
    channel: { channelName: 'Hot Beats' },
    views: '4.1M views',
    uploaded: '1 week ago',
  },
  {
    _id: 'video06',
    title: 'Healthy Morning Routine',
    category: 'Lifestyle',
    thumbnailUrl: 'https://i.ytimg.com/vi/6GfI6dI0zO8/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/6GfI6dI0zO8',
    channel: { channelName: 'Wellness Life' },
    views: '318K views',
    uploaded: '2 days ago',
  },
  {
    _id: 'video07',
    title: 'Latest Tech News Review',
    category: 'News',
    thumbnailUrl: 'https://i.ytimg.com/vi/ARoVNU9cfMU/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/ARoVNU9cfMU',
    channel: { channelName: 'Daily Update' },
    views: '147K views',
    uploaded: '12 hours ago',
  },
  {
    _id: 'video08',
    title: 'CSS Animations for Beginners',
    category: 'Education',
    thumbnailUrl: 'https://i.ytimg.com/vi/yr6D1c9rt7c/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/yr6D1c9rt7c',
    channel: { channelName: 'Coder Mo' },
    views: '510K views',
    uploaded: '5 days ago',
  },
  {
    _id: 'video09',
    title: 'Epic Drone Footage',
    category: 'Lifestyle',
    thumbnailUrl: 'https://i.ytimg.com/vi/JMUxmLyrhSk/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/JMUxmLyrhSk',
    channel: { channelName: 'Sky View' },
    views: '1.9M views',
    uploaded: '1 week ago',
  },
  {
    _id: 'video10',
    title: 'Fullstack App in One Hour',
    category: 'Technology',
    thumbnailUrl: 'https://i.ytimg.com/vi/4wGmgc99700/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/4wGmgc99700',
    channel: { channelName: 'Dev Journey' },
    views: '755K views',
    uploaded: '3 days ago',
  },
  {
    _id: 'video11',
    title: 'Python for Beginners',
    category: 'Education',
    thumbnailUrl: 'https://i.ytimg.com/vi/_uQrJ0TkZlc/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/_uQrJ0TkZlc',
    channel: { channelName: 'Python Academy' },
    views: '1.1M views',
    uploaded: '6 days ago',
  },
  {
    _id: 'video12',
    title: 'Mobile App UI Design Tips',
    category: 'Technology',
    thumbnailUrl: 'https://i.ytimg.com/vi/FEW1l3V7yj0/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/FEW1l3V7yj0',
    channel: { channelName: 'UI Craft' },
    views: '845K views',
    uploaded: '4 days ago',
  },
  {
    _id: 'video13',
    title: '5-Minute Guitar Chords',
    category: 'Music',
    thumbnailUrl: 'https://i.ytimg.com/vi/2KzM0T6iQwY/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/2KzM0T6iQwY',
    channel: { channelName: 'String Beats' },
    views: '659K views',
    uploaded: '2 days ago',
  },
  {
    _id: 'video14',
    title: 'Street Food Tour in Bangkok',
    category: 'Food',
    thumbnailUrl: 'https://i.ytimg.com/vi/uEu3sO1Yq-s/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/uEu3sO1Yq-s',
    channel: { channelName: 'Taste Trails' },
    views: '1.3M views',
    uploaded: '1 week ago',
  },
  {
    _id: 'video15',
    title: 'Beginner Yoga Flow',
    category: 'Lifestyle',
    thumbnailUrl: 'https://i.ytimg.com/vi/v7AYKMP6rOE/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/v7AYKMP6rOE',
    channel: { channelName: 'Calm Motion' },
    views: '512K views',
    uploaded: '5 days ago',
  },
  {
    _id: 'video16',
    title: 'Top 10 Machine Learning Projects',
    category: 'Technology',
    thumbnailUrl: 'https://i.ytimg.com/vi/ukzFI9rgwfU/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/ukzFI9rgwfU',
    channel: { channelName: 'ML World' },
    views: '777K views',
    uploaded: '3 days ago',
  },
  {
    _id: 'video17',
    title: 'Productivity Workspace Tour',
    category: 'Lifestyle',
    thumbnailUrl: 'https://i.ytimg.com/vi/x8dB2xQfsmM/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/x8dB2xQfsmM',
    channel: { channelName: 'Desk Goals' },
    views: '312K views',
    uploaded: '1 day ago',
  },
  {
    _id: 'video18',
    title: 'React State Management Explained',
    category: 'Education',
    thumbnailUrl: 'https://i.ytimg.com/vi/35lXWvCuM8o/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/35lXWvCuM8o',
    channel: { channelName: 'React Mastery' },
    views: '1.5M views',
    uploaded: '2 days ago',
  },
  {
    _id: 'video19',
    title: 'Easy Meal Prep Recipes',
    category: 'Lifestyle',
    thumbnailUrl: 'https://i.ytimg.com/vi/2pL28CcEijU/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/2pL28CcEijU',
    channel: { channelName: 'Kitchen Joy' },
    views: '428K views',
    uploaded: '6 days ago',
  },
  {
    _id: 'video20',
    title: 'Drone Footage from the Alps',
    category: 'Travel',
    thumbnailUrl: 'https://i.ytimg.com/vi/JMUxmLyrhSk/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/JMUxmLyrhSk',
    channel: { channelName: 'Sky View' },
    views: '1.8M views',
    uploaded: '1 week ago',
  },
  {
    _id: 'video21',
    title: 'JavaScript Animation Techniques',
    category: 'Technology',
    thumbnailUrl: 'https://i.ytimg.com/vi/3PHXvlpOkf4/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/3PHXvlpOkf4',
    channel: { channelName: 'Creative Code' },
    views: '742K views',
    uploaded: '3 days ago',
  },
  {
    _id: 'video22',
    title: 'Travel Vlog: Paris at Night',
    category: 'Travel',
    thumbnailUrl: 'https://i.ytimg.com/vi/4yM5Tov7uH0/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/4yM5Tov7uH0',
    channel: { channelName: 'Wanderlust' },
    views: '986K views',
    uploaded: '4 days ago',
  },
  {
    _id: 'video23',
    title: 'Build a Budget Tracker',
    category: 'Education',
    thumbnailUrl: 'https://i.ytimg.com/vi/TFtZQODUI1Q/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/TFtZQODUI1Q',
    channel: { channelName: 'Finance Hacks' },
    views: '529K views',
    uploaded: '1 day ago',
  },
  {
    _id: 'video24',
    title: 'Quick Home Workout Routine',
    category: 'Lifestyle',
    thumbnailUrl: 'https://i.ytimg.com/vi/UItWltVZZmE/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/UItWltVZZmE',
    channel: { channelName: 'Fit At Home' },
    views: '955K views',
    uploaded: '2 days ago',
  },
  {
    _id: 'video25',
    title: 'A Day in the Life of a Developer',
    category: 'Lifestyle',
    thumbnailUrl: 'https://i.ytimg.com/vi/5pZzz4pJcNs/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/5pZzz4pJcNs',
    channel: { channelName: 'Code Life' },
    views: '433K views',
    uploaded: '3 days ago',
  },
  {
    _id: 'video26',
    title: 'Music Production Basics',
    category: 'Music',
    thumbnailUrl: 'https://i.ytimg.com/vi/7TU3N3_Re0o/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/7TU3N3_Re0o',
    channel: { channelName: 'Beat Lab' },
    views: '278K views',
    uploaded: '5 days ago',
  },
  {
    _id: 'video27',
    title: 'Photography Editing Tips',
    category: 'Photography',
    thumbnailUrl: 'https://i.ytimg.com/vi/M3OQ-O9Nkk0/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/M3OQ-O9Nkk0',
    channel: { channelName: 'Photo Lab' },
    views: '647K views',
    uploaded: '2 days ago',
  },
  {
    _id: 'video28',
    title: 'Building a Chat App with Socket.io',
    category: 'Technology',
    thumbnailUrl: 'https://i.ytimg.com/vi/vQjiN8Qgs3c/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/vQjiN8Qgs3c',
    channel: { channelName: 'Realtime Dev' },
    views: '522K views',
    uploaded: '4 days ago',
  },
  {
    _id: 'video29',
    title: 'Science Explained: Black Holes',
    category: 'Science',
    thumbnailUrl: 'https://i.ytimg.com/vi/zUyH3XhpLTo/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/zUyH3XhpLTo',
    channel: { channelName: 'Space Review' },
    views: '1.4M views',
    uploaded: '1 week ago',
  },
  {
    _id: 'video30',
    title: 'Cooking the Perfect Pasta',
    category: 'Food',
    thumbnailUrl: 'https://i.ytimg.com/vi/8nKmlvlWqlk/hqdefault.jpg',
    videoUrl: 'https://www.youtube.com/embed/8nKmlvlWqlk',
    channel: { channelName: 'Chef Corner' },
    views: '1.0M views',
    uploaded: '5 days ago',
  },
];

function Home() {
  const [videos, setVideos] = useState(sampleVideos);
  const [activeCategory, setActiveCategory] = useState('All');
  const [error, setError] = useState('');
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const search = query.get('search') || '';

  const filteredVideos = useMemo(() => {
    return videos.filter((video) => {
      const matchesSearch = !search || video.title.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeCategory === 'All' || video.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [videos, search, activeCategory]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const params = {};
        if (search) params.search = search;
        if (activeCategory && activeCategory !== 'All') params.category = activeCategory;

        const { data } = await api.get('/videos', { params });
        if (data?.length > 0) {
          setVideos(data);
          setError('');
        } else {
          setVideos(sampleVideos);
          setError('Showing sample videos until backend data is available.');
        }
      } catch (err) {
        setVideos(sampleVideos);
        setError('Showing sample videos until backend data is available.');
      }
    };

    fetchVideos();
  }, [search, activeCategory]);

  return (
    <main className="page-content home-page">
      <section className="filters">
        {categories.map((category) => (
          <button
            key={category}
            className={category === activeCategory ? 'filter active' : 'filter'}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </section>
      {error && <div className="alert">{error}</div>}
      <section className="video-grid">
        {filteredVideos.map((video) => (
          <Link key={video._id} to={`/video/${video._id}`} className="video-card">
            <div className="thumbnail-wrap">
              <img src={video.thumbnailUrl || 'https://via.placeholder.com/320x180'} alt={video.title} />
            </div>
            <div className="video-info">
              <strong>{video.title}</strong>
              <p className="channel-name">{video.channel?.channelName || 'Unknown channel'}</p>
              <p className="video-meta">{video.views} • {video.uploaded}</p>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}

export default Home;
