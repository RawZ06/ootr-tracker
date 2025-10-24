// Type definitions for the OoTR Tracker

export interface Entrance {
  id: string;
  from: string;
  fromArea: string;
  to: string;
  toArea: string;
  region: string;
  type: 'Warp' | 'Grotto' | 'Dungeon' | 'Interior' | 'Overworld' | 'Unknown';
  notes: string;
}

export interface Check {
  id: string;
  location: string;
  region: string;
  type: 'Chest' | 'GoldSkulltula' | 'Song' | 'Shop' | 'Cow' | 'Scrub' | 'GrottoScrub' | 'NPC' | 'Boss' |
       'Freestanding' | 'Grass' | 'Pot' | 'Crate' | 'Beehive' | 'Wonderitem' | 'GossipStone' |
       'EnemyDrop' | 'Other';
  item: string;
  price: number | null;
  status: 'pending' | 'done' | 'blocked' | 'partial' | 'important';
  notes: string;
}

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
  regions: string[];
  types: string[];
  statuses?: string[];
  fromAreas?: string[];
  toAreas?: string[];
}

export type TabType = 'entrances' | 'checks' | 'stats';
