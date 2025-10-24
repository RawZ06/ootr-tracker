// Script to parse the OoTR spoiler log and generate TypeScript constants
const fs = require('fs');
const path = require('path');
const https = require('https');

// Fetch LocationList.py to get official location types
async function fetchLocationTypes() {
  return new Promise((resolve, reject) => {
    const url = 'https://raw.githubusercontent.com/rrealmuto/OoT-Randomizer/refs/heads/enemy_shuffle/LocationList.py';

    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        // Parse the Python file to extract location -> type mapping
        const locationTypeMap = {};

        // Regex to match location entries like: ("Location Name", ("Type", ...
        // Format: ("ToT Reward from Rauru", ("Boss", 0xFF, ...
        const regex = /\("([^"]+)",\s*\("([^"]+)"/g;
        let match;

        while ((match = regex.exec(data)) !== null) {
          const locationName = match[1];
          const locationType = match[2];
          locationTypeMap[locationName] = locationType;
        }

        console.log(`📥 Fetched ${Object.keys(locationTypeMap).length} location types from LocationList.py`);
        resolve(locationTypeMap);
      });
    }).on('error', (err) => {
      console.error('⚠️  Failed to fetch LocationList.py:', err.message);
      console.log('Using fallback type detection...');
      resolve(null);
    });
  });
}

// Fetch EntranceShuffle.py to get official entrance types
async function fetchEntranceTypes() {
  return new Promise((resolve, reject) => {
    const url = 'https://raw.githubusercontent.com/rrealmuto/OoT-Randomizer/refs/heads/enemy_shuffle/EntranceShuffle.py';

    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        // Parse the Python file to extract entrance -> type mapping
        const entranceTypeMap = {};

        // Regex to match entrance entries like: ('Dungeon', ('KF Outside Deku Tree -> Deku Tree Lobby', ...
        // Format: ('Type', ('Entrance Name', { ... }), ...)
        const regex = /\('([^']+)',\s*\('([^']+)',\s*\{/g;
        let match;

        while ((match = regex.exec(data)) !== null) {
          const entranceType = match[1];
          const entranceName = match[2];
          entranceTypeMap[entranceName] = entranceType;
        }

        console.log(`📥 Fetched ${Object.keys(entranceTypeMap).length} entrance types from EntranceShuffle.py`);
        resolve(entranceTypeMap);
      });
    }).on('error', (err) => {
      console.error('⚠️  Failed to fetch EntranceShuffle.py:', err.message);
      console.log('Using fallback type detection...');
      resolve(null);
    });
  });
}

// Fetch ItemList.py to get official item categories
async function fetchItemCategories() {
  return new Promise((resolve, reject) => {
    const url = 'https://raw.githubusercontent.com/rrealmuto/OoT-Randomizer/refs/heads/enemy_shuffle/ItemList.py';

    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        // Parse the Python file to extract item -> category mapping
        const itemCategoryMap = {};

        // Regex to match item entries like: 'Item Name': ('Category', ...
        // Format: 'Item Name': ('Category', progressive_flag, GetItemId, {...})
        const regex = /'([^']+)':\s*\('([^']+)',/g;
        let match;

        while ((match = regex.exec(data)) !== null) {
          const itemName = match[1];
          const category = match[2];
          itemCategoryMap[itemName] = category;
        }

        console.log(`📥 Fetched ${Object.keys(itemCategoryMap).length} item categories from ItemList.py`);
        resolve(itemCategoryMap);
      });
    }).on('error', (err) => {
      console.error('⚠️  Failed to fetch ItemList.py:', err.message);
      console.log('Items will not have categories...');
      resolve(null);
    });
  });
}

