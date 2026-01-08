import apiClient from '@/utils/axios'

/**
 * Category API Service
 * Handles all category-related API calls
 */
export const categoryService = {
  /**
   * Get all categories
   */
  getAll() {
    return apiClient.get('/categories')
  },

  /**
   * Get all categories (flat list)
   */
  getAllFlat() {
    return apiClient.get('/all-categories')
  },

  /**
   * Get single category by ID
   * @param {number|string} id - Category ID
   */
  getById(id) {
    return apiClient.get(`/categories/${id}`)
  },

  /**
   * Create new category
   * @param {FormData} formData - Category data (supports file upload)
   */
  create(formData) {
    return apiClient.post('/categories', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },

  /**
   * Update category
   * @param {number|string} id - Category ID
   * @param {Object} data - Updated category data
   */
  update(id, data) {
    return apiClient.put(`/categories/${id}`, data)
  },

  /**
   * Delete category
   * @param {number|string} id - Category ID
   */
  delete(id) {
    return apiClient.delete(`/categories/${id}`)
  },

  /**
   * Update category sort order
   * @param {Object} data - Sort order data
   */
  updateSort(data) {
    return apiClient.post('/categories/sort', data)
  },
}
