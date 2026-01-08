import apiClient from '@/utils/axios'

/**
 * User Profile API Service
 */
export const userService = {
  /**
   * Get current user profile
   */
  getProfile() {
    return apiClient.get('/user')
  },

  /**
   * Update user profile
   * @param {Object} data - Profile data (name, email, etc.)
   */
  updateProfile(data) {
    return apiClient.put('/user/profile', data)
  },

  /**
   * Update password
   * @param {Object} data - Password data (current_password, password, password_confirmation)
   */
  updatePassword(data) {
    return apiClient.put('/user/password', data)
  },

  /**
   * Upload profile image
   * @param {FormData} formData - Form data with image file
   */
  uploadProfileImage(formData) {
    return apiClient.post('/user/profile-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
}

/**
 * Site Settings API Service
 */
export const settingsService = {
  /**
   * Get site settings
   */
  getSettings() {
    return apiClient.get('/settings')
  },

  /**
   * Update site settings
   * @param {FormData} formData - Settings data (may include logo file)
   */
  updateSettings(formData) {
    return apiClient.post('/settings', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
}
