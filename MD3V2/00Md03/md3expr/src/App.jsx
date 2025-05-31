import { useState, useEffect } from 'react'
import './App.css'

function App() {
  // Estado para controlar o tema atual, inicializando com o valor do localStorage ou 'light' como padrão
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });

  // Efeito para aplicar a classe do tema ao body e salvar no localStorage
  useEffect(() => {
    document.body.className = ''; // Limpa classes anteriores
    document.body.classList.add(`${theme}-theme`);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Estados para o campo de e-mail e lógica de 'disabled'
  // Estes são exemplos. Você precisará implementar a lógica real para isLoading e loggedInUser.
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  return (
    <>
      <div>
        <p>
          Login
        </p>
        {/* Campo de e-mail adicionado abaixo de "Login" */}
        <md-filled-text-field
          label="Email"
          type="email"
          value={email}
          onInput={(e) => setEmail(e.target.value)} // Assume-se que o evento é 'input' para Web Components
          autocomplete="username"
          className="form-field"
          disabled={isLoading || !!loggedInUser}
        ></md-filled-text-field>
      </div>

      <div className="theme-selector-container">
        <label htmlFor="theme-select" className="theme-selector-label">Selecionar Tema: </label>
        <select
          id="theme-select"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="theme-selector"
        >
          <option value="light">Claro ☀️</option>
          <option value="dark">Escuro 🌙</option>
        </select>
      </div>
    </>
  )
}

export default App
