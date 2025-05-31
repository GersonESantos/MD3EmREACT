import { useState, useEffect } from 'react'
import './App.css'

function App() {
  // Estado para controlar o tema atual, inicializando com o valor do localStorage ou 'light' como padrão
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    // Adicionando estados para o campo de email e lógica de 'disabled'
    // Estes são apenas placeholders para o exemplo funcionar como na dica.
    // Você precisará implementar a lógica real para isLoading e loggedInUser.

    return savedTheme || 'light';
  });

  // Efeito para aplicar a classe do tema ao body e salvar no localStorage
  useEffect(() => {
    document.body.className = ''; // Limpa classes anteriores
    document.body.classList.add(`${theme}-theme`);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Exemplo de estado
  const [loggedInUser, setLoggedInUser] = useState(null); // Exemplo de estado

  return (
    <>
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
          <option value="expressive">Expressivo 🎨</option>
        </select>
      </div>

      {/* Conteúdo de exemplo para o tema Expressivo */}
      <header className="app-header">
        <h1>Login</h1>
        <p className="subtitle">Explore os novos estilos vibrantes e formas acentuadas.</p>
      </header>

      <main className="app-content">
        <section className="component-showcase">
          <h2>Nossos Componentes</h2>

          <div className="expressive-card">
            <h3>Cartão Distinto</h3>
            <p>Este é um cartão com cantos bem arredondados e uma sombra colorida sutil, usando a fonte 'Inter' para o corpo do texto.</p>
            {/* Campo de e-mail adicionado aqui */}
            <md-filled-text-field
              label="Email"
              type="email"
              value={email}
              onInput={(e) => setEmail(e.target.value)} // Assume-se que o evento é 'input'
              autocomplete="username"
              className="form-field"
              disabled={isLoading || !!loggedInUser}
            ></md-filled-text-field>
            <button className="btn btn-expressive-primary">Ação Principal</button>
          </div>

          <div className="button-group">
            <button className="btn btn-expressive-primary">Botão Primário</button>
            <button className="btn btn-expressive-secondary">Botão Contornado</button>
          </div>

          <div className="fab-container">
            <button className="fab-expressive" aria-label="Adicionar novo item">
              ✨
            </button>
          </div>

          <div className="notification-expressive">
            <h4>Lembrete Criativo!</h4>
            <p>Use sua imaginação! Esta notificação tem um estilo mais solto com borda tracejada e cor de destaque.</p>
          </div>
        </section>
        <section>
          <h2>Mais um Cabeçalho</h2>
          <p>Este é um texto adicional para demonstrar a tipografia do corpo do texto com a fonte 'Inter'. O contraste entre 'Pacifico' nos cabeçalhos e 'Inter' aqui oferece uma leitura agradável e funcional.</p>
        </section>
      </main>
    </>
  )
}

export default App
