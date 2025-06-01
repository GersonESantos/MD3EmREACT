// Imports desnecessários removidos para este exemplo minimalista
import { useState, useEffect } from 'react';
import './App.css'

function App() {
  // Estado para o tema atual, inicializado do localStorage ou como 'light'
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });

  // Efeito para atualizar o atributo data-theme no HTML e salvar no localStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Função para alternar o tema
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="app-container">
      <header className="app-header">
        {/* Aplicando uma classe para o estilo expressivo do título */}
        <h1 className="expressive-login-title">
          Login
        </h1>
        <button onClick={toggleTheme} className="theme-toggle-button">
          Alternar para tema {theme === 'light' ? 'Escuro' : 'Claro'}
        </button>
      </header>
      {/* Outro conteúdo do aplicativo pode vir aqui */}
    </div>
  )
}

export default App
