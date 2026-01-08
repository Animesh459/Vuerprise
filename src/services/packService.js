import apiClient from '@/utils/axios'

/**
 * Pack API Service
 * Handles all pack-related API calls
 */
export const packService = {
  /**
   * Get all packs
   */
  getAll() {
    return apiClient.get('/packs')
  },

  /**
   * Get single pack by ID
   * @param {number|string} id - Pack ID
   */
  getById(id) {
    return apiClient.get(`/packs/${id}`)
  },

  /**
   * Create new pack
   * @param {Object} data - Pack data
   */
  create(data) {
    return apiClient.post('/packs', data)
  },

  /**
   * Update pack
   * @param {number|string} id - Pack ID
   * @param {Object} data - Updated pack data
   */
  update(id, data) {
    return apiClient.put(`/packs/${id}`, data)
  },

  /**
   * Delete pack
   * @param {number|string} id - Pack ID
   */
  delete(id) {
    return apiClient.delete(`/packs/${id}`)
  },

  /**
   * Update pack status
   * @param {number|string} id - Pack ID
   */
  updateStatus(id) {
    return apiClient.post(`/packs/status/${id}`)
  },
}
