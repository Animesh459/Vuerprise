<template>
  <div>
    <div class="flex flex-col border-b border-b-border pb-4 mb-4">
      <h1 class="text-3xl font-bold tracking-tighter text-gray-900">Pack Ratios</h1>
      <p class="text-sm text-text-muted-light dark:text-text-muted-dark mt-1">Manage pack ratios for each size configuration</p>
    </div>

    <main>
      <!-- Size Selector -->
      <div class="common-card-new mb-6">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">Select Size to Manage Packs</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Size <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <select 
                v-model="selectedSizeId"
                @change="onSizeChange"
                class="h-9 w-full border border-neutral-200 bg-neutral-50 pl-4 pr-10 text-sm transition-colors text-black focus:border-black focus:outline-none rounded appearance-none"
              >
                <option value="">Select a size</option>
                <option v-for="size in sizes" :key="size.id" :value="size.id">
                  {{ size.name }} ({{ size.size_items?.map(si => si.value).join(', ') || 'No items' }})
                </option>
              </select>
              <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      <!-- Pack Management (only shown when size is selected) -->
      <div v-if="selectedSizeId && selectedSize" class="space-y-6">
        <!-- Current Size Info -->
        <div class="common-card-new">
          <div class="flex justify-between items-start mb-4">
            <div>
              <h3 class="text-lg font-semibold text-gray-900">{{ selectedSize.name }}</h3>
              <div class="flex gap-2 mt-2">
                <span v-for="(item, idx) in selectedSize.size_items" :key="idx" class="px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded">
                  {{item.value }}
                </span>
              </div>
            </div>
            <span :class="[
              'px-3 py-1 rounded-full text-xs font-bold',
              selectedSize.status === 1 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            ]">
              {{ selectedSize.status === 1 ? 'Active' : 'Inactive' }}
            </span>
          </div>
        </div>

        <!-- Pack Ratios List -->
        <div class="common-card-new">
          <div class="flex justify-between items-center mb-3">
            <h3 class="text-base font-semibold text-gray-900">Pack Ratios</h3>
            <button @click="addPackRatio" class="btn-primary-new">+ Add Ratio</button>
          </div>

          <div v-if="packRatios.length === 0" class="text-center py-6 text-gray-500 text-sm">
            No pack ratios configured. Click "Add Ratio" to create one.
          </div>

          <div v-else class="space-y-3">
            <div v-for="(pack, packIndex) in packRatios" :key="packIndex" class="border border-gray-200 rounded-lg p-3 bg-gray-50">
              <div class="flex justify-between items-start mb-2">
                <div class="flex items-center gap-2">
                  <span class="text-xs font-semibold text-gray-700">Ratio #{{ packIndex + 1 }}</span>
                  <span class="text-xs text-gray-500">{{ formatPackDisplay(pack, selectedSize.size_items.length) }}</span>
                </div>
                <button @click="removePackRatio(packIndex)" class="text-red-600 hover:text-red-800 p-1">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>

              <div class="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-2">
                <div v-for="(sizeItem, idx) in selectedSize.size_items" :key="idx">
                  <label class="block text-xs font-medium text-gray-600 mb-1">
                    {{ sizeItem.value }}
                  </label>
                  <input
                    v-model.number="pack[`p${idx + 1}`]"
                    type="number"
                    min="0"
                    placeholder="0"
                    :class="[
                      'h-8 w-full border bg-white px-2 text-sm transition-colors text-black focus:border-black focus:outline-none rounded',
                      getFieldError(packIndex, idx + 1) ? 'border-red-500' : 'border-neutral-200'
                    ]"
                  />
                  <div v-if="getFieldError(packIndex, idx + 1)" class="text-xs text-red-600 mt-0.5">
                    {{ getFieldError(packIndex, idx + 1) }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="packRatios.length > 0" class="flex justify-end gap-3 mt-4 pt-3 border-t border-gray-200">
            <button @click="cancelEditing" class="btn-secondary-new">Cancel</button>
            <button @click="savePackRatios" :disabled="loading" class="btn-primary-new">
              <span v-if="!loading">Save All Ratios</span>
              <span v-else>Saving...</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="common-card-new">
        <div class="text-center py-12 text-gray-500">
          <svg class="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
          </svg>
          <p class="text-lg font-medium">Select a size to manage pack ratios</p>
          <p class="text-sm mt-1">Choose a size configuration from the dropdown above</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { ChevronDown } from "lucide-vue-next"
import ErrorMessage from "@/components/ErrorMessage.vue"
import { sizeService, packService } from '@/services'
import { useToast } from '@/composables/useToast'

const toast = useToast()

const sizes = ref([])
const selectedSizeId = ref('')
const selectedSize = ref(null)
const packRatios = ref([])
const loading = ref(false)
const errors = ref({})
const packsToRemove = ref([])

onMounted(() => {
  fetchSizes()
})

const fetchSizes = async () => {
  try {
    const response = await sizeService.getAll({ status: 1 })
    sizes.value = response.data.data || response.data
  } catch (error) {
    console.error('Failed to fetch sizes:', error)
    toast.error('Failed to fetch sizes')
  }
}

const onSizeChange = async () => {
  if (!selectedSizeId.value) {
    selectedSize.value = null
    packRatios.value = []
    return
  }

  try {
    const response = await sizeService.getById(selectedSizeId.value)
    selectedSize.value = response.data.data || response.data
    
    // Load existing pack ratios
    if (selectedSize.value.pack && selectedSize.value.pack.length > 0) {
      packRatios.value = selectedSize.value.pack.map(pack => {
        const ratio = { id: pack.id }
        pack.pack_items.forEach(item => {
          ratio[`p${item.position}`] = item.quantity
        })
        return ratio
      })
    } else {
      packRatios.value = []
    }
    
    packsToRemove.value = []
    errors.value = {}
  } catch (error) {
    console.error('Failed to fetch size details:', error)
    toast.error('Failed to load size details')
  }
}

const addPackRatio = () => {
  const newPack = {}
  selectedSize.value.size_items.forEach((item, idx) => {
    newPack[`p${idx + 1}`] = 0
  })
  packRatios.value.push(newPack)
}

const removePackRatio = (index) => {
  const pack = packRatios.value[index]
  if (pack.id) {
    // Track for removal if it's an existing pack
    packsToRemove.value.push({ id: pack.id })
  }
  packRatios.value.splice(index, 1)
}

const formatPackDisplay = (pack, itemCount) => {
  const values = []
  for (let i = 1; i <= itemCount; i++) {
    values.push(pack[`p${i}`] || 0)
  }
  return values.join('-')
}

const savePackRatios = async () => {
  loading.value = true
  errors.value = {}

  try {
    const sizeData = {
      name: selectedSize.value.name,
      status: selectedSize.value.status,
    }

    // Add size items
    selectedSize.value.size_items.forEach((item, idx) => {
      sizeData[`s${idx + 1}`] = item.value
    })

    const payload = {
      size_id: selectedSizeId.value,
      size: sizeData,
      pack: packRatios.value,
    }

    if (packsToRemove.value.length > 0) {
      payload.removeRatio = packsToRemove.value
    }

    await packService.updatePacks(payload)
    toast.success('Pack ratios saved successfully!')
    
    // Reload size to get updated packs
    await onSizeChange()
  } catch (error) {
    console.error('Pack save error:', error.response)
    
    if (error.response?.data?.errors) {
      // Backend validation errors
      errors.value = error.response.data.errors
      toast.error('Please fix the validation errors')
    } else {
      const errorMsg = error.response?.data?.message || 'Failed to save pack ratios'
      toast.error(errorMsg)
    }
  } finally {
    loading.value = false
  }
}

const cancelEditing = () => {
  // Reload the size to reset changes
  onSizeChange()
}

const getFieldError = (packIndex, position) => {
  // Backend now returns errors with pack index: pack.0.p1, pack.1.p2, etc.
  const errorKey = `pack.${packIndex}.p${position}`
  if (errors.value[errorKey]) {
    return Array.isArray(errors.value[errorKey]) ? errors.value[errorKey][0] : errors.value[errorKey]
  }
  return null
}
</script>