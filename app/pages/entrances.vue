<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useTrackerStore } from '~/stores/tracker'
import type { Entrance } from '~/stores/tracker'

const store = useTrackerStore()
const { entrances } = storeToRefs(store)

// Search and filters
const search = ref('')
const selectedTypes = ref<string[]>([])
const selectedFromAreas = ref<string[]>([])
const selectedToAreas = ref<string[]>([])

// Get unique values for filters
const uniqueTypes = computed(() => {
  return [...new Set(entrances.value.map(e => e.type).filter(Boolean))].sort()
})

const uniqueFromAreas = computed(() => {
  return [...new Set(entrances.value.map(e => e.fromArea).filter(Boolean))].sort()
})

const uniqueToAreas = computed(() => {
  return [...new Set(entrances.value.map(e => e.toArea).filter(Boolean))].sort()
})

// Filtered entrances
const filteredEntrances = computed(() => {
  return entrances.value.filter(entrance => {
    if (search.value && !entrance.from.toLowerCase().includes(search.value.toLowerCase())) {
      return false
    }
    if (selectedTypes.value.length > 0 && !selectedTypes.value.includes(entrance.type)) {
      return false
    }
    if (selectedFromAreas.value.length > 0 && !selectedFromAreas.value.includes(entrance.fromArea)) {
      return false
    }
    if (selectedToAreas.value.length > 0 && !selectedToAreas.value.includes(entrance.toArea)) {
      return false
    }
    return true
  })
})

// Table columns
const columns = [{
  accessorKey: 'from',
  header: 'FROM',
  id: 'from'
}, {
  accessorKey: 'fromArea',
  header: 'FROM AREA',
  id: 'fromArea'
}, {
  accessorKey: 'to',
  header: 'TO',
  id: 'to'
}, {
  accessorKey: 'toArea',
  header: 'TO AREA',
  id: 'toArea'
}, {
  accessorKey: 'type',
  header: 'TYPE',
  id: 'type'
}, {
  accessorKey: 'notes',
  header: 'NOTES',
  id: 'notes'
}]

// Area colors
const getAreaColor = (area: string) => {
  const colors: Record<string, 'primary' | 'error' | 'success' | 'warning' | 'info' | 'neutral'> = {
    'ToT': 'primary', 'Deku': 'success', 'DC': 'warning', 'Jabu': 'info',
    'Forest': 'success', 'Fire': 'error', 'Water': 'info', 'Shadow': 'primary',
    'Spirit': 'warning', 'Bottom': 'primary', 'Ice': 'info', 'GTG': 'neutral',
    'Ganon': 'error', 'GF': 'warning', 'Hideout': 'error',
    'KF': 'success', 'Kak': 'info', 'GY': 'primary', 'Market': 'info', 'HC': 'primary',
    'HF': 'success', 'LH': 'info', 'ZR': 'info', 'ZD': 'info', 'ZF': 'info',
    'DMT': 'error', 'DMC': 'error', 'GC': 'warning', 'Death': 'warning',
    'GV': 'warning', 'LW': 'success', 'SFM': 'success', 'LLR': 'success',
    'Colossus': 'warning', 'Wasteland': 'warning', 'Adult': 'info', 'Child': 'success',
    'Warp': 'primary', 'Temple': 'warning', 'Sacred': 'success', 'Graveyard': 'primary',
    'Bolero': 'warning', 'Minuet': 'success', 'Nocturne': 'primary', 'Prelude': 'primary',
    'Requiem': 'warning', 'Serenade': 'info', 'Castle': 'primary', 'Gerudo': 'warning',
    'Lake': 'info', 'Hyrule': 'success'
  }
  return colors[area] || 'neutral'
}

// Type colors
const getTypeColor = (type: string) => {
  const colors: Record<string, 'primary' | 'error' | 'success' | 'warning' | 'info' | 'neutral'> = {
    'Warp': 'primary',
    'Overworld': 'success',
    'Dungeon': 'warning',
    'Interior': 'info',
    'Grotto': 'neutral',
    'Hideout': 'error',
    'Boss': 'error'
  }
  return colors[type] || 'neutral'
}
</script>

<template>
  <div>
    <!-- Search and Filters -->
    <div class="mb-6 space-y-4">
      <UInput
        v-model="search"
        icon="i-lucide-search"
        placeholder="Search entrances..."
        size="lg"
      />

      <div class="flex gap-2">
        <USelectMenu
          v-model="selectedTypes"
          :options="uniqueTypes"
          placeholder="Add type filter..."
          multiple
          searchable
        />

        <USelectMenu
          v-model="selectedFromAreas"
          :options="uniqueFromAreas"
          placeholder="Filter From Area..."
          multiple
          searchable
        />

        <USelectMenu
          v-model="selectedToAreas"
          :options="uniqueToAreas"
          placeholder="Filter To Area..."
          multiple
          searchable
        />
      </div>
    </div>

    <!-- Entrances Table -->
    <UTable
      :data="filteredEntrances"
      :columns="columns"
    >
      <template #from-data="{ row }">
        {{ (row as unknown as Entrance).from }}
      </template>

      <template #fromArea-data="{ row }">
        <UBadge
          v-if="(row as unknown as Entrance).fromArea"
          :color="getAreaColor((row as unknown as Entrance).fromArea)"
          variant="soft"
        >
          {{ (row as unknown as Entrance).fromArea }}
        </UBadge>
      </template>

      <template #to-data="{ row }">
        {{ (row as unknown as Entrance).to }}
      </template>

      <template #toArea-data="{ row }">
        <UBadge
          v-if="(row as unknown as Entrance).toArea"
          :color="getAreaColor((row as unknown as Entrance).toArea)"
          variant="soft"
        >
          {{ (row as unknown as Entrance).toArea }}
        </UBadge>
      </template>

      <template #type-data="{ row }">
        <UBadge
          v-if="(row as unknown as Entrance).type"
          :color="getTypeColor((row as unknown as Entrance).type)"
          variant="soft"
        >
          {{ (row as unknown as Entrance).type }}
        </UBadge>
      </template>

      <template #notes-data="{ row }">
        {{ (row as unknown as Entrance).notes || 'Click to add notes...' }}
      </template>
    </UTable>
  </div>
</template>
