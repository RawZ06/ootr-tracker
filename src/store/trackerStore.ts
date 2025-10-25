import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Entrance, Check, SaveData, Inventory } from '../types';
import { INITIAL_ENTRANCES, INITIAL_CHECKS } from '../data/constants';

interface TrackerStore {
  entrances: Entrance[];
  checks: Check[];
  inventory: Inventory;
  darkMode: boolean;

  // Entrance actions
  updateEntrance: (id: string, updates: Partial<Entrance>) => void;

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

      updateEntrance: (id, updates) => set((state) => ({
        entrances: state.entrances.map((e) =>
          e.id === id ? { ...e, ...updates } : e
        ),
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
          const response = await fetch('/OoTR_1994978_44A4NP37P1_Spoilers.json');
          const spoilerData = await response.json();

          const state = get();
          const updatedEntrances = [...state.entrances];
          const updatedChecks = [...state.checks];

          // Fill entrances from spoiler log
          for (const entrance of updatedEntrances) {
            const spoilerDestination = spoilerData.entrances[entrance.from];
            if (spoilerDestination) {
              const destName = typeof spoilerDestination === 'string' ? spoilerDestination : spoilerDestination.from || spoilerDestination.region;
              if (destName) {
                // Extract area from destination using the same logic as in EntrancesTable
                const toArea = extractAreaFromEntrance(destName);
                entrance.to = destName;
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

// Helper function to extract area from entrance name
function extractAreaFromEntrance(entranceName: string): string {
  if (!entranceName) return '';

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
    if (pattern.test(entranceName)) {
      return area;
    }
  }

  return 'Unknown';
}
