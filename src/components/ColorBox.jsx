import { useState } from 'react';

function ColorBox({ initialColor = '#3498db', colorOptions = [] }) {
  const [color, setColor] = useState(initialColor);

  const changeColor = () => {
    if (colorOptions.length > 0) {
      // Choisir une couleur aléatoire parmi colorOptions
      const randomIndex = Math.floor(Math.random() * colorOptions.length);
      setColor(colorOptions[randomIndex]);
    } else {
      // Générer une couleur aléatoire en hexadécimal
      const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
      setColor(randomColor);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>Boîte de Couleur</h2>
      
      <div
        style={{
          width: '200px',
          height: '200px',
          backgroundColor: color,
          margin: '20px auto',
          borderRadius: '10px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          transition: 'background-color 0.3s ease'
        }}
      />
      
      <p style={{ fontSize: '18px', fontWeight: 'bold', margin: '10px 0' }}>
        Couleur actuelle : {color}
      </p>
      
      <button
        onClick={changeColor}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          backgroundColor: '#2ecc71',
          color: 'white',
          border: 'none',
          borderRadius: '5px'
        }}
      >
        Changer de couleur
      </button>
    </div>
  );
}

export default ColorBox;
