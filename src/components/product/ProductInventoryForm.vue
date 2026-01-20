<template>
  <div class="common-card-new">
    <div class="flex flex-col gap-6">
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div class="space-y-4 flex-1">
          <h1 class="text-lg items-center flex gap-1 font-bold text-gray-900">
            <div class="w-10 h-10 rounded-lg flex items-center justify-center">
              <LayersIcon class="text-amber-400" :size="24" />
            </div>
            Colors & Inventory
          </h1>
          <div class="relative flex-1 w-full">
            <Search class="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <input
              v-model="searchTerm"
              type="text"
              placeholder="Search colors..."
              class="h-9 w-full border border-border rounded-xl bg-white pl-10 pr-4 text-sm transition-colors placeholder:text-neutral-300 text-black focus:border-blue-600 focus:outline-none"
            />
          </div>
        </div>
        <div class="flex gap-3">
          <button
            v-if="!showColorForm"
            @click="showColorForm = true"
            class="btn-primary-new flex gap-1 items-center"
          >
            <PlusIcon :size="16" /> Add New Color
          </button>
          <button
            v-if="showColorForm"
            @click="showColorForm = false"
            class="btn-danger-new"
          >
            X Close Color Form
          </button>
        </div>
      </div>

      <!-- Color Form (when adding new) -->
      <div v-if="showColorForm" class="p-4 border border-border  rounded-xl">
        <h3 class="text-lg font-semibold mb-4">Add New Color</h3>
        <ProductColorForm @color-added="handleColorAdded" @cancel="showColorForm = false" />
      </div>

      <!-- Color Selection Grid -->
      <div v-if="!showColorForm" class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
        <div
          v-for="color in filteredColors"
          :key="color.id"
          @click="toggleColor(color)"
          :class="[
            'flex items-center gap-2 border p-2 rounded-xl cursor-pointer transition-all',
            isColorSelected(color.id)
              ? 'border-blue-500 bg-blue-50'
              : 'border-zinc-200 hover:border-blue-600'
          ]"
        >
          <div
            class="w-6 h-6 rounded-full border-2 border-gray-300"
            :style="{ backgroundColor: color.master_color?.code || '#cccccc' }"
          ></div>
          <span class="text-sm font-medium">{{ color.name }}</span>
          <CheckIcon
            v-if="isColorSelected(color.id)"
            :size="16"
            class="ml-auto text-blue-600"
          />
        </div>
      </div>

      <!-- Inventory Management Table -->
      <div v-if="inventories.length > 0" class="mt-6">
        <div class="common-card-new">
          <h3 class="text-lg font-bold text-gray-900 mb-1">Inventory Management</h3>
          <p class="text-sm text-gray-600 mb-4">Manage stock levels for each color variant</p>

          <div class="table-container">
            <table class="table">
              <thead>
              <tr class="">
                <th class="">Color</th>
                <th class="">Physical Qty</th>
                <th class="">Incoming Qty</th>
                <th class="">Outgoing Qty</th>
                <th class="">Projected Qty</th>
                <th class="">Stock Status (Auto)</th>
                <th class="">Preorder Date</th>
                <th class="">Action</th>
              </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
              <tr
                  v-for="(inventory, index) in inventories"
                  :key="index"
                  class=""
              >
                <!-- Color -->
                <td class="">
                  <div class="flex gap-2 items-center">
                    <div
                        class="w-4 h-4 rounded-full border border-gray-300"
                        :style="{ backgroundColor: inventory.color?.master_color?.code || '#cccccc' }"
                    ></div>
                    <span class="font-medium text-gray-900">{{ inventory.color?.name }}</span>
                  </div>

                </td>

                <!-- Physical Qty -->
                <td class="">
                  <input
                      type="number"
                      min="0"
                      v-model.number="inventory.physical_qty"
                      @input="calculateProjected(index)"
                      class="w-20 h-9 placeholder:text-neutral-300 text-black focus:border-blue-600 focus:outline-none border border-border rounded-xl bg-white  text-sm transition-colors text-right"
                  />
                </td>

                <!-- Incoming Qty (Read-only) -->
                <td class="">
                  <span class="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
                    {{ inventory.incoming_qty || 0 }}
                  </span>
                </td>

                <!-- Outgoing Qty (Read-only) -->
                <td class="">
                  <span class="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded">
                    {{ inventory.outgoing_qty || 0 }}
                  </span>
                </td>

                <!-- Projected Qty (Auto-calculated) -->
                <td class="">
                  <span
                      :class="[
                      'px-2 py-1 text-xs font-semibold rounded',
                      inventory.projected_qty > inventory.reorder_level
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    ]"
                  >
                    {{ inventory.projected_qty }}
                  </span>
                </td>

                <!-- Stock Status (Auto-calculated, Read-only) -->
                <td class="">
                  <span
                      :class="[
                      'px-2 py-1 text-xs font-semibold rounded',
                      getStockStatusColor(inventory.stock_status)
                    ]"
                  >
                    {{ getStockStatusLabel(inventory.stock_status) }}
                  </span>
                </td>

                <!-- Expected Arrival -->
                <td class="">
                  <input
                      type="date"
                      v-model="inventory.expected_arrival_date"
                      :disabled="!inventory.incoming_qty"
                      class="h-9 pl-4 pr-4 placeholder:text-neutral-300 text-black focus:border-blue-600 focus:outline-none border border-border rounded-xl bg-white  text-sm transition-colors"
                  />
                </td>

                <!-- Action -->
                <td class="">
                  <button
                      @click="removeInventory(index)"
                      class="px-2 py-1 text-xs font-semibold rounded bg-red-100 text-red-700"
                  >
                    DELETE
                  </button>
                </td>
              </tr>
              </tbody>
            </table>
          </div>

        </div>

        <!-- Summary Stats -->
        <div class="grid grid-cols-4 gap-6 mt-8">
          <div class="p-6 rounded-xl border border-gray-100 bg-gradient-to-br from-blue-50 to-white">
            <div class="flex items-center justify-between mb-3">
              <h4 class="text-sm font-semibold text-gray-600">TOTAL COLORS</h4>
              <div class="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
                <BoxIcon class="w-5 h-5 text-white" />
              </div>
            </div>
            <p class="text-3xl font-bold text-gray-900">{{ inventories.length }}</p>
          </div>

          <div class="p-6 rounded-xl border border-gray-100 bg-gradient-to-br from-green-50 to-white">
            <div class="flex items-center justify-between mb-3">
              <h4 class="text-sm font-semibold text-gray-600">TOTAL PHYSICAL STOCK</h4>
              <div class="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center">
                <ZapIcon class="w-5 h-5 text-white" />
              </div>
            </div>
            <p class="text-3xl font-bold text-gray-900">{{ totalPhysicalStock }}</p>
          </div>

          <div class="p-6 rounded-xl border border-gray-100 bg-gradient-to-br from-amber-50 to-white">
            <div class="flex items-center justify-between mb-3">
              <h4 class="text-sm font-semibold text-gray-600">TOTAL PROJECTED STOCK</h4>
              <div class="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center">
                <ActivityIcon class="w-5 h-5 text-white" />
              </div>
            </div>
            <p class="text-3xl font-bold text-gray-900">{{ totalProjectedStock }}</p>
          </div>

          <div class="p-6 rounded-xl border border-gray-100 bg-gradient-to-br from-red-50 to-white">
            <div class="flex items-center justify-between mb-3">
              <h4 class="text-sm font-semibold text-gray-600">NEED REORDER</h4>
              <div class="w-8 h-8 rounded-lg bg-red-500 flex items-center justify-center">
                <AlertTriangleIcon class="w-5 h-5 text-white" />
              </div>
            </div>
            <p class="text-3xl font-bold text-gray-900">{{ colorsNeedReorder }}</p>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
        <LayersIcon class="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p class="text-gray-600">No colors added yet. Search and select colors above to add them.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { settingsService } from '@/services'
