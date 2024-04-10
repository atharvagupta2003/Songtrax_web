import React from 'react';

function Header({ onBack }) {
    return (
        <header className="page-header">
            <button className="back-button" onClick={onBack}>
                <i className="fa fa-arrow-left"></i>←
            </button>
            <div className="header-logo">
                <h2>
                    <a href="/" className="header-icon-link">SongTrax</a>
                </h2>
            </div>
            <div className="header-app-description">
                <span>Create & Share Location Based Music Samples!</span>
            </div>
        </header>
    );
}

export default Header;
