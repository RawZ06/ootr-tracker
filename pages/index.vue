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

// Get all items grouped by type from items.yaml
const itemOptionsGrouped = computed(() => {
  const grouped: Record<string, any[]> = {}

  console.log('Total items in store:', Object.keys(store.items).length)

  Object.entries(store.items).forEach(([name, data]: [string, any]) => {
    const type = data.type || 'other'
    if (!grouped[type]) {
      grouped[type] = []
    }
    grouped[type].push({ label: name, value: name })
  })

  console.log('Grouped items:', Object.keys(grouped).map(type => `${type}: ${grouped[type].length}`))

  // Sort items within each group and return formatted for USelectMenu
  return Object.entries(grouped)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([type, items]) => ({
      label: type.charAt(0).toUpperCase() + type.slice(1),
      items: items.sort((a, b) => a.label.localeCompare(b.label))
    }))
})
</script>

<template>
  <UContainer>
    <div class="py-8">
      <!-- Search and Filters -->
      <div class="mb-6 space-y-4">
        <UInput
          v-model="search"
          icon="i-lucide-search"
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
            color="gray"
            variant="soft"
          >
            {{ row.area }}
          </UBadge>
        </template>

        <template #type-data="{ row }">
          <UBadge
            v-if="row.type"
            color="gray"
            variant="outline"
          >
            {{ row.type }}
          </UBadge>
        </template>

        <template #item-data="{ row }">
          <USelectMenu
            :model-value="row.item"
            :options="itemOptionsGrouped"
            searchable
            placeholder="Select item..."
            @update:model-value="store.updateCheck(row.id, { item: $event })"
          >
            <template #label>
              <span v-if="row.item">{{ row.item }}</span>
              <span v-else class="text-gray-400">-</span>
            </template>
          </USelectMenu>
        </template>

        <template #price-data="{ row }">
          <UInput
            v-if="row.type === 'Shop' || row.type === 'Scrub'"
            :model-value="row.price"
            type="number"
            placeholder="0"
            size="sm"
            @update:model-value="store.updateCheck(row.id, { price: $event })"
          />
          <span v-else class="text-gray-400">-</span>
        </template>

        <template #notes-data="{ row }">
          <UInput
            :model-value="row.notes"
            placeholder="Add notes..."
            size="sm"
            @update:model-value="store.updateCheck(row.id, { notes: $event })"
          />
        </template>
      </UTable>
    </div>
  </UContainer>
</template>
