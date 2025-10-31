<script setup lang="ts">
const store = useTrackerStore()

const startArea = ref('')
const endArea = ref('')

// Get all discovered areas from entrances
const accessibleAreas = computed(() => {
  const areas = new Set<string>()

  // Add all fromArea
  store.entrances.forEach(e => {
    if (e.fromArea) areas.add(e.fromArea)
  })

  // Add toArea from discovered entrances
  store.entrances.forEach(e => {
    if (e.to && e.toArea) {
      areas.add(e.toArea)
    }
  })

  return Array.from(areas).sort()
})

const findPath = () => {
  if (!startArea.value || !endArea.value) return
  // TODO: Implement pathfinding algorithm
  console.log('Finding path from', startArea.value, 'to', endArea.value)
}
</script>

<template>
  <UContainer>
    <div class="py-8">
      <UCard>
        <div class="space-y-6">
          <p class="text-gray-600 dark:text-gray-400">
            Find a route between two areas using your discovered entrances
          </p>

          <!-- Start/End Area Selectors -->
          <div class="grid grid-cols-2 gap-4">
            <USelectMenu
              v-model="startArea"
              :options="accessibleAreas"
              placeholder="Select start area..."
              searchable
              size="lg"
            />

            <USelectMenu
              v-model="endArea"
              :options="accessibleAreas"
              placeholder="Select end area..."
              searchable
              size="lg"
            />
          </div>

          <UButton
            size="xl"
            :disabled="!startArea || !endArea"
            @click="findPath"
          >
            Find Path
          </UButton>

          <!-- Accessible Areas Display -->
          <div class="mt-8">
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {{ accessibleAreas.length }} areas are accessible based on your discovered entrances
            </p>

            <div class="flex flex-wrap gap-2">
              <UBadge
                v-for="area in accessibleAreas"
                :key="area"
                variant="soft"
                size="lg"
              >
                {{ area }}
              </UBadge>
            </div>
          </div>
        </div>
      </UCard>
    </div>
  </UContainer>
</template>
