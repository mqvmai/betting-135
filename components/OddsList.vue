<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3">
            Game
          </th>
          <th scope="col" class="px-6 py-3">
            Draft Kings
          </th>
          <th scope="col" class="px-6 py-3">
            Fan Duel
          </th>
          <th scope="col" class="px-6 py-3">
            BetMGM
          </th>
          <th scope="col" class="px-6 py-3">
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200" v-for="odd in odds.data"
          :key="odd.id">
          <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {{ odd.home_team }} vs {{ odd.away_team }}
          </th>
          <td class="px-6 py-4">
            {{ findOdds(odd.bookmakers, 'draftkings') }}
          </td>
          <td class="px-6 py-4">
            {{ findOdds(odd.bookmakers, 'fanduel') }}
          </td>
          <td class="px-6 py-4">
            {{ findOdds(odd.bookmakers, 'betmgm') }}
          </td>
          <td class="px-6 py-4">
            <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- {{ odds.data }} -->
  </div>
</template>

<script setup>
import { useDevMode } from '../composables/useDevMode'
import mockSpreads from '~/assets/mock-data/spreads.json'

const { devMode } = useDevMode()
const props = defineProps({
  sportKey: {
    type: String,
    required: true
  }
})
const { data: odds } = devMode ? { data: ref(mockSpreads) } : await useFetch('/api/odds', {
  query: {
    sportKey: props.sportKey
  }
})

const findOdds = (bookmakers, bookmaker) => {
  if (!bookmakers || !bookmaker) return ''
  const bettingsite = bookmakers.find(b => b.key === bookmaker)
  if (!bettingsite) return ''

  return bettingsite.markets?.[0]?.outcomes?.[0]?.price
}
</script>