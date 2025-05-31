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
          <option value="expressive">Expressivo ✨</option>
        </select>
      </div>

      {/* Caixa de email */}
      <div className="email-input-container">
        <label htmlFor="email" className="email-input-label">Email:</label>
        <input type="email" id="email" className="email-input" placeholder="Digite seu email aqui" />
      </div>

      {/* Seção de Componentes Expressivos */}
      {/* Esta seção será estilizada globalmente se o 'expressive-theme' estiver ativo no body */}
      <div className="expressive-components-container" style={{ marginTop: '40px', paddingTop: '20px' }}>
        <h1 className="expressive-header">Bem-vindo ao Estilo Expressivo!</h1>
        <p style={{ fontFamily: 'Inter, sans-serif', marginBottom: '30px' }}>
          Explore os componentes abaixo com a tipografia e cores vibrantes.
        </p>

        <div className="shape-expressive-card shadow-expressive">
          <h2 className="expressive-header">Cartão Criativo</h2>
          <p>Este cartão demonstra cantos arredondados e uma sombra colorida, usando a fonte 'Inter' para o corpo do texto.</p>
          <div style={{ marginTop: '20px' }}>
            <button className="shape-expressive-button btn-expressive-primary shadow-expressive" style={{ marginRight: '15px' }}>
              Ação Principal
            </button>
            <button className="shape-expressive-button btn-expressive-secondary">
              Saber Mais
            </button>
          </div>
        </div>

        <div className="notification-expressive">
          <h3 className="expressive-header">Alerta Divertido!</h3>
          <p>Uma notificação com borda tracejada verde e um toque mais descontraído.</p>
        </div>
      </div>

      <button className="shape-expressive-fab fab-expressive shadow-expressive" aria-label="Adicionar novo item">
        +
      </button>
    </>
  )
}

export default App
