<template>
  <div class="flex flex-col bg-white font-sans text-black selection:bg-black selection:text-white">

    <!-- Loading Overlay -->
    <div v-if="loading" class="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p class="text-gray-600">Loading products...</p>
      </div>
    </div>

    <main class="flex-1">

      <div class="flex flex-col justify-between gap-5 border-b border-border pb-5 mb-5">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold tracking-tighter ">
              {{ categoryBreadcrumb ? `${categoryBreadcrumb} Products` : 'Product Catalog' }}
            </h1>
            <p class="mt-2 font-semibold text-gray-600 uppercase">
              {{ pagination.total || 0 }} items
            </p>
          </div>
          <router-link to="/products/create" class="btn-primary-new flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 5v14M5 12h14"/>
            </svg>
            Create New Product
          </router-link>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <div class="flex flex-1">
              <div class="relative flex-1 w-full">
                <Search class="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                <BaseInput 
                  v-model="filters.search" 
                  customClass="pl-8" 
                  placeholder="Search by style no, SKU, product name..."
                  @input="handleSearchInput"
                />
              </div>
          </div>
          <div class="flex gap-2">
            <button 
              class="btn-secondary-new"
              @click="selectAll"
              :disabled="products.length === 0"
            >
              Select All
            </button>
            <button 
              class="btn-secondary-new"
              @click="unselectAll"
              :disabled="selectedProducts.length === 0"
            >
              Unselect All
            </button>
            <button 
              class="btn-primary-new"
              @click="cloneSelected"
            >
              Clone Selected ({{ selectedProducts.length }})
            </button>
          </div>
        </div>
        
        <!-- Filters Row - Hidden for now -->
        <div v-if="false" class="flex flex-wrap items-center gap-3">
          <!-- Status Filter -->
          <select 
            v-model="filters.status" 
            @change="handleFilterChange"
            class="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="">All Status</option>
            <option value="1">Active</option>
            <option value="0">Inactive</option>
          </select>

          <!-- Per Page -->
          <select 
            v-model="filters.per_page" 
            @change="handleFilterChange"
            class="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="10">10 per page</option>
            <option value="30">30 per page</option>
            <option value="50">50 per page</option>
            <option value="100">100 per page</option>
          </select>

          <!-- Sort -->
          <select 
            v-model="filters.sort" 
            @change="handleFilterChange"
            class="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="id">Sort by ID</option>
            <option value="style_no">Sort by Style No</option>
            <option value="created_at">Sort by Date</option>
          </select>

          <!-- Sort Order -->
          <select 
            v-model="filters.sort_order" 
            @change="handleFilterChange"
            class="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>

          <!-- Clear Filters -->
          <button 
            v-if="hasActiveFilters"
            @click="clearFilters"
            class="px-3 py-2 text-sm text-red-600 hover:text-red-800 font-medium"
          >
            Clear Filters
          </button>
        </div>
      </div>


      <!-- Product Grid (Empty state and populated state - no separate loading state) -->
      <div v-if="!loading && products.length === 0" class="flex justify-center items-center py-20">
        <div class="text-gray-500">No products found {{ categoryName ? `in ${categoryName}` : '' }}</div>
      </div>
      
      <div v-if="!loading && products.length > 0" class="grid grid-cols-2 gap-x-4 gap-y-4 md:grid-cols-8 lg:grid-cols-8 xl:grid-cols-10">
        <ProductCard
            v-for="product in products"
            :key="product.id"
            :product="product"
            :selected="isSelected(product.id)"
            @toggle-select="toggleSelect(product.id)"
        />
      </div>

      <!-- Pagination -->
      <div v-if="pagination.last_page > 1" class="mt-8 flex items-center justify-between border-t border-gray-200 pt-6">
        <div class="text-sm text-gray-600">
          Showing {{ pagination.from || 0 }} to {{ pagination.to || 0 }} of {{ pagination.total || 0 }} results
        </div>
        <div class="flex gap-2">
          <button 
            @click="goToPage(1)"
            :disabled="pagination.current_page === 1"
            class="px-3 py-2 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            First
          </button>
          <button 
            @click="goToPage(pagination.current_page - 1)"
            :disabled="pagination.current_page === 1"
            class="px-3 py-2 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Previous
          </button>
          
          <!-- Page Numbers -->
          <template v-for="page in visiblePages" :key="page">
            <button 
              v-if="page !== '...'"
              @click="goToPage(page)"
              :class="[
                'px-3 py-2 border rounded-md text-sm',
                pagination.current_page === page 
                  ? 'bg-black text-white border-black' 
                  : 'border-gray-300 hover:bg-gray-50'
              ]"
            >
              {{ page }}
            </button>
            <span v-else class="px-3 py-2 text-sm text-gray-500">...</span>
          </template>

          <button 
            @click="goToPage(pagination.current_page + 1)"
            :disabled="pagination.current_page === pagination.last_page"
            class="px-3 py-2 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Next
          </button>
          <button 
            @click="goToPage(pagination.last_page)"
            :disabled="pagination.current_page === pagination.last_page"
            class="px-3 py-2 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Last
          </button>
        </div>
      </div>

    </main>

    <!-- Clone Progress Modal -->
    <ProductCloneModal
      :show="showCloneModal"
      :productIds="selectedProducts"
      @close="handleCloneModalClose"
      @completed="handleCloneCompleted"
    />

    <!-- Clone Confirmation Modal -->
    <ConfirmModal
      :show="showConfirmModal"
      title="Clone Products"
      :message="`Are you sure you want to clone ${selectedProducts.length} product(s)?\n\nThis will create duplicate products with new style numbers.`"
      confirmText="Yes, Clone"
      cancelText="Cancel"
      @confirm="handleConfirmClone"
      @cancel="showConfirmModal = false"
    />

  </div>
