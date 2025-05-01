import { defineStore } from 'pinia'

export const useDevModeStore = defineStore('devMode', {
  state: () => {
    return { isDevMode: true }
  },
  actions: {
    toggleDevMode() {
      this.isDevMode = !this.isDevMode
    }
  },
})