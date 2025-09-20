import React from 'react';
import { Character } from '../types';
import { getPlaceholderImage } from '../constants';
import { CloseIcon } from './icons/CloseIcon';

interface CharacterDetailModalProps {
  character: Character;
  onClose: () => void;
}

export const CharacterDetailModal: React.FC<CharacterDetailModalProps> = ({ character, onClose }) => {
  const imageUrl = character.imageBase64
    ? `data:image/jpeg;base64,${character.imageBase64}`
    : getPlaceholderImage(character.id);

  return (
    <div 
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div 
        className="bg-gray-900 border border-cyan-400/30 rounded-xl shadow-2xl shadow-[0_0_25px_rgba(34,211,238,0.2)] w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row overflow-hidden animate-fade-in-up"
        onClick={e => e.stopPropagation()}
      >
        <div className="w-full md:w-1/2 relative">
          <img src={imageUrl} alt={character.name} className="w-full h-full object-cover" />
        </div>
        <div className="w-full md:w-1/2 p-6 flex flex-col overflow-y-auto">
          <div className="flex-grow">
            <h2 className="text-3xl font-orbitron font-bold text-cyan-400 mb-2">{character.name}</h2>
            <p className="text-lg font-bold text-white mb-4">{character.price}</p>
            <p className="italic text-gray-400 mb-4 text-sm">Comando: "{character.prompt}"</p>
            <div className="prose prose-invert text-gray-300 max-w-none">
              <h3 className="text-xl font-orbitron text-gray-100 border-b border-gray-700 pb-1 mb-2">História</h3>
              <p className="whitespace-pre-wrap">{character.story}</p>
            </div>
          </div>
          <div className="mt-6 flex-shrink-0">
            <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold py-3 px-6 rounded-md transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-[0_0_20px_rgba(8,145,178,0.7)]">
              Comprar NFT
            </button>
          </div>
        </div>
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
          aria-label="Fechar modal"
        >
          <CloseIcon className="w-8 h-8" />
        </button>
      </div>
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};
