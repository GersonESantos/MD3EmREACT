import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [theme, setTheme] = useState('light'); // 'light' ou 'dark'

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    // Adiciona a classe do tema ao div principal
    <div className={`app-container ${theme}`}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}>
        <h1>Meu App</h1>
        <button onClick={toggleTheme}>
          Mudar para tema {theme === 'light' ? 'Escuro' : 'Claro'}
        </button>
      </header>

      <main style={{ padding: '1rem' }}>
        {/* Seu conteúdo de login e outros componentes podem vir aqui */}
        <p>
          Login
        </p>
        {/* Exemplo de como os logos podem ser afetados pelo tema se você adicionar estilos CSS */}
        <div>
          <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
      </main>
    </div>
  )
}

export default App
