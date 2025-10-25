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

        // Match tuples like: ('Type', ('Entrance1', {...}), ('Entrance2', {...}))
        // Both entrances in the tuple share the same type
        const tupleRegex = /\('([^']+)',\s*\('([^']+)',\s*\{[^}]*\}\)[,\s]*(?:\('([^']+)',\s*\{[^}]*\}\))?/g;
        let match;

        while ((match = tupleRegex.exec(data)) !== null) {
          const entranceType = match[1];
          const entrance1 = match[2];
          const entrance2 = match[3];

          // Assign the type to the first entrance (forward)
          entranceTypeMap[entrance1] = entranceType;

          // If there's a second entrance (reverse), assign the same type
          if (entrance2) {
            entranceTypeMap[entrance2] = entranceType;
          }
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
    // Normalize bottles: group all "Bottle with X" (except Rutos Letter and Big Poe) into "Bottle"
    let normalizedName = itemName;
    if (itemName.startsWith('Bottle with ') &&
        itemName !== 'Bottle with Big Poe' &&
        itemName !== 'Rutos Letter') {
      normalizedName = 'Bottle';
    }

    if (itemCategoryMap && itemCategoryMap[itemName]) {
      const category = itemCategoryMap[itemName];
      if (!itemsByCategory[category]) {
        itemsByCategory[category] = [];
      }
      // Only add if not already present (for normalized bottles)
      if (!itemsByCategory[category].includes(normalizedName)) {
        itemsByCategory[category].push(normalizedName);
      }
    } else {
      if (!itemsWithoutCategory.includes(normalizedName)) {
        itemsWithoutCategory.push(normalizedName);
      }
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

  // Build a comprehensive location -> area mapping from entrance types
  // This maps every location/grotto/dungeon name to its area code
  function buildLocationAreaMap(entranceTypeMap) {
    const locationAreaMap = {
      // Area abbreviations - direct mappings
      'KF': 'KF', 'LW': 'LW', 'SFM': 'SFM', 'HF': 'HF', 'LLR': 'LLR',
      'Market': 'Market', 'ToT': 'ToT', 'HC': 'HC', 'OGC': 'OGC',
      'Kak': 'Kak', 'GY': 'GY', 'DMT': 'DMT', 'GC': 'GC', 'DMC': 'DMC',
      'ZR': 'ZR', 'ZD': 'ZD', 'ZF': 'ZF', 'LH': 'LH',
      'GV': 'GV', 'GF': 'GF', 'Wasteland': 'Wasteland', 'Colossus': 'Colossus',
      'Deku': 'Deku', 'DC': 'DC', 'Jabu': 'Jabu',
      'Forest': 'Forest', 'Fire': 'Fire', 'Water': 'Water',
      'Shadow': 'Shadow', 'Spirit': 'Spirit', 'Ice': 'Ice',
      'GTG': 'GTG', 'Ganon': 'Ganon',
    };

    // Parse entrance type map to extract location areas from entrance names
    // For each "A -> B" entrance, A tells us where B is located
    for (const entranceName in entranceTypeMap) {
      if (entranceName.includes(' -> ')) {
        const [source, dest] = entranceName.split(' -> ');

        // If source area is known, we can infer that dest is in that area
        const sourceArea = extractAreaSimple(source, locationAreaMap);
        if (sourceArea && sourceArea !== 'Unknown') {
          // Store the destination location's area
          if (!locationAreaMap[dest]) {
            locationAreaMap[dest] = sourceArea;
          }
        }
      }
    }

    return locationAreaMap;
  }

  // Simple extraction using known area names and common patterns
  function extractAreaSimple(locationName, knownLocations) {
    if (!locationName) return 'Unknown';

    // Check if it's a known location
    if (knownLocations[locationName]) {
      return knownLocations[locationName];
    }

    // Check for area prefix patterns (e.g., "KF Outside Deku Tree")
    for (const [areaCode, area] of Object.entries(knownLocations)) {
      if (locationName.startsWith(areaCode + ' ')) {
        return area;
      }
    }

    // Special cases for boss rewards (no location prefix)
    if (locationName === 'Queen Gohma') return 'Deku';
    if (locationName === 'King Dodongo') return 'DC';
    if (locationName === 'Barinade') return 'Jabu';
    if (locationName === 'Phantom Ganon') return 'Forest';
    if (locationName === 'Volvagia') return 'Fire';
    if (locationName === 'Morpha') return 'Water';
    if (locationName === 'Bongo Bongo') return 'Shadow';
    if (locationName === 'Twinrova') return 'Spirit';

    // Songs from NPCs
    if (locationName === 'Song from Impa') return 'Kak';
    if (locationName === 'Song from Malon') return 'LLR';
    if (locationName === 'Song from Saria') return 'SFM';
    if (locationName === 'Song from Royal Familys Tomb') return 'GY';
    if (locationName === 'Song from Ocarina of Time') return 'ToT';
    if (locationName === 'Song from Windmill') return 'Kak';

    // Sheik songs
    if (locationName === 'Sheik in Forest') return 'Forest';
    if (locationName === 'Sheik in Crater') return 'DMC';
    if (locationName === 'Sheik at Colossus') return 'Colossus';
    if (locationName === 'Sheik at Temple') return 'Water';

    // Ganon's Tower (should be Ganon area)
    if (locationName.startsWith('Ganons Tower ')) return 'Ganon';

    // Check for area name anywhere in the location name
    const areaMatches = [
      { pattern: /Kokiri Forest/, area: 'KF' },
      { pattern: /Lost Woods/, area: 'LW' },
      { pattern: /Sacred Forest Meadow/, area: 'SFM' },
      { pattern: /Hyrule Field/, area: 'HF' },
      { pattern: /Lon Lon Ranch/, area: 'LLR' },
      { pattern: /Market|Market Entrance/, area: 'Market' },
      { pattern: /Temple of Time/, area: 'ToT' },
      { pattern: /Hyrule Castle/, area: 'HC' },
      { pattern: /Outside Ganons Castle/, area: 'OGC' },
      { pattern: /Kakariko|Kak/, area: 'Kak' },
      { pattern: /Graveyard/, area: 'GY' },
      { pattern: /Death Mountain Trail|Death Mountain Summit/, area: 'DMT' },
      { pattern: /Goron City/, area: 'GC' },
      { pattern: /Death Mountain Crater/, area: 'DMC' },
      { pattern: /Zora River/, area: 'ZR' },
      { pattern: /Zoras Domain/, area: 'ZD' },
      { pattern: /Zoras Fountain/, area: 'ZF' },
      { pattern: /Lake Hylia/, area: 'LH' },
      { pattern: /Gerudo Valley/, area: 'GV' },
      { pattern: /Gerudo Fortress/, area: 'GF' },
      { pattern: /Hideout/, area: 'Hideout' },
      { pattern: /Haunted Wasteland/, area: 'Wasteland' },
      { pattern: /Desert Colossus/, area: 'Colossus' },
      { pattern: /Gerudo Training Ground/, area: 'GTG' },
      { pattern: /Ganons Castle/, area: 'Ganon' },
      { pattern: /Deku Tree/, area: 'Deku' },
      { pattern: /Dodongos Cavern/, area: 'DC' },
      { pattern: /Jabu/, area: 'Jabu' },
      { pattern: /Forest Temple/, area: 'Forest' },
      { pattern: /Fire Temple/, area: 'Fire' },
      { pattern: /Water Temple/, area: 'Water' },
      { pattern: /Shadow Temple/, area: 'Shadow' },
      { pattern: /Spirit Temple/, area: 'Spirit' },
      { pattern: /Ice Cavern/, area: 'Ice' },
      { pattern: /Bottom of the Well/, area: 'Kak' },
    ];

    for (const { pattern, area } of areaMatches) {
      if (pattern.test(locationName)) {
        return area;
      }
    }

    return 'Unknown';
  }

  // Extract area using the comprehensive location map
  function extractArea(locationName, locationAreaMap) {
    if (!locationName) return 'Unknown';

    // Direct lookup
    if (locationAreaMap[locationName]) {
      return locationAreaMap[locationName];
    }

    // Fallback to simple extraction
    return extractAreaSimple(locationName, locationAreaMap);
  }

  // Normalize ALL_ITEMS: group bottles (except Rutos Letter and Big Poe)
  const normalizedItemsSet = new Set();
  for (const itemName of allItemsSet) {
    if (itemName.startsWith('Bottle with ') &&
        itemName !== 'Bottle with Big Poe' &&
        itemName !== 'Rutos Letter') {
      normalizedItemsSet.add('Bottle');
    } else {
      normalizedItemsSet.add(itemName);
    }
  }

  const ALL_ITEMS = Array.from(normalizedItemsSet).sort();
  const ALL_DESTINATIONS = Array.from(allDestinationsSet).sort();

  // Build comprehensive location -> area mapping from entrance types
  const locationAreaMap = buildLocationAreaMap(entranceTypeMap);

  // Group destinations by area
  const destinationsByArea = {};
  const destinationsWithoutArea = [];

  for (const destination of allDestinationsSet) {
    const area = extractArea(destination, locationAreaMap);
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

  // Map entrance types from EntranceShuffle.py
  const entranceTypes = new Map();

  if (entranceTypeMap) {
    for (const [entranceName, officialType] of Object.entries(entranceTypeMap)) {
      // Map official types to our simplified types
      const typeMapping = {
        'Dungeon': 'Dungeon',
        'DungeonSpecial': 'Dungeon',
        'Grotto': 'Grotto',
        'Grave': 'Grotto',
        'Interior': 'Interior',
        'SpecialInterior': 'Interior',
        'Hideout': 'Hideout',
        'Overworld': 'Overworld',
        'OverworldOneWay': 'Overworld',
        'Spawn': 'Warp',
        'WarpSong': 'Warp',
        'OwlDrop': 'Warp',
        'ChildSpawn': 'Warp',
        'AdultSpawn': 'Warp',
        'ChildBoss': 'Boss',
        'AdultBoss': 'Boss',
        'SpecialBoss': 'Boss',
        'Extra': 'Unknown',
      };

      const mappedType = typeMapping[officialType] || 'Unknown';
      entranceTypes.set(entranceName, mappedType);
    }
  }

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

    // Determine entrance type
    let entranceType = 'Unknown';

    if (entranceTypes.has(from)) {
      entranceType = entranceTypes.get(from);
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
    // For fromArea, only look at the part before the arrow
    const fromPart = from.split(' -> ')[0];
    let fromArea = extractArea(fromPart, locationAreaMap);

    // Special case: Warp songs and Spawns have no fixed location (can be used from anywhere)
    // Check the official type from Python before it was mapped
    const officialType = entranceTypeMap ? Object.entries(entranceTypeMap).find(([name]) => name === from)?.[1] : null;
    if (officialType === 'WarpSong' || officialType === 'Spawn' ||
        officialType === 'ChildSpawn' || officialType === 'AdultSpawn') {
      fromArea = 'Warp';
    }

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
        'BossHeart': 'Boss',
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
        'FlyingPot': 'Pot',
        'Crate': 'Crate',
        'SmallCrate': 'Crate',
        'Beehive': 'Beehive',
        'Grass': 'Grass',
        'Wonderitem': 'Wonderitem',
        'GossipStone': 'GossipStone',
        'HintStone': 'GossipStone',
        'EnemyDrop': 'EnemyDrop',
        'Cutscene': 'NPC',
        'Event': 'Boss',
        'Drop': 'Freestanding',
        'SilverRupee': 'SilverRupee',
        'Fish': 'Fish',
        'Hint': 'Hint',
      };

      checkType = typeMapping[checkType] || 'Other';

      // Special case: Cows are NPC type in Python but we want them separate
      // Cows always have "Cow" in their location name
      if (checkType === 'NPC' && location.includes(' Cow')) {
        checkType = 'Cow';
      }
    }

    // Track stats
    typeStats[checkType] = (typeStats[checkType] || 0) + 1;

    // Extract area from location name
    const area = extractArea(location, locationAreaMap);

    checks.push({
      id: `check_${String(checkId).padStart(4, '0')}`,
      location: location,
      area: area,
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
  type: 'Warp' | 'Grotto' | 'Dungeon' | 'Interior' | 'Hideout' | 'Overworld' | 'Boss' | 'Unknown';
  notes: string;
}

export interface Check {
  id: string;
  location: string;
  area: string;
  type: 'Chest' | 'GoldSkulltula' | 'Song' | 'Shop' | 'Cow' | 'Scrub' | 'GrottoScrub' | 'NPC' | 'Boss' |
        'Freestanding' | 'Grass' | 'Pot' | 'Crate' | 'Beehive' | 'Wonderitem' | 'GossipStone' |
        'EnemyDrop' | 'SilverRupee' | 'Fish' | 'Hint' | 'Other';
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

export const ENTRANCE_TYPES = ['Warp', 'Grotto', 'Dungeon', 'Interior', 'Hideout', 'Overworld', 'Boss', 'Unknown'] as const;
export const CHECK_TYPES = [
  'Chest', 'GoldSkulltula', 'Song', 'Shop', 'Cow', 'Scrub', 'GrottoScrub', 'NPC', 'Boss',
  'Freestanding', 'Grass', 'Pot', 'Crate', 'Beehive', 'Wonderitem', 'GossipStone',
  'EnemyDrop', 'SilverRupee', 'Fish', 'Hint', 'Other'
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
