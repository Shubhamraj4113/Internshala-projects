import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/api.js';

function ChannelPage({ currentUser, onUserUpdate }) {
  const params = useParams();
  const navigate = useNavigate();
  const isMeRoute = params.id === 'me';
  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);
  const [channelForm, setChannelForm] = useState({ channelName: '', description: '', channelBanner: '' });
  const [videoForm, setVideoForm] = useState({ title: '', description: '', category: 'Education', thumbnailUrl: '', videoUrl: '' });
  const [editingVideoId, setEditingVideoId] = useState(null);
  const [error, setError] = useState('');

  const channelId = isMeRoute ? currentUser?.channelId : params.id;

  const fetchChannel = async () => {
    try {
      if (!channelId) {
        setChannel(null);
        setVideos([]);
        return;
      }
      const { data } = await api.get(`/channels/${channelId}`);
      setChannel(data);
      setVideos(data.videos);
    } catch (err) {
      setError('Channel not found');
    }
  };

  useEffect(() => {
    fetchChannel();
  }, [channelId]);

  const handleChannelChange = (event) => {
    const { name, value } = event.target;
    setChannelForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleChannelCreate = async (event) => {
    event.preventDefault();
    if (!currentUser) {
      navigate('/login');
      return;
    }

    try {
      const { data } = await api.post('/channels', channelForm);
      setChannel(data);
      setVideos([]);
      const updatedUser = { ...currentUser, channelId: data._id };
      localStorage.setItem('youtube_clone_user', JSON.stringify(updatedUser));
      if (typeof onUserUpdate === 'function') {
        onUserUpdate(updatedUser);
      }
      setError('');
      navigate(`/channel/${data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to create channel');
    }
  };

  const handleVideoChange = (event) => {
    const { name, value } = event.target;
    setVideoForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleVideoSubmit = async (event) => {
    event.preventDefault();
    if (!currentUser) {
      navigate('/login');
      return;
    }
    if (!channelId) {
      setError('Create a channel first.');
      return;
    }

    try {
      if (editingVideoId) {
        const { data } = await api.put(`/videos/${editingVideoId}`, videoForm);
        setVideos((prev) => prev.map((item) => (item._id === editingVideoId ? data : item)));
        setEditingVideoId(null);
      } else {
        const { data } = await api.post('/videos', { ...videoForm, channelId });
        setVideos((prev) => [data, ...prev]);
      }
      setVideoForm({ title: '', description: '', category: 'Education', thumbnailUrl: '', videoUrl: '' });
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to save video');
    }
  };

  const handleEdit = (video) => {
    setEditingVideoId(video._id);
    setVideoForm({
      title: video.title,
      description: video.description,
      category: video.category,
      thumbnailUrl: video.thumbnailUrl,
      videoUrl: video.videoUrl,
    });
  };

  const handleDelete = async (videoId) => {
    try {
      await api.delete(`/videos/${videoId}`);
      setVideos((prev) => prev.filter((item) => item._id !== videoId));
      setError('');
    } catch (err) {
      setError('Unable to delete video');
    }
  };

  if (isMeRoute && !currentUser) {
    return (
      <main className="page-content">
        <p>Please log in to view your channel.</p>
      </main>
    );
  }

  if (isMeRoute && !currentUser?.channelId) {
    return (
      <main className="page-content channel-page">
        <section className="video-form-section">
          <h3>Create your channel</h3>
          {error && <div className="error">{error}</div>}
          <form className="video-form" onSubmit={handleChannelCreate}>
            <input name="channelName" value={channelForm.channelName} onChange={handleChannelChange} placeholder="Channel Name" required />
            <input name="channelBanner" value={channelForm.channelBanner} onChange={handleChannelChange} placeholder="Banner URL" />
            <textarea name="description" value={channelForm.description} onChange={handleChannelChange} placeholder="Description" rows="4" />
            <button type="submit">Create Channel</button>
          </form>
        </section>
      </main>
    );
  }

  if (!channel) return <main className="page-content"><p>Loading channel...</p></main>;

  return (
    <main className="page-content channel-page">
      <section className="channel-header">
        <img src={channel.channelBanner || 'https://via.placeholder.com/1200x300'} alt={channel.channelName} />
        <div className="channel-info">
          <h2>{channel.channelName}</h2>
          <p>{channel.description}</p>
          <span>{channel.subscribers} subscribers</span>
        </div>
      </section>

      <section className="video-form-section">
        <h3>{editingVideoId ? 'Edit video' : 'Add new video'}</h3>
        {error && <div className="error">{error}</div>}
        <form className="video-form" onSubmit={handleVideoSubmit}>
          <input name="title" value={videoForm.title} onChange={handleVideoChange} placeholder="Title" required />
          <input name="category" value={videoForm.category} onChange={handleVideoChange} placeholder="Category" required />
          <input name="thumbnailUrl" value={videoForm.thumbnailUrl} onChange={handleVideoChange} placeholder="Thumbnail URL" />
          <input name="videoUrl" value={videoForm.videoUrl} onChange={handleVideoChange} placeholder="Video URL (embed)" required />
          <textarea name="description" value={videoForm.description} onChange={handleVideoChange} placeholder="Description" rows="4" />
          <button type="submit">{editingVideoId ? 'Update Video' : 'Create Video'}</button>
        </form>
      </section>

      <section className="channel-videos">
        <h3>Channel Videos</h3>
        {videos.length === 0 ? (
          <p>No videos yet.</p>
        ) : (
          <div className="video-grid">
            {videos.map((video) => (
              <div key={video._id} className="video-card channel-video-card">
                <img src={video.thumbnailUrl || 'https://via.placeholder.com/320x180'} alt={video.title} />
                <div className="video-info">
                  <strong>{video.title}</strong>
                  <span>{video.category}</span>
                  <div className="channel-actions">
                    <button onClick={() => handleEdit(video)}>Edit</button>
                    <button onClick={() => handleDelete(video._id)}>Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default ChannelPage;
