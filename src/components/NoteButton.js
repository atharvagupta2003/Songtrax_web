import React from 'react';
import * as Tone from 'tone';

function NoteButton({ note, isOn, index, onToggleNote }) {
    const handleNoteClick = () => {
        if (!isOn) {
            const frequency = noteToFrequency[note];
            if (!frequency) {
                console.error("Invalid note:", note);
                return;
            }

            const synth = new Tone.Synth().toDestination();
            synth.triggerAttackRelease(frequency, "8n");
        }

        onToggleNote(note, index);
    };

    return (
        <button
            className={isOn ? "toggle-selected" : "toggle"}
            onClick={handleNoteClick}
        >
        </button>
    );
}

const noteToFrequency = {
    "B": 493.88, // B4
    "A": 440.00, // A4
    "G": 392.00, // G4
    "F": 349.23, // F4
    "E": 329.63, // E4
    "D": 293.66, // D4
    "C": 261.63  // C4
};

export default NoteButton;
