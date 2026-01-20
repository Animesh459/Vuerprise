import apiClient from '@/utils/axios'

export const settingsCrudService = {
  // Payment Terms
  async getPaymentTerms(params = {}) {
    const response = await apiClient.get('/payment-terms', { params })
    return response.data
  },
  async getPaymentTerm(id) {
    const response = await apiClient.get(`/payment-terms/${id}`)
    return response.data
  },
  async createPaymentTerm(data) {
    const response = await apiClient.post('/payment-terms', data)
    return response.data
  },
  async updatePaymentTerm(id, data) {
    const response = await apiClient.put(`/payment-terms/${id}`, data)
    return response.data
  },
  async deletePaymentTerm(id) {
    const response = await apiClient.delete(`/payment-terms/${id}`)
    return response.data
  },
  async updatePaymentTermStatus(id) {
    const response = await apiClient.post(`/payment-terms/status/${id}`)
    return response.data
  },

  // Shipping Methods
  async getShippingMethods(params = {}) {
    const response = await apiClient.get('/shipping-methods', { params })
    return response.data
  },
  async getShippingMethod(id) {
    const response = await apiClient.get(`/shipping-methods/${id}`)
    return response.data
  },
  async createShippingMethod(data) {
    const response = await apiClient.post('/shipping-methods', data)
    return response.data
  },
  async updateShippingMethod(id, data) {
    const response = await apiClient.put(`/shipping-methods/${id}`, data)
    return response.data
  },
  async deleteShippingMethod(id) {
    const response = await apiClient.delete(`/shipping-methods/${id}`)
    return response.data
  },
  async updateShippingMethodStatus(id) {
    const response = await apiClient.post(`/shipping-methods/status/${id}`)
    return response.data
  },

  // Warehouses
  async getWarehouses(params = {}) {
    const response = await apiClient.get('/warehouses', { params })
    return response.data
  },
  async getWarehouse(id) {
    const response = await apiClient.get(`/warehouses/${id}`)
    return response.data
  },
  async createWarehouse(data) {
    const response = await apiClient.post('/warehouses', data)
    return response.data
  },
  async updateWarehouse(id, data) {
    const response = await apiClient.put(`/warehouses/${id}`, data)
    return response.data
  },
  async deleteWarehouse(id) {
    const response = await apiClient.delete(`/warehouses/${id}`)
    return response.data
  },
  async updateWarehouseStatus(id) {
    const response = await apiClient.post(`/warehouses/status/${id}`)
    return response.data
  }
}
