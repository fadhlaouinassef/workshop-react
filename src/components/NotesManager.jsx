import { useState } from 'react';

const NotesManager = ({ initialNotes = [] }) => {
  const [notes, setNotes] = useState(initialNotes.map(n => Number(n)));
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const addNote = () => {
    const noteNum = Number(inputValue.trim());
    
    if (isNaN(noteNum)) {
      setError("Veuillez entrer un nombre");
      return;
    }

    if (noteNum < 0 || noteNum > 20) {
      setError("La note doit être entre 0 et 20");
      return;
    }

    setNotes(prev => [...prev, noteNum]);
    setInputValue('');
    setError('');
  };

  const deleteNote = (indexToDelete) => {
    setNotes(prev => prev.filter((_, idx) => idx !== indexToDelete));
  };

  const average = notes.length > 0
    ? (notes.reduce((sum, note) => sum + note, 0) / notes.length).toFixed(2)
    : '—';

  return (
    <div 
      style={{
        maxWidth: '540px',
        margin: '30px auto',
        padding: '24px',
        backgroundColor: '#111',           // fond noir
        color: '#e0e0e0',                  // texte clair
        borderRadius: '12px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.5)'
      }}
    >
      <h2 style={{ color: '#ffffff', marginBottom: '28px' }}>
        Gestion des notes
      </h2>

      <div style={{ marginBottom: '28px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <input
          type="number"
          min="0"
          max="20"
          step="0.1"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Note entre 0 et 20"
          onKeyDown={(e) => e.key === 'Enter' && addNote()}
          style={{
            padding: '12px',
            width: '180px',
            backgroundColor: '#1e1e1e',
            color: '#ffffff',
            border: '1px solid #444',
            borderRadius: '6px',
            fontSize: '1rem'
          }}
        />
        <button 
          onClick={addNote}
          style={{
            padding: '12px 28px',
            backgroundColor: '#0288d1',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Ajouter
        </button>
      </div>

      {error && (
        <p style={{ color: '#ff6b6b', margin: '12px 0', fontWeight: '500' }}>
          {error}
        </p>
      )}

      <div style={{ margin: '28px 0', fontSize: '1.1rem' }}>
        <strong style={{ color: '#4fc3f7' }}>Moyenne : {average} / 20</strong>
        {notes.length > 0 && ` (${notes.length} note${notes.length > 1 ? 's' : ''})`}
      </div>

      {notes.length === 0 ? (
        <p style={{ color: '#888', fontStyle: 'italic', textAlign: 'center' }}>
          Aucune note pour le moment
        </p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {notes.map((note, index) => (
            <li 
              key={index}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '14px 18px',
                margin: '10px 0',
                backgroundColor: '#1e1e1e',     // cartes sombres
                borderRadius: '8px',
                border: '1px solid #333',
                boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
              }}
            >
              <span>
                Note {index + 1} : <strong style={{ color: '#fff' }}>{note}</strong>
              </span>
              <button
                onClick={() => deleteNote(index)}
                style={{
                  backgroundColor: '#d32f2f',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '0.95rem'
                }}
              >
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotesManager;