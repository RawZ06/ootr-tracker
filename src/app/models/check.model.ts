/**
 * Check Data Models
 *
 * IMPORTANT: JSON mapping uses snake_case (check_id, is_done, completed_at)
 * TypeScript uses camelCase (checkId, isDone, completedAt)
 * Explicit mapping required in SaveLoadService
 */

export interface Check {
  id: string; // Unique identifier (generated or from spoiler)
  name: string; // Check name from spoiler.json (e.g., "GC Darunia Pot 1")
  zone?: string; // Zone from metadata (e.g., "Goron City") - optional for unmapped checks
  type?: string; // Type from metadata (e.g., "Pot", "Chest") - optional for unmapped checks
  isDone: boolean; // Completion status
  completedAt?: string; // ISO 8601 date when marked complete
}

export interface CheckMetadata {
  zone: string; // Zone name
  type: string; // Check type
}

export interface CheckMetadataMap {
  [checkName: string]: CheckMetadata; // Index by check name for O(1) lookup
}
