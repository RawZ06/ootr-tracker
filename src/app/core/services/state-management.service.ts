import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';
import { Check } from '../../models/check.model';
import { Entrance } from '../../models/entrance.model';
import { SaveData } from '../../models/save-data.model';

export interface FilterState {
  zone: string | null;
  type: string | null;
  hideCompleted: boolean;
}

export interface Stats {
  total: number;
  completed: number;
  percentage: number;
  byType: { type: string; total: number; completed: number; percentage: number }[];
  byZone: { zone: string; total: number; completed: number; percentage: number }[];
}

@Injectable({ providedIn: 'root' })
export class StateManagementService {
  // Private BehaviorSubjects
  private checksSubject = new BehaviorSubject<Check[]>([]);
  private entrancesSubject = new BehaviorSubject<Entrance[]>([]);
  private filtersSubject = new BehaviorSubject<FilterState>({
    zone: null,
    type: null,
    hideCompleted: false
  });

  // Public observables
  checks$ = this.checksSubject.asObservable();
  entrances$ = this.entrancesSubject.asObservable();
  filters$ = this.filtersSubject.asObservable();

  // Derived observables
  filteredChecks$ = combineLatest([this.checks$, this.filters$]).pipe(
    debounceTime(50), // NFR-PERF-1: Performance optimization
    map(([checks, filters]) => this.applyFilters(checks, filters))
  );

  stats$ = this.checks$.pipe(map(checks => this.calculateStats(checks)));

  constructor() {}

  /**
   * Toggle check done/not done state
   * FR10, FR11: Mark checks as done/not done
   * NFR-MAINT-1: Immutable update pattern
   */
  toggleCheck(checkId: string): void {
    const currentChecks = this.checksSubject.value;
    const updatedChecks = currentChecks.map((check) =>
      check.id === checkId
        ? {
            ...check,
            isDone: !check.isDone,
            completedAt: !check.isDone ? new Date().toISOString() : undefined,
          }
        : check
    );
    this.checksSubject.next(updatedChecks);
  }

  addEntrance(_entrance: Entrance): void {
    // TODO: Story 6.1 - Implement entrance recording
  }

  /**
   * Update filter state
   * FR7, FR8, FR9, FR12, FR13: Multi-criteria filtering
   */
  updateFilters(filters: Partial<FilterState>): void {
    const currentFilters = this.filtersSubject.value;
    this.filtersSubject.next({ ...currentFilters, ...filters });
  }

  /**
   * Get all unique zones from checks
   * FR7: Zone filter population
   */
  getUniqueZones(): string[] {
    const checks = this.checksSubject.value;
    const zones = new Set(checks.map((c) => c.zone).filter((z): z is string => !!z));
    return Array.from(zones).sort();
  }

  /**
   * Get all unique types from checks
   * FR8: Type filter population
   */
  getUniqueTypes(): string[] {
    const checks = this.checksSubject.value;
    const types = new Set(checks.map((c) => c.type).filter((t): t is string => !!t));
    return Array.from(types).sort();
  }

  /**
   * Reset all filters to default
   * FR13: Reset filters functionality
   */
  resetFilters(): void {
    this.filtersSubject.next({
      zone: null,
      type: null,
      hideCompleted: false,
    });
  }

  /**
   * Get current checks (for save export)
   * FR42: Complete state capture
   */
  getChecks(): Check[] {
    return this.checksSubject.value;
  }

  /**
   * Get current entrances (for save export)
   * FR42: Complete state capture
   */
  getEntrances(): Entrance[] {
    return this.entrancesSubject.value;
  }

  /**
   * Get current filters (for save export)
   * FR42: Complete state capture
   */
  getFilters(): FilterState {
    return this.filtersSubject.value;
  }

  /**
   * Get current stats (for save export)
   * FR42: Complete state capture
   */
  getStats(): Stats {
    return this.calculateStats(this.checksSubject.value);
  }

  loadState(_saveData: SaveData): void {
    // TODO: Story 4.4 - Implement state restoration
  }

  loadData(data: { checks: Check[]; entrances: Entrance[] }): void {
    // Story 2.5 - Load imported spoiler data
    this.checksSubject.next(data.checks);
    this.entrancesSubject.next(data.entrances);
  }

  resetState(): void {
    // TODO: Story 4.7 - Implement state reset
    this.checksSubject.next([]);
    this.entrancesSubject.next([]);
  }

  /**
   * Apply all active filters to checks
   * FR7, FR8, FR9, FR12: Multi-criteria filtering
   * NFR-PERF-1: Target <100ms for 3000 checks
   */
  private applyFilters(checks: Check[], filters: FilterState): Check[] {
    let filtered = checks;

    // FR7: Zone filter
    if (filters.zone) {
      filtered = filtered.filter((c) => c.zone === filters.zone);
    }

    // FR8: Type filter
    if (filters.type) {
      filtered = filtered.filter((c) => c.type === filters.type);
    }

    // FR12: Hide completed filter
    if (filters.hideCompleted) {
      filtered = filtered.filter((c) => !c.isDone);
    }

    return filtered;
  }

  /**
   * Calculate comprehensive statistics
   * FR30, FR31, FR32, FR33: Global and dimensional stats
   */
  private calculateStats(checks: Check[]): Stats {
    const total = checks.length;
    const completed = checks.filter((c) => c.isDone).length;
    const percentage = total > 0 ? (completed / total) * 100 : 0;

    // FR31: Stats by type
    const typeMap = new Map<string, { total: number; completed: number }>();
    checks.forEach((check) => {
      const type = check.type || 'Unknown';
      const stats = typeMap.get(type) || { total: 0, completed: 0 };
      stats.total++;
      if (check.isDone) stats.completed++;
      typeMap.set(type, stats);
    });

    const byType = Array.from(typeMap.entries())
      .map(([type, stats]) => ({
        type,
        total: stats.total,
        completed: stats.completed,
        percentage: (stats.completed / stats.total) * 100,
      }))
      .sort((a, b) => b.total - a.total);

    // FR32: Stats by zone
    const zoneMap = new Map<string, { total: number; completed: number }>();
    checks.forEach((check) => {
      const zone = check.zone || 'Unknown';
      const stats = zoneMap.get(zone) || { total: 0, completed: 0 };
      stats.total++;
      if (check.isDone) stats.completed++;
      zoneMap.set(zone, stats);
    });

    const byZone = Array.from(zoneMap.entries())
      .map(([zone, stats]) => ({
        zone,
        total: stats.total,
        completed: stats.completed,
        percentage: (stats.completed / stats.total) * 100,
      }))
      .sort((a, b) => b.total - a.total);

    return {
      total,
      completed,
      percentage,
      byType,
      byZone,
    };
  }
}
