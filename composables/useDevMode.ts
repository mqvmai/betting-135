export const useDevMode = () => {
  const devMode = useState<boolean>('dev-mode-state', () => true)

  const toggleDevMode = () => {
    devMode.value = !devMode.value
  }

  return {
    devMode,
    toggleDevMode
  }
} 