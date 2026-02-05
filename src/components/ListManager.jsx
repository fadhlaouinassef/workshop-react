import { useState } from 'react';

function ListManager({ initialItems = [], placeholder = 'Ajouter un élément...' }) {
  const [items, setItems] = useState(initialItems);
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      setItems([...items, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const removeItem = (indexToRemove) => {
    setItems(items.filter((_, i) => i !== indexToRemove));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto', color: '#fff' }}>
      <h2>Gestionnaire de Liste</h2>
      
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {items.map((item, index) => (
          <li
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px',
              margin: '5px 0',
              backgroundColor: '#f0f0f0',
              borderRadius: '5px',
              color: '#000'
            }}
          >
            <span>{item}</span>
            <button
              onClick={() => removeItem(index)}
              style={{
                padding: '6px 10px',
                fontSize: '14px',
                cursor: 'pointer',
                backgroundColor: '#e74c3c',
                color: '#fff',
                border: 'none',
                borderRadius: '4px'
              }}
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          style={{
            padding: '10px',
            fontSize: '16px',
            width: '70%',
            marginRight: '10px'
          }}
        />
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          Ajouter
        </button>
      </form>

      
      
      
    </div>
  );
}

export default ListManager;
