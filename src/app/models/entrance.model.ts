/**
 * Entrance Data Models
 *
 * IMPORTANT: JSON mapping uses snake_case (entrance_id, discovered_at)
 * TypeScript uses camelCase (entranceId, discoveredAt)
 */

export interface Entrance {
  from: string; // Source location (e.g., "Kokiri Forest")
  to: string; // Destination location (e.g., "Lost Woods Bridge")
  discoveredAt: string; // ISO 8601 timestamp when discovered
  id?: string; // Optional unique identifier (generated if needed)
}

export interface EntranceMapping {
  [fromLocation: string]: string; // Maps "from" -> "to" for spoiler.json parsing
}
