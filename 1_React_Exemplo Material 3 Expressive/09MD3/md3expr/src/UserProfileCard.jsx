// c:\Repo2024\MD3EmREACT\MD3V2\00Md03\md3expr\src\UserProfileCard.jsx
import React from 'react';
import './UserProfileCard.css'; // Importa o CSS específico do componente

function UserProfileCard({ username, email, onLogout }) {
  // Lógica aprimorada para determinar o nome de exibição
  let finalDisplayName;

  // Prioriza um username válido (não nulo, não apenas espaços em branco)
  const trimmedUsername = username && typeof username === 'string' ? username.trim() : null;

  if (trimmedUsername) {
    finalDisplayName = trimmedUsername;
  } else if (email && typeof email === 'string') {
    // Se não houver username válido, tente extrair a parte antes do "@" do email
    const emailParts = email.split('@');
    const emailUserPart = emailParts[0] ? emailParts[0].trim() : '';
    if (emailUserPart) {
      finalDisplayName = emailUserPart;
    } else {
      finalDisplayName = email; // Fallback para o email completo se a parte do usuário for vazia
    }
  } else {
    finalDisplayName = "Usuário"; // Default se nenhum username ou email válido for fornecido
  }

  const avatarInitial = finalDisplayName ? finalDisplayName.charAt(0).toUpperCase() : '?';
  return (
    // Apply expressive card styling
    <div className="user-profile-card-wrapper"> {/* Added a wrapper for better structure if needed */}
      {/* Header from index.html example */}
      <header className="text-center mb-8">
        <h1 className="font-display text-5xl text-expressive-primary mb-3">Nossa Comunidade</h1>
        <p className="text-lg text-expressive-on-surface-alpha-80">Conheça os membros incríveis!</p>
      </header>

      {/* Existing content, now styled as part of the card */}
      <div className="user-profile-card-container shape-expressive-card shadow-expressive card-enter-animation">
        {/* Avatar Element */}
        <div className="user-avatar-container">
          <div className="user-avatar shape-expressive-avatar bg-expressive-secondary font-name">
            {avatarInitial}
          </div>
          {/* Display the full name/email below the avatar */}
          <h3 className="user-avatar-name font-name text-expressive-primary">
            {finalDisplayName}
          </h3>
        </div>
        <div className="login-status-container">
          <span className="status-indicator online"></span>
          <p className="login-success-text">Login bem-sucedido!</p>
        </div>
        <p className="welcome-text">
          Bem-vindo(a), <strong className="font-name text-expressive-primary">{finalDisplayName}</strong>!
        </p>

        {/* Action Buttons Area */}
        <div className="user-profile-actions">
          <button className="expressive-button expressive-button-primary shape-expressive-button">
            Ver Perfil
          </button>
          {/* Adicionando o botão Voltar/Sair que utiliza a prop onLogout */}
          {onLogout && (
            <button onClick={onLogout} className="expressive-button expressive-button-secondary shape-expressive-button" style={{ marginLeft: '10px' }}>
              Voltar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfileCard;