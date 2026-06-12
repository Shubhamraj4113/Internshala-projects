import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import VideoPage from './pages/VideoPage.jsx';
import ChannelPage from './pages/ChannelPage.jsx';
import Header from './components/Header.jsx';
import Sidebar from './components/Sidebar.jsx';

function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    const stored = localStorage.getItem('youtube_clone_user');
    return stored ? JSON.parse(stored) : null;
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogin = (user) => {
    setCurrentUser(user);
    localStorage.setItem('youtube_clone_user', JSON.stringify(user));
  };

  const handleUserUpdate = (user) => {
    setCurrentUser(user);
    localStorage.setItem('youtube_clone_user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('youtube_clone_user');
    localStorage.removeItem('youtube_clone_token');
  };

  const handleToggleSidebar = () => {
    setSidebarOpen((open) => !open);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className={`app-shell ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <Header currentUser={currentUser} onLogout={handleLogout} onToggleSidebar={handleToggleSidebar} />
      <div className="app-layout">
        <Sidebar isOpen={sidebarOpen} onClose={handleCloseSidebar} />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home currentUser={currentUser} />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/video/:id" element={<VideoPage currentUser={currentUser} />} />
            <Route path="/channel/me" element={<ChannelPage currentUser={currentUser} onUserUpdate={handleUserUpdate} />} />
            <Route path="/channel/:id" element={<ChannelPage currentUser={currentUser} onUserUpdate={handleUserUpdate} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
