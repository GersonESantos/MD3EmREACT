// Imports desnecessários removidos para este exemplo minimalista
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  // Estado para o tema atual, inicializado do localStorage ou como 'light'
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light'; // Padrão para 'light'
  });

  // Efeito para atualizar o atributo data-theme no HTML e salvar no localStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Função para lidar com a mudança de tema pelo select
  const handleThemeChange = (event) => {
    setTheme(event.target.value);
  };

  return (
    <div className="app-container">
      <div className="theme-switcher-container">
        <label htmlFor="theme-select">Tema:</label>
        <select id="theme-select" value={theme} onChange={handleThemeChange}>
          <option value="light">Claro ☀️</option>
          <option value="dark">Escuro 🌙</option>
          <option value="expressive">Expressivo ✨</option>
        </select>
      </div>
      <h1 className="expressive-login-title">
        Login
      </h1>
    </div>
  );
}

export default App;
