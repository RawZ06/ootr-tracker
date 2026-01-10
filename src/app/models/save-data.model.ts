/**
 * Save Data Models
 *
 * FR37-FR43: Session persistence and state recovery
 * All property names use snake_case to match OOT Randomizer spoiler.json format
 */

/**
 * Complete save data structure
 * snake_case properties for JSON serialization
 */
export interface SaveData {
  version: string; // Format version (e.g., "1.0")
  save_date: string; // ISO 8601 timestamp
  checksum: string; // SHA-256 hash for integrity verification
  checks: CheckState[];
  entrances: EntranceState[];
  filters: FiltersState;
  metadata: SaveMetadata;
}

/**
 * Check state in save file
 * Maps from Check model (camelCase) to save format (snake_case)
 */
export interface CheckState {
  check_id: string; // maps from: id
  check_name: string; // maps from: name
  zone?: string;
  type?: string;
  is_done: boolean; // maps from: isDone
  completed_at?: string; // maps from: completedAt (ISO 8601)
}

/**
 * Entrance state in save file
 * Maps from Entrance model (camelCase) to save format (snake_case)
 */
export interface EntranceState {
  entrance_id?: string; // maps from: id
  entrance_from: string; // maps from: from
  entrance_to: string; // maps from: to
  discovered_at: string; // maps from: discoveredAt (ISO 8601)
}

/**
 * Filters state in save file
 */
export interface FiltersState {
  zone: string | null;
  type: string | null;
  hide_completed: boolean; // maps from: hideCompleted
}

/**
 * Save metadata for display and validation
 */
export interface SaveMetadata {
  seed_name?: string; // Optional seed/spoiler name
  total_checks: number; // maps from: totalChecks
  completed_checks: number; // maps from: completedChecks
  total_entrances: number; // maps from: totalEntrances
}

/**
 * Validation result from save file validation
 */
export interface SaveValidationResult {
  valid: boolean;
  errors: string[];
  metadata?: SaveMetadata;
}
