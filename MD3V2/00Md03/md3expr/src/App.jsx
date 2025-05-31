import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
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
    </>
  )
}

export default App
