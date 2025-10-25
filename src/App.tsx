import { useState, useEffect } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useTrackerStore } from './store/trackerStore';
import { EntrancesTable } from './components/EntrancesTable';
import { ChecksTable } from './components/ChecksTable';
import { Stats } from './components/Stats';
import { ImportExport } from './components/ImportExport';
import { Pathfinder } from './components/Pathfinder';
import { BetaBanner } from './components/BetaBanner';
import { SEED_INFO } from './data/constants';
import type { TabType } from './types';
import packageJson from '../package.json';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('checks');
  const darkMode = useTrackerStore((state) => state.darkMode);
  const toggleDarkMode = useTrackerStore((state) => state.toggleDarkMode);

  // Initialize dark mode on mount
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const tabs: { id: TabType; label: string; badge?: string }[] = [
    { id: 'checks', label: 'Checks' },
    { id: 'entrances', label: 'Entrances' },
    {
      id: 'pathfinder',
      label: 'Pathfinder',
      badge: packageJson.appStatus?.features?.pathfinder
    },
    { id: 'stats', label: 'Statistics' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <BetaBanner />
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                OoT Randomizer Tracker
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Allsanity Tracker
              </p>
            </div>

            <div className="flex items-center gap-4">
              <ImportExport />

              <button
                onClick={toggleDarkMode}
                className="p-3 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mt-6 border-b border-gray-200 dark:border-gray-700">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 font-medium transition-colors flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                {tab.label}
                {tab.badge && (
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    tab.badge === 'alpha'
                      ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  }`}>
                    {tab.badge.toUpperCase()}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'checks' && <ChecksTable />}
        {activeTab === 'entrances' && <EntrancesTable />}
        {activeTab === 'pathfinder' && <Pathfinder />}
        {activeTab === 'stats' && <Stats />}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 shadow mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            OoT Randomizer Allsanity Tracker - {SEED_INFO.totalChecks} checks, {SEED_INFO.totalEntrances} entrances
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
