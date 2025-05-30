import { useState, useEffect } from 'react'
import './App.css'
// index.js
import '@material/web/button/filled-button.js';
import '@material/web/textfield/filled-text-field.js';

const API_LOGIN_URL = 'http://localhost:3000/login';

function App() {
  const [textValue, setTextValue] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState('light'); // 'light' or 'dark'

  const handleLogin = async () => {
    setErrorMessage(''); // Clear previous errors
    setIsLoading(true);
    if (!email) {
      setErrorMessage("Por favor, digite seu email.");
      return;
    }
    // Basic password check (optional, as backend doesn't validate it yet)
    // if (!password) {
    //   setErrorMessage("Por favor, digite sua senha.");
    //   return;
    // }

    try {
      const response = await fetch(`${API_LOGIN_URL}?email=${encodeURIComponent(email)}`);
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
      const data = await response.json();
      if (data && data.length > 0) {
        setLoggedInUser(data[0]);
        if (data[0].username) {
          setTextValue(data[0].username);
        }
      } else {
        setErrorMessage("Email não encontrado. Verifique o email ou cadastre-se.");
        setLoggedInUser(null);
      }
    } catch (error) {
      console.error("Erro ao tentar fazer login:", error);
      setErrorMessage(`Ocorreu um erro ao tentar fazer login: ${error.message}`);
      setLoggedInUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Previne o comportamento padrão de submissão do formulário HTML
    handleLogin();
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <>
      <div className="login-container">
        <div className="theme-selector-container">
          <label htmlFor="theme-select" className="theme-selector-label"> </label>
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
        <form onSubmit={handleSubmit} className="login-form">
          <img
            src="https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo.svg"
            alt="Logotipo"
            className="login-logo"
            height="54"
            width="72"
          />
          <h1 className="login-title">Login</h1>
          <md-filled-text-field
            label="Usuario" // Este campo exibe o username após o login
            value={textValue}
            // Removido onInput para impedir a digitação pelo usuário
            readOnly={true} // Define o campo como somente leitura permanentemente
            className="user-display-field form-field" // Adicionada classe form-field
          ></md-filled-text-field>

          <md-filled-text-field
            label="Email"
            type="email"
            value={email}
            onInput={(e) => setEmail(e.target.value)} // Assume-se que o evento é 'input'
            autocomplete="username"
            className="form-field"
            disabled={isLoading || !!loggedInUser}
          ></md-filled-text-field>

          <md-filled-text-field
            label="Senha"
            type="password"
            value={password}
            onInput={(e) => setPassword(e.target.value)} // Assume-se que o evento é 'input'
            autocomplete="current-password"
            className="form-field"
            disabled={isLoading || !!loggedInUser}
          ></md-filled-text-field>

          {errorMessage && (
            <p className="error-message">{errorMessage}</p>
          )}

          {loggedInUser && !isLoading && (
            <div className="success-message">
              <p>Login bem-sucedido!</p>
              <p>Bem-vindo(a), <strong>{loggedInUser.username || email}</strong>!</p>
            </div>
          )}
          {!loggedInUser && (
            <md-filled-button
              type="submit" // Importante para o <form>
              disabled={!email || isLoading}
              className="login-button"
            >
              {isLoading ? 'Entrando...' : 'Login'}
            </md-filled-button>
          )}
        </form>
      </div>
    </>
  )
}

export default App
