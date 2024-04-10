import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './starterstyles.css';
import HeaderAndFooter from './HeaderAndFooter';
import { getSamples } from '../api/songtraxAPI';
import SampleCard from './SampleCard';
import * as Tone from 'tone';

function HomeScreen() {
    // State variables
    const [synth, setSynth] = useState(null);
    const [samples, setSamples] = useState([]);
    const noteToFrequency = {
        "B": 493.88,
        "A": 440.00,
        "G": 392.00,
        "F": 349.23,
        "E": 329.63,
        "D": 293.66,
        "C": 261.63,
        "H": 587.33
    };

    // Fetch samples when component mounts
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await getSamples();
                setSamples(response);
            } catch (error) {
                console.error("Error fetching samples:", error);
            }
        }

        fetchData();
    }, []);

    // State variables for sample playback
    const [playingSampleId, setPlayingSampleId] = useState(null);

    useEffect(() => {
        // Cleanup when the component unmounts
        return () => {
            if (synth) {
                synth.dispose();
            }
        };
    }, [synth]);

    // Function to handle sample playback
    const handleSamplePlayback = (sample) => {
        if (playingSampleId === sample.id) {
            stopSample();
            setPlayingSampleId(null);
        } else {
            playSample(sample);
            setPlayingSampleId(sample.id);
        }
    };

    // State variables for current sequence
    const [currentSequence, setCurrentSequence] = useState(null);

    // Function to play a sample
    const playSample = async (sample) => {
        console.log("Attempting to play sample:", sample.id);

        const newSynth = new Tone.PolySynth(Tone.Synth).toDestination();
        setSynth(newSynth);

        stopSample();

        const noteSequences = JSON.parse(sample.recording_data);
        if (!noteSequences) {
            console.error("No noteSequences provided in sample:", sample);
            return;
        }

        const sortedNotes = Object.keys(noteSequences).sort((a, b) => noteToFrequency[b] - noteToFrequency[a]);
        const synth = new Tone.PolySynth(Tone.Synth).toDestination();

        sortedNotes.forEach((note) => {
            noteSequences[note].forEach((isActive, index) => {
                if (isActive) {
                    const time = index * 0.5;
                    synth.triggerAttackRelease(noteToFrequency[note], "8n", `+${time}`);
                }
            });
        });
        setCurrentSequence(null);
    };

    // Function to stop sample playback
    const stopSample = () => {
        console.log("Attempting to stop sample");
        if (synth) {
            synth.releaseAll();
        }
        if (currentSequence) {
            currentSequence.stop();
            setCurrentSequence(null);
        }
    };

    return (
        <div>
            <HeaderAndFooter />
            <div className="main-container">
                <h2 className="title">Your Song Samples</h2>
                <div className="create-card">
                    <Link to="/create" className="full-button">Create Sample</Link>
                </div>
                {samples.map(sample => (
                    <section key={sample.id} className="sample">
                        <div className="card">
                            <div className="song-details">
                                <h3>{sample.name}</h3>
                                <p>{sample.date}</p>
                            </div>
                            <div className="button-group-container">
                                <Link to={`/edit/${sample.id}`} className="bright-button">Edit</Link>
                                <Link to={`/share/${sample.id}`} className="bright-button">Share</Link>
                                <button
                                    className="bright-button"
                                    onClick={() => handleSamplePlayback(sample)}
                                >
                                    {playingSampleId === sample.id ? 'Stop Previewing' : 'Preview'}
                                </button>
                            </div>
                        </div>
                    </section>
                ))}
                <div className="create-card">
                    <Link to="/create" className="full-button">Create Sample</Link>
                </div>
            </div>
        </div>
    );
}

export default HomeScreen;
