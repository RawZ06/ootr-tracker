<script setup lang="ts">
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
  key: 'from',
  label: 'FROM'
}, {
  key: 'fromArea',
  label: 'FROM AREA'
}, {
  key: 'to',
  label: 'TO'
}, {
  key: 'toArea',
  label: 'TO AREA'
}, {
  key: 'type',
  label: 'TYPE'
}, {
  key: 'notes',
  label: 'NOTES'
}]

// Area colors
const getAreaColor = (area: string) => {
  const colors: Record<string, string> = {
    'ToT': 'violet', 'Deku': 'green', 'DC': 'orange', 'Jabu': 'cyan',
    'Forest': 'green', 'Fire': 'red', 'Water': 'blue', 'Shadow': 'purple',
    'Spirit': 'yellow', 'Bottom': 'purple', 'Ice': 'cyan', 'GTG': 'gray',
    'Ganon': 'red', 'GF': 'orange', 'Hideout': 'red',
    'KF': 'green', 'Kak': 'blue', 'GY': 'purple', 'Market': 'blue', 'HC': 'indigo',
    'HF': 'lime', 'LH': 'cyan', 'ZR': 'teal', 'ZD': 'cyan', 'ZF': 'blue',
    'DMT': 'red', 'DMC': 'red', 'GC': 'orange', 'Death': 'orange',
    'GV': 'yellow', 'LW': 'green', 'SFM': 'green', 'LLR': 'green',
    'Colossus': 'amber', 'Wasteland': 'yellow', 'Adult': 'blue', 'Child': 'green',
    'Warp': 'violet', 'Temple': 'amber', 'Sacred': 'green', 'Graveyard': 'purple',
    'Bolero': 'red', 'Minuet': 'green', 'Nocturne': 'purple', 'Prelude': 'violet',
    'Requiem': 'yellow', 'Serenade': 'blue', 'Castle': 'indigo', 'Gerudo': 'orange',
    'Lake': 'cyan', 'Hyrule': 'green'
  }
  return colors[area] || 'gray'
}

// Type colors
const getTypeColor = (type: string) => {
  const colors: Record<string, string> = {
    'Warp': 'violet',
    'Overworld': 'green',
    'Dungeon': 'orange',
    'Interior': 'blue',
    'Grotto': 'gray',
    'Hideout': 'red',
    'Boss': 'pink'
  }
  return colors[type] || 'gray'
}
</script>

<template>
  <UContainer>
    <div class="py-8">
      <!-- Search and Filters -->
      <div class="mb-6 space-y-4">
        <UInput
          v-model="search"
          icon="i-heroicons-magnifying-glass"
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
        :rows="filteredEntrances"
        :columns="columns"
      >
        <template #from-data="{ row }">
          {{ row.from }}
        </template>

        <template #fromArea-data="{ row }">
          <UBadge
            v-if="row.fromArea"
            :color="getAreaColor(row.fromArea)"
            variant="soft"
          >
            {{ row.fromArea }}
          </UBadge>
        </template>

        <template #to-data="{ row }">
          {{ row.to }}
        </template>

        <template #toArea-data="{ row }">
          <UBadge
            v-if="row.toArea"
            :color="getAreaColor(row.toArea)"
            variant="soft"
          >
            {{ row.toArea }}
          </UBadge>
        </template>

        <template #type-data="{ row }">
          <UBadge
            v-if="row.type"
            :color="getTypeColor(row.type)"
            variant="soft"
          >
            {{ row.type }}
          </UBadge>
        </template>

        <template #notes-data="{ row }">
          {{ row.notes || 'Click to add notes...' }}
        </template>
      </UTable>
    </div>
  </UContainer>
</template>
