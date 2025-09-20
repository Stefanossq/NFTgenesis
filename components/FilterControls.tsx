
import React from 'react';
import { SearchIcon } from './icons/SearchIcon';

export type SortOrder = 'default' | 'price_asc' | 'price_desc' | 'name_asc';

interface FilterControlsProps {
  searchTerm: string;
  sortOrder: SortOrder;
  onSearchChange: (value: string) => void;
  onSortChange: (order: SortOrder) => void;
}

const SortButton: React.FC<{
  label: string;
  order: SortOrder;
  currentOrder: SortOrder;
  onClick: (order: SortOrder) => void;
}> = ({ label, order, currentOrder, onClick }) => (
  <button
    onClick={() => onClick(order)}
    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
      currentOrder === order
        ? 'bg-cyan-500 text-black'
        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
    }`}
  >
    {label}
  </button>
);

export const FilterControls: React.FC<FilterControlsProps> = ({
  searchTerm,
  sortOrder,
  onSearchChange,
  onSortChange,
}) => {
  const handleClear = () => {
    onSearchChange('');
    onSortChange('default');
  };

  return (
    <div className="p-4 bg-gray-900/50 border border-gray-700 rounded-xl shadow-lg backdrop-blur-md mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Search Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Buscar por nome..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-gray-800 border border-gray-600 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-500/50 rounded-md py-2 pl-10 pr-4 text-white placeholder-gray-500"
          />
        </div>
        
        {/* Sorting Buttons */}
        <div className="flex flex-wrap items-center justify-start md:justify-end gap-2">
          <SortButton label="Preço: Menor" order="price_asc" currentOrder={sortOrder} onClick={onSortChange} />
          <SortButton label="Preço: Maior" order="price_desc" currentOrder={sortOrder} onClick={onSortChange} />
          <SortButton label="Nome (A-Z)" order="name_asc" currentOrder={sortOrder} onClick={onSortChange} />
          <button
            onClick={handleClear}
            className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700 hover:bg-red-500/50 rounded-md transition-colors"
            title="Limpar filtros e ordenação"
          >
            Limpar
          </button>
        </div>
      </div>
    </div>
  );
};
