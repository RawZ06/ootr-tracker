import { defineStore } from 'pinia'
import yaml from 'js-yaml'

export interface Check {
  id: string
  location: string
  area: string
  type: string
  item: string
  price: string
  notes: string
  status: 'pending' | 'completed' | 'blocked' | 'important'
}

export interface Entrance {
  id: string
  from: string
  fromArea: string
  fromSubArea: string
  to: string
  toArea: string
  toSubArea: string
  type: string
  notes: string
}

export const useTrackerStore = defineStore('tracker', {
  state: () => ({
    checks: [] as Check[],
    entrances: [] as Entrance[],
    items: {} as Record<string, any>,
  }),

  getters: {
    completedChecks(): number {
      return this.checks.filter(c => c.status === 'completed').length
    },

    blockedChecks(): number {
      return this.checks.filter(c => c.status === 'blocked').length
    },

    importantChecks(): number {
      return this.checks.filter(c => c.status === 'important').length
    },

    remainingChecks(): number {
      return this.checks.filter(c => c.status === 'pending').length
    },

    discoveredEntrances(): number {
      return this.entrances.filter(e => e.to && e.to.trim() !== '').length
    },

    checksByType(): Record<string, number> {
      const types: Record<string, number> = {}
      this.checks.forEach(check => {
        types[check.type] = (types[check.type] || 0) + 1
      })
      return types
    },

    entrancesByType(): Record<string, number> {
      const types: Record<string, number> = {}
      this.entrances.forEach(entrance => {
        types[entrance.type] = (types[entrance.type] || 0) + 1
      })
      return types
    }
  },

  actions: {
    async loadYamlFiles() {
      try {
        // Load items
        const itemsRes = await fetch('/items.yaml')
        const itemsText = await itemsRes.text()
        this.items = yaml.load(itemsText) as Record<string, any>

        // Load locations (checks)
        const locationsRes = await fetch('/locations.yaml')
        const locationsText = await locationsRes.text()
        const locationsData = yaml.load(locationsText) as Record<string, any>

        this.checks = Object.entries(locationsData).map(([name, data]: [string, any]) => ({
          id: data.id || name,
          location: name,
          area: data.area || '',
          type: data.type || 'unknown',
          item: '',
          price: '',
          notes: '',
          status: 'pending' as const
        }))

        // Load entrances
        const entrancesRes = await fetch('/entrances.yml')
        const entrancesText = await entrancesRes.text()
        const entrancesData = yaml.load(entrancesText) as Record<string, any>

        this.entrances = Object.entries(entrancesData).map(([name, data]: [string, any]) => ({
          id: data.id || name,
          from: name,
          fromArea: data.fromArea || '',
          fromSubArea: data.fromSubArea || '',
          to: '',
          toArea: data.toArea || '',
          toSubArea: data.toSubArea || '',
          type: this.getEntranceType(name),
          notes: ''
        }))
      } catch (error) {
        console.error('Error loading YAML files:', error)
      }
    },

    getEntranceType(entranceName: string): string {
      if (entranceName.includes('Warp')) return 'Warp'
      if (entranceName.includes('Grotto')) return 'Grotto'
      if (entranceName.includes('Shop')) return 'Interior'
      if (entranceName.includes('Temple') || entranceName.includes('Cavern')) return 'Dungeon'
      if (entranceName.includes('Hideout')) return 'Hideout'
      if (entranceName.includes('Boss Room')) return 'Boss'
      return 'Overworld'
    },

    updateCheck(id: string, updates: Partial<Check>) {
      const check = this.checks.find(c => c.id === id)
      if (check) {
        Object.assign(check, updates)
      }
    },

    updateEntrance(id: string, updates: Partial<Entrance>) {
      const entrance = this.entrances.find(e => e.id === id)
      if (entrance) {
        Object.assign(entrance, updates)
      }
    },

    exportProgress() {
      const data = {
        checks: this.checks,
        entrances: this.entrances,
        exportDate: new Date().toISOString()
      }
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `ootr-progress-${Date.now()}.json`
      a.click()
      URL.revokeObjectURL(url)
    },

    async importProgress() {
      return new Promise<void>((resolve, reject) => {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = '.json'
        input.onchange = async (e) => {
          const file = (e.target as HTMLInputElement).files?.[0]
          if (!file) {
            reject(new Error('No file selected'))
            return
          }
          try {
            const text = await file.text()
            const data = JSON.parse(text)
            if (data.checks) this.checks = data.checks
            if (data.entrances) this.entrances = data.entrances
            resolve()
          } catch (error) {
            reject(error)
          }
        }
        input.click()
      })
    },

    resetAll() {
      this.checks.forEach(check => {
        check.item = ''
        check.price = ''
        check.notes = ''
        check.status = 'pending'
      })
      this.entrances.forEach(entrance => {
        entrance.to = ''
        entrance.toArea = ''
        entrance.toSubArea = ''
        entrance.notes = ''
      })
    }
  },

  persist: {
    storage: persistedState.localStorage,
  },
})
