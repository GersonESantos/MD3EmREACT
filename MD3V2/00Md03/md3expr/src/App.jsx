import { useState, useEffect } from 'react'
import './App.css'
import UserProfileCard from './UserProfileCard'; // Importar o UserProfileCard

function App() {
  // Estado para controlar o tema atual, inicializando com o valor do localStorage ou 'light' como padrão
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });

  // Estado para o valor do email e para controlar a visibilidade do cartão
  const [emailValue, setEmailValue] = useState('');
  const [showProfileCard, setShowProfileCard] = useState(false);

  // Efeito para aplicar a classe do tema ao body e salvar no localStorage
  useEffect(() => {
    document.body.className = ''; // Limpa classes anteriores
    document.body.classList.add(`${theme}-theme`);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleShowCard = () => {
    if (emailValue.trim() !== '') {
      setShowProfileCard(true);
    } else {
      alert('Por favor, digite um email para mostrar o cartão.');
      // setShowProfileCard(false); // Opcional: esconder o cartão se o email estiver vazio ao clicar
    }
  };

  return (
    <>
      {/* Envolvemos todo o conteúdo em um único Fragmento pai */}
      <div>
        <p>
          Login
        </p>
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

      {/* Caixa de email */}
      <div className="email-input-container">
        <label htmlFor="email" className="email-input-label">Email:</label>
        <input
          type="email"
          id="email"
          className="email-input"
          placeholder="Digite seu email aqui"
          value={emailValue}
          onChange={(e) => setEmailValue(e.target.value)}
        />
        <button onClick={handleShowCard} className="action-button">
          Mostrar Cartão
        </button>
      </div>

      {showProfileCard && <UserProfileCard email={emailValue} />}
    </>
  )
}

export default App
