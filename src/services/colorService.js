import apiClient from '@/utils/axios'

/**
 * Color API Service
 * Handles all color-related API calls
 */
export const colorService = {
  /**
   * Get all colors
   * @param {Object} params - Query parameters for filtering, sorting, pagination
   */
  getAll(params = {}) {
    return apiClient.get('/colors', { params })
  },

  /**
   * Get single color by ID
   * @param {number|string} id - Color ID
   */
  getById(id) {
    return apiClient.get(`/colors/${id}`)
  },

  /**
   * Create new color
   * @param {FormData} formData - Color data (supports image upload)
   */
  create(formData) {
    return apiClient.post('/colors', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },

  /**
   * Update color
   * @param {number|string} id - Color ID
   * @param {FormData} formData - Updated color data
   */
  update(id, formData) {
    return apiClient.post(`/colors/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-HTTP-Method-Override': 'PUT',
      },
    })
  },

  /**
   * Delete color
   * @param {number|string} id - Color ID
   */
  delete(id) {
    return apiClient.delete(`/colors/${id}`)
  },

  /**
   * Update color status
   * @param {number|string} id - Color ID
   */
  updateStatus(id) {
    return apiClient.post(`/colors/status/${id}`)
  },
}
