import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Entrance, Check, SaveData, Inventory } from '../types';
import { INITIAL_ENTRANCES, INITIAL_CHECKS } from '../data/constants';

interface TrackerStore {
  entrances: Entrance[];
  checks: Check[];
  inventory: Inventory;
  darkMode: boolean;
  coupledEntrances: boolean;

  // Entrance actions
  updateEntrance: (id: string, updates: Partial<Entrance>) => void;
  toggleCoupledEntrances: () => void;

  // Check actions
  updateCheck: (id: string, updates: Partial<Check>) => void;
  setCheckStatus: (id: string, status: Check['status']) => void;

  // Inventory actions
  updateInventory: (itemName: string, has: boolean) => void;

  // UI actions
  toggleDarkMode: () => void;

  // Import/Export
  exportData: () => SaveData;
  importData: (data: SaveData) => void;
  resetData: () => void;
  loadSampleData: () => Promise<void>;
}

export const useTrackerStore = create<TrackerStore>()(
  persist(
    (set, get) => ({
      entrances: INITIAL_ENTRANCES,
      checks: INITIAL_CHECKS,
      inventory: {},
      darkMode: false,
      coupledEntrances: false,

      updateEntrance: (id, updates) => set((state) => {
        const updatedEntrances = state.entrances.map((e) =>
          e.id === id ? { ...e, ...updates } : e
        );

        // If coupled mode is enabled and we're updating the 'to' field, auto-fill the reverse entrance
        if (state.coupledEntrances && updates.to !== undefined) {
          const currentEntrance = state.entrances.find((e) => e.id === id);
          if (currentEntrance && updates.to && updates.to.trim() !== '') {
            // Current: from "A -> B" leads to "C -> D"
            // Reverse: from "D -> C" should lead to "B -> A"

            // Parse current entrance
            const currentFromParts = currentEntrance.from.split(' -> '); // ["A", "B"]
            const currentToParts = updates.to.split(' -> '); // ["C", "D"]

            if (currentFromParts.length === 2 && currentToParts.length === 2) {
              // Build reverse entrance name: "D -> C"
              const reverseEntranceName = `${currentToParts[1]} -> ${currentToParts[0]}`;
              const reverseEntrance = updatedEntrances.find((e) => e.from === reverseEntranceName);

              if (reverseEntrance) {
                // Reverse should lead to: "B -> A"
                const reverseTo = `${currentFromParts[1]} -> ${currentFromParts[0]}`;
                const reverseToFrom = extractAreaFromLocation(currentFromParts[1]);
                const reverseToArea = extractAreaFromEntrance(reverseTo);

                reverseEntrance.to = reverseTo;
                reverseEntrance.toFrom = reverseToFrom;
                reverseEntrance.toArea = reverseToArea;
              }
            }
          }
        }

        return { entrances: updatedEntrances };
      }),

      toggleCoupledEntrances: () => set((state) => ({
        coupledEntrances: !state.coupledEntrances,
      })),

      updateCheck: (id, updates) => set((state) => ({
        checks: state.checks.map((c) =>
          c.id === id ? { ...c, ...updates } : c
        ),
      })),

      setCheckStatus: (id, status) => set((state) => ({
        checks: state.checks.map((c) =>
          c.id === id ? { ...c, status } : c
        ),
      })),

      updateInventory: (itemName, has) => set((state) => ({
        inventory: { ...state.inventory, [itemName]: has },
      })),

      toggleDarkMode: () => set((state) => {
        const newDarkMode = !state.darkMode;
        if (newDarkMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        return { darkMode: newDarkMode };
      }),

      exportData: () => {
        const state = get();
        return {
          version: '1.0',
          createdAt: new Date().toISOString(),
          lastModified: new Date().toISOString(),
          entrances: state.entrances,
          checks: state.checks,
          inventory: state.inventory,
        };
      },

      importData: (data) => set({
        entrances: data.entrances,
        checks: data.checks,
        inventory: data.inventory,
      }),

      resetData: () => set({
        entrances: INITIAL_ENTRANCES,
        checks: INITIAL_CHECKS,
        inventory: {},
      }),

      loadSampleData: async () => {
        try {
          // Load the spoiler log
          const response = await fetch('/spoiler.json');
          const spoilerData = await response.json();

          const state = get();
          const updatedEntrances = [...state.entrances];
          const updatedChecks = [...state.checks];

          // Fill entrances from spoiler log
          for (const entrance of updatedEntrances) {
            const spoilerDestination = spoilerData.entrances[entrance.from];
            if (spoilerDestination) {
              // The destination is now a full entrance name (e.g., "Kokiri Forest -> Lost Woods")
              // We need to find which entrance key in the spoiler matches the destination
              let destEntranceName = '';

              if (typeof spoilerDestination === 'string') {
                // Simple string destination - this is the entrance name
                destEntranceName = spoilerDestination;
              } else if (typeof spoilerDestination === 'object') {
                // Object format: {region: "X", from: "Y"}
                // We need to find the entrance that matches this destination
                // Look through all entrances in spoiler to find the one that leads to this region
                const targetRegion = spoilerDestination.region;
                const targetFrom = spoilerDestination.from;

                // Find entrance by matching: entrance leads to {region: targetRegion, from: targetFrom}
                for (const [entranceName, entranceDest] of Object.entries(spoilerData.entrances)) {
                  if (typeof entranceDest === 'object' &&
                      entranceDest.region === targetRegion &&
                      entranceDest.from === targetFrom) {
                    destEntranceName = entranceName;
                    break;
                  } else if (typeof entranceDest === 'string' && entranceDest === targetFrom) {
                    destEntranceName = entranceName;
                    break;
                  }
                }

                // Fallback: use the "from" field as destination name
                if (!destEntranceName) {
                  destEntranceName = targetFrom || targetRegion;
                }
              }

              if (destEntranceName) {
                // Extract toFrom (part before arrow) and toArea (part after arrow)
                const parts = destEntranceName.split(' -> ');
                const toFrom = parts.length === 2 ? extractAreaFromLocation(parts[0]) : '';
                const toArea = extractAreaFromEntrance(destEntranceName);
                entrance.to = destEntranceName;
                entrance.toFrom = toFrom;
                entrance.toArea = toArea;
              }
            }
          }

          // Fill checks from spoiler log
          for (const check of updatedChecks) {
            const spoilerItem = spoilerData.locations[check.location];
            if (spoilerItem) {
              const itemName = typeof spoilerItem === 'string' ? spoilerItem : spoilerItem.item;
              if (itemName) {
                check.item = itemName;
                check.status = 'pending';
              }
            }
          }

          set({
            entrances: updatedEntrances,
            checks: updatedChecks,
          });
        } catch (error) {
          console.error('Error loading sample data:', error);
          throw error;
        }
      },
    }),
    {
      name: 'ootr-tracker-storage',
      version: 1,
    }
  )
);

// Helper function to extract area from a location name
function extractAreaFromLocation(locationName: string): string {
  if (!locationName) return '';

  const areaPatterns = [
    { pattern: /Gerudo Training Ground|GTG/, area: 'GTG' },
    { pattern: /Ganons Castle/, area: 'Ganon' },
    { pattern: /Outside Ganons Castle|OGC/, area: 'OGC' },
    { pattern: /Castle Grounds/, area: 'HC' },
    { pattern: /Kakariko Village|Kakariko|Kak/, area: 'Kak' },
    { pattern: /Graveyard|GY/, area: 'GY' },
    { pattern: /Death Mountain Summit/, area: 'DMT' },
    { pattern: /Death Mountain Trail|Death Mountain|DMT/, area: 'DMT' },
    { pattern: /Death Mountain Crater|DMC/, area: 'DMC' },
    { pattern: /Goron City|GC/, area: 'GC' },
    { pattern: /Zoras Fountain|ZF/, area: 'ZF' },
    { pattern: /Zoras Domain|ZD/, area: 'ZD' },
    { pattern: /Zora River|ZR/, area: 'ZR' },
    { pattern: /Lake Hylia|LH/, area: 'LH' },
    { pattern: /Gerudo Valley|GV/, area: 'GV' },
    { pattern: /Hideout/, area: 'Hideout' },
    { pattern: /Gerudo Fortress|GF/, area: 'GF' },
    { pattern: /Haunted Wasteland|Wasteland/, area: 'Wasteland' },
    { pattern: /Desert Colossus|Colossus/, area: 'Colossus' },
    { pattern: /Kokiri Forest|KF/, area: 'KF' },
    { pattern: /Lost Woods|LW/, area: 'LW' },
    { pattern: /Sacred Forest Meadow|SFM/, area: 'SFM' },
    { pattern: /Hyrule Field|HF/, area: 'HF' },
    { pattern: /Lon Lon Ranch|LLR/, area: 'LLR' },
    { pattern: /Hyrule Castle|HC/, area: 'HC' },
    { pattern: /Temple of Time|ToT/, area: 'ToT' },
    { pattern: /Market/, area: 'Market' },
    { pattern: /Queen Gohma|Deku Tree|Deku/, area: 'Deku' },
    { pattern: /King Dodongo|Dodongos Cavern|DC/, area: 'DC' },
    { pattern: /Barinade|Jabu Jabus Belly|Jabu/, area: 'Jabu' },
    { pattern: /Forest Temple|Forest/, area: 'Forest' },
    { pattern: /Volvagia|Fire Temple|Fire/, area: 'Fire' },
    { pattern: /Morpha|Water Temple|Water/, area: 'Water' },
    { pattern: /Bongo Bongo|Shadow Temple|Shadow/, area: 'Shadow' },
    { pattern: /Twinrova|Spirit Temple|Spirit/, area: 'Spirit' },
    { pattern: /Ice Cavern|Ice/, area: 'Ice' },
    { pattern: /Bottom of the Well|BotW/, area: 'Kak' },
    { pattern: /Ganon/, area: 'Ganon' },
  ];

  for (const { pattern, area } of areaPatterns) {
    if (pattern.test(locationName)) {
      return area;
    }
  }

  return 'Unknown';
}

// Helper function to extract area from entrance name (extracts from the part after the arrow for destinations)
function extractAreaFromEntrance(entranceName: string): string {
  if (!entranceName) return '';

  // If this is a full entrance name (with arrow), extract from the part after the arrow
  const parts = entranceName.split(' -> ');
  const locationToCheck = parts.length === 2 ? parts[1] : parts[0];
  return extractAreaFromLocation(locationToCheck);
}