</template>

<script setup>
import { ChevronDown, Search, Grid, List, Filter } from 'lucide-vue-next'
import ProductCard from './ProductCard.vue'
import ProductCloneModal from './ProductCloneModal.vue'
import ConfirmModal from '@/components/ConfirmModal.vue'
import BaseInput from "@/components/form/BaseInput.vue";
import { ref, onMounted, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from '@/composables/useToast';
import apiClient from '@/utils/axios';

const route = useRoute();
const router = useRouter();
const toast = useToast();
const products = ref([]);
const loading = ref(false);
const categoryName = ref('');
const currentCategory = ref(null); // Store full category details
const selectedProducts = ref([]);
const showCloneModal = ref(false);
const showConfirmModal = ref(false);
let searchTimeout = null;

// Filters state
const filters = ref({
  search: '',
  status: '1', // Default to active
  per_page: '30',
  sort: 'created_at',
  sort_order: 'desc',
  page: 1
});

// Pagination state
const pagination = ref({
  current_page: 1,
  last_page: 1,
  per_page: 30,
  total: 0,
  from: 0,
  to: 0
});

// Initialize filters from query params
const initializeFiltersFromQuery = () => {
  const query = route.query;
  filters.value = {
    search: query.search || '',
    status: query.status || '1', // Default to active
    per_page: query.per_page || '30',
    sort: query.sort || 'created_at',
    sort_order: query.sort_order || 'desc',
    page: parseInt(query.page) || 1
  };
};

// Update URL query params
const updateQueryParams = () => {
  const query = {};
  
  if (filters.value.search) query.search = filters.value.search;
  if (filters.value.status !== '1') query.status = filters.value.status;
  if (filters.value.per_page !== '30') query.per_page = filters.value.per_page;
  if (filters.value.sort !== 'created_at') query.sort = filters.value.sort;
  if (filters.value.sort_order !== 'desc') query.sort_order = filters.value.sort_order;
  if (filters.value.page > 1) query.page = filters.value.page;

  router.push({ query });
};

// Check if there are active filters
const hasActiveFilters = computed(() => {
  return filters.value.search !== '' || 
         filters.value.status !== '1' || 
         filters.value.per_page !== '30' ||
         filters.value.sort !== 'created_at' ||
         filters.value.sort_order !== 'desc';
});

// Build category breadcrumb path
const categoryBreadcrumb = computed(() => {
  if (!currentCategory.value) return '';
  
  const breadcrumbs = [];
  
  // Build breadcrumb from category hierarchy
  if (currentCategory.value.parent) {
    const parentCategory = currentCategory.value.parent_category;
    
    if (parentCategory && parentCategory.parent) {
      // Third level: Grandparent / Parent / Current
      if (parentCategory.parent_category) {
        breadcrumbs.push(parentCategory.parent_category.name);
      }
      breadcrumbs.push(parentCategory.name);
      breadcrumbs.push(currentCategory.value.name);
    } else if (parentCategory) {
      // Second level: Parent / Current
      breadcrumbs.push(parentCategory.name);
      breadcrumbs.push(currentCategory.value.name);
    } else {
      // Has parent ID but no parent object loaded, just show current
      breadcrumbs.push(currentCategory.value.name);
    }
  } else {
    // First level: Just current
    breadcrumbs.push(currentCategory.value.name);
  }
  
  return breadcrumbs.join(' / ');
});

// Fetch products with filters
const fetchProducts = async () => {
  loading.value = true;
  try {
    const categoryId = route.params.categoryId;
    const params = {
      per_page: filters.value.per_page,
      page: filters.value.page,
      sort: filters.value.sort,
      sort_order: filters.value.sort_order
    };

    // Add search params
    if (filters.value.search) {
      params.search = filters.value.search;
      params.search_columns = 'style_no,sku,product_name';
    }

    // Add status filter
    if (filters.value.status !== '') {
      params.status = filters.value.status;
    }

    // Add category filter if exists
    if (categoryId) {
      // Fetch category details to build proper hierarchy
      await fetchCategoryDetails(categoryId);
      
      // Backend expects 'categories' as an array with comma-separated category IDs
      // Format: ['parentId,secondId,thirdId']
      if (currentCategory.value) {
        const categoryHierarchy = buildCategoryHierarchy(currentCategory.value);
        if (categoryHierarchy) {
          params.categories = [categoryHierarchy];
        }
      }
    } else {
      categoryName.value = '';
      currentCategory.value = null;
    }

    const response = await apiClient.get('/products', { params });
    
    // Handle paginated response
    if (response.data.data) {
      products.value = response.data.data;
      
      // Update pagination info
      if (response.data.meta) {
        pagination.value = {
          current_page: response.data.meta.current_page,
          last_page: response.data.meta.last_page,
          per_page: response.data.meta.per_page,
          total: response.data.meta.total,
          from: response.data.meta.from,
          to: response.data.meta.to
        };
      }
    } else {
      products.value = [];
    }

    // Update URL query params
    updateQueryParams();
  } catch (error) {
    console.error('Failed to fetch products:', error);
    products.value = [];
  } finally {
    loading.value = false;
  }
};

// Fetch category details to get full hierarchy
const fetchCategoryDetails = async (categoryId) => {
  try {
    const response = await apiClient.get(`/categories/${categoryId}`);
    currentCategory.value = response.data.data;
    categoryName.value = currentCategory.value?.name || '';
  } catch (error) {
    console.error('Failed to fetch category:', error);
    currentCategory.value = null;
    categoryName.value = '';
  }
};

// Build category hierarchy string based on category level
const buildCategoryHierarchy = (category) => {
  if (!category) return '';
  
  // The backend expects: 'parentId,secondId,thirdId'
  // We need to determine the level and build accordingly
  
  const hierarchyParts = [];
  
  // Check if category has a parent (meaning it's at least second level)
  if (category.parent) {
    // This category has a parent
    const parentCategory = category.parent_category;
    
    if (parentCategory && parentCategory.parent) {
      // Parent has a parent, so current category is third level
      // Format: grandparent,parent,current
      hierarchyParts.push(parentCategory.parent); // grandparent ID
      hierarchyParts.push(category.parent);        // parent ID
      hierarchyParts.push(category.id);            // current ID
    } else {
      // Parent doesn't have a parent, so current category is second level
      // Format: parent,current
      hierarchyParts.push(category.parent);  // parent ID
      hierarchyParts.push(category.id);      // current ID
    }
  } else {
    // No parent, so this is a first level (parent) category
    // Format: current
    hierarchyParts.push(category.id);
  }
  
  return hierarchyParts.join(',');
};

// Handle search input with debounce
const handleSearchInput = () => {
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }
  
  searchTimeout = setTimeout(() => {
    filters.value.page = 1; // Reset to first page on search
    fetchProducts();
  }, 500); // 500ms debounce
};

