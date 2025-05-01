<template>
  <div class="relative overflow-x-auto">
    <span v-if="devModeStore.isDevMode"
      class="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-red-900 dark:text-red-300">
      Mock Data
    </span>
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-black-900 mt-10" v-if="odds.data"
      v-for="odd in odds.data" :key="odd.id">
      <thead class="text-xs text-white uppercase bg-gray-500 dark:bg-black dark:text-white-900">
        <tr>
          <th scope="col" class="px-6 py-3 max-w-1/3">
            {{ formatDate(odd.commence_time) }}
          </th>
          <th scope="col" class="px-6 py-3 max-w-1/4 text-center">
            Draft Kings
          </th>
          <th scope="col" class="px-6 py-3 max-w-1/4 text-center">
            Fan Duel
          </th>
          <th scope="col" class="px-6 py-3 max-w-1/4 text-center">
            BetMGM
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="bg-white border-b dark:bg-white-300 dark:border-gray-700 border-gray-200">
          <th scope="row" class="px-6 py-4 font-medium text-black-900 whitespace-nowrap dark:text-black w-1/3">
            <div class="flex items-center">
              <strong>{{ odd.home_team }}</strong>
              <HomeIcon class="w-4 h-4 ml-3" />
            </div>
          </th>
          <td class="px-6 py-4 max-w-1/4 text-center">
            {{ findOdds(odd, 'draftkings', 'home') }}
          </td>
          <td class="px-6 py-4 max-w-1/4 text-center">
            {{ findOdds(odd, 'fanduel', 'home') }}
          </td>
          <td class="px-6 py-4 max-w-1/4 text-center">
            {{ findOdds(odd, 'betmgm', 'home') }}
          </td>
        </tr>
        <tr class="bg-white border-b dark:bg-gray-300 dark:border-white-700 border-gray-200">
          <th scope="row" class="px-6 py-4 font-medium text-black-900 whitespace-nowrap dark:text-black w-1/3">
            <strong>{{ odd.away_team }}</strong>
          </th>
          <td class="px-6 py-4 max-w-1/4 text-center">
            {{ findOdds(odd, 'draftkings', 'away') }}
          </td>
          <td class="px-6 py-4 max-w-1/4 text-center">
            {{ findOdds(odd, 'fanduel', 'away') }}
          </td>
          <td class="px-6 py-4 max-w-1/4 text-center">
            {{ findOdds(odd, 'betmgm', 'away') }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { useDevModeStore } from '~/stores/devMode'
import mockSpreads from '~/assets/mock-data/spreads.json'
import moment from 'moment'
import { HomeIcon } from '@heroicons/vue/24/outline'

const devModeStore = useDevModeStore()
const props = defineProps({
  sportKey: {
    type: String,
    required: true
  }
})
const { data: odds } = devModeStore.isDevMode ? { data: ref(mockSpreads) } : await useFetch('/api/odds', {
  query: {
    sportKey: props.sportKey
  }
})

const findOdds = (odd, bookmaker, teamType) => {
  if (!odd || !bookmaker) return ''
  const bettingsite = odd.bookmakers.find(b => b.key === bookmaker)
  if (!bettingsite) return ''

  const point = bettingsite.markets?.[0]?.outcomes?.find(o => o.name === odd[`${teamType}_team`])?.point
  return point > 0 ? `+${point}` : point
}

const formatDate = (date) => {
  return moment(date).format('MM-DD-YYYY hh:mm a')
}
</script>