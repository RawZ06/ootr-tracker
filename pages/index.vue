<script setup lang="ts">
const store = useTrackerStore()
const { checks, items } = storeToRefs(store)

// Search and filters
const search = ref('')
const selectedAreas = ref<string[]>([])
const selectedTypes = ref<string[]>([])
const selectedStatuses = ref<string[]>([])

// Pagination
const page = ref(1)
const pageSize = ref(50)

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

// Paginated checks
const paginatedChecks = computed(() => {
  const start = (page.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filteredChecks.value.slice(start, end)
})

// Total pages
const totalPages = computed(() => Math.ceil(filteredChecks.value.length / pageSize.value))

// Reset to page 1 when filters change
watch([search, selectedAreas, selectedTypes, selectedStatuses], () => {
  page.value = 1
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
}]

// Status options with emojis and colors
const statusOptions = [
  { label: 'pending', icon: 'i-lucide-clock', color: 'gray' },
  { label: 'completed', icon: 'i-lucide-check-circle', color: 'green' },
  { label: 'blocked', icon: 'i-lucide-x-circle', color: 'red' },
  { label: 'important', icon: 'i-lucide-star', color: 'yellow' }
]

const getStatusConfig = (status: string) => {
  return statusOptions.find(s => s.label === status) || statusOptions[0]
}

// Define the order of item categories in the selector
const ITEM_CATEGORY_ORDER = [
  'DungeonReward',
  'Item',
  'Song',
  'Shop',
  'Soul',
  'Token',
  'SilverRupee',
  'Fish',
  'Map',
  'Compass',
  'SmallKey',
  'BossKey',
  'TCGSmallKey',
  'HideoutSmallKey',
  'Other'
]

// Get all items from items.yaml grouped by type
const itemOptions = computed(() => {
  if (!items.value || Object.keys(items.value).length === 0) return []

  // Group items by type
  const grouped: Record<string, string[]> = {}

  Object.entries(items.value).forEach(([name, data]: [string, any]) => {
    const type = data.type || 'other'
    if (!grouped[type]) {
      grouped[type] = []
    }
    grouped[type].push(name)
  })

  // Convert to flat array with type labels and separators
  const result: any[] = []

  // Sort types according to ITEM_CATEGORY_ORDER
  const sortedTypes = Object.keys(grouped).sort((a, b) => {
    const indexA = ITEM_CATEGORY_ORDER.indexOf(a)
    const indexB = ITEM_CATEGORY_ORDER.indexOf(b)

    // If both are in the order list, sort by their position
    if (indexA !== -1 && indexB !== -1) return indexA - indexB
    // If only A is in the list, it comes first
    if (indexA !== -1) return -1
    // If only B is in the list, it comes first
    if (indexB !== -1) return 1
    // If neither is in the list, sort alphabetically
    return a.localeCompare(b)
  })

  sortedTypes.forEach((type, index) => {
    // Add type label (disabled so it's not selectable)
    result.push({
      type: 'label',
      label: type.charAt(0).toUpperCase() + type.slice(1),
      disabled: true
    })

    // Add sorted items for this type
    grouped[type].sort().forEach(name => {
      result.push({
        label: name,
        value: name
      })
    })

    // Add separator after each group except the last
    if (index < sortedTypes.length - 1) {
      result.push({
        type: 'separator',
        disabled: true
      })
    }
  })

  return result
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

      <!-- Stats and Pagination Controls -->
      <div class="mb-4 flex items-center justify-between">
        <div class="text-sm text-gray-600 dark:text-gray-400">
          Showing {{ paginatedChecks.length }} of {{ filteredChecks.length }} checks ({{ checks.length }} total)
        </div>
        <div class="flex items-center gap-2">
          <USelectMenu
            v-model="pageSize"
            :options="[
              { label: '25', value: 25 },
              { label: '50', value: 50 },
              { label: '100', value: 100 },
              { label: '200', value: 200 }
            ]"
            value-attribute="value"
            option-attribute="label"
            class="w-20"
          />
          <span class="text-sm text-gray-600 dark:text-gray-400">per page</span>
        </div>
      </div>

      <!-- Checks Table -->
      <UTable
        :rows="paginatedChecks"
        :columns="columns"
      >
        <template #location-data="{ row }">
          <UTooltip :text="row.location">
            <span class="block max-w-xs truncate">{{ row.location }}</span>
          </UTooltip>
        </template>
        <template #status-data="{ row }">
          <USelectMenu
            :model-value="row.status"
            :options="statusOptions"
            value-attribute="label"
            @update:model-value="store.updateCheck(row.id, { status: $event })"
          >
            <template #label>
              <div class="flex items-center gap-2" :class="`text-${getStatusConfig(row.status).color}-500`">
                <UIcon
                  :name="getStatusConfig(row.status).icon"
                  class="w-4 h-4"
                />
                <span class="capitalize">{{ row.status }}</span>
              </div>
            </template>
            <template #option="{ option }">
              <UIcon :name="option.icon" class="w-4 h-4" />
              <span class="capitalize">{{ option.label }}</span>
            </template>
          </USelectMenu>
        </template>

        <template #area-data="{ row }">
          <div class="max-w-[120px]">
            <UBadge
              v-if="row.area"
              color="gray"
              variant="soft"
              size="xs"
            >
              {{ row.area }}
            </UBadge>
          </div>
        </template>

        <template #type-data="{ row }">
          <UBadge
            v-if="row.type"
            color="blue"
            variant="subtle"
            size="xs"
          >
            {{ row.type }}
          </UBadge>
        </template>

        <template #item-data="{ row }">
          <USelectMenu
            :model-value="row.item"
            :options="itemOptions"
            searchable
            placeholder="Select item..."
            class="min-w-[250px]"
            value-attribute="value"
            option-attribute="label"
            @update:model-value="store.updateCheck(row.id, { item: $event })"
          />
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
      </UTable>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="mt-6 flex justify-center">
        <UPagination
          v-model="page"
          :total="filteredChecks.length"
          :page-count="pageSize"
          show-last
          show-first
        />
      </div>
    </div>
  </UContainer>
</template>
