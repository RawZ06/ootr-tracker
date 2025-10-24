import { useState, useRef, useEffect } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';

interface GroupedSearchableSelectProps {
  value: string;
  onChange: (value: string) => void;
  groupedOptions: Record<string, readonly string[]>;
  placeholder?: string;
  className?: string;
}

export function GroupedSearchableSelect({
  value,
  onChange,
  groupedOptions,
  placeholder = 'Select...',
  className = '',
}: GroupedSearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter options based on search across all categories
  const filteredGroups: Record<string, string[]> = {};

  for (const [category, items] of Object.entries(groupedOptions)) {
    const filtered = items.filter((item) =>
      item.toLowerCase().includes(search.toLowerCase()) ||
      category.toLowerCase().includes(search.toLowerCase())
    );
    if (filtered.length > 0) {
      filteredGroups[category] = filtered;
    }
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearch('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
    setSearch('');
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('');
  };

  // Count total filtered results
  const totalResults = Object.values(filteredGroups).reduce(
    (sum, items) => sum + items.length,
    0
  );

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Display / Trigger */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="input-field cursor-pointer flex items-center justify-between min-h-[40px]"
      >
        <span className={value ? 'text-gray-900 dark:text-gray-100' : 'text-gray-400'}>
          {value || placeholder}
        </span>
        <div className="flex items-center gap-2">
          {value && (
            <button
              onClick={handleClear}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <FaTimes size={14} />
            </button>
          )}
          <FaSearch size={14} className="text-gray-400" />
        </div>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-96 overflow-hidden">
          {/* Search Input */}
          <div className="p-2 border-b border-gray-200 dark:border-gray-700">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Type to search..."
              className="input-field w-full"
              autoFocus
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {/* Options List */}
          <div className="overflow-y-auto max-h-80">
            {Object.keys(filteredGroups).length === 0 ? (
              <div className="p-3 text-center text-gray-500 dark:text-gray-400">
                No results found
              </div>
            ) : (
              Object.entries(filteredGroups).map(([category, items]) => (
                <div key={category}>
                  {/* Category Header */}
                  <div className="sticky top-0 bg-gray-100 dark:bg-gray-700 px-3 py-2 text-sm font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600">
                    {category}
                    <span className="ml-2 text-xs font-normal text-gray-500 dark:text-gray-400">
                      ({items.length})
                    </span>
                  </div>

                  {/* Category Items */}
                  {items.map((option) => (
                    <div
                      key={option}
                      onClick={() => handleSelect(option)}
                      className={`px-4 py-2 cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900 ${
                        value === option
                          ? 'bg-blue-50 dark:bg-blue-900 font-semibold'
                          : ''
                      }`}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              ))
            )}
          </div>

          {/* Results count */}
          {search && (
            <div className="p-2 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400">
              {totalResults} result{totalResults !== 1 ? 's' : ''} in {Object.keys(filteredGroups).length} categor{Object.keys(filteredGroups).length !== 1 ? 'ies' : 'y'}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
