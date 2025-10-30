<script setup>
import { useTrackerStore } from '~/stores/tracker'

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

const title = 'OoT Randomizer Tracker'
const description = 'Allsanity Tracker'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description
})

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
</script>

<template>
  <UApp>
    <UContainer class="py-8">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h1 class="text-3xl font-bold">OoT Randomizer Tracker</h1>
            <p class="text-gray-600 dark:text-gray-400">Allsanity Tracker</p>
          </div>

          <div class="flex items-center gap-2">
            <UButton
              color="green"
              icon="i-lucide-download"
              @click="handleExport"
            >
              Export Progress
            </UButton>

            <UButton
              color="blue"
              icon="i-lucide-upload"
              @click="handleImport"
            >
              Import Progress
            </UButton>

            <UButton
              color="violet"
              icon="i-lucide-flask-conical"
              @click="handleLoadSample"
            >
              Load Sample
            </UButton>

            <UButton
              color="red"
              icon="i-lucide-trash-2"
              @click="handleReset"
            >
              Reset All Data
            </UButton>

            <UColorModeButton />
          </div>
        </div>

        <!-- Tabs Navigation -->
        <div class="flex gap-1 border-b border-gray-200 dark:border-gray-800">
          <NuxtLink
            to="/"
            class="px-4 py-2 text-sm font-medium rounded-t-lg transition-colors"
            :class="$route.path === '/' ? 'bg-white dark:bg-gray-900 text-primary border-b-2 border-primary' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'"
          >
            Checks
          </NuxtLink>
          <NuxtLink
            to="/entrances"
            class="px-4 py-2 text-sm font-medium rounded-t-lg transition-colors"
            :class="$route.path === '/entrances' ? 'bg-white dark:bg-gray-900 text-primary border-b-2 border-primary' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'"
          >
            Entrances
          </NuxtLink>
          <NuxtLink
            to="/pathfinder"
            class="px-4 py-2 text-sm font-medium rounded-t-lg transition-colors"
            :class="$route.path === '/pathfinder' ? 'bg-white dark:bg-gray-900 text-primary border-b-2 border-primary' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'"
          >
            Pathfinder
          </NuxtLink>
          <NuxtLink
            to="/statistics"
            class="px-4 py-2 text-sm font-medium rounded-t-lg transition-colors"
            :class="$route.path === '/statistics' ? 'bg-white dark:bg-gray-900 text-primary border-b-2 border-primary' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'"
          >
            Statistics
          </NuxtLink>
        </div>
      </div>

      <!-- Page Content -->
      <UMain>
        <NuxtPage />
      </UMain>
    </UContainer>
  </UApp>
</template>
