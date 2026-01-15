<template>
  <div class=" min-h-screen">
    <!-- Loading Overlay -->
    <div v-if="loading" class="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p class="text-gray-600">Loading...</p>
      </div>
    </div>

    <!-- Header Section -->
    <div class="flex flex-col  pb-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <div class="flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-600 shadow-lg shadow-blue-600/30">
            <PlusCircleIcon :size="24" class="text-white" />
          </div>
          <div>
            <h1 class="text-3xl font-bold tracking-tighter text-gray-900">
              {{ formTitle }}
            </h1>
            <p class="text-sm text-gray-600 mt-1">{{ formSubtitle }}</p>
          </div>
        </div>

        <div class="flex gap-2">
          <button
            @click="submit"
            :disabled="loading"
            class="btn-primary-new"
          >
            {{ loading ? 'Saving...' : (type === 'edit' ? 'Update Product' : 'Save Product') }}
          </button>
          <router-link
            v-if="type !== 'clone' && product && product.id"
            :to="{ name: 'products.clone', params: { id: product.id } }"
            class="btn-secondary-new"
          >
            Clone
          </router-link>
          <router-link
            v-if="type !== 'clone' && product && product.previous_product_id"
            :to="{ name: 'products.edit', params: { id: product.previous_product_id } }"
            class="btn-secondary-new"
          >
            ← Previous
          </router-link>
          <router-link
            v-if="type !== 'clone' && product && product.next_product_id"
            :to="{ name: 'products.edit', params: { id: product.next_product_id } }"
            class="btn-secondary-new"
          >
            Next →
          </router-link>
        </div>
      </div>
    </div>

    <!-- All Content in One Page (No Tabs) -->
    <div class="space-y-8 pb-8">
      <!-- Product Info Section -->
      <div class="common-card-new">
        <div class=" space-y-6">
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-lg flex items-center justify-center">
                <PackageIcon class="text-blue-500" :size="24" />
              </div>
              <h2 class="text-lg font-bold text-gray-900">Product Information</h2>
            </div>
            <!-- Status Toggle -->
            <div class="flex items-center gap-4 p-1.5 rounded-full border border-zinc-200">
              <button
                  @click="form.status = 1"
                  :class="[
                'flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all',
                form.status === 1 ? 'bg-blue-500 text-white' : 'text-slate-500 hover:text-slate-300'
              ]"
              >
                <div class="w-2 h-2 rounded-full" :class="form.status === 1 ? 'bg-white' : 'bg-slate-600'"></div>
                ACTIVE
              </button>
              <button
                  @click="form.status = 0"
                  :class="[
                'flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all',
                form.status === 0 ? 'bg-rose-500 text-white' : 'text-slate-500 hover:text-slate-300'
              ]"
              >
                <div class="w-2 h-2 rounded-full" :class="form.status === 0 ? 'bg-white' : 'bg-slate-600'"></div>
                INACTIVE
              </button>
            </div>
          </div>

          <div class="grid grid-cols-12 gap-6">
            <!-- Left Column -->
            <div class="col-span-6 space-y-4">

              <!-- Style No & SKU -->
              <div class="grid grid-cols-2 gap-4">
                <BaseInput
                    label="Style No"
                    v-model="form.style_no"
                    :error="getError('style_no')"
                    required
                />
                <BaseInput
                    label="SKU"
                    v-model="form.sku"
                    :error="getError('sku')"
                />
              </div>

              <!-- Size & Pack -->
              <div class="grid grid-cols-2 gap-4">
                <BaseSelect
                    label="Size"
                    v-model="form.size_id"
                    :options="sizeOptions"
                    @change="onSizeChange"
                    :error="getError('size_id')"
                    required
                />
                <BaseSelect
                    label="Pack"
                    v-model="form.pack_id"
                    :options="packOptions"
                    :error="getError('pack_id')"
                    required
                />
              </div>

              <!-- Pricing -->
              <BaseInput
                  label="FOB Price"
                  type="number"
                  step="0.01"
                  v-model="form.fob_price"
                  :error="getError('fob_price')"
                  required
              />
              <BaseInput
                  label="Landed Price"
                  type="number"
                  step="0.01"
                  v-model="form.landed_price"
                  :error="getError('landed_price')"
                  required
              />
              <BaseInput
                  label="Resale Price"
                  type="number"
                  step="0.01"
                  v-model="form.resale_price"
                  :error="getError('resale_price')"
                  required
              />
            </div>

            <!-- Right Column -->
            <div class="col-span-6 space-y-4">
              <!-- Slug (Only for Edit) -->
              <BaseInput
                  v-if="type === 'edit'"
                  label="Product Slug"
                  v-model="form.slug"
                  :error="getError('slug')"
              />
              <!-- Product Name -->
              <BaseInput
                  label="Product Name"
                  v-model="form.product_name"
                  :error="getError('product_name')"
              />

              <!-- Category Selection -->
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700">Default Category <span class="text-red-500">*</span></label>
                <div class="grid grid-cols-3 gap-2">
                  <BaseSelect
                      v-model="form.parent_category_id"
                      :options="parentCategoryOptions"
                      placeholder="-- Select Parent --"
                      @change="onParentCategoryChange"
                      :error="getError('parent_category_id')"
                  />
                  <BaseSelect
                      v-model="form.second_category_id"
                      :options="secondCategoryOptions"
                      placeholder="-- Select Second --"
                      @change="onSecondCategoryChange"
                      :disabled="!form.parent_category_id"
                  />
                  <BaseSelect
                      v-model="form.third_category_id"
                      :options="thirdCategoryOptions"
                      placeholder="-- Select Third --"
                      :disabled="!form.second_category_id"
                  />
                </div>
              </div>

              <!-- Description -->
              <BaseTextArea
                  label="Description"
                  v-model="form.description"
                  rows="8"
                  placeholder="The following special characters are not allowed: <, >, {, }, ^, [, ], =, @, ;"
                  :error="getError('description')"
                  required
              />
            </div>
          </div>
        </div>

      </div>

      <!-- Colors & Inventory Section -->
      <ProductInventory
        ref="inventoryComponent"
        :inventories="form.inventories"
        :all-errors="allErrors"
        @update:inventories="form.inventories = $event"
        @add-color="handleAddColor"
        @remove-inventory="handleRemoveInventory"
      />

      <!-- Images & Videos Section -->
      <ProductMedia
        ref="mediaComponent"
        :images="form.images"
        :inventories="form.inventories"
        :all-errors="allErrors"
        @update:images="form.images = $event"
      />
    </div>

    <!-- Action Buttons -->
    <div class="flex items-center justify-between mt-8 pt-6 border-t border-border sticky bottom-0 bg-white py-4">
      <router-link :to="{ name: 'products.list' }" class="btn-secondary-new">
        ← Back to List
      </router-link>
      <button
        @click="submit"
        :disabled="loading"
        class="btn-primary-new"
      >
        {{ loading ? 'Saving...' : (type === 'edit' ? 'Update Product' : 'Save Product') }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { PackageIcon, PlusCircleIcon } from 'lucide-vue-next';
import apiClient from '@/utils/axios';
import BaseInput from '@/components/form/BaseInput.vue';
import BaseSelect from '@/components/form/BaseSelect.vue';
import BaseTextArea from '@/components/form/BaseTextArea.vue';
import ProductInventory from '@/components/product/ProductInventoryForm.vue';
import ProductMedia from '@/components/product/ProductMediaForm.vue';
import { useToast } from '@/composables/useToast';

const props = defineProps({
  type: {
    type: String,
    required: false,
    default: 'create', // create, edit, clone
  },
});

const route = useRoute();
const router = useRouter();
const { success, error } = useToast();

const loading = ref(false);
const product = ref(null);

// Form Data
const form = ref({
  status: 1,
  slug: '',
  style_no: '',
  sku: '',
  product_name: '',
  size_id: '',
  pack_id: '',
  fob_price: '',
  landed_price: '',
  resale_price: '',
  parent_category_id: '',
  second_category_id: '',
  third_category_id: '',
  description: '',
  inventories: [],
  images: [],
});

// Options Data
const categories = ref([]);
const sizes = ref([]);
const packs = ref([]);
const allErrors = ref({});

// Computed Properties
const formTitle = computed(() => {
  if (props.type === 'edit') return 'Edit Product';
  if (props.type === 'clone') return 'Clone Product';
  return 'Create New Product';
});

const formSubtitle = computed(() => {
  if (props.type === 'edit') return 'Update product information and save changes';
  if (props.type === 'clone') return 'Create a duplicate of this product with modifications';
  return 'Fill in the details below to add a new product to inventory';
});

// Category Options
const parentCategoryOptions = computed(() => {
  return categories.value.map(cat => ({
    value: cat.id,
    label: cat.name
  }));
});

const secondCategoryOptions = computed(() => {
  if (!form.value.parent_category_id) return [];
  // Convert both to numbers for comparison
  const parentId = Number(form.value.parent_category_id);
  const parent = categories.value.find(c => Number(c.id) === parentId);
  if (!parent || !parent.sub_categories) return [];
  return parent.sub_categories.map(cat => ({
    value: cat.id,
    label: cat.name
  }));
});

const thirdCategoryOptions = computed(() => {
  if (!form.value.second_category_id) return [];
  // Convert both to numbers for comparison
  const parentId = Number(form.value.parent_category_id);
  const secondId = Number(form.value.second_category_id);
  
  const parent = categories.value.find(c => Number(c.id) === parentId);
  if (!parent || !parent.sub_categories) return [];
  
  const second = parent.sub_categories.find(c => Number(c.id) === secondId);
  if (!second || !second.sub_categories) return [];
  
  return second.sub_categories.map(cat => ({
    value: cat.id,
    label: cat.name
  }));
});

const sizeOptions = computed(() => {
  return sizes.value.map(size => ({
    value: size.id,
    label: `${size.name} | ${size.readable}`
  }));
});

const packOptions = computed(() => {
  return packs.value.map(pack => ({
    value: pack.id,
    label: pack.readable
  }));
});

// Methods
const fetchCategories = async () => {
  try {
    const response = await apiClient.get('/all-categories');
    categories.value = response.data.data || [];
  } catch (error) {
    console.error('Failed to fetch categories:', error);
  }
};

const fetchSizes = async () => {
  try {
    const response = await apiClient.get('/active-sizes');
    sizes.value = response.data.data || [];
    
    // Set default size for create mode
    if (props.type === 'create' && sizes.value.length > 0) {
      const defaultSize = sizes.value.find(s => s.is_default == 1) || sizes.value[0];
      form.value.size_id = defaultSize.id;
      await fetchPacks(defaultSize.id);
    }
  } catch (error) {
    console.error('Failed to fetch sizes:', error);
  }
};

const fetchPacks = async (sizeId) => {
  try {
    const response = await apiClient.get(`/packs?size_id=${sizeId}`);
    packs.value = response.data.data || [];
    
    // Set default pack for create mode
    if (props.type === 'create' && packs.value.length > 0) {
      form.value.pack_id = packs.value[0].id;
    }
  } catch (error) {
    console.error('Failed to fetch packs:', error);
  }
};

const fetchProduct = async (id) => {
  loading.value = true;
  try {
    const response = await apiClient.get(`/products/${id}`);
    product.value = response.data.data;
    populateForm(product.value);
  } catch (err) {
    error('Failed to load product');
    router.push({ name: 'products.list' });
  } finally {
    loading.value = false;
  }
};

const populateForm = (productData) => {
  form.value = {
    status: productData.status ? 1 : 0,
    slug: productData.slug || '',
    style_no: productData.style_no || '',
    sku: productData.sku || '',
    product_name: productData.product_name || '',
    size_id: productData.size_id || '',
    pack_id: productData.pack_id || '',
    fob_price: productData.fob_price || '',
    landed_price: productData.landed_price || '',
    resale_price: productData.resale_price || '',
    parent_category_id: productData.parent_category_id || '',
    second_category_id: productData.second_category_id || '',
    third_category_id: productData.third_category_id || '',
    description: productData.description || '',
    inventories: productData.inventories || [],
    images: productData.images || [],
  };

  // If cloning, modify certain fields
  if (props.type === 'clone') {
    form.value.style_no = `${form.value.style_no}-Clone`;
    form.value.slug = '';
    // Clear IDs from related records
    form.value.inventories = form.value.inventories.map(inv => ({ ...inv, id: '' }));
    form.value.images = form.value.images.map((img, index) => ({ ...img, id: `temp_${Date.now()}_${index}` }));
  }

  // Fetch packs for the selected size
  if (form.value.size_id) {
    fetchPacks(form.value.size_id);
  }
};

const onSizeChange = () => {
  form.value.pack_id = '';
  if (form.value.size_id) {
    fetchPacks(form.value.size_id);
  }
};

const onParentCategoryChange = () => {
  form.value.second_category_id = '';
  form.value.third_category_id = '';
};

const onSecondCategoryChange = () => {
  form.value.third_category_id = '';
};

const handleAddColor = (color) => {
  // Check if color already exists
  const exists = form.value.inventories.find(inv => inv.color_id === color.id);
  
  if (exists) {
    // Remove if exists (toggle behavior)
    form.value.inventories = form.value.inventories.filter(inv => inv.color_id !== color.id);
    return;
  }
  
  // Add new inventory
  form.value.inventories.push({
    id: '',
    color_id: color.id,
    color: color,
    physical_qty: 0,
    incoming_qty: 0,
    outgoing_qty: 0,
    projected_qty: 0,
    stock_status: 'out_of_stock',
    reorder_level: 0,
    expected_arrival_date: null,
  });
};

const handleRemoveInventory = (index) => {
  form.value.inventories.splice(index, 1);
};

const getError = (field) => {
  return allErrors.value?.[field]?.[0] || '';
};

const submit = async () => {
  allErrors.value = {};
  loading.value = true;

  try {
    const formData = { ...form.value, type: props.type };
    
    let response;
    if (props.type === 'create' || props.type === 'clone') {
      response = await apiClient.post('/products', formData);
      success(props.type === 'clone' ? 'Product cloned successfully!' : 'Product created successfully!');
    } else {
      response = await apiClient.patch(`/products/${route.params.id}`, formData);
      success('Product updated successfully!');
    }

    // Redirect to edit page
    const productId = response.data.data.id;
    router.push({ name: 'products.edit', params: { id: productId } });
  } catch (err) {
    if (err.response?.data?.errors) {
      allErrors.value = err.response.data.errors;
      error(err.response.data.message || 'Validation failed');
    } else {
      error('Failed to save product');
    }
  } finally {
    loading.value = false;
  }
};

const loadData = async () => {
  await fetchCategories();
  await fetchSizes();
  
  // Load product for edit/clone
  if (route.params.id && (props.type === 'edit' || props.type === 'clone')) {
    await fetchProduct(route.params.id);
  }
};

// Lifecycle
onMounted(() => {
  loadData();
});

// Watch for route changes
watch([() => route.params.id, () => props.type], () => {
  if (route.params.id) {
    loadData();
  }
});
</script>

