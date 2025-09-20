import React from 'react';
import { Character } from '../types';
import { getPlaceholderImage } from '../constants';

interface CharacterCardProps {
  character: Character;
  onSelect: (character: Character) => void;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ character, onSelect }) => {
  const imageUrl = character.imageBase64
    ? `data:image/jpeg;base64,${character.imageBase64}`
    : getPlaceholderImage(character.id);

  return (
    <div 
      onClick={() => onSelect(character)}
      className="group bg-gray-800 rounded-lg overflow-hidden border-2 border-gray-700 hover:border-cyan-400 cursor-pointer transition-all duration-300 transform hover:-translate-y-2 shadow-lg hover:shadow-[0_0_20px_rgba(34,211,238,0.5)]"
    >
      <div className="relative aspect-square">
        <img src={imageUrl} alt={character.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-50 group-hover:opacity-10 transition-opacity duration-300"></div>
      </div>
      <div className="p-4 bg-gray-800">
        <h3 className="text-lg font-bold font-orbitron truncate text-white group-hover:text-cyan-400 transition-colors duration-300">
          {character.name}
        </h3>
        <p className="text-sm text-gray-400 font-semibold">{character.price}</p>
      </div>
    </div>
  );
};
