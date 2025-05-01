<template>
  <div>
    <SportsSelect :sports="sports.data" @update:sport-key="sportKey = $event" />
    <OddsList v-if="sportKey" :sport-key="sportKey" />
  </div>
</template>

<script setup>
import { useDevModeStore } from '~/stores/devMode'
import mockSports from '~/assets/mock-data/sports.json'

const devModeStore = useDevModeStore()
const { data: sports } = devModeStore.isDevMode ? { data: ref(mockSports) } : await useFetch('/api/sports')
const sportKey = ref(null)

watch(() => devModeStore.isDevMode, async (newValue) => {
  if (newValue) {
    sports.value = mockSports
    sportKey.value = null
  } else {
    const { data } = await useFetch('/api/sports')
    sports.value = data.value
    sportKey.value = null
  }
})
</script>
