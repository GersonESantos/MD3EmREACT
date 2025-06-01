import React from 'react';

// Componente UserProfileCard básico como placeholder
// Certifique-se de que este arquivo exista em src/UserProfileCard.jsx

const UserProfileCard = ({ email, username }) => {
  // Determina a classe do tema com base na classe do body
  // Isso é uma simplificação; idealmente, o tema seria passado como prop ou via Context API
  // para componentes filhos profundos.
  const themeClass = document.body.className || 'light-theme';
  const isExpressive = themeClass.includes('expressive-theme');

  const cardBaseClass = "user-profile-card";
  const cardThemeClass = isExpressive ? "shape-expressive-card shadow-expressive" : "";

  return (
    <div className={`${cardBaseClass} ${cardThemeClass}`} style={{ marginTop: '30px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', maxWidth: '400px', width: '100%' }}>
      <div className={`user-avatar-container ${isExpressive ? 'mb-3' : ''}`}>
        <div 
          className={`shape-expressive-avatar ${isExpressive ? 'bg-expressive-secondary' : ''}`}
          style={!isExpressive ? { width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5em', fontFamily: "'Pacifico', cursive", color: '#333' } : {}}
        >
          {username ? username.charAt(0).toUpperCase() : email.charAt(0).toUpperCase()}
        </div>
        {username && <h2 className={`user-avatar-name ${isExpressive ? 'expressive-header' : ''}`}>{username}</h2>}
      </div>
      <p className={`${isExpressive ? 'text-lg' : ''}`}><strong>Email:</strong> {email}</p>
      <div className={`login-status-container ${isExpressive ? 'mb-3' : ''}`}>
        <span className={`status-indicator online`} style={!isExpressive ? {width: '10px', height: '10px', backgroundColor: 'green', borderRadius: '50%', marginRight: '8px'} : {}}></span>
        <span className={`${isExpressive ? 'login-success-text' : ''}`}>Login bem-sucedido!</span>
      </div>
      <p className={`${isExpressive ? 'welcome-text text-expressive-on-surface-alpha-80' : ''}`}>Bem-vindo(a) de volta!</p>
      <div className={`user-profile-actions ${isExpressive ? 'mt-4' : ''}`}>
        <button className={`${isExpressive ? 'shape-expressive-button expressive-button-primary' : 'action-button'}`}>Ver Perfil</button>
      </div>
    </div>
  );
};

export default UserProfileCard;