import { LayersIcon, Search, PlusIcon, CheckIcon, BoxIcon, ZapIcon, ActivityIcon, AlertTriangleIcon } from 'lucide-vue-next';
import apiClient from '@/utils/axios';
import ProductColorForm from './ProductColorForm.vue';

const props = defineProps({
  inventories: {
    type: Array,
    required: true,
  },
  allErrors: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(['update:inventories', 'add-color', 'remove-inventory']);

const colors = ref([]);
const searchTerm = ref('');
const showColorForm = ref(false);

// Stock threshold settings (fetched from backend)
const lowStockQty = ref(10); // Default fallback
const reorderQty = ref(50); // Default fallback

// Computed
const filteredColors = computed(() => {
  if (!searchTerm.value) return colors.value;
  return colors.value.filter(color =>
    color.name.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});

const totalPhysicalStock = computed(() => {
  return props.inventories.reduce((total, inv) => total + (parseInt(inv.physical_qty) || 0), 0);
});

const totalProjectedStock = computed(() => {
  return props.inventories.reduce((total, inv) => total + (parseInt(inv.projected_qty) || 0), 0);
});

const colorsNeedReorder = computed(() => {
  return props.inventories.filter(inv => 
    inv.stock_status === 'reorder' || inv.stock_status === 'critical'
  ).length;
});

// Methods
const fetchInventorySettings = async () => {
  try {
    const inventoryResponse = await settingsService.getInventorySettings()
    if (inventoryResponse.data.data) {
      lowStockQty.value = inventoryResponse.data.data.low_stock_qty || 10;
      reorderQty.value = inventoryResponse.data.data.reorder_qty || 50;
    }
  } catch (error) {
    console.error('Failed to fetch inventory settings:', error);
    // Keep default values
  }
};

const fetchColors = async () => {
  try {
    const response = await apiClient.get('/get-active-colors');
    colors.value = response.data.data || [];
  } catch (error) {
    console.error('Failed to fetch colors:', error);
  }
};

const isColorSelected = (colorId) => {
  return props.inventories.some(inv => inv.color_id === colorId);
};

const toggleColor = (color) => {
  emit('add-color', color);
};

const calculateProjected = (index) => {
  const inventory = props.inventories[index];
  inventory.projected_qty =
    (parseInt(inventory.physical_qty) || 0) +
    (parseInt(inventory.incoming_qty) || 0) -
    (parseInt(inventory.outgoing_qty) || 0);
  
  // Auto-calculate stock status based on projected qty
  checkReorderStatus(index);
};

const checkReorderStatus = (index) => {
  const inventory = props.inventories[index];
  const projected = parseInt(inventory.projected_qty) || 0;

  // Auto-calculate stock status based on threshold settings
  if (projected <= 0) {
    inventory.stock_status = 'out_of_stock';
  } else if (projected <= lowStockQty.value) {
    inventory.stock_status = 'critical';
  } else if (projected <= reorderQty.value) {
    inventory.stock_status = 'reorder';
  } else {
    inventory.stock_status = 'safe';
  }
};

const getStockStatusLabel = (status) => {
  const labels = {
    'safe': 'Safe',
    'reorder': 'Reorder',
    'critical': 'Critical',
    'out_of_stock': 'Out of Stock'
  };
  return labels[status] || status;
};

const getStockStatusColor = (status) => {
  const colors = {
    'safe': 'bg-green-100 text-green-700',
    'reorder': 'bg-yellow-100 text-yellow-700',
    'critical': 'bg-orange-100 text-orange-700',
    'out_of_stock': 'bg-red-100 text-red-700'
  };
  return colors[status] || 'bg-gray-100 text-gray-700';
};

const removeInventory = (index) => {
  emit('remove-inventory', index);
};

const handleColorAdded = (newColor) => {
  colors.value.push(newColor);
  showColorForm.value = false;
  toggleColor(newColor);
};

// Lifecycle
onMounted(() => {
  fetchInventorySettings();
  fetchColors();
});
</script>


