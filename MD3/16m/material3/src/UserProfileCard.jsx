import React from 'react';

const UserProfileCard = ({ user }) => {
  if (!user) return null;

  const displayName = user.username || user.email;
  const avatarInitial = displayName ? displayName.charAt(0).toUpperCase() : 'U';
  // In a real app, avatarColor and bio might come from user data or be generated
  const avatarColor = user.avatarColor || "bg-pink-400"; // Default color
  const bio = user.bio || "Bem-vindo(a)! Seu perfil está em destaque.";
  const status = user.status || "Online";
  const statusIndicator = status === "Online" ? "bg-green-400" : (status === "Ausente" ? "bg-yellow-400" : "bg-gray-400");

  const handleViewProfile = () => {
    // Replace with actual navigation or modal logic if needed
    alert(`Visualizando perfil de ${displayName}...`);
  };

  const handleConnect = () => {
    // Replace with actual connection logic
    alert(`Pedido de conexão enviado para ${displayName}!`);
  };

  return (
    <div className="bg-white shape-expressive-card shadow-expressive p-6 flex flex-col items-center text-center card-enter-animation w-full max-w-sm">
      {/*
        Corrected ring-offset-color. Since the card background is white, ring-offset-white is appropriate.
        The previous ring-offset-${avatarColor}/50 was not a valid Tailwind class.
      */}
      <div className={`w-24 h-24 ${avatarColor} shape-expressive-avatar flex items-center justify-center text-4xl text-white font-name mb-4 ring-4 ring-white ring-offset-2 ring-offset-white`}>
        {avatarInitial}
      </div>
      <h3 className="font-name text-2xl text-expressive-primary mb-1">
        {displayName}
      </h3>
      <p className="text-xs text-gray-500 mb-3 flex items-center justify-center">
        <span className={`w-2 h-2 ${statusIndicator} rounded-full mr-1.5`}></span>
        {status}
      </p>
      <p className="text-sm text-expressive-on-surface/70 mb-5 leading-relaxed">
        {bio}
      </p>
      <div className="flex space-x-3 mt-auto w-full">
        <button
          className="flex-1 bg-expressive-primary text-white font-semibold py-2.5 px-4 shape-expressive-button hover:bg-opacity-80 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-expressive-primary focus:ring-offset-2"
          onClick={handleViewProfile}
        >
          Ver Perfil
        </button>
        <button
          className="flex-1 border-2 border-expressive-secondary text-expressive-secondary font-semibold py-2.5 px-4 shape-expressive-button hover:bg-expressive-secondary/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-expressive-secondary focus:ring-offset-1"
          onClick={handleConnect}
        >
          Conectar
        </button>
      </div>
    </div>
  );
};

export default UserProfileCard;