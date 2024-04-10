import React from 'react';

function MainContent({
    isEditing,
    name,
    instrument,
    notes,
    onNameChange,
    onInstrumentChange,
    onToggleNote,
    onSubmit,
}) {
    console.log('Received name prop:', name);
    return (
        <main>
            <h2 className="title">{isEditing ? 'Edit' : 'Create'} Sample:</h2>
            <form className="card edit-card">
                <input
                    type="text"
                    value={name}
                    onChange={onNameChange}
                    placeholder="Sample Name"
                />
                <div className="button-group-container">
                    <button type="button" className="bright-button" onClick={onSubmit}>
                        {isEditing ? 'Save Changes' : 'Create Sample'}
                    </button>
                </div>
            </form>

            {/* Instrument toggles */}
            <div className="toggle-row-container">
                <div className="row-label"><h4>Instrument</h4></div>
                {['Piano', 'French Horn', 'Guitar', 'Drums'].map(instr => (
                    <button
                        key={instr}
                        className={instrument === instr ? "toggle-selected" : "toggle"}
                        onClick={() => onInstrumentChange(instr)}
                    >
                        {instr}
                    </button>
                ))}
            </div>

            {/* Notes sequence */}
            {Object.keys(notes).map(note => (
                <div key={note} className="toggle-row-container">
                    <div className="row-label"><h4>{note}</h4></div>
                    {notes[note].map((isOn, index) => (
                        <button
                            key={index}
                            className={isOn ? "toggle-selected" : "toggle"}
                            onClick={() => onToggleNote(note, index)}
                        >
                        </button>
                    ))}
                </div>
            ))}
        </main>
    );
}

export default MainContent;
