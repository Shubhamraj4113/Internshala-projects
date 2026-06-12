import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api.js';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await api.post('/auth/register', { username, email, password, avatar });
      setSuccess('Registration successful. Redirecting to login...');
      setTimeout(() => navigate('/login'), 1200);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <main className="form-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
        <label>
          Username
          <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} required />
        </label>
        <label>
          Email
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        </label>
        <label>
          Password
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
        </label>
        <label>
          Avatar URL
          <input type="url" value={avatar} onChange={(event) => setAvatar(event.target.value)} />
        </label>
        <button type="submit">Create Account</button>
      </form>
    </main>
  );
}

export default Register;
