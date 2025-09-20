import React, { useState } from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

interface GeneratorControlsProps {
  onGenerate: (prompt: string) => void;
  isLoading: boolean;
}

const STYLE_HELPERS = [
  'Fantasia Épica',
  'Cyberpunk',
  'Estilo Anime',
  'Ficção Científica',
  'Realista',
  'Aquarela',
  'Arte Conceitual',
];

export const GeneratorControls: React.FC<GeneratorControlsProps> = ({ onGenerate, isLoading }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isLoading) {
      onGenerate(prompt);
    }
  };

  const addStyleToPrompt = (style: string) => {
    setPrompt(prev => prev ? `${prev}, ${style.toLowerCase()}` : style);
  };

  return (
    <div className="my-8 p-6 bg-gray-900/50 border border-gray-700 rounded-xl shadow-lg backdrop-blur-md">
      <form onSubmit={handleSubmit}>
        <label htmlFor="prompt" className="block text-xl font-orbitron mb-3 text-cyan-300">
          Descreva Seu Personagem
        </label>
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            id="prompt"
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ex: Guerreira celestial com asas de anjo e espada de luz"
            className="flex-grow bg-gray-900 border border-gray-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/50 rounded-md py-3 px-4 text-white placeholder-gray-500 transition-all duration-300 outline-none"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !prompt.trim()}
            className="flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 disabled:bg-gray-600 disabled:cursor-not-allowed text-black font-bold py-3 px-6 rounded-md transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-md hover:shadow-[0_0_15px_rgba(34,211,238,0.6)]"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-t-transparent border-black rounded-full animate-spin"></div>
                Gerando...
              </>
            ) : (
              <>
                <SparklesIcon className="w-6 h-6" />
                Gerar
              </>
            )}
          </button>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-sm text-gray-400 self-center mr-2">Ajudantes de Estilo:</span>
            {STYLE_HELPERS.map(style => (
                <button
                    key={style}
                    type="button"
                    onClick={() => addStyleToPrompt(style)}
                    className="px-3 py-1 bg-gray-800 border border-gray-600 rounded-full text-xs text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                    disabled={isLoading}
                >
                    + {style}
                </button>
            ))}
        </div>
      </form>
    </div>
  );
};
