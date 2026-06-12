import { Link } from 'react-router-dom';
import { 
  MdHome, 
  MdVideoLibrary, 
  MdHistory, 
  MdPlaylistPlay,
  MdSubscriptions,
  MdShoppingBag,
  MdMusicNote,
  MdMovieFilter,
  MdSports
} from 'react-icons/md';

function Sidebar({ isOpen, onClose }) {
  const renderIcon = (iconName) => {
    const iconProps = { className: 'sidebar-icon-svg' };
    switch(iconName) {
      case 'home': return <MdHome {...iconProps} />;
      case 'shorts': return <MdPlaylistPlay {...iconProps} />;
      case 'subscriptions': return <MdSubscriptions {...iconProps} />;
      case 'library': return <MdVideoLibrary {...iconProps} />;
      case 'history': return <MdHistory {...iconProps} />;
      case 'shopping': return <MdShoppingBag {...iconProps} />;
      case 'music': return <MdMusicNote {...iconProps} />;
      case 'sports': return <MdSports {...iconProps} />;
      case 'movies': return <MdMovieFilter {...iconProps} />;
      default: return <MdHome {...iconProps} />;
    }
  };

  const mainNavItems = [
    { name: 'Shorts', to: '/', icon: 'shorts' },
    { name: 'Subscriptions', to: '/', icon: 'subscriptions' },
  ];

  const libraryNavItems = [
    { name: 'Library', to: '/', icon: 'library' },
    { name: 'History', to: '/', icon: 'history' },
  ];

  const exploreItems = [
    { name: 'Trending', to: '/', icon: 'home' },
    { name: 'Shopping', to: '/', icon: 'shopping' },
    { name: 'Music', to: '/', icon: 'music' },
    { name: 'Sports', to: '/', icon: 'sports' },
    { name: 'Movies', to: '/', icon: 'movies' },
  ];

  return (
    <>
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <nav className="sidebar-nav">
          {/* Main Navigation */}
          <div className="sidebar-section">
            {/* Explicit Home link shown first */}
            <Link to="/" className="sidebar-link" onClick={onClose}>
              {renderIcon('home')}
              <span>Home</span>
            </Link>
            {mainNavItems.map((item) => (
              <Link key={item.name} to={item.to} className="sidebar-link" onClick={onClose}>
                {renderIcon(item.icon)}
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
          
          {/* Library Section */}
          <div className="sidebar-section">
            {libraryNavItems.map((item) => (
              <Link key={item.name} to={item.to} className="sidebar-link" onClick={onClose}>
                {renderIcon(item.icon)}
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
          
          <hr className="sidebar-divider" />
          
          {/* Explore Section */}
          <div className="sidebar-section">
            <div className="sidebar-section-title">Explore</div>
            {exploreItems.map((item) => (
              <Link key={item.name} to={item.to} className="sidebar-link" onClick={onClose}>
                {renderIcon(item.icon)}
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
          
          <hr className="sidebar-divider" />
          
          {/* More from YouTube Section */}
          <div className="sidebar-section">
            <div className="sidebar-section-title">More from YouTube</div>
            <Link to="/" className="sidebar-link" onClick={onClose}>
              <span className="sidebar-premium-badge">▶</span>
              <span>YouTube Premium</span>
            </Link>
            <Link to="/" className="sidebar-link" onClick={onClose}>
              <span className="sidebar-premium-badge">♪</span>
              <span>YouTube Music</span>
            </Link>
            <Link to="/" className="sidebar-link" onClick={onClose}>
              <span className="sidebar-premium-badge">▶</span>
              <span>YouTube Kids</span>
            </Link>
          </div>
          
          <hr className="sidebar-divider" />
          
          {/* Footer Links */}
          <div className="sidebar-footer">
            <div className="sidebar-footer-links">
              <a href="#" onClick={(e) => e.preventDefault()}>About</a>
              <a href="#" onClick={(e) => e.preventDefault()}>Press</a>
              <a href="#" onClick={(e) => e.preventDefault()}>Copyright</a>
              <a href="#" onClick={(e) => e.preventDefault()}>Contact us</a>
              <a href="#" onClick={(e) => e.preventDefault()}>Creators</a>
              <a href="#" onClick={(e) => e.preventDefault()}>Advertise</a>
            </div>
            <div className="sidebar-footer-links">
              <a href="#" onClick={(e) => e.preventDefault()}>Terms</a>
              <a href="#" onClick={(e) => e.preventDefault()}>Privacy</a>
              <a href="#" onClick={(e) => e.preventDefault()}>Policy & Safety</a>
              <a href="#" onClick={(e) => e.preventDefault()}>How YouTube works</a>
              <a href="#" onClick={(e) => e.preventDefault()}>Test new features</a>
            </div>
            <div className="sidebar-footer-text">© 2026 YouTube Clone</div>
          </div>
        </nav>
      </aside>
      <div className={`sidebar-backdrop ${isOpen ? 'visible' : ''}`} onClick={onClose}></div>
    </>
  );
}

export default Sidebar;
