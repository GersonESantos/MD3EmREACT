import { useState, useEffect } from 'react';
import './App.css';
import UserProfileCard from './UserProfileCard'; // 1. Importar o UserProfileCard

function App() {
  // 1. Estado para o tema atual
  // Inicializa com o tema salvo no localStorage ou 'light' como padrão.
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });

  // 2. Estados para o formulário de login, dados do usuário e controle de UI
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentUser, setCurrentUser] = useState(null); // Armazenará o objeto do usuário logado
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

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
    setIsLoading(true);
    setLoginError('');
    setCurrentUser(null); // Limpa usuário anterior ao tentar novo login

    try {
      // Seu backend /login atualmente busca apenas pelo email.
      // A validação de senha precisaria ser implementada no backend para um app real.
      const response = await fetch(`http://localhost:3000/login?email=${encodeURIComponent(email)}`);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Falha na autenticação: ${errorText || response.statusText}`);
      }

      const users = await response.json();

      if (users && users.length > 0) {
        // Usuário encontrado. Em um cenário real, validaria a senha aqui ou no backend.
        // Vamos assumir que o primeiro usuário retornado é o correto.
        setCurrentUser(users[0]); // Armazena o objeto completo do usuário
        // Limpar campos do formulário após login bem-sucedido
        setEmail('');
        setPassword('');
      } else {
        setLoginError('Email ou senha inválidos.');
      }
    } catch (error) {
      console.error('Erro durante o login:', error);
      setLoginError(error.message || 'Ocorreu um erro ao tentar fazer login.');
    } finally {
      setIsLoading(false);
    }
  };

  // 5. Função para logout
  const handleLogout = () => {
    setCurrentUser(null);
    // Adicione aqui qualquer outra lógica de limpeza de sessão, se necessário
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
        // 6. Se currentUser existir, mostra o UserProfileCard
        // Adicionamos uma função auto-executável para determinar o nome de exibição aqui mesmo.
        (() => {
          // Lógica para determinar o nome de exibição principal aqui no App.jsx
          // Isso garante que App.jsx está ativamente tentando usar currentUser.name.
          let displayNameToShow = "Usuário"; // Valor padrão
          const userNameFromDB = currentUser.name; // Campo 'name' do banco
          const userEmailFromDB = currentUser.email;

          // Verifica se userNameFromDB é uma string válida e não vazia
          const trimmedUserName = userNameFromDB && typeof userNameFromDB === 'string' ? userNameFromDB.trim() : null;

          if (trimmedUserName) {
            displayNameToShow = trimmedUserName; // Usa o nome do banco
          } else {
            // Se currentUser.name (userNameFromDB) não for uma string válida e não vazia,
            // displayNameToShow permanecerá "Usuário". O email não será usado como fallback aqui.
          } 

          return (
            <UserProfileCard
              username={displayNameToShow} // Passa o nome já decidido para o UserProfileCard
              email={userEmailFromDB}      // Passa o email original (UserProfileCard pode usá-lo para o avatar inicial, por exemplo)
              onLogout={handleLogout}      // Passa a função de logout
            />
          );
        })() // A função é chamada imediatamente para renderizar o UserProfileCard
      ) : (
        // Caso contrário, mostra o formulário de login
        <div className="login-container">
          <h1 className="login-title">Login</h1>
          <p className="login-subtitle">Faça login para continuar.</p>

          {loginError && <p style={{ color: 'red', marginBottom: '15px', textAlign: 'center' }}>{loginError}</p>}

          <form onSubmit={handleSubmit} className="form-wrapper">
            <div className="form-group">
              <label htmlFor="email">Seu Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="exemplo@criativo.com"
                required
                value={email} // Controlado pelo estado
                onChange={(e) => setEmail(e.target.value)} // Atualiza o estado
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
                value={password} // Controlado pelo estado
                onChange={(e) => setPassword(e.target.value)} // Atualiza o estado
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
    </div>
  );
}

export default App;