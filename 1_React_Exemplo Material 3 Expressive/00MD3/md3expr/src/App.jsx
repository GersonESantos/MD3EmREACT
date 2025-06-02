import { useState, useEffect } from 'react';
import './App.css';

function App() {
  // 1. Estado para o tema atual
  // Inicializa com o tema salvo no localStorage ou 'light' como padrão.
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });

  // Estados para controlar os inputs do formulário e o estado de carregamento
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // Mantido para estrutura do formulário, mas não usado no fetch atual
  const [isLoading, setIsLoading] = useState(false);

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
    if (!email) { // Validação básica para o email
      alert('Por favor, insira seu email.');
      return;
    }
    setIsLoading(true);

    try {
      // Seu backend server.js deve ter uma rota /login que aceita o email como query param
      // Exemplo: GET /login?email=usuario@exemplo.com
      // IMPORTANTE: Em uma aplicação real, a senha também seria enviada (de forma segura, via POST)
      // e validada no backend. O backend atual busca apenas pelo email.
      const response = await fetch(`http://localhost:3000/login?email=${encodeURIComponent(email)}`);

      if (!response.ok) {
        const errorData = await response.text(); // Tenta obter mais detalhes do erro
        throw new Error(`Falha na autenticação: ${errorData || response.statusText}`);
      }

      const users = await response.json(); // O backend deve retornar um array de usuários

      if (users && users.length > 0) {
        // Usuário encontrado. Assumimos que o primeiro é o correto.
        // O campo 'username' do seu banco de dados é o que queremos mostrar.
        const usernameFromDB = users[0].username; 
        if (usernameFromDB) {
          alert(`Bem-vindo(a), ${usernameFromDB}!`);
        } else {
          alert('Usuário encontrado, mas o nome de usuário (username) não está definido no banco.');
        }
      } else {
        alert('Usuário não encontrado. Verifique seu email.');
      }
    } catch (error) {
      console.error("Erro durante o login:", error);
      alert(`Erro ao tentar fazer login: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
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
       <div className="login-container">
      <h1 className="login-title">Login</h1>
      <p className="login-subtitle">Faça login para continuar.</p>
      
      <form onSubmit={handleSubmit} className="form-wrapper">
        <div className="form-group">
          <label htmlFor="email">Seu Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            placeholder="exemplo@criativo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Sua Senha</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
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
    </div>
  );
}

export default App;
