<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useTrackerStore } from '~/stores/tracker'
import type { Check } from '~/stores/tracker'

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
  accessorKey: 'status',
  header: 'STATUS',
  id: 'status'
}, {
  accessorKey: 'location',
  header: 'LOCATION',
  id: 'location'
}, {
  accessorKey: 'area',
  header: 'AREA',
  id: 'area'
}, {
  accessorKey: 'type',
  header: 'TYPE',
  id: 'type'
}, {
  accessorKey: 'item',
  header: 'ITEM',
  id: 'item'
}, {
  accessorKey: 'price',
  header: 'PRICE',
  id: 'price'
}, {
  accessorKey: 'notes',
  header: 'NOTES',
  id: 'notes'
}]

// Status options
const statusOptions = [
  { value: 'pending', label: 'Pending' },
  { value: 'completed', label: 'Completed' },
  { value: 'blocked', label: 'Blocked' },
  { value: 'important', label: 'Important' }
]

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
    'Colossus': 'warning', 'Wasteland': 'warning', 'Barinade': 'info', 'Bongo': 'primary'
  }
  return colors[area] || 'neutral'
}
</script>

<template>
  <div>
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
          option-attribute="label"
          value-attribute="value"
          multiple
        />
      </div>
    </div>

    <!-- Checks Table -->
    <UTable
      :data="filteredChecks"
      :columns="columns"
    >
      <template #status-data="{ row }">
        <USelectMenu
          :model-value="(row as unknown as Check).status"
          :options="statusOptions.map(o => o.value)"
          @update:model-value="store.updateCheck((row as unknown as Check).id, { status: $event })"
        />
      </template>

      <template #area-data="{ row }">
        <UBadge
          v-if="(row as unknown as Check).area"
          :color="getAreaColor((row as unknown as Check).area)"
          variant="soft"
        >
          {{ (row as unknown as Check).area }}
        </UBadge>
      </template>

      <template #type-data="{ row }">
        {{ (row as unknown as Check).type }}
      </template>

      <template #item-data="{ row }">
        {{ (row as unknown as Check).item }}
      </template>

      <template #price-data="{ row }">
        -
      </template>

      <template #notes-data="{ row }">
        {{ (row as unknown as Check).notes || 'Click to add notes...' }}
      </template>
    </UTable>
  </div>
</template>