// Main async function
async function main() {
  console.log('🚀 Starting spoiler log parser...\n');

  // Fetch official types from randomizer source
  const [locationTypeMap, entranceTypeMap, itemCategoryMap] = await Promise.all([
    fetchLocationTypes(),
    fetchEntranceTypes(),
    fetchItemCategories()
  ]);

  // Read the spoiler log
  const spoilerPath = path.join(__dirname, 'OoTR_1994978_44A4NP37P1_Spoilers.json');
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

  // Organize items by category
  const itemsByCategory = {};
  const itemsWithoutCategory = [];

  for (const itemName of allItemsSet) {
    if (itemCategoryMap && itemCategoryMap[itemName]) {
      const category = itemCategoryMap[itemName];
      if (!itemsByCategory[category]) {
        itemsByCategory[category] = [];
      }
      itemsByCategory[category].push(itemName);
    } else {
      itemsWithoutCategory.push(itemName);
    }
  }

  // Sort items within each category
  for (const category in itemsByCategory) {
    itemsByCategory[category].sort();
  }
  itemsWithoutCategory.sort();

  // Add uncategorized items to 'Other' category if any
  if (itemsWithoutCategory.length > 0) {
    itemsByCategory['Other'] = itemsWithoutCategory;
  }

  console.log(`\n📦 Organized ${allItemsSet.size} items into ${Object.keys(itemsByCategory).length} categories`);

  // Function to extract area from entrance name
  function extractArea(entranceName) {
    // Common patterns to extract area
    // Examples: "KF Outside Deku Tree -> ...", "Graveyard Dampe House", "DMT Great Fairy Fountain"

    // Try to extract prefix before common separators
    const prefixes = entranceName.split(/->|Grave|House|Shop|Temple|Cavern|Fountain|Grotto/)[0].trim();

    // Common area abbreviations and names
    const areaMap = {
      'KF': 'KF',
      'Kokiri Forest': 'KF',
      'LW': 'LW',
      'Lost Woods': 'LW',
      'SFM': 'SFM',
      'Sacred Forest Meadow': 'SFM',
      'HF': 'HF',
      'Hyrule Field': 'HF',
      'LLR': 'LLR',
      'Lon Lon Ranch': 'LLR',
      'Market': 'Market',
      'ToT': 'ToT',
      'Temple of Time': 'ToT',
      'HC': 'HC',
      'Hyrule Castle': 'HC',
      'OGC': 'OGC',
      'Outside Ganons Castle': 'OGC',
      'Kak': 'Kak',
      'Kakariko': 'Kak',
      'Kakariko Village': 'Kak',
      'GY': 'GY',
      'Graveyard': 'GY',
      'DMT': 'DMT',
      'Death Mountain Trail': 'DMT',
      'GC': 'GC',
      'Goron City': 'GC',
      'DMC': 'DMC',
      'Death Mountain Crater': 'DMC',
      'ZR': 'ZR',
      'Zora River': 'ZR',
      'ZD': 'ZD',
      'Zoras Domain': 'ZD',
      'ZF': 'ZF',
      'Zoras Fountain': 'ZF',
      'LH': 'LH',
      'Lake Hylia': 'LH',
      'GV': 'GV',
      'Gerudo Valley': 'GV',
      'GF': 'GF',
      'Gerudo Fortress': 'GF',
      'Wasteland': 'Wasteland',
      'Haunted Wasteland': 'Wasteland',
      'Colossus': 'Colossus',
      'Desert Colossus': 'Colossus',
      'Deku': 'Deku',
      'Deku Tree': 'Deku',
      'DC': 'DC',
      'Dodongos Cavern': 'DC',
      'Jabu': 'Jabu',
      'Jabu Jabus Belly': 'Jabu',
      'Forest': 'Forest',
      'Forest Temple': 'Forest',
      'Fire': 'Fire',
      'Fire Temple': 'Fire',
      'Water': 'Water',
      'Water Temple': 'Water',
      'Shadow': 'Shadow',
      'Shadow Temple': 'Shadow',
      'Spirit': 'Spirit',
      'Spirit Temple': 'Spirit',
      'Ice': 'Ice',
      'Ice Cavern': 'Ice',
      'GTG': 'GTG',
      'Gerudo Training Ground': 'GTG',
      'Ganon': 'Ganon',
      'Ganons Castle': 'Ganon',
    };

    // Try to match area from the prefix
    for (const [key, value] of Object.entries(areaMap)) {
      if (prefixes.includes(key)) {
        return value;
      }
    }

    // Try first word
    const firstWord = entranceName.split(/\s+/)[0];
    if (areaMap[firstWord]) {
      return areaMap[firstWord];
    }

    return 'Unknown';
  }

  const ALL_ITEMS = Array.from(allItemsSet).sort();
  const ALL_DESTINATIONS = Array.from(allDestinationsSet).sort();

  // Group destinations by area
  const destinationsByArea = {};
  const destinationsWithoutArea = [];

  for (const destination of allDestinationsSet) {
    const area = extractArea(destination);
    if (area && area !== 'Unknown') {
      if (!destinationsByArea[area]) {
        destinationsByArea[area] = [];
      }
      destinationsByArea[area].push(destination);
    } else {
      destinationsWithoutArea.push(destination);
    }
  }

  // Sort destinations within each area
  for (const area in destinationsByArea) {
    destinationsByArea[area].sort();
  }
  destinationsWithoutArea.sort();

  // Add uncategorized destinations to 'Other' area if any
  if (destinationsWithoutArea.length > 0) {
    destinationsByArea['Unknown'] = destinationsWithoutArea;
  }

  console.log(`📍 Organized ${allDestinationsSet.size} destinations into ${Object.keys(destinationsByArea).length} areas`);

  // Parse entrances
  const entrancesData = spoilerData.entrances || {};
  const entrances = [];
  const entranceTypeStats = {};

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

    // Determine entrance type from EntranceShuffle.py if available
    let entranceType = 'Unknown';

    if (entranceTypeMap && entranceTypeMap[from]) {
      // Use official type from EntranceShuffle.py
      entranceType = entranceTypeMap[from];

      // Map official types to our simplified types
      const typeMapping = {
        'Dungeon': 'Dungeon',
        'DungeonReverse': 'Dungeon',
        'Grotto': 'Grotto',
        'GrottoReverse': 'Grotto',
        'Grave': 'Grotto',
        'GraveReverse': 'Grotto',
        'Interior': 'Interior',
        'InteriorReverse': 'Interior',
        'SpecialInterior': 'Interior',
        'SpecialInteriorReverse': 'Interior',
        'Overworld': 'Overworld',
        'OverworldReverse': 'Overworld',
        'Spawn': 'Warp',
        'SpawnReverse': 'Warp',
        'WarpSong': 'Warp',
        'OwlDrop': 'Warp',
        'ChildSpawn': 'Warp',
        'AdultSpawn': 'Warp',
        'Extra': 'Unknown',
      };

      entranceType = typeMapping[entranceType] || 'Unknown';
    } else {
      // Fallback: Determine entrance type based on naming patterns
      if (from.includes('Spawn') || from.includes('Warp')) {
        entranceType = 'Warp';
      } else if (from.includes('Grotto')) {
        entranceType = 'Grotto';
      } else if (from.includes('Temple') || from.includes('Cavern') || from.includes('Well')) {
        entranceType = 'Dungeon';
      } else if (from.includes('House') || from.includes('Shop') || from.includes('Bazaar')) {
        entranceType = 'Interior';
      } else if (from.includes('->')) {
        entranceType = 'Overworld';
      }
    }

    // Track stats
    entranceTypeStats[entranceType] = (entranceTypeStats[entranceType] || 0) + 1;

    // Extract areas from entrance names
    const fromArea = extractArea(from);
    const toArea = ''; // Will be filled when user selects destination

    entrances.push({
      id: `entrance_${String(entranceId).padStart(4, '0')}`,
      from: from,
      fromArea: fromArea,
      to: '', // User will fill this when they discover the entrance
      toArea: toArea,
      region: region || '',
      type: entranceType,
      notes: ''
    });
  }

  // Parse locations (checks)
  const locationsData = spoilerData.locations || {};
  const checks = [];
  const typeStats = {};

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

    // Determine check type from LocationList.py if available
    let checkType = 'Other';

    if (locationTypeMap && locationTypeMap[location]) {
      // Use official type from LocationList.py
      checkType = locationTypeMap[location];

      // Map official types to our simplified types
      const typeMapping = {
        'Boss': 'Boss',
        'Song': 'Song',
        'Chest': 'Chest',
        'Collectable': 'Freestanding',
        'GS Token': 'GoldSkulltula',
        'NPC': 'NPC',
        'Scrub': 'Scrub',
        'GrottoScrub': 'GrottoScrub',
        'Shop': 'Shop',
        'MaskShop': 'Shop',
        'Freestanding': 'Freestanding',
        'RupeeTower': 'Freestanding',
        'Pot': 'Pot',
        'Crate': 'Crate',
        'SmallCrate': 'Crate',
        'Beehive': 'Beehive',
        'Grass': 'Grass',
        'Wonderitem': 'Wonderitem',
        'GossipStone': 'GossipStone',
        'EnemyDrop': 'EnemyDrop',
        'Cutscene': 'NPC',
        'Event': 'Boss',
      };

      checkType = typeMapping[checkType] || 'Other';
    }

    // Track stats
    typeStats[checkType] = (typeStats[checkType] || 0) + 1;

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
// DO NOT EDIT MANUALLY - Run 'node parse-spoiler.cjs' to regenerate

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

