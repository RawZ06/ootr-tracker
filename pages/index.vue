<script setup lang="ts">
const store = useTrackerStore()
const { checks } = storeToRefs(store)

// Search and filters
const search = ref('')
const selectedAreas = ref<string[]>([])
const selectedTypes = ref<string[]>([])
const selectedStatuses = ref<string[]>([])

// Get unique values for filters
const uniqueAreas = computed(() => {
  return [...new Set(checks.value.map(c => c.area).filter(Boolean))].sort()
})

const uniqueTypes = computed(() => {
  return [...new Set(checks.value.map(c => c.type).filter(Boolean))].sort()
})

// Filtered checks
const filteredChecks = computed(() => {
  return checks.value.filter(check => {
    if (search.value && !check.location.toLowerCase().includes(search.value.toLowerCase())) {
      return false
    }
    if (selectedAreas.value.length > 0 && !selectedAreas.value.includes(check.area)) {
      return false
    }
    if (selectedTypes.value.length > 0 && !selectedTypes.value.includes(check.type)) {
      return false
    }
    if (selectedStatuses.value.length > 0 && !selectedStatuses.value.includes(check.status)) {
      return false
    }
    return true
  })
})

// Table columns
const columns = [{
  key: 'status',
  label: 'STATUS'
}, {
  key: 'location',
  label: 'LOCATION'
}, {
  key: 'area',
  label: 'AREA'
}, {
  key: 'type',
  label: 'TYPE'
}, {
  key: 'item',
  label: 'ITEM'
}, {
  key: 'price',
  label: 'PRICE'
}, {
  key: 'notes',
  label: 'NOTES'
}]

// Status options
const statusOptions = ['pending', 'completed', 'blocked', 'important']

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
    'Colossus': 'amber', 'Wasteland': 'yellow', 'Barinade': 'cyan', 'Bongo': 'purple'
  }
  return colors[area] || 'gray'
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
          placeholder="Search checks..."
          size="lg"
        />

        <div class="flex gap-2">
          <USelectMenu
            v-model="selectedAreas"
            :options="uniqueAreas"
            placeholder="Add area filter..."
            multiple
            searchable
          />

          <USelectMenu
            v-model="selectedTypes"
            :options="uniqueTypes"
            placeholder="Add type filter..."
            multiple
            searchable
          />

          <USelectMenu
            v-model="selectedStatuses"
            :options="statusOptions"
            placeholder="Add status filter..."
            multiple
            searchable
          />
        </div>
      </div>

      <!-- Checks Table -->
      <UTable
        :rows="filteredChecks"
        :columns="columns"
      >
        <template #status-data="{ row }">
          <USelectMenu
            :model-value="row.status"
            :options="statusOptions"
            @update:model-value="store.updateCheck(row.id, { status: $event })"
          />
        </template>

        <template #area-data="{ row }">
          <UBadge
            v-if="row.area"
            :color="getAreaColor(row.area)"
            variant="soft"
          >
            {{ row.area }}
          </UBadge>
        </template>

        <template #type-data="{ row }">
          {{ row.type }}
        </template>

        <template #item-data="{ row }">
          {{ row.item }}
        </template>

        <template #price-data="{ row }">
          -
        </template>

        <template #notes-data="{ row }">
          {{ row.notes || 'Click to add notes...' }}
        </template>
      </UTable>
    </div>
  </UContainer>
</template>
