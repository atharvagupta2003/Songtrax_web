import React from 'react';

function SampleDetails({ sample, locations, onShareToggle }) {
    return (
        <div>
            <div className="card">
                <div className="song-details">
                    <h3>{sample.name}</h3>
                    <p>{sample.date}</p>
                </div>
                <div className="buttons">
                    <a href="#" className="bright-button">Preview</a>
                </div>
            </div>

            {locations.map(location => (
                <div key={location.id} className="toggle-row-container">
                    <div className="location-name-label">
                        <h4>{location.name}</h4>
                    </div>
                    <div className="sequence-row-container">
                        <button
                            className={sample.shared ? "toggle-selected" : "toggle"}
                            onClick={() => onShareToggle(location.id)}
                        >
                            Shared
                        </button>
                        <button
                            className={!sample.shared ? "toggle-selected" : "toggle"}
                            onClick={() => onShareToggle(location.id)}
                        >
                            Not Shared
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default SampleDetails;
