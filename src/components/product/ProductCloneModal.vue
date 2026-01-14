<template>
  <div v-if="show" class="fixed inset-0 z-50 overflow-y-auto">
    <!-- Backdrop -->
    <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>

    <!-- Modal -->
    <div class="flex min-h-full items-center justify-center p-4">
      <div class="relative bg-white rounded-lg shadow-xl max-w-3xl w-full">
        <!-- Header -->
        <div class="border-b border-gray-200 px-6 py-4">
          <h3 class="text-lg font-semibold text-gray-900">
            Cloning Products
          </h3>
          <p class="mt-1 text-sm text-gray-600">
            {{ completedCount }} of {{ clonedItems.length }} products cloned
          </p>
        </div>

        <!-- Progress Table -->
        <div class="px-6 py-4 max-h-96 overflow-y-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Style No
                </th>
                <th class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Progress
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="(item, index) in clonedItems" :key="index">
                <td class="px-3 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                  {{ item.style_no }}
                </td>
                <td class="px-3 py-3 text-sm text-gray-600">
                  <div class="line-clamp-2">{{ item.name }}</div>
                </td>
                <td class="px-3 py-3 whitespace-nowrap text-sm">
                  <span
                    :class="{
                      'text-gray-500': item.status === 'pending',
                      'text-blue-600': item.status === 'cloning',
                      'text-green-600': item.status === 'success',
                      'text-red-600': item.status === 'failed'
                    }"
                    class="font-medium capitalize"
                  >
                    {{ item.status }}
                  </span>
                </td>
                <td class="px-3 py-3 whitespace-nowrap">
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div
                      class="h-2 rounded-full transition-all duration-300"
                      :class="{
                        'bg-gray-400': item.status === 'pending',
                        'bg-blue-500': item.status === 'cloning',
                        'bg-green-500': item.status === 'success',
                        'bg-red-500': item.status === 'failed'
                      }"
                      :style="{ width: item.progress + '%' }"
                    ></div>
                  </div>
                  <span class="text-xs text-gray-500 mt-1">{{ item.progress }}%</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Footer -->
        <div v-if="isCompleted" class="border-t border-gray-200 px-6 py-4">
          <div class="flex items-center justify-between">
            <p class="text-sm text-gray-600">
              Cloning completed! This window will close automatically in {{ autoCloseCountdown }}s
            </p>
            <button
              @click="closeModal"
              class="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
            >
              Close Now
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useToast } from '@/composables/useToast';
import apiClient from '@/utils/axios';

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  productIds: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['close', 'completed']);
const toast = useToast();

const clonedItems = ref([]);
const isCompleted = ref(false);
const autoCloseCountdown = ref(3);
let autoCloseInterval = null;

const completedCount = computed(() => {
  return clonedItems.value.filter(item => 
    item.status === 'success' || item.status === 'failed'
  ).length;
});

// Watch for show prop changes to start cloning
watch(() => props.show, (newValue) => {
  if (newValue && props.productIds.length > 0) {
    startCloning();
  }
});

const startCloning = async () => {
  isCompleted.value = false;
  autoCloseCountdown.value = 3;
  
  try {
    // Make API request to get items to be cloned
    const response = await apiClient.post('/clone-start', {
      item_ids: props.productIds
    });

    // Get the list of items to be cloned
    const itemsToClone = response.data.data || response.data;

    // Initialize clonedItems array with pending status
    clonedItems.value = itemsToClone.map((item) => ({
      id: item.id,
      name: item.product_name || item.style_no,
      style_no: item.style_no,
      status: 'pending',
      progress: 0,
    }));

    // Clone each item and update status and progress
    for (let index = 0; index < itemsToClone.length; index++) {
      const itemId = itemsToClone[index].id;

      // Update status to cloning
      clonedItems.value[index].status = 'cloning';
      clonedItems.value[index].progress = 10;

      try {
        // Make API request to clone the item
        const { data } = await apiClient.post(`/clone-item/${itemId}`);
        
        if (data.success) {
          // Update status and progress for the cloned item
          clonedItems.value[index].status = 'success';
          clonedItems.value[index].progress = 100;
        } else {
          clonedItems.value[index].status = 'failed';
          clonedItems.value[index].progress = 100;
        }
      } catch (error) {
        // Handle cloning failure
        console.error(`Cloning failed for Item ${index + 1}`, error);
        clonedItems.value[index].status = 'failed';
        clonedItems.value[index].progress = 100;
      }
    }

    // All cloning completed
    isCompleted.value = true;
    emit('completed');
    
    // Start auto-close countdown
    startAutoCloseCountdown();
  } catch (error) {
    // Handle overall cloning failure
    console.error('Cloning failed', error);
    toast.error('Failed to start cloning process. Please try again.');
    closeModal();
  }
};

const startAutoCloseCountdown = () => {
  autoCloseInterval = setInterval(() => {
    autoCloseCountdown.value--;
    
    if (autoCloseCountdown.value <= 0) {
      clearInterval(autoCloseInterval);
      closeModal();
    }
  }, 1000);
};

const closeModal = () => {
  if (autoCloseInterval) {
    clearInterval(autoCloseInterval);
  }
  emit('close');
};
</script>
