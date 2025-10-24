import { useMemo, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from '@tanstack/react-table';
import type { Entrance } from '../types';
import { useTrackerStore } from '../store/trackerStore';
import { useEntranceFilters } from '../hooks/useFilters';
import { ENTRANCE_TYPES, DESTINATIONS_BY_AREA } from '../data/constants';
import { GroupedSearchableSelect } from './GroupedSearchableSelect';

// Function to extract area from destination name (same as in parser)
function extractArea(entranceName: string): string {
  const prefixes = entranceName.split(/->|Grave|House|Shop|Temple|Cavern|Fountain|Grotto/)[0].trim();

  const areaMap: Record<string, string> = {
    'KF': 'KF', 'Kokiri Forest': 'KF',
    'LW': 'LW', 'Lost Woods': 'LW',
    'SFM': 'SFM', 'Sacred Forest Meadow': 'SFM',
    'HF': 'HF', 'Hyrule Field': 'HF',
    'LLR': 'LLR', 'Lon Lon Ranch': 'LLR',
    'Market': 'Market',
    'ToT': 'ToT', 'Temple of Time': 'ToT',
    'HC': 'HC', 'Hyrule Castle': 'HC',
    'OGC': 'OGC', 'Outside Ganons Castle': 'OGC',
    'Kak': 'Kak', 'Kakariko': 'Kak', 'Kakariko Village': 'Kak',
    'GY': 'GY', 'Graveyard': 'GY',
    'DMT': 'DMT', 'Death Mountain Trail': 'DMT',
    'GC': 'GC', 'Goron City': 'GC',
    'DMC': 'DMC', 'Death Mountain Crater': 'DMC',
    'ZR': 'ZR', 'Zora River': 'ZR',
    'ZD': 'ZD', 'Zoras Domain': 'ZD',
    'ZF': 'ZF', 'Zoras Fountain': 'ZF',
    'LH': 'LH', 'Lake Hylia': 'LH',
    'GV': 'GV', 'Gerudo Valley': 'GV',
    'GF': 'GF', 'Gerudo Fortress': 'GF',
    'Wasteland': 'Wasteland', 'Haunted Wasteland': 'Wasteland',
    'Colossus': 'Colossus', 'Desert Colossus': 'Colossus',
    'Deku': 'Deku', 'Deku Tree': 'Deku',
    'DC': 'DC', 'Dodongos Cavern': 'DC',
    'Jabu': 'Jabu', 'Jabu Jabus Belly': 'Jabu',
    'Forest': 'Forest', 'Forest Temple': 'Forest',
    'Fire': 'Fire', 'Fire Temple': 'Fire',
    'Water': 'Water', 'Water Temple': 'Water',
    'Shadow': 'Shadow', 'Shadow Temple': 'Shadow',
    'Spirit': 'Spirit', 'Spirit Temple': 'Spirit',
    'Ice': 'Ice', 'Ice Cavern': 'Ice',
    'GTG': 'GTG', 'Gerudo Training Ground': 'GTG',
    'Ganon': 'Ganon', 'Ganons Castle': 'Ganon',
  };

  for (const [key, value] of Object.entries(areaMap)) {
    if (prefixes.includes(key)) {
      return value;
    }
  }

  const firstWord = entranceName.split(/\s+/)[0];
  if (areaMap[firstWord]) {
    return areaMap[firstWord];
  }

  return 'Unknown';
}

export function EntrancesTable() {
  const entrances = useTrackerStore((state) => state.entrances);
  const updateEntrance = useTrackerStore((state) => state.updateEntrance);

  const { filters, setFilters, filteredEntrances } = useEntranceFilters(entrances);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [editingNotes, setEditingNotes] = useState<string | null>(null);

  // Get unique areas from DESTINATIONS_BY_AREA
  const allAreas = Object.keys(DESTINATIONS_BY_AREA).sort();

  const columns = useMemo<ColumnDef<Entrance>[]>(
    () => [
      {
        accessorKey: 'from',
        header: 'From',
        cell: ({ getValue }) => (
          <div className="font-medium">{getValue() as string}</div>
        ),
      },
      {
        accessorKey: 'fromArea',
        header: 'From Area',
        cell: ({ getValue }) => {
          const area = getValue() as string;
          return (
            <span className="status-badge bg-purple-200 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
              {area}
            </span>
          );
        },
        size: 100,
      },
      {
        accessorKey: 'to',
        header: 'To',
        cell: ({ row }) => (
          <GroupedSearchableSelect
            value={row.original.to}
            onChange={(value) => {
              // Auto-extract toArea when destination is selected
              const toArea = extractArea(value);
              updateEntrance(row.original.id, { to: value, toArea });
            }}
            groupedOptions={DESTINATIONS_BY_AREA}
            placeholder="Select destination..."
            className="min-w-[250px]"
          />
        ),
        size: 300,
      },
      {
        accessorKey: 'toArea',
        header: 'To Area',
        cell: ({ getValue }) => {
          const area = getValue() as string;
          return area ? (
            <span className="status-badge bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-200">
              {area}
            </span>
          ) : (
            <span className="text-gray-400">-</span>
          );
        },
        size: 100,
      },
      {
        accessorKey: 'type',
        header: 'Type',
        cell: ({ getValue }) => {
          const type = getValue() as string;
          const colors: Record<string, string> = {
            Warp: 'bg-purple-200 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
            Grotto: 'bg-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
            Dungeon: 'bg-red-200 text-red-800 dark:bg-red-900 dark:text-red-200',
            Interior: 'bg-blue-200 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
            Overworld: 'bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-200',
            Unknown: 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
          };
          return (
            <span className={`status-badge ${colors[type] || colors.Unknown}`}>
              {type}
            </span>
          );
        },
        size: 120,
      },
      {
        accessorKey: 'notes',
        header: 'Notes',
        cell: ({ row }) => (
          <div>
            {editingNotes === row.original.id ? (
              <input
                type="text"
                value={row.original.notes}
                onChange={(e) =>
                  updateEntrance(row.original.id, { notes: e.target.value })
                }
                onBlur={() => setEditingNotes(null)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') setEditingNotes(null);
                }}
                className="input-field w-full"
                autoFocus
              />
            ) : (
              <div
                onClick={() => setEditingNotes(row.original.id)}
                className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 p-1 rounded min-h-[24px]"
              >
                {row.original.notes || <span className="text-gray-400">Click to add notes...</span>}
              </div>
            )}
          </div>
        ),
      },
    ],
    [updateEntrance, editingNotes]
  );

  const table = useReactTable({
    data: filteredEntrances,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 50,
      },
    },
  });

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow space-y-3">
        <input
          type="text"
          placeholder="Search entrances..."
          value={filters.searchTerm}
          onChange={(e) =>
            setFilters({ ...filters, searchTerm: e.target.value })
          }
          className="input-field w-full"
        />

        <div className="flex flex-wrap gap-2">
          <select
            value=""
            onChange={(e) => {
              if (e.target.value && !filters.types.includes(e.target.value)) {
                setFilters({
                  ...filters,
                  types: [...filters.types, e.target.value],
                });
              }
            }}
            className="input-field"
          >
            <option value="">Add type filter...</option>
            {ENTRANCE_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          {filters.types.map((type) => (
            <span
              key={type}
              className="status-badge bg-blue-500 text-white flex items-center gap-2"
            >
              {type}
              <button
                onClick={() =>
                  setFilters({
                    ...filters,
                    types: filters.types.filter((t) => t !== type),
                  })
                }
              >
                ×
              </button>
            </span>
          ))}

          {/* From Area Filter */}
          <select
            value=""
            onChange={(e) => {
              if (e.target.value && filters.fromAreas && !filters.fromAreas.includes(e.target.value)) {
                setFilters({
                  ...filters,
                  fromAreas: [...(filters.fromAreas || []), e.target.value],
                });
              }
            }}
            className="input-field"
          >
            <option value="">Filter From Area...</option>
            {allAreas.map((area) => (
              <option key={area} value={area}>
                From {area}
              </option>
            ))}
          </select>

          {filters.fromAreas && filters.fromAreas.map((area) => (
            <span
              key={`from-${area}`}
              className="status-badge bg-purple-500 text-white flex items-center gap-2"
            >
              From {area}
              <button
                onClick={() =>
                  setFilters({
                    ...filters,
                    fromAreas: filters.fromAreas?.filter((a) => a !== area) || [],
                  })
                }
              >
                ×
              </button>
            </span>
          ))}

          {/* To Area Filter */}
          <select
            value=""
            onChange={(e) => {
              if (e.target.value && filters.toAreas && !filters.toAreas.includes(e.target.value)) {
                setFilters({
                  ...filters,
                  toAreas: [...(filters.toAreas || []), e.target.value],
                });
              }
            }}
            className="input-field"
          >
            <option value="">Filter To Area...</option>
            {allAreas.map((area) => (
              <option key={area} value={area}>
                To {area}
              </option>
            ))}
          </select>

          {filters.toAreas && filters.toAreas.map((area) => (
            <span
              key={`to-${area}`}
              className="status-badge bg-green-500 text-white flex items-center gap-2"
            >
              To {area}
              <button
                onClick={() =>
                  setFilters({
                    ...filters,
                    toAreas: filters.toAreas?.filter((a) => a !== area) || [],
                  })
                }
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="table-header cursor-pointer select-none"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className="flex items-center gap-2">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: ' 🔼',
                          desc: ' 🔽',
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="table-cell">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Showing {table.getRowModel().rows.length} of {filteredEntrances.length} entrances
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
