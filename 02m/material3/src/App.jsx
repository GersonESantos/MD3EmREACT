import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// index.js
import '@material/web/button/filled-button.js';
import '@material/web/button/outlined-button.js';
import '@material/web/checkbox/checkbox.js';

function App() {
  const [count, setCount] = useState(0)
  const [isChecked, setIsChecked] = useState(false)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
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
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