// Items organized by category for grouped selection
export const ITEMS_BY_CATEGORY = ${JSON.stringify(itemsByCategory, null, 2)} as const;

// All possible entrance destinations for autocomplete (extracted from spoiler log)
export const ALL_DESTINATIONS = ${JSON.stringify(ALL_DESTINATIONS, null, 2)};

// Destinations organized by area for grouped selection
export const DESTINATIONS_BY_AREA = ${JSON.stringify(destinationsByArea, null, 2)} as const;
`;

  // Write the TypeScript file
  const outputPath = path.join(__dirname, 'src', 'data', 'constants.ts');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, tsContent, 'utf-8');

  console.log(`\n✅ Parsed ${entrances.length} entrances`);
  console.log(`✅ Parsed ${checks.length} checks`);
  console.log(`✅ Generated: ${outputPath}`);

  console.log('\n📊 Entrance type distribution:');
  const sortedEntranceTypes = Object.entries(entranceTypeStats).sort((a, b) => b[1] - a[1]);
  sortedEntranceTypes.forEach(([type, count]) => {
    console.log(`   ${type.padEnd(20)} ${count}`);
  });

  console.log('\n📊 Check type distribution:');
  const sortedTypes = Object.entries(typeStats).sort((a, b) => b[1] - a[1]);
  sortedTypes.forEach(([type, count]) => {
    console.log(`   ${type.padEnd(20)} ${count}`);
  });
}

// Run the main function
main().catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
});
