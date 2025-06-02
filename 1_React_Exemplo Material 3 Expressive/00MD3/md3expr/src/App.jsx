import { useState, useEffect } from 'react';
import './App.css';
import UserProfileCard from './UserProfileCard'; // Vamos criar este componente

function App() {
  // 1. Estado para o tema atual
  // Inicializa com o tema salvo no localStorage ou 'light' como padrão.
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });

  // Novos estados para o formulário de login e dados do usuário
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Estado para feedback de carregamento

  // 2. Efeito para aplicar o tema e salvar no localStorage
  useEffect(() => {
    // Remove classes de tema anteriores para evitar conflitos
    document.documentElement.classList.remove('light-theme', 'dark-theme', 'expressive-theme');
    // Adiciona a classe do tema atual ao elemento <html>
    document.documentElement.classList.add(`${theme}-theme`);
    // Salva a preferência do tema no localStorage
    localStorage.setItem('theme', theme);
  }, [theme]); // Este efeito roda sempre que o estado 'theme' mudar

  // 3. Função para lidar com a mudança de tema pelo select
  const handleThemeChange = (event) => {
    setTheme(event.target.value);
  };

  // 4. Função para lidar com o envio do formulário de login (agora assíncrona)
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoginError(''); // Limpa erros anteriores
    setIsLoading(true); // Ativa o estado de carregamento

    try {
      // Nota: Em uma aplicação real, você enviaria email E senha para validação.
      // O backend atual só usa o email.
      const response = await fetch(`http://localhost:3000/login?email=${encodeURIComponent(email)}`);
      if (!response.ok) {
        // Tenta ler uma mensagem de erro do backend se houver
        let errorData = 'Falha ao conectar com o servidor.';
        try {
          errorData = await response.text();
        } catch (e) {
          // Mantém a mensagem padrão se não conseguir ler o corpo do erro
        }
        throw new Error(`Erro na API: ${response.statusText} - ${errorData}`);
      }
      const data = await response.json();
      // O backend retorna um array. Se o array não estiver vazio, o usuário existe.
      // Em um cenário real, você também validaria a senha aqui ou no backend.
      if (data.length > 0) {
        // Supondo que o primeiro usuário encontrado é o correto
        // E que a senha bate (validação de senha não implementada no backend atual)
        setCurrentUser(data[0]);
        setEmail(''); // Limpa os campos após o login
        setPassword('');
      } else {
        setLoginError('Email ou senha inválidos.');
        setCurrentUser(null);
      }
    } catch (error) {
      console.error('Erro no login:', error);
      setLoginError('Erro ao tentar fazer login. Tente novamente mais tarde.');
      setCurrentUser(null);
    } finally {
      setIsLoading(false); // Desativa o estado de carregamento
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    // Opcional: Limpar localStorage específico do usuário se houver
  };

  return (
    <div className="app-container">
      <header className="app-header">

        <div className="theme-selector-container">
          <label htmlFor="theme-select" className="theme-label">Tema:</label>
          <select id="theme-select" value={theme} onChange={handleThemeChange} className="theme-select">
            <option value="light">Claro ☀️</option>
            <option value="dark">Escuro 🌙</option>
            <option value="expressive">Expressivo ✨</option>
          </select>
        </div>
      </header>

      {currentUser ? (
        <UserProfileCard user={currentUser} onLogout={handleLogout} />
      ) : (
        <div className="login-container">
          <h1 className="login-title">Login</h1>
          <p className="login-subtitle">Faça login para continuar.</p>
          
          {loginError && <p style={{ color: 'red', marginBottom: '15px' }}>{loginError}</p>}

          <form onSubmit={handleSubmit} className="form-wrapper">
            <div className="form-group">
              <label htmlFor="email">Seu Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                placeholder="exemplo@criativo.com" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Sua Senha</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                placeholder="••••••••" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            <button type="submit" className="login-button" disabled={isLoading}>
              {isLoading ? 'Entrando...' : 'Entrar na Plataforma'}
            </button>
          </form>
          
          <div className="extra-links">
            <p>Ainda não faz parte? <a href="#">Crie sua conta!</a></p>
            <p><a href="#">Esqueceu a senha?</a></p>
          </div>
        </div>
      )}

      {/* Seção de Demonstração de Componentes Expressivos Adicionais */}
      {/* Estes componentes serão estilizados pelo tema ativo, especialmente o .expressive-theme */}
      <div style={{ marginTop: '50px', borderTop: '1px solid #ccc', paddingTop: '30px', width: '100%', maxWidth: '600px', textAlign: 'center' }}>
        <h2 className="login-title" style={{ fontSize: '2em' }}>Mais Componentes Expressivos</h2>
        
        <div style={{ margin: '30px 0', display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <button className="shape-expressive-button expressive-button-primary shadow-expressive">
            Botão Primário
          </button>
          <button className="shape-expressive-button expressive-button-secondary shadow-expressive">
            Botão Contornado
          </button>
        </div>

        {/* Adaptação da notificação para usar classes de tema existentes se possível, ou defina .notification-expressive em App.css */}
        <div className="login-container" style={{ borderColor: 'var(--expressive-accent-green)', borderStyle: 'dashed', borderWidth: '2px', marginTop: '20px' }}>
          <h3 className="login-title" style={{color: 'var(--expressive-accent-green)', fontSize: '1.5em'}}>Lembrete Amigável!</h3>
          <p>Esta é uma notificação com um estilo mais solto, usando uma borda tracejada e a cor verde primavera para destaque.</p>
        </div>
      </div>

      {/* FAB - será posicionado fixamente e estilizado via App.css */}
      <button className="fab-expressive shape-expressive-fab shadow-expressive" aria-label="Adicionar novo item" title="Ação Rápida">+</button>
    </div>
  );
}

export default App;