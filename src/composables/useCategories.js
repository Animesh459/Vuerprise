import { ref, computed } from 'vue'
import { categoryService } from '@/services'

const categories = ref([])
const loading = ref(false)
const error = ref(null)

export function useCategories() {
  /**
   * Fetch all categories
   */
  const fetchCategories = async () => {
    loading.value = true
    error.value = null
    
    try {
      const response = await categoryService.getAll()
      categories.value = response.data.data
      return categories.value
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to fetch categories'
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Fetch all categories (flat list)
   */
  const fetchAllCategories = async () => {
    loading.value = true
    error.value = null
    
    try {
      const response = await categoryService.getAllFlat()
      return response.data.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to fetch categories'
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Create new category
   */
  const createCategory = async (formData) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await categoryService.create(formData)
      await fetchCategories() // Refresh list
      return response.data.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to create category'
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Update category
   */
  const updateCategory = async (id, data) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await categoryService.update(id, data)
      await fetchCategories() // Refresh list
      return response.data.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to update category'
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Delete category
   */
  const deleteCategory = async (id) => {
    loading.value = true
    error.value = null
    
    try {
      await categoryService.delete(id)
      await fetchCategories() // Refresh list
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to delete category'
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Get category dropdown options (for forms)
   */
  const categoryOptions = computed(() => {
    const flattenCategories = (cats, level = 0) => {
      let options = []
      cats.forEach(cat => {
        options.push({
          value: cat.id,
          label: '  '.repeat(level) + cat.name,
          level,
        })
        if (cat.sub_categories && cat.sub_categories.length > 0) {
          options = options.concat(flattenCategories(cat.sub_categories, level + 1))
        }
      })
      return options
    }
    
    return flattenCategories(categories.value)
  })

  return {
    categories: computed(() => categories.value),
    categoryOptions,
    loading: computed(() => loading.value),
    error: computed(() => error.value),
    fetchCategories,
    fetchAllCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  }
}
