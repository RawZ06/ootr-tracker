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

// Get all entrance destinations grouped by fromArea from entrances.yml
const destinationOptionsGrouped = computed(() => {
  const grouped: Record<string, any[]> = {}

  entrances.value.forEach(entrance => {
    const area = entrance.fromArea || 'Other'
    if (!grouped[area]) {
      grouped[area] = []
    }
    grouped[area].push({
      label: entrance.from,
      value: entrance.from,
      fromArea: entrance.fromArea,
      fromSubArea: entrance.fromSubArea
    })
  })

  // Sort by area name and items within each group
  return Object.entries(grouped)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([area, items]) => ({
      label: area,
      items: items.sort((a, b) => a.label.localeCompare(b.label))
    }))
})

// Update entrance destination
const updateDestination = (entrance: any, destination: string) => {
  const dest = entrances.value.find(e => e.from === destination)
  if (dest) {
    store.updateEntrance(entrance.id, {
      to: destination,
      toArea: dest.fromArea,
      toSubArea: dest.fromSubArea
    })
  }
}
</script>

<template>
  <UContainer>
    <div class="py-8">
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
        :rows="filteredEntrances"
        :columns="columns"
      >
        <template #from-data="{ row }">
          {{ row.from }}
        </template>

        <template #fromArea-data="{ row }">
          <div class="flex gap-1">
            <UBadge
              v-if="row.fromArea"
              color="gray"
              variant="soft"
            >
              {{ row.fromArea }}
            </UBadge>
            <UBadge
              v-if="row.fromSubArea && row.fromSubArea !== row.fromArea"
              color="gray"
              variant="outline"
            >
              {{ row.fromSubArea }}
            </UBadge>
          </div>
        </template>

        <template #to-data="{ row }">
          <USelectMenu
            :model-value="row.to"
            :options="destinationOptionsGrouped"
            searchable
            placeholder="Select destination..."
            @update:model-value="updateDestination(row, $event)"
          >
            <template #label>
              <span v-if="row.to">{{ row.to }}</span>
              <span v-else class="text-gray-400">-</span>
            </template>
          </USelectMenu>
        </template>

        <template #toArea-data="{ row }">
          <div class="flex gap-1">
            <UBadge
              v-if="row.toArea"
              color="gray"
              variant="soft"
            >
              {{ row.toArea }}
            </UBadge>
            <UBadge
              v-if="row.toSubArea && row.toSubArea !== row.toArea"
              color="gray"
              variant="outline"
            >
              {{ row.toSubArea }}
            </UBadge>
          </div>
        </template>

        <template #type-data="{ row }">
          <UBadge
            v-if="row.type"
            color="gray"
            variant="soft"
          >
            {{ row.type }}
          </UBadge>
        </template>

        <template #notes-data="{ row }">
          <UInput
            :model-value="row.notes"
            placeholder="Add notes..."
            size="sm"
            @update:model-value="store.updateEntrance(row.id, { notes: $event })"
          />
        </template>
      </UTable>
    </div>
  </UContainer>
</template>
