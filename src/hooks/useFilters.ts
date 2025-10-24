import { useState, useMemo } from 'react';
import type { Entrance, Check, FilterOptions } from '../types';

export function useEntranceFilters(entrances: Entrance[]) {
  const [filters, setFilters] = useState<FilterOptions>({
    searchTerm: '',
    regions: [],
    types: [],
    fromAreas: [],
    toAreas: [],
  });

  const filteredEntrances = useMemo(() => {
    return entrances.filter((entrance) => {
      // Search term filter
      if (filters.searchTerm) {
        const term = filters.searchTerm.toLowerCase();
        if (
          !entrance.from.toLowerCase().includes(term) &&
          !entrance.to.toLowerCase().includes(term) &&
          !entrance.notes.toLowerCase().includes(term)
        ) {
          return false;
        }
      }

      // Region filter
      if (filters.regions.length > 0 && !filters.regions.includes(entrance.region)) {
        return false;
      }

      // Type filter
      if (filters.types.length > 0 && !filters.types.includes(entrance.type)) {
        return false;
      }

      // From Area filter
      if (filters.fromAreas && filters.fromAreas.length > 0 && !filters.fromAreas.includes(entrance.fromArea)) {
        return false;
      }

      // To Area filter
      if (filters.toAreas && filters.toAreas.length > 0 && !filters.toAreas.includes(entrance.toArea)) {
        return false;
      }

      return true;
    });
  }, [entrances, filters]);

  return {
    filters,
    setFilters,
    filteredEntrances,
  };
}

export function useCheckFilters(checks: Check[]) {
  const [filters, setFilters] = useState<FilterOptions>({
    searchTerm: '',
    regions: [],
    types: [],
    statuses: [],
  });

  const filteredChecks = useMemo(() => {
    return checks.filter((check) => {
      // Search term filter
      if (filters.searchTerm) {
        const term = filters.searchTerm.toLowerCase();
        if (
          !check.location.toLowerCase().includes(term) &&
          !check.item.toLowerCase().includes(term) &&
          !check.notes.toLowerCase().includes(term)
        ) {
          return false;
        }
      }

      // Region filter
      if (filters.regions.length > 0 && !filters.regions.includes(check.region)) {
        return false;
      }

      // Type filter
      if (filters.types.length > 0 && !filters.types.includes(check.type)) {
        return false;
      }

      // Status filter
      if (filters.statuses && filters.statuses.length > 0 && !filters.statuses.includes(check.status)) {
        return false;
      }

      return true;
    });
  }, [checks, filters]);

  return {
    filters,
    setFilters,
    filteredChecks,
  };
}
