import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import apiClient from '@/utils/axios'

const user = ref(null)
const token = ref(null)
const isAuthenticated = computed(() => !!token.value && !!user.value)

export function useAuth() {
  const router = useRouter()

  // Initialize auth state from localStorage
  const initAuth = () => {
    const storedToken = localStorage.getItem('authToken')
    const storedUser = localStorage.getItem('user')
    
    if (storedToken && storedUser) {
      token.value = storedToken
      try {
        user.value = JSON.parse(storedUser)
      } catch (e) {
        // If user data is corrupted, clear everything
        clearAuth()
      }
    }
  }

  // Login function
  const login = async (email, password) => {
    try {
      const response = await apiClient.post('/login', {
        email,
        password,
        device: 'web',
      })

      const authData = response.data.data
      
      // Store auth data
      token.value = authData.token
      user.value = {
        id: authData.id,
        name: authData.name,
        email: authData.email,
        status: authData.status,
        profile_image: authData.profile_image,
      }

      // Persist to localStorage
      localStorage.setItem('authToken', authData.token)
      localStorage.setItem('user', JSON.stringify(user.value))

      return { success: true, user: user.value }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed. Please check your credentials.'
      const errors = error.response?.data?.errors || {}
      
      return {
        success: false,
        message: errorMessage,
        errors,
      }
    }
  }

  // Logout function
  const logout = async () => {
    try {
      // Call logout API
      await apiClient.post('/logout')
    } catch (error) {
      // Even if API call fails, clear local auth
      console.error('Logout API error:', error)
    } finally {
      clearAuth()
      router.push('/login')
    }
  }

  // Clear authentication data
  const clearAuth = () => {
    token.value = null
    user.value = null
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
  }

  // Fetch current user
  const fetchUser = async () => {
    try {
      const response = await apiClient.get('/user')
      user.value = response.data
      localStorage.setItem('user', JSON.stringify(user.value))
      return user.value
    } catch (error) {
      clearAuth()
      throw error
    }
  }

  // Initialize on first call
  initAuth()

  return {
    user: computed(() => user.value),
    token: computed(() => token.value),
    isAuthenticated,
    login,
    logout,
    fetchUser,
    clearAuth,
  }
}
