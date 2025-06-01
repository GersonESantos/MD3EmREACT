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

  const handleSubmit = (event) => {
    event.preventDefault();
    // Lógica de submissão do formulário aqui
    console.log('Formulário enviado!');
    // Exemplo de como pegar os valores:
    // const email = event.target.email.value;
    // const password = event.target.password.value;
    // console.log('Email:', email, 'Senha:', password);
    alert('Formulário enviado! Verifique o console para mais detalhes.');
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="login-title">Login</h1>
         <p className="login-subtitle">Desbloqueie seu potencial. Faça login para continuar.</p>
        <div className="theme-selector-container">
          <label htmlFor="theme-select" className="theme-label">Tema:</label>
          <select id="theme-select" value={theme} onChange={handleThemeChange} className="theme-select">
            <option value="light">Claro ☀️</option>
            <option value="dark">Escuro 🌙</option>
            <option value="expressive">Expressivo ✨</option>
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

      {/* Você pode adicionar links extras aqui, se necessário */}
      {/* <div className="extra-links">...</div> */}
    </div>
  );
}

export default App;