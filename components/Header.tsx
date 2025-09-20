import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="py-6 border-b border-cyan-400/20">
      <div className="container mx-auto px-4 text-center">
        <h1 
          className="text-4xl md:text-5xl font-bold font-orbitron tracking-widest uppercase"
          style={{ textShadow: '0 0 8px rgba(0, 255, 255, 0.6), 0 0 16px rgba(0, 255, 255, 0.4), 0 0 24px rgba(0, 255, 255, 0.2)' }}
        >
          AI NFT <span className="text-cyan-400">Genesis</span>
        </h1>
        <p className="mt-2 text-gray-400">Sua Forja Pessoal de Personagens de IA</p>
      </div>
    </header>
  );
};
