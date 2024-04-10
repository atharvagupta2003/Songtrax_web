// SampleCard.js
import React from 'react';
import { Link } from 'react-router-dom';

function SampleCard({ sample }) {
  return (
    <div className="sample-card">
      <div className="song-details">
        <h3>{sample.name}</h3>
        <p>{sample.date}</p>
      </div>
      <div className="button-group-container">
        <Link to={`/edit/${sample.id}`} className="bright-button">Edit</Link>
        <Link to={`/share/${sample.id}`} className="bright-button">Share</Link>
        {}
        <button className="bright-button">Preview</button>
      </div>
    </div>
  );
}

export default SampleCard;
