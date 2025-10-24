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
import type { Check } from '../types';
import { useTrackerStore } from '../store/trackerStore';
import { useCheckFilters } from '../hooks/useFilters';
import { CHECK_STATUSES, CHECK_TYPES, ITEMS_BY_CATEGORY, REGIONS } from '../data/constants';
import { GroupedSearchableSelect } from './GroupedSearchableSelect';

const STATUS_ICONS = {
  pending: '⏳',
  done: '✅',
  blocked: '🔒',
  partial: '⏸️',
  important: '⚠️',
};

const STATUS_COLORS = {
  pending: 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
  done: 'bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-200',
  blocked: 'bg-red-200 text-red-800 dark:bg-red-900 dark:text-red-200',
  partial: 'bg-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  important: 'bg-orange-200 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
};

export function ChecksTable() {
  const checks = useTrackerStore((state) => state.checks);
  const updateCheck = useTrackerStore((state) => state.updateCheck);
  const setCheckStatus = useTrackerStore((state) => state.setCheckStatus);

  const { filters, setFilters, filteredChecks } = useCheckFilters(checks);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [editingNotes, setEditingNotes] = useState<string | null>(null);

  const columns = useMemo<ColumnDef<Check>[]>(
    () => [
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => (
          <select
            value={row.original.status}
            onChange={(e) =>
              setCheckStatus(row.original.id, e.target.value as Check['status'])
            }
            className={`status-badge ${STATUS_COLORS[row.original.status]} cursor-pointer`}
          >
            {CHECK_STATUSES.map((status) => (
              <option key={status} value={status}>
                {STATUS_ICONS[status]} {status}
              </option>
            ))}
          </select>
        ),
        size: 120,
      },
      {
        accessorKey: 'location',
        header: 'Location',
        cell: ({ getValue }) => (
          <div className="font-medium text-sm">{getValue() as string}</div>
        ),
      },
      {
        accessorKey: 'region',
        header: 'Region',
        cell: ({ getValue }) => (
          <span className="status-badge bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            {getValue() as string}
          </span>
        ),
        size: 100,
      },
      {
        accessorKey: 'type',
        header: 'Type',
        cell: ({ getValue }) => (
          <span className="text-xs text-gray-600 dark:text-gray-400">
            {getValue() as string}
          </span>
        ),
        size: 120,
      },
      {
        accessorKey: 'item',
        header: 'Item',
        cell: ({ row }) => (
          <GroupedSearchableSelect
            value={row.original.item}
            onChange={(value) => updateCheck(row.original.id, { item: value })}
            groupedOptions={ITEMS_BY_CATEGORY}
            placeholder="Select item..."
            className="min-w-[200px]"
          />
        ),
        size: 250,
      },
      {
        accessorKey: 'price',
        header: 'Price',
        cell: ({ row }) => {
          const price = row.original.price;
          const isShopOrScrub = row.original.type === 'Shop' || row.original.type === 'Scrub';

          if (!isShopOrScrub) {
            return <span className="text-gray-400">-</span>;
          }

          return (
            <input
              type="number"
              value={price || ''}
              onChange={(e) => {
                const value = e.target.value ? parseInt(e.target.value, 10) : null;
                updateCheck(row.original.id, { price: value });
              }}
              placeholder="Price..."
              className="input-field w-24 text-center"
              min="0"
            />
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
                  updateCheck(row.original.id, { notes: e.target.value })
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
                {row.original.notes || (
                  <span className="text-gray-400">Click to add notes...</span>
                )}
              </div>
            )}
          </div>
        ),
      },
    ],
    [setCheckStatus, updateCheck, editingNotes]
  );

  const table = useReactTable({
    data: filteredChecks,
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
          placeholder="Search checks..."
          value={filters.searchTerm}
          onChange={(e) =>
            setFilters({ ...filters, searchTerm: e.target.value })
          }
          className="input-field w-full"
        />

        <div className="flex flex-wrap gap-2">
          {/* Region filter */}
          <select
            value=""
            onChange={(e) => {
              if (e.target.value && !filters.regions.includes(e.target.value)) {
                setFilters({
                  ...filters,
                  regions: [...filters.regions, e.target.value],
                });
              }
            }}
            className="input-field"
          >
            <option value="">Add region filter...</option>
            {REGIONS.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>

          {filters.regions.map((region) => (
            <span
              key={region}
              className="status-badge bg-purple-500 text-white flex items-center gap-2"
            >
              {region}
              <button
                onClick={() =>
                  setFilters({
                    ...filters,
                    regions: filters.regions.filter((r) => r !== region),
                  })
                }
              >
                ×
              </button>
            </span>
          ))}

          {/* Type filter */}
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
            {CHECK_TYPES.map((type) => (
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

          <select
            value=""
            onChange={(e) => {
              if (
                e.target.value &&
                filters.statuses &&
                !filters.statuses.includes(e.target.value)
              ) {
                setFilters({
                  ...filters,
                  statuses: [...(filters.statuses || []), e.target.value],
                });
              }
            }}
            className="input-field"
          >
            <option value="">Add status filter...</option>
            {CHECK_STATUSES.map((status) => (
              <option key={status} value={status}>
                {STATUS_ICONS[status]} {status}
              </option>
            ))}
          </select>

          {filters.statuses?.map((status) => (
            <span
              key={status}
              className={`status-badge ${STATUS_COLORS[status as keyof typeof STATUS_COLORS]} flex items-center gap-2`}
            >
              {STATUS_ICONS[status as keyof typeof STATUS_ICONS]} {status}
              <button
                onClick={() =>
                  setFilters({
                    ...filters,
                    statuses: filters.statuses?.filter((s) => s !== status),
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
            Showing {table.getRowModel().rows.length} of {filteredChecks.length} checks
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
