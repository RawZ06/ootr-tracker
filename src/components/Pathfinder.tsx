import { useState, useMemo } from 'react';
import { useTrackerStore } from '../store/trackerStore';
import { REGIONS } from '../data/constants';
import type { Entrance } from '../types';
import packageJson from '../../package.json';

interface PathStep {
  from: string;
  to: string;
  entrance: string;
  destination: string;
  type: string;
}

export function Pathfinder() {
  const entrances = useTrackerStore((state) => state.entrances);
  const [startArea, setStartArea] = useState<string>('');
  const [endArea, setEndArea] = useState<string>('');
  const [path, setPath] = useState<PathStep[] | null>(null);
  const [error, setError] = useState<string>('');

  const featureStatus = packageJson.appStatus?.features?.pathfinder;

  // Helper function to extract area from entrance name for pathfinding
  const extractAreaFromEntranceName = (entrancePart: string): string => {
    // Area code prefixes
    const areaPrefixes = ['KF', 'LW', 'SFM', 'HF', 'LLR', 'Market', 'ToT', 'HC', 'OGC',
      'Kak', 'GY', 'DMT', 'GC', 'DMC', 'ZR', 'ZD', 'ZF', 'LH', 'GV', 'GF',
      'Wasteland', 'Colossus', 'Deku', 'DC', 'Jabu', 'Forest', 'Fire', 'Water',
      'Shadow', 'Spirit', 'Ice', 'GTG', 'Ganon'];

    // Check if starts with any area prefix
    for (const prefix of areaPrefixes) {
      if (entrancePart.startsWith(prefix + ' ') || entrancePart === prefix) {
        return prefix;
      }
    }

    return 'Unknown';
  };

  // Build a graph of connections from entrances that have been filled
  const graph = useMemo(() => {
    const connections: Map<string, Array<{ to: string; entrance: Entrance }>> = new Map();

    // Only include entrances where the destination has been filled
    const filledEntrances = entrances.filter(e => e.to && e.to.trim() !== '' && e.toArea && e.toArea.trim() !== '');

    for (const entrance of filledEntrances) {
      // The parent region is the part BEFORE the arrow in the entrance name
      // This is the actual source region where the entrance originates
      const parts = entrance.from.split(' -> ');
      if (parts.length !== 2) continue;

      const fromRegion = parts[0]; // Parent region (source)

      // Extract area code from the parent region
      let from = extractAreaFromEntranceName(fromRegion);
      let to = entrance.toArea; // Actual shuffled destination area

      if (!from || !to || from === 'Unknown' || to === 'Unknown' || from === 'Warp') continue;

      // Add forward connection
      if (!connections.has(from)) {
        connections.set(from, []);
      }
      connections.get(from)!.push({ to, entrance });

      // For bidirectional connections (not one-way), add reverse
      // Most entrances are bidirectional
      if (entrance.type === 'Overworld' || entrance.type === 'Grotto' ||
          entrance.type === 'Dungeon' || entrance.type === 'Interior' ||
          entrance.type === 'Hideout') {
        if (!connections.has(to)) {
          connections.set(to, []);
        }
        connections.get(to)!.push({ to: from, entrance });
      }
    }

    return connections;
  }, [entrances]);

  // BFS pathfinding algorithm
  const findPath = () => {
    setError('');
    setPath(null);

    if (!startArea || !endArea) {
      setError('Please select both start and end areas');
      return;
    }

    if (startArea === endArea) {
      setError('Start and end areas are the same');
      return;
    }

    // BFS to find shortest path
    const queue: Array<{ area: string; path: PathStep[] }> = [{ area: startArea, path: [] }];
    const visited = new Set<string>([startArea]);

    while (queue.length > 0) {
      const { area, path: currentPath } = queue.shift()!;

      // Check all connections from current area
      const connections = graph.get(area) || [];
      for (const { to, entrance } of connections) {
        if (visited.has(to)) continue;

        const newPath = [
          ...currentPath,
          {
            from: area,
            to,
            entrance: entrance.from,
            destination: entrance.to,
            type: entrance.type,
          },
        ];

        if (to === endArea) {
          // Found the path!
          setPath(newPath);
          return;
        }

        visited.add(to);
        queue.push({ area: to, path: newPath });
      }
    }

    setError('No path found. Make sure you have filled in the entrances connecting these areas.');
  };

  const availableAreas = useMemo(() => {
    return Array.from(graph.keys()).sort();
  }, [graph]);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-2">Pathfinder</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Find a route between two areas using your discovered entrances
        </p>
        {featureStatus && (
          <div className={`mt-3 p-3 rounded-lg ${
            featureStatus === 'alpha'
              ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
              : 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800'
          }`}>
            <p className={`text-sm font-medium ${
              featureStatus === 'alpha'
                ? 'text-red-800 dark:text-red-200'
                : 'text-yellow-800 dark:text-yellow-200'
            }`}>
              ⚠️ {featureStatus === 'alpha' ? 'Alpha Feature' : 'Beta Feature'}: This feature is currently under development and may not work as expected or may contain bugs.
            </p>
          </div>
        )}
      </div>

      {/* Input Section */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Start Area</label>
            <select
              value={startArea}
              onChange={(e) => setStartArea(e.target.value)}
              className="input-field w-full"
            >
              <option value="">Select start area...</option>
              {REGIONS.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">End Area</label>
            <select
              value={endArea}
              onChange={(e) => setEndArea(e.target.value)}
              className="input-field w-full"
            >
              <option value="">Select end area...</option>
              {REGIONS.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={findPath}
          className="btn-primary w-full md:w-auto"
          disabled={!startArea || !endArea}
        >
          Find Path
        </button>

        {error && (
          <div className="p-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded">
            {error}
          </div>
        )}
      </div>

      {/* Results Section */}
      {path && (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="text-lg font-bold mb-4">
            Path from {startArea} to {endArea} ({path.length} step{path.length !== 1 ? 's' : ''})
          </h3>

          <div className="space-y-2">
            {path.map((step, index) => (
              <div
                key={index}
                className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border-l-4 border-blue-500"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-gray-500 dark:text-gray-400">
                    {index + 1}.
                  </span>
                  <span className="font-medium text-blue-600 dark:text-blue-400">
                    {step.from}
                  </span>
                  <span className="text-gray-400">→</span>
                  <span className="font-medium text-green-600 dark:text-green-400">
                    {step.to}
                  </span>
                </div>
                <div className="ml-6 mt-1 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex flex-col gap-1">
                    <div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">Use entrance: </span>
                      <span className="font-mono">{step.entrance}</span>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">Leads to: </span>
                      <span className="font-mono text-green-700 dark:text-green-300">{step.destination}</span>
                      <span className="ml-2 text-xs px-2 py-1 rounded bg-gray-200 dark:bg-gray-600">
                        {step.type}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stats Section */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h3 className="text-lg font-bold mb-2">Available Areas</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          {availableAreas.length} areas are accessible based on your discovered entrances
        </p>
        <div className="flex flex-wrap gap-2">
          {availableAreas.map((area) => (
            <span
              key={area}
              className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
            >
              {area}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
