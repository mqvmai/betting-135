<template>
  <Disclosure as="nav" class="bg-gray-200" v-slot="{ open }">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <DisclosureButton
            class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
            <span class="absolute -inset-0.5" />
            <span class="sr-only">Open main menu</span>
            <Bars3Icon v-if="!open" class="block size-6" aria-hidden="true" />
            <XMarkIcon v-else class="block size-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div class="flex shrink-0 items-center">
            <img class="h-10 w-auto" src="/logo.png" alt="Betting 135" />
          </div>
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <NuxtLink v-for="item in navigation" :key="item.name" :to="item.href"
                :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-700 hover:text-white', 'rounded-md px-3 py-2 text-sm font-medium']"
                :aria-current="item.current ? 'page' : undefined">
                <component :is="item.icon" class="size-4 inline-block mr-2" />
                {{ item.name }}
              </NuxtLink>
              <label class="inline-flex items-center me-5 cursor-pointer">
                <input type="checkbox" class="sr-only peer" :checked="devModeStore.isDevMode"
                  @change="devModeStore.toggleDevMode">
                <span class="ms-3 text-xs font-xs text-gray-900 dark:text-gray-900 pr-1">dev mode</span>
                <fwb-tooltip>
                  <template #trigger>
                    <InformationCircleIcon class="block size-6  pr-2" aria-hidden="true" />
                  </template>
                  <template #content>
                    turn on dev mode to use mock data (API has limited requests)
                  </template>
                </fwb-tooltip>
                <div
                  class="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-600 dark:peer-checked:bg-red-600">
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <DisclosurePanel class="sm:hidden">
      <div class="space-y-1 px-2 pt-2 pb-3">
        <DisclosureButton v-for="item in navigation" :key="item.name" as="a" :href="item.href"
          :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-700 hover:text-white', 'block rounded-md px-3 py-2 text-base font-medium']"
          :aria-current="item.current ? 'page' : undefined">{{ item.name }}</DisclosureButton>
      </div>
    </DisclosurePanel>
  </Disclosure>
  <div class="container mx-auto p-4">
    <slot />
  </div>
</template>

<script setup>
import { FwbTooltip } from 'flowbite-vue'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon, HomeIcon, ListBulletIcon, InformationCircleIcon } from '@heroicons/vue/24/outline'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useDevModeStore } from '~/stores/devMode'

const devModeStore = useDevModeStore()
const route = useRoute()
const navigation = computed(() => [
  {
    name: 'Home', href: '/', current: route.path === '/', icon: HomeIcon
  },
  {
    name: 'Watchlist', href: '/watchlist', current: route.path === '/watchlist', icon: ListBulletIcon
  },
])
</script>