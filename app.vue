<script setup lang="ts">
const store = useTrackerStore()

// Load YAML files on mount
onMounted(async () => {
  if (store.checks.length === 0) {
    await store.loadYamlFiles()
  }
})

const handleExport = () => {
  store.exportProgress()
}

const handleImport = async () => {
  try {
    await store.importProgress()
  } catch (error) {
    console.error('Import failed:', error)
  }
}

const handleLoadSample = async () => {
  try {
    const res = await fetch('/spoiler.json')
    const data = await res.json()
    // TODO: Parse spoiler log and fill entrances
    console.log('Sample data loaded:', data)
  } catch (error) {
    console.error('Failed to load sample:', error)
  }
}

const handleReset = () => {
  if (confirm('Are you sure you want to reset all data? This cannot be undone.')) {
    store.resetAll()
  }
}

const links = [
  {
    label: "Checks",
    to: "/",
    icon: "i-heroicons-check-circle"
  },
  {
    label: "Entrances",
    to: "/entrances",
    icon: "i-heroicons-arrow-right-circle"
  },
  {
    label: "Pathfinder",
    to: "/pathfinder",
    icon: "i-heroicons-map"
  },
  {
    label: "Statistics",
    to: "/statistics",
    icon: "i-heroicons-chart-bar"
  },
]
</script>

<template>
  <div>
    <UHeader :links="links">
      <template #logo>
        <div>
          <h1 class="text-lg font-bold">OoT Randomizer Tracker</h1>
          <p class="text-xs text-gray-500">Allsanity Tracker</p>
        </div>
      </template>

      <template #right>
        <UColorModeButton />
      </template>
    </UHeader>

    <!-- Action Buttons Bar -->
    <div class="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
      <UContainer>
        <div class="flex items-center justify-end gap-2 py-3">
          <UButton
            color="green"
            icon="i-heroicons-arrow-down-tray"
            size="sm"
            @click="handleExport"
          >
            Export Progress
          </UButton>

          <UButton
            color="blue"
            icon="i-heroicons-arrow-up-tray"
            size="sm"
            @click="handleImport"
          >
            Import Progress
          </UButton>

          <UButton
            color="violet"
            icon="i-heroicons-beaker"
            size="sm"
            @click="handleLoadSample"
          >
            Load Sample
          </UButton>

          <UButton
            color="red"
            icon="i-heroicons-trash"
            size="sm"
            @click="handleReset"
          >
            Reset All Data
          </UButton>
        </div>
      </UContainer>
    </div>

    <UMain>
      <NuxtPage />
    </UMain>

    <UNotifications />
  </div>
</template>
