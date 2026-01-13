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

  /**
   * Get all users with pagination
   * @param {Object} params - Query parameters (page, per_page, search, status)
   */
  async getUsers(params = {}) {
    const response = await apiClient.get('/users', { params })
    return response.data
  },

  /**
   * Get single user
   * @param {Number} id - User ID
   */
  async getUser(id) {
    const response = await apiClient.get(`/users/${id}`)
    return response.data
  },

  /**
   * Create new user
   * @param {FormData} formData - User data
   */
  async createUser(formData) {
    const response = await apiClient.post('/users', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  /**
   * Update user
   * @param {Number} id - User ID
   * @param {FormData} formData - User data
   */
  async updateUser(id, formData) {
    // Laravel doesn't support PUT with multipart/form-data, so we use POST with _method
    formData.append('_method', 'PUT')
    const response = await apiClient.post(`/users/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  /**
   * Delete user
   * @param {Number} id - User ID
   */
  async deleteUser(id) {
    const response = await apiClient.delete(`/users/${id}`)
    return response.data
  },

  /**
   * Update user status
   * @param {Number} id - User ID
   * @param {Object} data - Status data
   */
  async updateUserStatus(id, data) {
    const response = await apiClient.post(`/user/status/${id}`, data)
    return response.data
  },
}

/**
 * Site Settings API Service
 */
export const settingsService = {
  /**
   * Get general settings (site name, logo)
   */
  getGeneralSettings() {
    return apiClient.get('/settings/general')
  },

  /**
   * Update general settings
   * @param {FormData} formData - General settings data (site_name, logo)
   */
  updateGeneralSettings(formData) {
    return apiClient.post('/settings/general', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },

  /**
   * Get inventory settings (low stock, reorder quantities)
   */
  getInventorySettings() {
    return apiClient.get('/settings/inventory')
  },

  /**
   * Update inventory settings
   * @param {Object} data - Inventory settings data (low_stock_qty, reorder_qty)
   */
  updateInventorySettings(data) {
    return apiClient.post('/settings/inventory', data)
  },
}
