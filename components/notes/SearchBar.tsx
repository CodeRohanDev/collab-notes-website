import { Search, X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder = 'Search...' }: SearchBarProps) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(localValue);
    }, 300);

    return () => clearTimeout(timer);
  }, [localValue]);

  const handleClear = () => {
    setLocalValue('');
    onChange('');
  };

  return (
    <div className="relative group">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors duration-200" />
      <input
        type="text"
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-12 pr-12 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200 text-gray-900 placeholder-gray-400"
      />
      {localValue && (
        <button
          onClick={handleClear}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-all duration-200"
        >
          <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
        </button>
      )}
    </div>
  );
}
