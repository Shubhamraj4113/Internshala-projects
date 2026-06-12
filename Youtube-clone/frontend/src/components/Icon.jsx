import React from 'react';

const icons = {
  search: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M10 18a8 8 0 1 1 5.293-2.707l4.207 4.207-1.414 1.414-4.207-4.207A7.97 7.97 0 0 1 10 18zm0-14a6 6 0 1 0 0 12 6 6 0 0 0 0-12z" />
    </svg>
  ),
  play: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7L8 5z" />
    </svg>
  ),
  user: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5zm0 2c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-6.67-5-10-5z" />
    </svg>
  ),
  menu: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
    </svg>
  ),
  home: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </svg>
  ),
  explore: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm3.535 14.121l-1.415 1.415-2.12-2.121-2.121-2.122L8.485 8.484l1.414-1.414 2.121 2.121 2.122 2.121 1.414 1.414-1.414 1.414z" />
    </svg>
  ),
  subscriptions: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 6h11v12H8z" opacity="0.3"/><path d="M21 6H7c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H7V8h14v8zM3 8h2v8H3z" />
    </svg>
  ),
  library: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6 6h2v12H6zm4 0h2v12h-2zm4 0h2v12h-2zm4 0h2v12h-2z" />
    </svg>
  ),
  history: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13 3a9 9 0 1 0 9 9h-2a7 7 0 1 1-7-7V3zm-1 5h2v5l4.28 2.54-1.14 1.88L12 14V8z" />
    </svg>
  ),
  settings: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.43 12.98a7.94 7.94 0 000-1.96l2.11-1.65a.5.5 0 00.12-.64l-2-3.46a.5.5 0 00-.61-.22l-2.49 1a8.07 8.07 0 00-1.7-.98l-.38-2.65A.5.5 0 0014.5 2h-5a.5.5 0 00-.5.43l-.38 2.65a7.92 7.92 0 00-1.7.98l-2.49-1a.5.5 0 00-.61.22l-2 3.46a.5.5 0 00.12.64l2.11 1.65a7.94 7.94 0 000 1.96L2.57 14.6a.5.5 0 00-.12.64l2 3.46c.14.24.43.34.7.22l2.49-1c.52.4 1.08.73 1.7.98l.38 2.65a.5.5 0 00.5.43h5a.5.5 0 00.5-.43l.38-2.65c.62-.25 1.18-.58 1.7-.98l2.49 1c.27.12.56.02.7-.22l2-3.46a.5.5 0 00-.12-.64l-2.11-1.62zM12 15.5A3.5 3.5 0 1115.5 12 3.5 3.5 0 0112 15.5z" />
    </svg>
  ),
  notifications: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 22a2.5 2.5 0 002.45-2h-4.9A2.5 2.5 0 0012 22zm6-6V11c0-3.07-1.63-5.64-4.5-6.32V4a1.5 1.5 0 00-3 0v.68C7.63 5.36 6 7.92 6 11v5l-1.99 2A1 1 0 005 20h14a1 1 0 00.99-1.25L18 16z" />
    </svg>
  ),
  apps: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M5 5h4V1H5a2 2 0 00-2 2v2a2 2 0 002 2zm10-4v4h4V3a2 2 0 00-2-2h-2zm4 14h-4v4h2a2 2 0 002-2v-2zm-10 4v-4H5v2a2 2 0 002 2h2zm-4-6h4v-4H5v4zm6 0h4v-4h-4v4zm6 0h4v-4h-4v4z" />
    </svg>
  ),
  upload: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M5 20h14v-2H5v2zm7-18l-5 5h3v6h4V7h3l-5-5z" />
    </svg>
  ),
  more: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <circle cx="5" cy="12" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="19" cy="12" r="2" />
    </svg>
  ),
  voice: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 14a3 3 0 003-3V5a3 3 0 10-6 0v6a3 3 0 003 3zm5-3a5 5 0 01-10 0H5a7 7 0 0014 0h-2zm-5 9a3 3 0 003-3h-2a1 1 0 01-2 0H9a3 3 0 003 3z" />
    </svg>
  ),
  shorts: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M5 5h14v14H5z" opacity="0.3" />
      <path d="M13 7.5v3.75L16.25 9 18 10.75l-5 5V7.5h1z" />
    </svg>
  ),
};

function Icon({ name, className = "" }) {
  return (
    <span className={`icon ${className}`}>
      {icons[name] || null}
    </span>
  );
}

export default Icon;
