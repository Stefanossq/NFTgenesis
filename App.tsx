
import React, { useState, useCallback, useMemo } from 'react';
import { Header } from './components/Header';
import { GeneratorControls } from './components/GeneratorControls';
import { CharacterGallery } from './components/CharacterGallery';
import { CharacterDetailModal } from './components/CharacterDetailModal';
import { FilterControls, SortOrder } from './components/FilterControls';
import { generateCharacterImage, generateCharacterStory } from './services/geminiService';
import { Character } from './types';
import { PRELOADED_CHARACTERS } from './constants';

const App: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>(PRELOADED_CHARACTERS);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('default');

  const handleGenerateCharacter = useCallback(async (prompt: string) => {
    setIsLoading(true);
    setError(null);
    setSearchTerm('');
    setSortOrder('default');
    try {
      const imageBase64 = await generateCharacterImage(prompt);
      const { name, story } = await generateCharacterStory(prompt, imageBase64);
      
      const newCharacter: Character = {
        id: `gen-${Date.now()}`,
        name: name,
        prompt: prompt,
        imageBase64: imageBase64,
        story: story,
        price: `${(Math.random() * 5 + 0.5).toFixed(2)} ETH`,
      };

      setCharacters(prev => [newCharacter, ...prev]);

    } catch (err) {
      console.error("Falha ao gerar personagem:", err);
      setError("Falha ao gerar personagem. A IA pode estar ocupada. Por favor, tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSelectCharacter = (character: Character) => {
    setSelectedCharacter(character);
  };

  const handleCloseModal = () => {
    setSelectedCharacter(null);
  };

  const filteredAndSortedCharacters = useMemo(() => {
    return characters
      .filter(character => 
        character.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        switch (sortOrder) {
          case 'price_asc':
            return parseFloat(a.price) - parseFloat(b.price);
          case 'price_desc':
            return parseFloat(b.price) - parseFloat(a.price);
          case 'name_asc':
            return a.name.localeCompare(b.name);
          case 'default':
          default:
            return 0;
        }
      });
  }, [characters, searchTerm, sortOrder]);


  return (
    <div className="min-h-screen animated-bg text-white selection:bg-cyan-400 selection:text-black">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <GeneratorControls onGenerate={handleGenerateCharacter} isLoading={isLoading} />
        
        {error && (
          <div className="my-4 p-4 bg-red-900/50 border border-red-500 text-red-200 rounded-lg text-center backdrop-blur-sm">
            <p>{error}</p>
          </div>
        )}
        
        <FilterControls 
          searchTerm={searchTerm}
          sortOrder={sortOrder}
          onSearchChange={setSearchTerm}
          onSortChange={setSortOrder}
        />

        <CharacterGallery characters={filteredAndSortedCharacters} onSelectCharacter={handleSelectCharacter} />
      </main>
      
      {selectedCharacter && (
        <CharacterDetailModal character={selectedCharacter} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default App;
