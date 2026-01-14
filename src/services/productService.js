import apiClient from '@/utils/axios'

/**
 * Product API Service
 * Handles all product-related API calls
 */
export const productService = {
  /**
   * Get all products
   * @param {Object} params - Query parameters (page, per_page, search, etc.)
   */
  getAll(params = {}) {
    return apiClient.get('/products', { params })
  },

  /**
   * Get single product by ID
   * @param {number|string} id - Product ID
   */
  getById(id) {
    return apiClient.get(`/products/${id}`)
  },

  /**
   * Create new product
   * @param {Object} data - Product data
   */
  create(data) {
    return apiClient.post('/products', data)
  },

  /**
   * Update product
   * @param {number|string} id - Product ID
   * @param {Object} data - Updated product data
   */
  update(id, data) {
    return apiClient.put(`/products/${id}`, data)
  },

  /**
   * Delete product
   * @param {number|string} id - Product ID
   */
  delete(id) {
    return apiClient.delete(`/products/${id}`)
  },

  /**
   * Get products by category
   * @param {number|string} categoryId - Category ID
   * @param {Object} params - Query parameters
   */
  getByCategory(categoryId, params = {}) {
    return apiClient.get(`/categories/${categoryId}/products`, { params })
  },
}
