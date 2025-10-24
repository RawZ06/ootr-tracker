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
    }),
    {
      name: 'ootr-tracker-storage',
      version: 1,
    }
  )
);
