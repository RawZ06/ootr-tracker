import { useTrackerStore } from '../store/trackerStore';
import { useStats } from '../hooks/useStats';

export function Stats() {
  const entrances = useTrackerStore((state) => state.entrances);
  const checks = useTrackerStore((state) => state.checks);

  const stats = useStats(entrances, checks);

  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Overall Progress
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Checks Progress */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                Checks
              </span>
              <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                {stats.checkProgress}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
              <div
                className="bg-green-600 h-4 rounded-full transition-all duration-300"
                style={{ width: `${stats.checkProgress}%` }}
              />
            </div>
            <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {stats.doneChecks} / {stats.totalChecks} completed
            </div>
          </div>

          {/* Entrances Progress */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                Entrances
              </span>
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {stats.entranceProgress}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
              <div
                className="bg-blue-600 h-4 rounded-full transition-all duration-300"
                style={{ width: `${stats.entranceProgress}%` }}
              />
            </div>
            <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {stats.discoveredEntrances} / {stats.totalEntrances} discovered
            </div>
          </div>
        </div>
      </div>

      {/* Check Status Breakdown */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Check Status Breakdown
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg">
            <div className="text-3xl font-bold text-green-800 dark:text-green-200">
              {stats.doneChecks}
            </div>
            <div className="text-sm text-green-700 dark:text-green-300">
              ✅ Completed
            </div>
          </div>

          <div className="bg-red-100 dark:bg-red-900 p-4 rounded-lg">
            <div className="text-3xl font-bold text-red-800 dark:text-red-200">
              {stats.blockedChecks}
            </div>
            <div className="text-sm text-red-700 dark:text-red-300">
              🔒 Blocked
            </div>
          </div>

          <div className="bg-orange-100 dark:bg-orange-900 p-4 rounded-lg">
            <div className="text-3xl font-bold text-orange-800 dark:text-orange-200">
              {stats.importantChecks}
            </div>
            <div className="text-sm text-orange-700 dark:text-orange-300">
              ⚠️ Important
            </div>
          </div>

          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <div className="text-3xl font-bold text-gray-800 dark:text-gray-200">
              {stats.totalChecks - stats.doneChecks}
            </div>
            <div className="text-sm text-gray-700 dark:text-gray-300">
              ⏳ Remaining
            </div>
          </div>
        </div>
      </div>

      {/* Checks by Type */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Checks by Type
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Object.entries(stats.checksByType).map(([type, count]) => (
            <div
              key={type}
              className="bg-gray-50 dark:bg-gray-700 p-3 rounded border border-gray-200 dark:border-gray-600"
            >
              <div className="text-xl font-bold text-gray-900 dark:text-gray-100">
                {count}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                {type}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Entrances by Type */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Entrances by Type
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {Object.entries(stats.entrancesByType).map(([type, count]) => (
            <div
              key={type}
              className="bg-gray-50 dark:bg-gray-700 p-3 rounded border border-gray-200 dark:border-gray-600"
            >
              <div className="text-xl font-bold text-gray-900 dark:text-gray-100">
                {count}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                {type}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
