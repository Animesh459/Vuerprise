import apiClient from '@/utils/axios'

/**
 * Master Color API Service
 * Handles all master color-related API calls
 */
export const masterColorService = {
  /**
   * Get all master colors
   */
  getAll() {
    return apiClient.get('/master-colors')
  },

  /**
   * Get single master color by ID
   * @param {number|string} id - Master Color ID
   */
  getById(id) {
    return apiClient.get(`/master-colors/${id}`)
  },

  /**
   * Create new master color
   * @param {Object} data - Master color data
   */
  create(data) {
    return apiClient.post('/master-colors', data)
  },

  /**
   * Update master color
   * @param {number|string} id - Master Color ID
   * @param {Object} data - Updated master color data
   */
  update(id, data) {
    return apiClient.put(`/master-colors/${id}`, data)
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
