import apiClient from '@/utils/axios'

/**
 * Pack API Service
 * Handles all pack-related API calls
 */
export const packService = {
  /**
   * Get all packs for a specific size
   * @param {Object} params - Query parameters including size_id
   */
  getAll(params = {}) {
    return apiClient.get('/packs', { params })
  },

  /**
   * Update pack configuration for a size
   * @param {Object} data - Pack update data
   * {
   *   size_id: number,
   *   size: { name, status, s1, s2, s3... },
   *   pack: [{ p1, p2, p3... }, ...],
   *   removeRatio: [{ id }, ...]
   * }
   */
  updatePacks(data) {
    return apiClient.post('/packs/update', data)
  },
}
