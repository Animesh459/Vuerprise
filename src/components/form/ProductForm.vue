<template>
  <div class="min-h-screen p-8" style="background-color: #0D121C;">
    <div
        class="max-w-7xl mx-auto p-8 rounded-2xl shadow-2xl backdrop-blur-sm"
        style="background-color: rgba(14, 19, 28, 0.7);
             box-shadow: 0 0 50px rgba(71, 85, 105, 0.2), 0 0 80px rgba(129, 140, 248, 0.1);"
    >
      <h1 class="text-3xl font-bold mb-8 text-white">New Product Entry</h1>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-6">

        <div class="md:col-span-2 space-y-6">

          <BaseInput
              id="productName"
              label="Product Name"
              v-model="formData.productName"
              required
              placeholder="Enter product name..."
          />

          <div class="flex flex-wrap gap-4">
            <BaseSelect
                id="category1"
                label="Default Category"
                v-model="formData.category1"
                :options="categoryOptions"
                required
                placeholder="-- Select Parent --"
                is-inline
                custom-classes="flex-grow min-w-[120px]"
            />
            <BaseSelect
                id="category2"
                label=""
                v-model="formData.category2"
                :options="categoryOptions"
                placeholder="-- Select Parent --"
                is-inline
                custom-classes="flex-grow min-w-[120px]"
            />
            <BaseSelect
                id="category3"
                label=""
                v-model="formData.category3"
                :options="categoryOptions"
                placeholder="-- Select Third --"
                is-inline
                custom-classes="flex-grow min-w-[120px]"
            />
          </div>

          <div>
            <label
                for="description"
                class="block text-sm font-medium mb-1 text-slate-300"
            >
              Description<span class="text-red-500">*</span>
            </label>
            <textarea
                id="description"
                v-model="formData.description"
                required
                rows="7"
                class="w-full px-3 py-2 bg-slate-800/50 text-white rounded-lg border border-slate-700/50
                     shadow-inner-xl transition-all duration-300
                     focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/80
                     focus:outline-none resize-none"
            ></textarea>
            <p class="text-xs text-red-400 mt-1">
              The following special characters are not allowed: <, >, {, }, |
            </p>
          </div>

        </div>

        <div class="md:col-span-1 space-y-6 pt-1">

          <div class="mb-4">
            <label class="block text-sm font-medium mb-2 text-slate-300">Status</label>
            <div class="flex gap-6">
              <label class="flex items-center text-sm text-white cursor-pointer">
                <input type="radio" name="status" value="active" v-model="formData.status" class="hidden" />
                <span class="w-4 h-4 rounded-full border-2 border-slate-500 mr-2 transition-all duration-200"
                      :class="{'bg-blue-500 border-blue-500 ring-2 ring-blue-500/30': formData.status === 'active'}"></span>
                Active
              </label>
              <label class="flex items-center text-sm text-white cursor-pointer">
                <input type="radio" name="status" value="inactive" v-model="formData.status" class="hidden" />
                <span class="w-4 h-4 rounded-full border-2 border-slate-500 mr-2 transition-all duration-200"
                      :class="{'bg-red-500 border-red-500 ring-2 ring-red-500/30': formData.status === 'inactive'}"></span>
                Inactive
              </label>
            </div>
          </div>

          <div class="flex gap-4">
            <BaseInput
                id="styleNo"
                label="Style No."
                v-model="formData.styleNo"
                required
                is-inline
                custom-classes="min-w-[45%]"
            />
            <BaseInput
                id="sku"
                label="SKU"
                v-model="formData.sku"
                is-inline
                custom-classes="min-w-[45%]"
            />
          </div>

          <div class="flex gap-4">
            <BaseSelect
                id="size"
                label="Size"
                v-model="formData.size"
                :options="selectOptions"
                required
                placeholder="-- Select Size --"
                is-inline
                custom-classes="min-w-[45%] border-blue-500/80 ring-2 ring-blue-500/30"
            />
            <BaseSelect
                id="pack"
                label="Pack"
                v-model="formData.pack"
                :options="selectOptions"
                placeholder="-- Select Pack --"
                is-inline
                custom-classes="min-w-[45%] border-purple-500/80 ring-2 ring-purple-500/30"
            />
          </div>

          <BaseInput id="fobPrice" label="FOB Price" v-model="formData.fobPrice" type="number" />
          <BaseInput id="landedPrice" label="Landed Price" v-model="formData.landedPrice" type="number" />
          <BaseInput id="resalePrice" label="Resale Price" v-model="formData.resalePrice" type="number" />

        </div>
      </div>

      <div class="mt-10 pt-6 border-t border-slate-700/50 flex justify-between items-center">
        <button class="flex items-center gap-2 px-6 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back To List
        </button>

        <div>
          <button class="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors mr-3">
            Next
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 inline ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
          <button class="px-6 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-colors">
            Save
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import BaseInput from './BaseInput.vue';     // Make sure path is correct
import BaseSelect from './BaseSelect.vue';   // Make sure path is correct

// Initial form data state
const formData = ref({
  status: 'active',
  productName: '',
  category1: '',
  category2: '',
  category3: '',
  description: '',
  styleNo: '',
  sku: '',
  size: '',
  pack: '',
  fobPrice: null,
  landedPrice: null,
  resalePrice: null,
});

// Mock options for select fields
const selectOptions = [
  { value: 'small', text: 'Small' },
  { value: 'medium', text: 'Medium' },
  { value: 'large', text: 'Large' },
];

const categoryOptions = [
  { value: 'electronics', text: 'Electronics' },
  { value: 'clothing', text: 'Clothing' },
  { value: 'home', text: 'Home Goods' },
];

</script>

<style>
/* Optional: Custom style for the inner shadow effect on inputs */
.shadow-inner-xl {
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.4);
}
</style>