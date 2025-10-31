<script setup lang="ts">
const store = useTrackerStore()

// Progress percentages
const checksProgress = computed(() => {
  if (store.checks.length === 0) return 0
  return Math.round((store.completedChecks / store.checks.length) * 100)
})

const entrancesProgress = computed(() => {
  if (store.entrances.length === 0) return 0
  return Math.round((store.discoveredEntrances / store.entrances.length) * 100)
})
</script>

<template>
  <UContainer>
    <div class="py-8 space-y-8">
      <!-- Overall Progress -->
      <UCard>
        <template #header>
          <h2 class="text-xl font-bold">Overall Progress</h2>
        </template>

        <div class="space-y-6">
          <!-- Checks Progress -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="font-semibold">Checks</span>
              <span class="text-2xl font-bold" :class="checksProgress === 0 ? 'text-gray-500' : 'text-green-600'">
                {{ checksProgress }}%
              </span>
            </div>
            <UProgress
              :value="checksProgress"
              :max="100"
              size="lg"
              color="primary"
            />
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {{ store.completedChecks }} / {{ store.checks.length }} completed
            </p>
          </div>

          <!-- Entrances Progress -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="font-semibold">Entrances</span>
              <span class="text-2xl font-bold text-blue-600">
                {{ entrancesProgress }}%
              </span>
            </div>
            <UProgress
              :value="entrancesProgress"
              :max="100"
              size="lg"
              color="primary"
            />
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {{ store.discoveredEntrances }} / {{ store.entrances.length }} discovered
            </p>
          </div>
        </div>
      </UCard>

      <!-- Check Status Breakdown -->
      <UCard>
        <template #header>
          <h2 class="text-xl font-bold">Check Status Breakdown</h2>
        </template>

        <div class="grid grid-cols-4 gap-4">
          <div class="p-4 rounded-lg bg-green-50 dark:bg-green-900/20">
            <div class="text-3xl font-bold text-green-700 dark:text-green-400">
              {{ store.completedChecks }}
            </div>
            <div class="text-sm text-green-600 dark:text-green-400 flex items-center gap-1">
              <span class="text-lg">✓</span>
              Completed
            </div>
          </div>

          <div class="p-4 rounded-lg bg-red-50 dark:bg-red-900/20">
            <div class="text-3xl font-bold text-red-700 dark:text-red-400">
              {{ store.blockedChecks }}
            </div>
            <div class="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
              <span class="text-lg">⛔</span>
              Blocked
            </div>
          </div>

          <div class="p-4 rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
            <div class="text-3xl font-bold text-yellow-700 dark:text-yellow-400">
              {{ store.importantChecks }}
            </div>
            <div class="text-sm text-yellow-600 dark:text-yellow-400 flex items-center gap-1">
              <span class="text-lg">⚠</span>
              Important
            </div>
          </div>

          <div class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
            <div class="text-3xl font-bold text-gray-700 dark:text-gray-300">
              {{ store.remainingChecks }}
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
              <span class="text-lg">⊝</span>
              Remaining
            </div>
          </div>
        </div>
      </UCard>

      <!-- Checks by Type -->
      <UCard>
        <template #header>
          <h2 class="text-xl font-bold">Checks by Type</h2>
        </template>

        <div class="grid grid-cols-4 gap-4">
          <div
            v-for="(count, type) in store.checksByType"
            :key="type"
            class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
          >
            <div class="text-2xl font-bold">{{ count }}</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">{{ type }}</div>
          </div>
        </div>
      </UCard>

      <!-- Entrances by Type -->
      <UCard>
        <template #header>
          <h2 class="text-xl font-bold">Entrances by Type</h2>
        </template>

        <div class="grid grid-cols-3 gap-4">
          <div
            v-for="(count, type) in store.entrancesByType"
            :key="type"
            class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
          >
            <div class="text-2xl font-bold">{{ count }}</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">{{ type }}</div>
          </div>
        </div>
      </UCard>

      <!-- Footer -->
      <div class="text-center text-sm text-gray-500 dark:text-gray-400 py-4">
        OoT Randomizer Allsanity Tracker - {{ store.checks.length }} checks, {{ store.entrances.length }} entrances
      </div>
    </div>
  </UContainer>
</template>
