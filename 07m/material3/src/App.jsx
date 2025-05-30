import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css' // We'll incorporate styles directly
// index.js
import '@material/web/button/filled-button.js';
import '@material/web/button/outlined-button.js';
import '@material/web/checkbox/checkbox.js';

function App() {
  const [count, setCount] = useState(0)
  const [isChecked, setIsChecked] = useState(false)

  // Define styles that might have been in App.css
  const componentStyles = {
    logo: {
      height: '6em',
      padding: '1.5em',
      willChange: 'filter',
      transition: 'filter 300ms',
    },
    // Note: Specific :hover effects (like drop-shadows on logos)
    // from App.css are not directly translatable to inline styles
    // without JavaScript event handlers (onMouseEnter, onMouseLeave).
    // These hover effects will be different or absent with this change.
    card: {
      padding: '2em',
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9',
      textAlign: 'center', // Assuming content within the card was centered
    },
    readTheDocs: {
      color: '#555555',
      fontSize: '0.9em',
      marginTop: '2em',
    },
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} style={componentStyles.logo} alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} style={componentStyles.logo} alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div style={componentStyles.card}>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
        <div style={{ marginTop: '20px', marginBottom: '20px' }}>
          <md-checkbox 
            aria-label="Toggle feature"
            checked={isChecked} 
            onInput={(e) => setIsChecked(e.target.checked)}
          ></md-checkbox>
          <label style={{ marginLeft: '8px' }}> {isChecked ? 'Funcionalidade Ativada!' : 'Funcionalidade Desativada.'}</label>
        </div>
        <md-outlined-button onClick={() => alert('Botão "Back" clicado!')}>Back</md-outlined-button>
        <md-filled-button onClick={() => alert('Botão "Next" clicado!')}>Next</md-filled-button>
      </div>
      <p style={componentStyles.readTheDocs}>
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}
export default App
