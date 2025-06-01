import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [theme, setTheme] = useState('light-theme'); // 'light-theme', 'dark-theme', 'expressive-theme'

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const handleThemeChange = (event) => {
    setTheme(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Lógica de submissão do formulário aqui
    console.log('Formulário enviado!');
    // Exemplo:
    // const email = event.target.email.value;
    // const password = event.target.password.value;
    // console.log({ email, password });
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="login-title">Bem-vindo!</h1>
        <div className="theme-selector-container">
          <label htmlFor="theme-select" className="theme-label">Escolha um tema:</label>
          <select id="theme-select" value={theme} onChange={handleThemeChange} className="theme-select">
            <option value="light-theme">Tema Claro</option>
            <option value="dark-theme">Tema Escuro</option>
            <option value="expressive-theme">Tema Expressivo</option>
          </select>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="form-wrapper">
        <div className="form-group">
          <label htmlFor="email">Seu Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="exemplo@criativo.com"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Sua Senha</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="••••••••"
            required
          />
        </div>

        <button type="submit" className="login-button">
          Entrar na Plataforma
        </button>
      </form>
    </div>
  );
}

export default App;