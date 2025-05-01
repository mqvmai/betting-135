import { defineStore } from 'pinia'

export const useDevModeStore = defineStore('devMode', {
  state: () => {
    return { isDevMode: true }
  },
  actions: {
    toggleDevMode() {
      console.log(`toggleDevMode ${this.isDevMode} going to ${!this.isDevMode}`)
      this.isDevMode = !this.isDevMode
    }
  },
})