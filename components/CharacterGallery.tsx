
import React from 'react';
import { Character } from '../types';
import { CharacterCard } from './CharacterCard';

interface CharacterGalleryProps {
  characters: Character[];
  onSelectCharacter: (character: Character) => void;
}

export const CharacterGallery: React.FC<CharacterGalleryProps> = ({ characters, onSelectCharacter }) => {
  return (
    <div className="mt-8">
      <h2 className="text-3xl font-orbitron tracking-wider text-center mb-8 border-b-2 border-cyan-500/30 pb-2">Elenco de Personagens</h2>
      {characters.length === 0 ? (
        <div className="text-center py-10 px-4 bg-gray-900/30 rounded-lg">
          <h3 className="text-xl font-semibold text-white">Nenhum Personagem Encontrado</h3>
          <p className="text-gray-400 mt-2">Tente ajustar seus filtros ou gere um novo personagem para começar!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {characters.map(character => (
            <CharacterCard key={character.id} character={character} onSelect={onSelectCharacter} />
          ))}
        </div>
      )}
    </div>
  );
};
