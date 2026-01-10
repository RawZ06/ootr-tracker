/**
 * Spoiler.json Data Models
 *
 * Structure for parsing OOT Randomizer spoiler.json files
 * Expected format from randomizer output
 */

export interface SpoilerData {
  locations?: LocationsMap; // Check name -> Item name mapping
  entrances?: EntrancesMap; // Entrance shuffling mappings
  settings?: Record<string, unknown>; // Randomizer settings (optional)
  version?: string; // Randomizer version (optional)
}

export interface LocationsMap {
  [checkName: string]: string; // e.g., "GC Darunia Pot 1" -> "Deku Shield"
}

export interface EntrancesMap {
  [fromLocation: string]: string; // e.g., "Kokiri Forest -> Lost Woods Bridge" -> "Lost Woods Bridge -> Kokiri Forest"
}
