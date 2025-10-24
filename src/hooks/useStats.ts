import { useMemo } from 'react';
import type { Entrance, Check } from '../types';

export function useStats(entrances: Entrance[], checks: Check[]) {
  return useMemo(() => {
    const totalEntrances = entrances.length;
    const discoveredEntrances = entrances.filter((e) => e.to !== '').length;
    const entranceProgress = totalEntrances > 0
      ? Math.round((discoveredEntrances / totalEntrances) * 100)
      : 0;

    const totalChecks = checks.length;
    const doneChecks = checks.filter((c) => c.status === 'done').length;
    const blockedChecks = checks.filter((c) => c.status === 'blocked').length;
    const importantChecks = checks.filter((c) => c.status === 'important').length;
    const checkProgress = totalChecks > 0
      ? Math.round((doneChecks / totalChecks) * 100)
      : 0;

    // Count by check type
    const checksByType = checks.reduce((acc, check) => {
      acc[check.type] = (acc[check.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Count by entrance type
    const entrancesByType = entrances.reduce((acc, entrance) => {
      acc[entrance.type] = (acc[entrance.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalEntrances,
      discoveredEntrances,
      entranceProgress,
      totalChecks,
      doneChecks,
      blockedChecks,
      importantChecks,
      checkProgress,
      checksByType,
      entrancesByType,
    };
  }, [entrances, checks]);
}
