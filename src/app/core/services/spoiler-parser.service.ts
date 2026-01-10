import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Check } from '../../models/check.model';
import { Entrance } from '../../models/entrance.model';
import { SpoilerData } from '../../models/spoiler.model';
import { MetadataService } from './metadata.service';

/**
 * SpoilerParserService
 *
 * Parses OOT Randomizer spoiler.json files
 * FR2, FR3, FR4, FR49
 */
@Injectable({ providedIn: 'root' })
export class SpoilerParserService {
  private metadataService = inject(MetadataService);

  /**
   * Validate spoiler.json format
   * FR4: Format validation
   */
  validateFormat(fileContent: string): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    try {
      const data = JSON.parse(fileContent) as SpoilerData;

      if (!data.locations && !data.entrances) {
        errors.push('Missing both "locations" and "entrances" fields');
      }

      if (data.locations && typeof data.locations !== 'object') {
        errors.push('"locations" must be an object');
      }

      if (data.entrances && typeof data.entrances !== 'object') {
        errors.push('"entrances" must be an object');
      }

      return { valid: errors.length === 0, errors };
    } catch (e) {
      return {
        valid: false,
        errors: [`Invalid JSON: ${e instanceof Error ? e.message : 'Unknown error'}`],
      };
    }
  }

  /**
   * Parse spoiler.json and extract checks + entrances
   * FR2, FR3, FR49: Extract and enrich data
   */
  parseSpoiler(fileContent: string): Observable<{ checks: Check[]; entrances: Entrance[] }> {
    try {
      const data = JSON.parse(fileContent) as SpoilerData;
      const checks: Check[] = [];
      const entrances: Entrance[] = [];

      // FR2: Extract checks from locations
      if (data.locations) {
        Object.entries(data.locations).forEach(([checkName]) => {
          // FR49: Enrich with metadata
          const metadata = this.metadataService.getCheckMetadata(checkName);

          checks.push({
            id: crypto.randomUUID(),
            name: checkName,
            zone: metadata.zone,
            type: metadata.type,
            isDone: false,
          });
        });
      }

      // FR3: Extract entrances
      if (data.entrances) {
        Object.entries(data.entrances).forEach(([from, to]) => {
          entrances.push({
            from,
            to,
            discoveredAt: new Date().toISOString(),
            id: crypto.randomUUID(),
          });
        });
      }

      return of({ checks, entrances });
    } catch (e) {
      throw new Error(`Failed to parse spoiler: ${e instanceof Error ? e.message : 'Unknown error'}`);
    }
  }
}
