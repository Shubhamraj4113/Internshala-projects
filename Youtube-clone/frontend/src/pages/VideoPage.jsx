import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/api.js';

function VideoPage({ currentUser }) {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [editCommentId, setEditCommentId] = useState(null);
  const [editText, setEditText] = useState('');
  const [error, setError] = useState('');

  const fetchVideo = async () => {
    try {
      const { data } = await api.get(`/videos/${id}`);
      setVideo(data);
    } catch (err) {
      setError('Video not found');
    }
  };

  const fetchComments = async () => {
    const { data } = await api.get(`/comments/${id}`);
    setComments(data);
  };

  useEffect(() => {
    fetchVideo();
    fetchComments();
  }, [id]);

  const handleAddComment = async (event) => {
    event.preventDefault();
    try {
      const { data } = await api.post(`/comments/${id}`, { text: commentText });
      setComments((prev) => [data, ...prev]);
      setCommentText('');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to add comment');
    }
  };

  const handleEditComment = async (commentId) => {
    try {
      const { data } = await api.put(`/comments/${commentId}`, { text: editText });
      setComments((prev) => prev.map((comment) => (comment._id === commentId ? data : comment)));
      setEditCommentId(null);
      setEditText('');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to edit comment');
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await api.delete(`/comments/${commentId}`);
      setComments((prev) => prev.filter((comment) => comment._id !== commentId));
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to delete comment');
    }
  };

  const handleLike = async () => {
    try {
      const { data } = await api.post(`/videos/${id}/like`);
      setVideo(data);
    } catch (err) {
      setError('Unable to like video');
    }
  };

  const handleDislike = async () => {
    try {
      const { data } = await api.post(`/videos/${id}/dislike`);
      setVideo(data);
    } catch (err) {
      setError('Unable to dislike video');
    }
  };

  if (!video) return <main className="page-content"><p>Loading video...</p></main>;

  return (
    <main className="page-content video-page">
      {error && <div className="error">{error}</div>}
      <div className="video-player-card">
        <div className="video-player">
          <iframe
            title={video.title}
            src={video.videoUrl}
            allowFullScreen
            frameBorder="0"
          />
        </div>
        <div className="video-details">
          <h2>{video.title}</h2>
          <p>{video.description}</p>
          <p className="channel-name">Channel: {video.channel?.channelName}</p>
          <div className="video-actions">
            <button onClick={handleLike}>Like ({video.likes})</button>
            <button onClick={handleDislike}>Dislike ({video.dislikes})</button>
          </div>
        </div>
      </div>

      <section className="comments-section">
        <h3>Comments</h3>
        {currentUser ? (
          <form onSubmit={handleAddComment} className="comment-form">
            <textarea
              value={commentText}
              onChange={(event) => setCommentText(event.target.value)}
              placeholder="Add a comment"
              required
            />
            <button type="submit">Post Comment</button>
          </form>
        ) : (
          <p>Please log in to post comments.</p>
        )}

        {comments.length === 0 && <p>No comments yet.</p>}
        <ul className="comment-list">
          {comments.map((comment) => (
            <li key={comment._id} className="comment-item">
              <div className="comment-meta">
                <span>{comment.user?.username || 'Unknown'}</span>
                <span>{new Date(comment.createdAt).toLocaleString()}</span>
              </div>
              {editCommentId === comment._id ? (
                <div className="comment-edit-block">
                  <textarea
                    value={editText}
                    onChange={(event) => setEditText(event.target.value)}
                  />
                  <button onClick={() => handleEditComment(comment._id)}>Save</button>
                  <button onClick={() => setEditCommentId(null)}>Cancel</button>
                </div>
              ) : (
                <p>{comment.text}</p>
              )}
              {currentUser?.id === comment.user?._id && editCommentId !== comment._id && (
                <div className="comment-actions">
                  <button onClick={() => { setEditCommentId(comment._id); setEditText(comment.text); }}>Edit</button>
                  <button onClick={() => handleDeleteComment(comment._id)}>Delete</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default VideoPage;
