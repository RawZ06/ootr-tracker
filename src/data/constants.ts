// OoTR Tracker Data
// Main entry point that re-exports all data from separate files

// Re-export types and data from entrances
export type { Entrance } from './entrances';
export { SEED_INFO, INITIAL_ENTRANCES, ENTRANCE_TYPES, REGIONS, DESTINATIONS_BY_AREA } from './entrances';

// Re-export types and data from locations (checks)
export type { Check } from './locations';
export { INITIAL_CHECKS, CHECK_TYPES, CHECK_STATUSES } from './locations';

// Re-export items data
export { ALL_ITEMS, ITEMS_BY_CATEGORY } from './items';
