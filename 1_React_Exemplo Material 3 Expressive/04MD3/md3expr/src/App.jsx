// No useState, reactLogo, or viteLogo needed for this static example
import './App.css'

function App() {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Em uma aplicação real, aqui você implementaria a lógica de login.
    alert('Botão Entrar clicado! (Implemente a lógica de login aqui)');
  };
  
  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <p className="login-subtitle">Desbloqueie seu potencial. Faça login para continuar.</p>
      
      <form onSubmit={handleSubmit} className="form-wrapper">
        <div className="form-group">
          <label htmlFor="email">Seu Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            placeholder="exemplo@criativo.com" 
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
            required 
          />
        </div>
        
        <button type="submit" className="login-button">
          Entrar na Plataforma
        </button>
      </form>
      
      <div className="extra-links">
        <p>Ainda não faz parte? <a href="#">Crie sua conta!</a></p>
        <p><a href="#">Esqueceu a senha?</a></p>
      </div>
    </div>
  )
}

export default App
