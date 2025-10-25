// Type definitions for the OoTR Tracker
// Entrance and Check types are auto-generated in constants.ts
export type { Entrance, Check } from '../data/constants';
import type { Entrance, Check } from '../data/constants';

export interface Inventory {
  [itemName: string]: boolean;
}

export interface SaveData {
  version: string;
  createdAt: string;
  lastModified: string;
  entrances: Entrance[];
  checks: Check[];
  inventory: Inventory;
}

export interface FilterOptions {
  searchTerm: string;
  areas: string[];
  types: string[];
  statuses?: string[];
  fromAreas?: string[];
  toAreas?: string[];
}

export type TabType = 'entrances' | 'checks' | 'stats' | 'pathfinder';
