import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createNewSample, getSample, updateSample } from '../api/songtraxAPI';
import * as Tone from 'tone';
import './starterstyles.css';
import MainContent from './MainContent';
import Header from './Header';

const noteToFrequency = {
    "B": 493.88, // B4
    "A": 440.00, // A4
    "G": 392.00, // G4
    "F": 349.23, // F4
    "E": 329.63, // E4
    "D": 293.66, // D4
    "C": 261.63  // C4
};

function EditSample() {
    const navigate = useNavigate();
    const { id } = useParams();
    
    const isEditing = !!id; //

    const [name, setName] = useState('');
    const [instrument, setInstrument] = useState('Guitar');
    const [notes, setNotes] = useState({
        "B": Array(16).fill(false),
        "A": Array(16).fill(false),
        "G": Array(16).fill(false),
        "F": Array(16).fill(false),
        "E": Array(16).fill(false),
        "D": Array(16).fill(false),
        "C": Array(16).fill(false),
    });

    // State to manage sample data when editing
    const [sampleData, setSampleData] = useState({
        name: '',
        instrument: '',
        noteSequences: {},
    });

    const [isLoading, setIsLoading] = useState(true);

    // Event handler to toggle musical notes
    const handleToggleNote = (note, index) => {
        const updatedNotes = { ...notes };
        updatedNotes[note][index] = !updatedNotes[note][index];

        const frequency = noteToFrequency[note];
        if (!frequency) {
            console.error("Invalid note:", note);
            return;
        }

        if (updatedNotes[note][index]) {
            const synth = new Tone.Synth().toDestination();
            synth.triggerAttackRelease(frequency, "8n");
        }

        setNotes(updatedNotes);
    };

    // Event handler to submit the sample
    const handleSubmit = async () => {
        try {
            const sampleDataToSubmit = {
                name: name,
                instrument: instrument,
                noteSequences: notes
            };

            if (isEditing) {
                await updateSample(id, sampleDataToSubmit);
            } else {
                const response = await createNewSample(sampleDataToSubmit);
                if (response && response.id) {
                    navigate('/');
                } else {
                    console.error('Failed to create sample:', response.message);
                }
            }
        } catch (error) {
            console.error(`Error ${isEditing ? 'updating' : 'creating'} sample:`, error);
        }
    };

    // Fetch sample data when editing an existing sample
    useEffect(() => {
        if (isEditing) {
            const fetchSampleData = async () => {
                try {
                    const sample = await getSample(id);
                    setSampleData({
                        name: sample.name, // Set the name from the API response
                        instrument: sample.instrument,
                        noteSequences: JSON.parse(sample.recording_data),
                    });
                    setIsLoading(false);
                } catch (error) {
                    console.error("Error fetching sample data:", error);
                }
            };
    
            fetchSampleData();
        } else {
            setIsLoading(false);
        }
    }, [id, isEditing]);
    

    // JSX for rendering the component
    return (
        <div className="main-container">
            <Header onBack={() => navigate(-1)} />
            <MainContent
                isEditing={isEditing}
                name={name}
                instrument={instrument}
                notes={notes}
                onNameChange={e => setName(e.target.value)}
                onInstrumentChange={setInstrument}
                onToggleNote={handleToggleNote}
                onSubmit={handleSubmit}
            />
            <footer className="page-footer"></footer>
        </div>
    );
}

export default EditSample;
