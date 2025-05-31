// c:\Repo2024\MD3EmREACT\06m\material3\src\UserProfileCard.jsx
import React from 'react';

function UserProfileCard({ username, email }) {
  return (
    <div className="success-message">
      <p>Login bem-sucedido!</p>
      <p>Bem-vindo(a), <strong>{username || email}</strong>!</p>
    </div>
  );
}

export default UserProfileCard;