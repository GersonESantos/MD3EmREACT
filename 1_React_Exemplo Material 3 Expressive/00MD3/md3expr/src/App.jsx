import { useState, useEffect } from 'react';
import './App.css';

function App() {
  // 1. Estado para o tema atual
  // Inicializa com o tema salvo no localStorage ou 'light' como padrão.
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });

  // Estados para controlar os inputs do formulário e o carregamento
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    if (!email) { // Validação básica
      alert('Por favor, insira seu email.');
      return;
    }
    setIsLoading(true);

    try {
      // A rota /login no seu server.js busca pelo email.
      // A validação de senha precisaria ser implementada no backend para um app real.
      const response = await fetch(`http://localhost:3000/login?email=${encodeURIComponent(email)}`);

      if (!response.ok) {
        const errorData = await response.text(); // Tenta obter mais detalhes do erro do backend
        throw new Error(`Falha na autenticação: ${errorData || response.statusText}`);
      }

      const users = await response.json(); // O backend retorna um array de usuários

      if (users && users.length > 0) {
        // Usuário encontrado. Assumimos que o primeiro resultado é o correto.
        // O campo 'username' do seu banco é o que você quer mostrar.
        const usernameFromDB = users[0].username; 
        if (usernameFromDB) {
          alert(`Bem-vindo(a), ${usernameFromDB}!`);
        } else {
          alert('Usuário encontrado, mas o nome de usuário não está definido.');
        }
        // Opcional: Limpar campos após o "login"
        // setEmail('');
        // setPassword('');
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
  );
}

export default App;