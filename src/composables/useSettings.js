import { ref } from 'vue'
import { settingsService } from '@/services'

const settings = ref(null)
const loading = ref(false)

export function useSettings() {
  const fetchSettings = async () => {
    loading.value = true
    
    try {
      const response = await settingsService.getSettings()
      settings.value = response.data.data || response.data
      return settings.value
    } catch (error) {
      console.error('Failed to fetch settings:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  return {
    settings,
    loading,
    fetchSettings,
  }
}
