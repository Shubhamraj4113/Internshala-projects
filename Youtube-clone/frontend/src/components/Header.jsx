import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Icon from './Icon';

function Header({ currentUser, onLogout, onToggleSidebar }) {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const [search, setSearch] = useState(query.get('search') || '');
  const navigate = useNavigate();

  useEffect(() => {
    setSearch(new URLSearchParams(location.search).get('search') || '');
  }, [location.search]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const queryString = search.trim() ? `?search=${encodeURIComponent(search.trim())}` : '';
    navigate(`/${queryString}`);
  };

  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-button" type="button" aria-label="Toggle sidebar" onClick={onToggleSidebar}>
          <Icon name="menu" />
        </button>
        <Link className="logo" to="/">
          <span className="logo-icon">
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="white"
            >
              <path d="M10 15L15 12L10 9V15Z"/>
            </svg>
          </span>
          <span>YouTube</span>
        </Link>
      </div>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          aria-label="Search"
        />
        <button type="submit" className="search-button" aria-label="Search">
          <Icon name="search" />
        </button>
      </form>
      <div className="header-actions">
        {currentUser ? (
          <>
            <Link to="/channel/me" className="button">My Channel</Link>
            <button className="button secondary" onClick={onLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link className="button" to="/login">Sign In</Link>
            <Link className="button secondary" to="/register">Register</Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
