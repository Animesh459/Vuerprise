import { ref } from 'vue'
import { settingsService } from '@/services'

const settings = ref(null)
const loading = ref(false)

export function useSettings() {
  const fetchSettings = async () => {
    loading.value = true
    
    try {
      // Fetch general settings (logo and site name for header)
      const response = await settingsService.getGeneralSettings()
      settings.value = response.data.data || response.data
      return settings.value
    } catch (error) {
      console.error('Failed to fetch settings:', error)
      // Return default values on error so the header doesn't break
      settings.value = {
        site_name: 'Vlan24 ERP',
        logo: null
      }
      return settings.value
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
