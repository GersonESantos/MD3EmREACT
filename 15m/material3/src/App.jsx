import { useState, useEffect } from 'react'
import './App.css'
// index.js
import '@material/web/button/filled-button.js';
import '@material/web/textfield/filled-text-field.js';
import UserProfileCard from './UserProfileCard'; // Import the new component

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

  useEffect(() => {
    if (loggedInUser) {
      document.body.classList.add('bg-expressive-surface', 'text-expressive-on-surface');
    } else {
      document.body.classList.remove('bg-expressive-surface', 'text-expressive-on-surface');
    }
    // Cleanup on component unmount or when loggedInUser changes back
    return () => {
      document.body.classList.remove('bg-expressive-surface', 'text-expressive-on-surface');
    };
  }, [loggedInUser]);

  const handleLogout = () => {
    setLoggedInUser(null);
    setEmail('');
    setPassword('');
    setTextValue(''); // Clear the displayed username from the old field
    setErrorMessage('');
  };

  return (
    <>
      <div className={`app-main-container ${loggedInUser ? 'profile-view-active' : 'login-view-active'}`}>
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

        {!loggedInUser ? (
          <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
              <img
                src="https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo.svg"
                alt="Logotipo"
                className="login-logo"
                height="54"
                width="72"
              />
              <h1 className="login-title">Login</h1>
              {/* O campo de usuário read-only é removido pois o perfil mostrará o nome */}
              {/* <md-filled-text-field
                label="Usuario"
                value={textValue}
                readOnly={true}
                className="user-display-field form-field"
              ></md-filled-text-field> */}

              <md-filled-text-field
                label="Email"
                type="email"
                value={email}
                onInput={(e) => setEmail(e.target.value)}
                autocomplete="username"
                className="form-field"
                disabled={isLoading}
              ></md-filled-text-field>

              <md-filled-text-field
                label="Senha"
                type="password"
                value={password}
                onInput={(e) => setPassword(e.target.value)}
                autocomplete="current-password"
                className="form-field"
                disabled={isLoading}
              ></md-filled-text-field>

              {errorMessage && (
                <p className="error-message">{errorMessage}</p>
              )}

              <md-filled-button
                type="submit"
                disabled={!email || isLoading}
                className="login-button"
              >
                {isLoading ? 'Entrando...' : 'Login'}
              </md-filled-button>
            </form>
          </div>
        ) : (
          !isLoading && (
            <div className="profile-view-container w-full min-h-[calc(100vh-80px)] flex flex-col items-center justify-center p-4 sm:p-8"> {/* Adjusted min-height for theme selector */}
              <div className="w-full max-w-md space-y-10 text-center">
                <header className="mb-8">
                  <h1 className="font-display text-5xl sm:text-7xl text-expressive-primary mb-3">Perfil em Destaque</h1>
                  <p className="text-lg text-expressive-on-surface/80">Conheça um membro incrível!</p>
                </header>
                <div className="flex justify-center">
                  <UserProfileCard user={loggedInUser} />
                </div>
                <md-filled-button onClick={handleLogout} className="logout-button mt-8">
                  Logout
                </md-filled-button>
              </div>
            </div>
          )
        )}
        {isLoading && <p className="loading-message">Carregando...</p>}
      </div>
    </>
  )
}

export default App
