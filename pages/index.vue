<template>
  <div>
    <SportsSelect :sports="sports" @update:sport-key="sportKey = $event" />
    <OddsList v-if="sportKey" :sport-key="sportKey" />
  </div>
</template>

<script setup>
import { useDevMode } from '../composables/useDevMode'
import mockSports from '~/assets/mock-data/sports.json'

const { devMode } = useDevMode()
const { data: sports } = devMode ? { data: ref(mockSports) } : await useFetch('/api/sports')
const sportKey = ref(null)
</script>
