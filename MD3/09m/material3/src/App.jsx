import { useState } from 'react'
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

  return (
    <>
      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
          <h1 className="login-title">Login</h1>

          <md-filled-text-field
            label="Usuario" // Este campo exibe o username após o login
            value={textValue}
            onInput={(e) => !loggedInUser && setTextValue(e.target.value)} // Permite edição apenas se não estiver logado
            readOnly={!!loggedInUser}
            style={{ width: '100%', marginBottom: '10px' }}
          ></md-filled-text-field>

          <md-filled-text-field
            label="Email"
            type="email"
            value={email}
            onInput={(e) => setEmail(e.target.value)} // Assume-se que o evento é 'input'
            style={{ width: '100%', marginTop: '10px' }}
            autocomplete="username"
            disabled={isLoading || !!loggedInUser}
          ></md-filled-text-field>

          <md-filled-text-field
            label="Senha"
            type="password"
            value={password}
            onInput={(e) => setPassword(e.target.value)} // Assume-se que o evento é 'input'
            style={{ width: '100%', marginTop: '10px' }}
            autocomplete="current-password"
            disabled={isLoading || !!loggedInUser}
          ></md-filled-text-field>

          {errorMessage && (
            <p style={{ color: 'red', marginTop: '15px', textAlign: 'center' }}>{errorMessage}</p>
          )}

          {loggedInUser && !isLoading && (
            <div style={{ marginTop: '20px', padding: '15px', border: '1px solid green', borderRadius: '5px', backgroundColor: '#e6ffed', textAlign: 'center' }}>
              <p style={{ color: 'green', fontWeight: 'bold' }}>Login bem-sucedido!</p>
              <p style={{ color: '#333' }}>Bem-vindo(a), <strong>{loggedInUser.username || email}</strong>!</p>
            </div>
          )}
          {!loggedInUser && (
            <md-filled-button
              type="submit" // Importante para o <form>
              disabled={!email || isLoading}
              style={{ width: '100%', marginTop: '25px', height: '48px' }}
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
