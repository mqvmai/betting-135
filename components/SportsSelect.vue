<template>
  <div class="flex flex-row pt-5">
    <Listbox as="div" v-model="selected" class="w-1/4">
      <div class="relative">
        <ListboxButton
          class="grid w-full cursor-default grid-cols-1 h-10 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
          <span class="col-start-1 row-start-1 flex items-center gap-3 pr-6">
            <span class="block truncate">{{ selected.description }}</span>
          </span>
          <ChevronUpDownIcon class="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
            aria-hidden="true" />
        </ListboxButton>
        <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100"
          leave-to-class="opacity-0">
          <ListboxOptions
            class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-hidden sm:text-sm">
            <ListboxOption as="template" v-for="sport in sports" :key="sport.key" :value="sport"
              v-slot="{ active, selected }">
              <li
                :class="[active ? 'bg-indigo-600 text-white outline-hidden' : 'text-gray-900', 'relative cursor-default py-2 pr-9 pl-3 select-none']">
                <div class="flex items-center">
                  <span :class="[selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate']">
                    {{ sport.description }}
                  </span>
                </div>
                <span v-if="selected"
                  :class="[active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 right-0 flex items-center pr-4']">
                  <CheckIcon class="size-5" aria-hidden="true" />
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
    <span class="ml-4">
      <button type="button" @click="selectSport()"
        class="text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
        Select Sport
      </button>
    </span>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { ChevronUpDownIcon } from '@heroicons/vue/16/solid'
import { CheckIcon } from '@heroicons/vue/20/solid'
import { useDevModeStore } from '~/stores/devMode'

const devModeStore = useDevModeStore()
const props = defineProps({
  sports: {
    type: Array,
    required: true
  }
})
const emit = defineEmits(['update:sportKey'])
const selected = ref({})
const selectSport = () => {
  emit('update:sportKey', selected.value.key)
}

watch(selected, (newValue) => {
  selected.value = newValue;
})

watch(() => devModeStore.isDevMode, async (newValue) => {
  selected.value = {};
})
</script>