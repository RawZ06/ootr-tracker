import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { CheckMetadata, CheckMetadataMap } from '../../models/check.model';

/**
 * MetadataService
 *
 * Loads and provides O(1) lookup for check metadata (zone/type)
 * FR48, FR49, FR50
 */
@Injectable({
  providedIn: 'root',
})
export class MetadataService {
  private http = inject(HttpClient);
  private metadataMap: Map<string, CheckMetadata> = new Map();
  private loaded = false;

  /**
   * Load check metadata from JSON file
   * @param filePath Path to check-metadata.json (default: assets/data/check-metadata.json)
   * @returns Observable<CheckMetadataMap>
   */
  loadMetadata(filePath = 'assets/data/check-metadata.json'): Observable<CheckMetadataMap> {
    return this.http.get<CheckMetadataMap>(filePath).pipe(
      tap((data) => {
        // Build Map for O(1) lookup
        this.metadataMap.clear();
        Object.entries(data).forEach(([checkName, metadata]) => {
          this.metadataMap.set(checkName, metadata);
        });
        this.loaded = true;
      })
    );
  }

  /**
   * Get metadata for a specific check (O(1) lookup)
   * @param checkName Check name from spoiler.json
   * @returns CheckMetadata (or default for unknown checks - FR50)
   */
  getCheckMetadata(checkName: string): CheckMetadata {
    if (!this.loaded) {
      console.warn('Metadata not loaded yet. Call loadMetadata() first.');
    }

    // FR50: Return default for unknown checks
    return (
      this.metadataMap.get(checkName) ?? {
        zone: 'Unknown Zone',
        type: 'Unknown Type',
      }
    );
  }

  /**
   * Check if metadata is loaded
   */
  isLoaded(): boolean {
    return this.loaded;
  }

  /**
   * Get total number of mapped checks
   */
  getMappedCount(): number {
    return this.metadataMap.size;
  }
}
