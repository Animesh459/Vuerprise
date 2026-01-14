import apiClient from '@/utils/axios'

/**
 * Master Color API Service
 * Handles all master color-related API calls
 */
export const masterColorService = {
  /**
   * Get all master colors
   * @param {Object} params - Query parameters for filtering, sorting, pagination
   */
  getAll(params = {}) {
    return apiClient.get('/master-colors', { params })
  },

  /**
   * Get single master color by ID
   * @param {number|string} id - Master Color ID
   */
  getById(id) {
    return apiClient.get(`/master-colors/${id}`)
  },

  /**
   * Create a new master color
   * @param {FormData} formData - Form data with name, code, image
   */
  create(formData) {
    return apiClient.post('/master-colors', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },

  /**
   * Update a master color
   * @param {number} id
   * @param {FormData} formData - Form data with name, code, image
   */
  update(id, formData) {
    // Laravel needs _method for PUT with FormData
    formData.append('_method', 'PUT')
    return apiClient.post(`/master-colors/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },

  /**
   * Delete master color
   * @param {number|string} id - Master Color ID
   */
  delete(id) {
    return apiClient.delete(`/master-colors/${id}`)
  },

  /**
   * Update master color status
   * @param {number|string} id - Master Color ID
   */
  updateStatus(id) {
    return apiClient.post(`/master-colors/status/${id}`)
  },
}
