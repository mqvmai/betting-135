import { defineStore } from 'pinia'

export const useDevModeStore = defineStore('devMode', {
  state: () => ({
    isDevMode: true
  }),
  actions: {
    toggleDevMode() {
      this.isDevMode = !this.isDevMode
    }
  },
  persist: true  // Enable persistence
}) 