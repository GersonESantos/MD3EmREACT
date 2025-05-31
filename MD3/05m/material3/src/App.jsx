import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// index.js
import '@material/web/button/filled-button.js';
import '@material/web/button/outlined-button.js';
import '@material/web/checkbox/checkbox.js';
import '@material/web/textfield/filled-text-field.js';

function App() {
  const [count, setCount] = useState(0)
  const [isChecked, setIsChecked] = useState(false)
  const [textValue, setTextValue] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(null);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>

        <div style={{ marginTop: '20px', marginBottom: '20px' }}>
          <md-checkbox 
            aria-label="Toggle feature"
            checked={isChecked} 
            onInput={(e) => setIsChecked(e.target.checked)}
          ></md-checkbox>
          <label style={{ marginLeft: '8px' }}> {isChecked ? 'Funcionalidade Ativada!' : 'Funcionalidade Desativada.'}</label>
        </div>

        <div style={{ marginTop: '20px', marginBottom: '20px', width: '300px' }}>
          <md-filled-text-field
            label="Usuario"
            value={textValue}
            onInput={(e) => setTextValue(e.target.value)}
            readOnly={!!loggedInUser} // Torna o campo somente leitura se o usuário estiver logado
            style={{ width: '100%' }}
          ></md-filled-text-field>
          {textValue && <p style={{ marginTop: '8px', marginBottom: '10px' }}>Olá, {textValue}!</p>}

          <md-filled-text-field
            label="Email"
            type="email"
            value={email}
            onInput={(e) => setEmail(e.target.value)}
            style={{ width: '100%', marginTop: '10px' }}
            autocomplete="username"
          ></md-filled-text-field>

          <md-filled-text-field
            label="Senha"
            type="password"
            value={password}
            onInput={(e) => setPassword(e.target.value)}
            style={{ width: '100%', marginTop: '10px' }}
            autocomplete="current-password"
          ></md-filled-text-field>
        </div>

        {loggedInUser && (
          <div style={{ marginTop: '20px', padding: '10px', border: '1px solid green', borderRadius: '5px' }}>
            <p>Login bem-sucedido!</p>
            <p>Bem-vindo(a), <strong>{loggedInUser.username || email}</strong>!</p>
            {/* Você pode exibir outros dados do usuário aqui, e.g., loggedInUser.id */}
          </div>
        )}

        <md-outlined-button onClick={() => alert('Botão "Back" clicado!')}>Back</md-outlined-button>
        <md-filled-button
          onClick={async () => {
            if (!email) {
              alert("Por favor, digite seu email.");
              return;
            }
            // A senha não é validada pelo backend atual, mas é bom tê-la para futuras implementações
            // if (!password) {
            //   alert("Por favor, digite sua senha.");
            //   return;
            // }
            try {
              const response = await fetch(`http://localhost:3000/login?email=${encodeURIComponent(email)}`);
              if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
              }
              const data = await response.json();
              if (data && data.length > 0) {
                setLoggedInUser(data[0]); // Armazena o primeiro usuário encontrado
                // Atualiza o campo "Digite seu nome" com o username do usuário logado
                if (data[0].username) {
                  setTextValue(data[0].username);
                }
              } else {
                alert("Email não encontrado. Verifique o email ou cadastre-se.");
                setLoggedInUser(null);
              }
            } catch (error) {
              console.error("Erro ao tentar fazer login:", error);
              alert(`Ocorreu um erro ao tentar fazer login: ${error.message}`);
              setLoggedInUser(null);
            }
          }}
          disabled={!email} // Habilita o botão se o email estiver preenchido
        >Login</md-filled-button>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
