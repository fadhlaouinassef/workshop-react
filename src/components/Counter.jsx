import { useState } from 'react';

function Counter({ initialCount = 0, step = 1 }) {
  const [count, setCount] = useState(initialCount);

  const increment = () => {
    setCount(count + step);
  };

  const decrement = () => {
    setCount(count - step);
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Compteur</h2>
      <div style={{ fontSize: '48px', margin: '20px 0' }}>
        {count}
      </div>
      <div>
        <button 
          onClick={decrement}
          style={{ 
            padding: '10px 20px', 
            margin: '0 10px', 
            fontSize: '18px',
            cursor: 'pointer'
          }}
        >
          - {step}
        </button>
        <button 
          onClick={increment}
          style={{ 
            padding: '10px 20px', 
            margin: '0 10px', 
            fontSize: '18px',
            cursor: 'pointer'
          }}
        >
          + {step}
        </button>
        <button 
          onClick={reset}
          style={{ 
            padding: '10px 20px', 
            margin: '0 10px', 
            fontSize: '18px',
            cursor: 'pointer'
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Counter;
