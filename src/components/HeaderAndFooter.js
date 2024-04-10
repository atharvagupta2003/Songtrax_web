import React from 'react';
import './starterstyles.css';

function HeaderAndFooter() {
  return (
    <div class="handf">
      <header className="page-header">
        <div className="header-logo">
          <h2>
            <a href="/" className="header-icon-link">SongTrax</a>
          </h2>
        </div>
        <div className="header-app-description">
          <span>Create & Share Location Based Music Samples!</span>
        </div>
      </header>

      <footer className="page-footer"></footer>
    </div>
  );
}

export default HeaderAndFooter;
