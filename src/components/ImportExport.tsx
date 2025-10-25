import { useRef, useState } from 'react';
import { FaDownload, FaUpload, FaTrash, FaFlask } from 'react-icons/fa';
import { useTrackerStore } from '../store/trackerStore';
import type { SaveData } from '../types';

export function ImportExport() {
  const exportData = useTrackerStore((state) => state.exportData);
  const importData = useTrackerStore((state) => state.importData);
  const resetData = useTrackerStore((state) => state.resetData);
  const loadSampleData = useTrackerStore((state) => state.loadSampleData);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const data = exportData();
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ootr-tracker-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = e.target?.result as string;
        const data: SaveData = JSON.parse(json);
        importData(data);
        alert('Data imported successfully!');
      } catch (error) {
        alert('Error importing data. Please check the file format.');
        console.error(error);
      }
    };
    reader.readAsText(file);

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleReset = () => {
    if (
      confirm(
        'Are you sure you want to reset all data? This will delete all your progress and cannot be undone.'
      )
    ) {
      resetData();
      alert('Data has been reset to initial state.');
    }
  };

  const handleLoadSample = async () => {
    if (
      confirm(
        'Load sample data from spoiler log? This will fill all entrances and checks with the correct answers.'
      )
    ) {
      setLoading(true);
      try {
        await loadSampleData();
        alert('Sample data loaded successfully!');
      } catch (error) {
        alert('Error loading sample data. Please check the console for details.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-wrap gap-3">
      <button onClick={handleExport} className="btn-success flex items-center gap-2">
        <FaDownload />
        Export Progress
      </button>

      <label className="btn-primary flex items-center gap-2 cursor-pointer">
        <FaUpload />
        Import Progress
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleImport}
          className="hidden"
        />
      </label>

      <button
        onClick={handleLoadSample}
        disabled={loading}
        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FaFlask />
        {loading ? 'Loading...' : 'Load Sample'}
      </button>

      <button
        onClick={handleReset}
        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
      >
        <FaTrash />
        Reset All Data
      </button>
    </div>
  );
}