// Handle filter change
const handleFilterChange = () => {
  filters.value.page = 1; // Reset to first page on filter change
  fetchProducts();
};

// Clear all filters
const clearFilters = () => {
  filters.value = {
    search: '',
    status: '1', // Default to active
    per_page: '30',
    sort: 'created_at',
    sort_order: 'desc',
    page: 1
  };
  fetchProducts();
};

// Pagination: Go to page
const goToPage = (page) => {
  if (page < 1 || page > pagination.value.last_page) return;
  filters.value.page = page;
  fetchProducts();
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Calculate visible page numbers
const visiblePages = computed(() => {
  const current = pagination.value.current_page;
  const last = pagination.value.last_page;
  const delta = 2; // Number of pages to show on each side of current page
  const pages = [];

  for (let i = 1; i <= last; i++) {
    if (i === 1 || i === last || (i >= current - delta && i <= current + delta)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== '...') {
      pages.push('...');
    }
  }

  return pages;
});

// Selection functions
const isSelected = (productId) => {
  return selectedProducts.value.includes(productId);
};

const toggleSelect = (productId) => {
  const index = selectedProducts.value.indexOf(productId);
  if (index > -1) {
    selectedProducts.value.splice(index, 1);
  } else {
    selectedProducts.value.push(productId);
  }
};

const selectAll = () => {
  selectedProducts.value = products.value.map(p => p.id);
};

const unselectAll = () => {
  selectedProducts.value = [];
};

const cloneSelected = () => {
  if (selectedProducts.value.length === 0) {
    toast.warning('Please select at least one product to clone.');
    return;
  }
  
  // Show confirmation modal
  showConfirmModal.value = true;
};

const handleConfirmClone = () => {
  showConfirmModal.value = false;
  // Open the clone progress modal
  showCloneModal.value = true;
};

const handleCloneModalClose = () => {
  showCloneModal.value = false;
};

const handleCloneCompleted = () => {
  // Unselect all items after cloning is completed
  setTimeout(() => {
    unselectAll();
    // Refresh the product list to show newly cloned products
    fetchProducts();
  }, 3000); // Wait for auto-close countdown
};

// Watch for route query changes (browser back/forward)
watch(() => route.query, (newQuery) => {
  initializeFiltersFromQuery();
  fetchProducts();
}, { deep: true });

// Fetch products on mount
onMounted(() => {
  initializeFiltersFromQuery();
  fetchProducts();
});

// Watch for route category changes
watch(() => route.params.categoryId, () => {
  currentCategory.value = null; // Reset category details
  fetchProducts();
});
</script>