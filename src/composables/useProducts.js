import { ref, computed } from 'vue'
import { productService } from '@/services'

const products = ref([])
const currentProduct = ref(null)
const loading = ref(false)
const error = ref(null)
const pagination = ref({
  current_page: 1,
  per_page: 20,
  total: 0,
  last_page: 1,
})

export function useProducts() {
  /**
   * Fetch products with pagination
   */
  const fetchProducts = async (params = {}) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await productService.getAll({
        page: pagination.value.current_page,
        per_page: pagination.value.per_page,
        ...params,
      })
      
      products.value = response.data.data
      
      // Update pagination if present in response
      if (response.data.meta) {
        pagination.value = {
          current_page: response.data.meta.current_page,
          per_page: response.data.meta.per_page,
          total: response.data.meta.total,
          last_page: response.data.meta.last_page,
        }
      }
      
      return products.value
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to fetch products'
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Fetch single product
   */
  const fetchProduct = async (id) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await productService.getById(id)
      currentProduct.value = response.data.data || response.data
      return currentProduct.value
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to fetch product'
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Create new product
   */
  const createProduct = async (data) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await productService.create(data)
      await fetchProducts() // Refresh list
      return response.data.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to create product'
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Update product
   */
  const updateProduct = async (id, data) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await productService.update(id, data)
      await fetchProducts() // Refresh list
      return response.data.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to update product'
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Delete product
   */
  const deleteProduct = async (id) => {
    loading.value = true
    error.value = null
    
    try {
      await productService.delete(id)
      await fetchProducts() // Refresh list
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to delete product'
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Change page
   */
  const goToPage = (page) => {
    pagination.value.current_page = page
    return fetchProducts()
  }

  return {
    products: computed(() => products.value),
    currentProduct: computed(() => currentProduct.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value),
    pagination: computed(() => pagination.value),
    fetchProducts,
    fetchProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    goToPage,
  }
}
