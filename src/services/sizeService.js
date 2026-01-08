import apiClient from '@/utils/axios'

/**
 * Size API Service
 * Handles all size-related API calls
 */
export const sizeService = {
  /**
   * Get all sizes
   */
  getAll() {
    return apiClient.get('/sizes')
  },

  /**
   * Get single size by ID
   * @param {number|string} id - Size ID
   */
  getById(id) {
    return apiClient.get(`/sizes/${id}`)
  },

  /**
   * Create new size
   * @param {Object} data - Size data
   */
  create(data) {
    return apiClient.post('/sizes', data)
  },

  /**
   * Update size
   * @param {number|string} id - Size ID
   * @param {Object} data - Updated size data
   */
  update(id, data) {
    return apiClient.put(`/sizes/${id}`, data)
  },

  /**
   * Delete size
   * @param {number|string} id - Size ID
   */
  delete(id) {
    return apiClient.delete(`/sizes/${id}`)
  },

  /**
   * Update size status
   * @param {number|string} id - Size ID
   */
  updateStatus(id) {
    return apiClient.post(`/sizes/status/${id}`)
  },
}
