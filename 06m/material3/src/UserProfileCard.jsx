// c:\Repo2024\MD3EmREACT\06m\material3\src\UserProfileCard.jsx
import React from 'react';
// Assuming App.css is imported globally in App.jsx or index.js,
// where the new styles will be added.
// If you prefer a separate CSS file for this component:
// import './UserProfileCard.css';

function UserProfileCard({ username, email }) {
  return (
    // Apply expressive card styling
    <div className="user-profile-card-container shape-expressive-card shadow-expressive card-enter-animation">
      <p className="login-success-text">Login bem-sucedido!</p>
      <p className="welcome-text">
        Bem-vindo(a), <strong className="font-name text-expressive-primary">{username || email}</strong>!
      </p>
    </div>
  );
}

export default UserProfileCard;