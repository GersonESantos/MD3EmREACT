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
  const [fetchedUsername, setFetchedUsername] = useState(null); // Para armazenar o nome do usuário vindo da API
  const [isLoading, setIsLoading] = useState(false); // Para feedback de carregamento

  // Efeito para aplicar a classe do tema ao body e salvar no localStorage
  useEffect(() => {
    document.body.className = ''; // Limpa classes anteriores
    document.body.classList.add(`${theme}-theme`);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleShowCard = async () => {
    if (emailValue.trim() === '') {
      alert('Por favor, digite um email para mostrar o cartão.');
      return;
    }

    setIsLoading(true);
    setShowProfileCard(false); // Esconde o cartão enquanto busca novos dados
    setFetchedUsername(null);  // Reseta o nome de usuário anterior

    try {
      // Simulação de chamada API - substitua pela sua lógica real se necessário
      // const response = await fetch(`http://localhost:3000/login?email=${encodeURIComponent(emailValue)}`);
      // if (!response.ok) {
      //   const errorData = await response.text();
      //   throw new Error(`Erro na API: ${response.statusText} - ${errorData}`);
      // }
      // const users = await response.json();

      // Simulação de dados para demonstração sem backend real
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simula delay da rede
      const users = emailValue.includes('test') ? [{ name: 'Usuário Teste', username: 'testuser' }] : [];


      if (users.length > 0) {
        const userNameFromDB = users[0].name || users[0].username;
        setFetchedUsername(userNameFromDB);
        setShowProfileCard(true);
      } else {
        alert('Usuário não encontrado.');
        setShowProfileCard(false);
      }
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      alert(`Não foi possível buscar o usuário: ${error.message}`);
      setShowProfileCard(false);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <>
      {/* Envolvemos todo o conteúdo em um único Fragmento pai */}
      <div style={{ marginBottom: '20px' }} className="text-center"> {/* Adicionado text-center */}
        <h1 className="expressive-header text-5xl"> {/* Alterado para h1 e adicionada a classe */}
          Login
        </h1>
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
        <input
          type="email"
          id="email"
          className="email-input"
          placeholder="Digite seu email aqui"
          value={emailValue}
          onChange={(e) => setEmailValue(e.target.value)}
        />
        <button onClick={handleShowCard} className="action-button" disabled={isLoading}>
          {isLoading ? 'Buscando...' : 'Mostrar Cartão'}
        </button>
      </div>

      {showProfileCard && <UserProfileCard email={emailValue} username={fetchedUsername} />}

      {/* Seção de Demonstração de Componentes Expressivos Adicionais */}
      {/* Estes componentes serão estilizados pelo tema ativo, especialmente o .expressive-theme */}
      <div style={{ marginTop: '50px', borderTop: '1px solid #ccc', paddingTop: '30px', width: '100%' }} className="text-center">
        <h2 className="expressive-header" style={{ fontSize: '2.5em' }}>Mais Componentes Expressivos</h2>
        
        <div style={{ margin: '30px 0', display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <button className="shape-expressive-button expressive-button-primary shadow-expressive">
            Botão Primário
          </button>
          <button className="shape-expressive-button expressive-button-secondary shadow-expressive">
            Botão Contornado
          </button>
        </div>

        <div className="notification-expressive">
          <h3 className="expressive-header">Lembrete Amigável!</h3>
          <p>Esta é uma notificação com um estilo mais solto, usando uma borda tracejada e a cor verde primavera para destaque.</p>
        </div>

      </div>

      {/* FAB - será posicionado fixamente */}
      {/* Adicionar a classe shadow-expressive ao FAB se desejar sombra nele também */}
      <button className="shape-expressive-fab shadow-expressive" aria-label="Adicionar novo item" title="Ação Rápida">
        +
      </button>
    </>
  )
}

export default App
