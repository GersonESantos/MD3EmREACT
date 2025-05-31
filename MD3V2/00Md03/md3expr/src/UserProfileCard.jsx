// c:\Repo2024\MD3EmREACT\MD3V2\00Md03\md3expr\src\UserProfileCard.jsx
import React from 'react';
// Assuming App.css is imported globally in App.jsx or index.js,
// where the new styles will be added.
// If you prefer a separate CSS file for this component:
// import './UserProfileCard.css';

function UserProfileCard({ username, email }) {
  const displayName = username || email;
  const avatarInitial = displayName ? displayName.charAt(0).toUpperCase() : '?';
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
            {displayName}
          </h3>
        </div>
        <div className="login-status-container">
          <span className="status-indicator online"></span>
          <p className="login-success-text">Login bem-sucedido!</p>
        </div>
        <p className="welcome-text">
          Bem-vindo(a), <strong className="font-name text-expressive-primary">{username || email}</strong>!
        </p>

        {/* Action Buttons Area */}
        <div className="user-profile-actions">
          <button className="expressive-button expressive-button-primary shape-expressive-button">
            Ver Perfil
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserProfileCard;