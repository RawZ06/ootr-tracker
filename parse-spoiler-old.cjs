// Script to parse the OoTR spoiler log and generate TypeScript constants
const fs = require('fs');
const path = require('path');

// Read the spoiler log
const spoilerPath = path.join(__dirname, '..', 'OoTR_1994978_44A4NP37P1_Spoilers.json');
const spoilerData = JSON.parse(fs.readFileSync(spoilerPath, 'utf-8'));

// Extract all unique items from the spoiler log for autocomplete
const allItemsSet = new Set();
const allDestinationsSet = new Set();

// First pass: collect all unique items and destinations
const locationsDataFirst = spoilerData.locations || {};
for (const [location, item] of Object.entries(locationsDataFirst)) {
  if (typeof item === 'string') {
    allItemsSet.add(item);
  } else if (typeof item === 'object' && item.item) {
    allItemsSet.add(item.item);
  }
}

const entrancesDataFirst = spoilerData.entrances || {};
for (const [from, to] of Object.entries(entrancesDataFirst)) {
  if (typeof to === 'string') {
    allDestinationsSet.add(to);
  } else if (typeof to === 'object' && to.from) {
    allDestinationsSet.add(to.from);
  }
  if (typeof to === 'object' && to.region) {
    allDestinationsSet.add(to.region);
  }
}

const ALL_ITEMS = Array.from(allItemsSet).sort();
const ALL_DESTINATIONS = Array.from(allDestinationsSet).sort();

// Parse entrances
const entrancesData = spoilerData.entrances || {};
const entrances = [];

let entranceId = 0;
for (const [from, to] of Object.entries(entrancesData)) {
  entranceId++;

  let destination = '';
  let region = '';

  if (typeof to === 'string') {
    destination = to;
  } else if (typeof to === 'object' && to.region) {
    destination = to.from || to.region;
    region = to.region;
  }

  // Determine entrance type based on naming patterns
  let type = 'Unknown';
  if (from.includes('Spawn') || from.includes('Warp')) {
    type = 'Warp';
  } else if (from.includes('Grotto')) {
    type = 'Grotto';
  } else if (from.includes('Temple') || from.includes('Cavern') || from.includes('Well')) {
    type = 'Dungeon';
  } else if (from.includes('House') || from.includes('Shop') || from.includes('Bazaar')) {
    type = 'Interior';
  } else if (from.includes('->')) {
    type = 'Overworld';
  }

  entrances.push({
    id: `entrance_${String(entranceId).padStart(4, '0')}`,
    from: from,
    to: '', // User will fill this when they discover the entrance
    region: region || '',
    type: type,
    discovered: false,
    notes: ''
  });
}

// Parse locations (checks)
const locationsData = spoilerData.locations || {};
const checks = [];

let checkId = 0;
for (const [location, item] of Object.entries(locationsData)) {
  checkId++;

  // Extract region from location name
  let region = 'Unknown';
  const regionPrefixes = [
    'KF', 'LW', 'SFM', 'HF', 'LLR', 'Market', 'ToT', 'HC', 'OGC',
    'Kak', 'GY', 'DMT', 'GC', 'DMC', 'ZR', 'ZD', 'ZF', 'LH',
    'GV', 'GF', 'Wasteland', 'Colossus', 'Deku', 'DC', 'Jabu',
    'Forest', 'Fire', 'Water', 'Shadow', 'Spirit', 'Ice', 'GTG', 'Ganon'
  ];

  for (const prefix of regionPrefixes) {
    if (location.startsWith(prefix + ' ')) {
      region = prefix;
      break;
    }
  }

  // Determine check type based on official LocationList.py patterns
  let checkType = 'Other';

  // Priority order matters - most specific patterns first

  // Boss rewards (exact matches)
  if (location.match(/^(Queen Gohma|King Dodongo|Barinade|Phantom Ganon|Volvagia|Morpha|Bongo Bongo|Twinrova|Ganon|ToT Reward from Rauru)$/)) {
    checkType = 'Boss';
  }
  // Songs (Sheik, Impa, etc.)
  else if (location.startsWith('Song from') || location.startsWith('Sheik ')) {
    checkType = 'Song';
  }
  // Gold Skulltula Tokens
  else if (location.includes(' GS ')) {
    checkType = 'GoldSkulltula';
  }
  // Shops & Scrubs (before generic patterns)
  else if (location.includes('Shop Item') || location.includes('Bazaar Item') || location.includes('Mask Shop')) {
    checkType = 'Shop';
  }
  else if (location.includes('Scrub Grotto')) {
    checkType = 'GrottoScrub';
  }
  else if (location.includes('Deku Scrub')) {
    checkType = 'Scrub';
  }
  // Cows
  else if (location.includes('Cow')) {
    checkType = 'Cow';
  }
  // Environmental collectibles (specific patterns)
  else if (location.includes('Wonderitem')) {
    checkType = 'Wonderitem';
  }
  else if (location.includes('Beehive')) {
    checkType = 'Beehive';
  }
  else if (location.includes('Crate')) {
    checkType = 'Crate';
  }
  else if (location.includes(' Pot ') || location.endsWith(' Pot') || location.match(/Pot \d/)) {
    checkType = 'Pot';
  }
  else if (location.includes(' Grass ') || location.match(/Grass \d/) || location.includes('Grass Patch')) {
    checkType = 'Grass';
  }
  else if (location.includes('Gossip Stone')) {
    checkType = 'GossipStone';
  }
  // Enemy drops (enemies, souls, etc.)
  else if (location.includes('Octorok') || location.includes('Wolfos') || location.includes('Tektite') ||
           location.includes('Skulltula') || location.includes('Keese') || location.includes('Anubis') ||
           location.includes('Armos') || location.includes('Deku Baba') || location.includes('Soul')) {
    checkType = 'EnemyDrop';
  }
  // Chests (explicit)
  else if (location.includes('Chest')) {
    checkType = 'Chest';
  }
  // Freestanding items (rupees, hearts, PoH)
  else if (location.includes('Freestanding') || location.includes('PoH') ||
           location.includes('Blue Rupee') || location.includes('Green Rupee') ||
           location.includes('Red Rupee') || location.includes('Purple Rupee') ||
           location.includes('Recovery Heart')) {
    checkType = 'Freestanding';
  }
  // NPCs & Rewards
  else if (location.includes('Reward') || location.includes('Gift from') ||
           location.includes('Memory Game') || location.includes('Lost Dog') ||
           location.includes('Shooting Gallery')) {
    checkType = 'NPC';
  }

  // If still Other, it's a genuine edge case

  checks.push({
    id: `check_${String(checkId).padStart(4, '0')}`,
    location: location,
    region: region,
    type: checkType,
    item: '', // User will fill this when they find the item
    price: null, // User will fill the price for shops/scrubs
    status: 'pending',
    notes: ''
  });
}

// Generate TypeScript constants file
const tsContent = `// Auto-generated from OoTR spoiler log
// DO NOT EDIT MANUALLY - Run 'node parse-spoiler.js' to regenerate

export interface Entrance {
  id: string;
  from: string;
  to: string;
  region: string;
  type: 'Warp' | 'Grotto' | 'Dungeon' | 'Interior' | 'Overworld' | 'Unknown';
  discovered: boolean;
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

export const SEED_INFO = {
  totalEntrances: ${entrances.length},
  totalChecks: ${checks.length}
} as const;

export const INITIAL_ENTRANCES: Entrance[] = ${JSON.stringify(entrances, null, 2)};

export const INITIAL_CHECKS: Check[] = ${JSON.stringify(checks, null, 2)};

export const REGIONS = [
  'KF', 'LW', 'SFM', 'HF', 'LLR', 'Market', 'ToT', 'HC', 'OGC',
  'Kak', 'GY', 'DMT', 'GC', 'DMC', 'ZR', 'ZD', 'ZF', 'LH',
  'GV', 'GF', 'Wasteland', 'Colossus', 'Deku', 'DC', 'Jabu',
  'Forest', 'Fire', 'Water', 'Shadow', 'Spirit', 'Ice', 'GTG', 'Ganon'
] as const;

export const ENTRANCE_TYPES = ['Warp', 'Grotto', 'Dungeon', 'Interior', 'Overworld', 'Unknown'] as const;
export const CHECK_TYPES = [
  'Chest', 'GoldSkulltula', 'Song', 'Shop', 'Cow', 'Scrub', 'GrottoScrub', 'NPC', 'Boss',
  'Freestanding', 'Grass', 'Pot', 'Crate', 'Beehive', 'Wonderitem', 'GossipStone',
  'EnemyDrop', 'Other'
] as const;
export const CHECK_STATUSES = ['pending', 'done', 'blocked', 'partial', 'important'] as const;

// All possible items for autocomplete (extracted from spoiler log)
export const ALL_ITEMS = ${JSON.stringify(ALL_ITEMS, null, 2)};

// All possible entrance destinations for autocomplete (extracted from spoiler log)
export const ALL_DESTINATIONS = ${JSON.stringify(ALL_DESTINATIONS, null, 2)};
`;

// Write the TypeScript file
const outputPath = path.join(__dirname, 'src', 'data', 'constants.ts');
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, tsContent, 'utf-8');

console.log(`✅ Parsed ${entrances.length} entrances`);
console.log(`✅ Parsed ${checks.length} checks`);
console.log(`✅ Generated: ${outputPath}`);
