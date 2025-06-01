import { useState, useEffect } from 'react';
import './App.css';

function App() {
  // 1. Estado para o tema atual
  // Inicializa com o tema salvo no localStorage ou 'light' como padrão.
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });

  // 2. Efeito para aplicar o tema e salvar no localStorage
  useEffect(() => {
    // Remove classes de tema anteriores para evitar conflitos
    document.documentElement.classList.remove('light-theme', 'dark-theme', 'expressive-theme');
    // Adiciona a classe do tema atual ao elemento <html>
    document.documentElement.classList.add(`${theme}-theme`);
    // Salva a preferência do tema no localStorage
    localStorage.setItem('theme', theme);
  }, [theme]); // Este efeito roda sempre que o estado 'theme' mudar

  // 3. Função para lidar com a mudança de tema pelo select
  const handleThemeChange = (event) => {
    setTheme(event.target.value);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="login-title">Login</h1>
        <p className="login-subtitle">Desbloqueie seu potencial. Faça login para continuar.</p>
      <form className="form-wrapper">
        <div className="form-group">
          <label htmlFor="email">Seu Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="   
            </form>
        <div className="theme-selector-container">
          <label htmlFor="theme-select" className="theme-label">Tema:</label>
          <select id="theme-select" value={theme} onChange={handleThemeChange} className="theme-select">
            <option value="light">Claro ☀️</option>
            <option value="dark">Escuro 🌙</option>
            <option value="expressive">Expressivo ✨</option>
          </select>
        </div>
      </header>
      {/* Aqui você poderia adicionar mais conteúdo da sua página de login */}
    </div>
  );
}

export default App;