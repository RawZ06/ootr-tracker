import { Injectable, inject } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { StateManagementService } from './state-management.service';
import {
  SaveData,
  CheckState,
  EntranceState,
  FiltersState,
  SaveMetadata,
  SaveValidationResult,
} from '../../models/save-data.model';
import { Check } from '../../models/check.model';
import { Entrance } from '../../models/entrance.model';

/**
 * SaveLoadService
 *
 * Handles save/load JSON with SHA-256 checksum validation
 * FR37-FR43: Export, import, validation, corruption detection
 * NFR-REL-1, NFR-REL-2, NFR-REL-3, NFR-REL-4
 */
@Injectable({ providedIn: 'root' })
export class SaveLoadService {
  private stateService = inject(StateManagementService);

  private readonly SAVE_VERSION = '1.0';

  /**
   * Export complete state to JSON with SHA-256 checksum
   * FR37, FR42: Export save file with complete state
   */
  exportSave(): Observable<Blob> {
    return from(this.generateSaveData()).pipe(
      map((saveData) => {
        const json = JSON.stringify(saveData, null, 2);
        return new Blob([json], { type: 'application/json' });
      })
    );
  }

  /**
   * Generate save data object with checksum
   * FR42: Complete state capture
   */
  private async generateSaveData(): Promise<SaveData> {
    const checks = this.stateService.getChecks();
    const entrances = this.stateService.getEntrances();
    const filters = this.stateService.getFilters();
    const stats = this.stateService.getStats();

    // Map TypeScript camelCase to JSON snake_case
    const checkStates: CheckState[] = checks.map((check) => ({
      check_id: check.id,
      check_name: check.name,
      zone: check.zone,
      type: check.type,
      is_done: check.isDone,
      completed_at: check.completedAt,
    }));

    const entranceStates: EntranceState[] = entrances.map((entrance) => ({
      entrance_id: entrance.id,
      entrance_from: entrance.from,
      entrance_to: entrance.to,
      discovered_at: entrance.discoveredAt,
    }));

    const filtersState: FiltersState = {
      zone: filters.zone,
      type: filters.type,
      hide_completed: filters.hideCompleted,
    };

    const metadata: SaveMetadata = {
      total_checks: stats.total,
      completed_checks: stats.completed,
      total_entrances: entrances.length,
    };

    // Create save data without checksum first
    const saveDataWithoutChecksum = {
      version: this.SAVE_VERSION,
      save_date: new Date().toISOString(),
      checksum: '', // Will be calculated
      checks: checkStates,
      entrances: entranceStates,
      filters: filtersState,
      metadata,
    };

    // Calculate SHA-256 checksum on all data except checksum field
    const checksum = await this.calculateChecksum(saveDataWithoutChecksum);

    return {
      ...saveDataWithoutChecksum,
      checksum,
    };
  }

  /**
   * Calculate SHA-256 checksum using Web Crypto API
   * FR40: Corruption detection via checksum
   * NFR-REL-2: 100% corruption detection
   */
  private async calculateChecksum(data: Omit<SaveData, 'checksum'>): Promise<string> {
    const json = JSON.stringify(data);
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(json);
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  }

  /**
   * Validate save file with strict checks
   * FR39, FR40, FR41: Strict validation, checksum verification, error reporting
   * NFR-REL-3: Never modifies state during validation
   */
  validateSave(fileContent: string): Observable<SaveValidationResult> {
    return from(this.validateSaveAsync(fileContent));
  }

  private async validateSaveAsync(fileContent: string): Promise<SaveValidationResult> {
    const errors: string[] = [];

    // Parse JSON
    let saveData: SaveData;
    try {
      saveData = JSON.parse(fileContent);
    } catch (e) {
      return {
        valid: false,
        errors: ['Invalid JSON syntax: ' + (e instanceof Error ? e.message : 'Unknown error')],
      };
    }

    // Check required fields
    if (!saveData.version) errors.push('Missing required field: version');
    if (!saveData.save_date) errors.push('Missing required field: save_date');
    if (!saveData.checksum) errors.push('Missing required field: checksum');
    if (!saveData.checks) errors.push('Missing required field: checks');
    if (!saveData.entrances) errors.push('Missing required field: entrances');
    if (!saveData.filters) errors.push('Missing required field: filters');
    if (!saveData.metadata) errors.push('Missing required field: metadata');

    if (errors.length > 0) {
      return { valid: false, errors };
    }

    // Check version compatibility
    if (!saveData.version.startsWith('1.')) {
      errors.push(
        `Incompatible version: expected 1.x, found ${saveData.version}`
      );
    }

    // Check data types
    if (!Array.isArray(saveData.checks)) {
      errors.push('Field "checks" must be an array');
    }
    if (!Array.isArray(saveData.entrances)) {
      errors.push('Field "entrances" must be an array');
    }

    if (errors.length > 0) {
      return { valid: false, errors };
    }

    // Verify checksum (FR40: Corruption detection)
    const savedChecksum = saveData.checksum;
    const dataWithoutChecksum = { ...saveData, checksum: '' };
    const calculatedChecksum = await this.calculateChecksum(dataWithoutChecksum);

    if (savedChecksum !== calculatedChecksum) {
      errors.push('Checksum mismatch - file may be corrupted');
      return { valid: false, errors };
    }

    // Extract metadata for display
    const metadata: SaveMetadata = saveData.metadata;

    return { valid: true, errors: [], metadata };
  }

  /**
   * Import and restore complete state
   * FR38, FR42, FR43: Import save, restore state, exact fidelity
   * NFR-REL-1: Zero data loss (100% fidelity)
   */
  importSave(saveData: SaveData): Observable<void> {
    return of(saveData).pipe(
      map((data) => {
        // Map JSON snake_case to TypeScript camelCase
        const checks: Check[] = data.checks.map((checkState) => ({
          id: checkState.check_id,
          name: checkState.check_name,
          zone: checkState.zone,
          type: checkState.type,
          isDone: checkState.is_done,
          completedAt: checkState.completed_at,
        }));

        const entrances: Entrance[] = data.entrances.map((entranceState) => ({
          id: entranceState.entrance_id,
          from: entranceState.entrance_from,
          to: entranceState.entrance_to,
          discoveredAt: entranceState.discovered_at,
        }));

        const filters = {
          zone: data.filters.zone,
          type: data.filters.type,
          hideCompleted: data.filters.hide_completed,
        };

        // Restore state to StateManagementService (immutable)
        this.stateService.loadData({ checks, entrances });
        this.stateService.updateFilters(filters);
      })
    );
  }
}
