<template>
  <div class=" bg-white">

    <div class="">
      <!-- Header Section -->
      <div class="flex items-center justify-between mb-8">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-gray-900">Edit Item</h2>
        </div>
        <div class="flex gap-3">
          <button class="px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-full hover:bg-blue-600 transition">
            ✓ ACTIVE
          </button>
          <button class="px-4 py-2 border border-gray-200 text-gray-700 text-sm font-semibold rounded-full hover:bg-gray-50 transition">
            ✕ INACTIVE
          </button>
        </div>
      </div>

      <!-- Product Essentials Section -->
      <div class="bg-white rounded-2xl border border-gray-100 p-8 mb-8 shadow-sm hover:shadow-md transition">
        <h3 class="text-lg font-bold text-gray-900 mb-6">Product Essentials</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Style No -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Style No</label>
            <input type="text" value="MJ7024D. Clone Clone Clone" class="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
          </div>

          <!-- SKU -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">SKU</label>
            <input type="text" placeholder="SKU" class="w-full px-4 py-3 border border-gray-200 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
          </div>

          <!-- Select Size -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Select Size</label>
            <select class="w-full px-4 py-3 border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
              <option>Select Size</option>
              <option>XS</option>
              <option>S</option>
              <option>M</option>
              <option>L</option>
              <option>XL</option>
            </select>
          </div>

          <!-- Product Name -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Product Name</label>
            <input type="text" value="Short Sleeve Knit Top with Daisy Patch" class="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
          </div>

          <!-- FOB Price -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">FOB Price</label>
            <div class="flex items-center gap-2">
              <span class="text-gray-600">$</span>
              <input type="number" value="15.00" class="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
            </div>
          </div>

          <!-- Retail Price -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Price</label>
            <div class="flex items-center gap-2">
              <span class="text-gray-600">$</span>
              <input type="number" value="22.80" class="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
            </div>
          </div>
        </div>
      </div>

      <!-- Colors & Inventory Section -->
      <div class="bg-white rounded-2xl border border-gray-100 p-8 mb-8 shadow-sm hover:shadow-md transition">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
              <svg class="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
              </svg>
            </div>
            <h3 class="text-lg font-bold text-gray-900">Colors & Inventory</h3>
          </div>
          <div class="flex gap-3">
            <button class="px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-lg hover:bg-blue-600 transition">
              + Add New Color
            </button>
            <button class="px-4 py-2 bg-red-500 text-white text-sm font-semibold rounded-lg hover:bg-red-600 transition">
              × Close Color Panel
            </button>
          </div>
        </div>

        <!-- Color Chips -->
        <div class="flex flex-wrap gap-3 mb-6 p-4 bg-gray-50 rounded-xl">
          <div class="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-full">
            <input type="checkbox" class="w-4 h-4 rounded accent-green-500" checked />
            <div class="w-3 h-3 rounded-full bg-green-500"></div>
            <span class="text-sm font-medium text-gray-700">RHODODUST GREEN</span>
          </div>

          <div class="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-full">
            <input type="checkbox" class="w-4 h-4 rounded accent-blue-400" />
            <div class="w-3 h-3 rounded-full bg-blue-200"></div>
            <span class="text-sm font-medium text-gray-700">CREAM/RED</span>
          </div>

          <div class="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-full">
            <input type="checkbox" class="w-4 h-4 rounded accent-gray-700" />
            <div class="w-3 h-3 rounded-full bg-gray-700"></div>
            <span class="text-sm font-medium text-gray-700">DARK GREEN/RED</span>
          </div>

          <div class="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-full">
            <input type="checkbox" class="w-4 h-4 rounded accent-blue-600" />
            <div class="w-3 h-3 rounded-full bg-blue-600"></div>
            <span class="text-sm font-medium text-gray-700">DENIM-RED</span>
          </div>

          <div class="flex items-center gap-2 px-3 py-2 bg-green-50 border border-green-200 rounded-full">
            <input type="checkbox" class="w-4 h-4 rounded accent-green-500" checked />
            <div class="w-3 h-3 rounded-full bg-green-500"></div>
            <span class="text-sm font-medium text-gray-700 font-semibold">GREEN</span>
          </div>
        </div>

        <!-- Search -->
        <div class="mb-6">
          <div class="relative">
            <svg class="absolute left-4 top-3 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input type="text" placeholder="Search colors, variants, stock codes..." class="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
          </div>
        </div>

        <!-- Detailed Feedback Section -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div class="lg:col-span-2"></div>
          <div class="bg-gradient-to-br from-blue-50 to-white rounded-xl border border-gray-100 p-6">
            <h4 class="text-sm font-bold text-gray-900 mb-3">Detailed Feedback</h4>
            <textarea placeholder="Enter internal description or feedback..." class="w-full h-24 px-3 py-2 border border-gray-200 rounded-lg bg-white text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none" />
          </div>
        </div>
      </div>

      <!-- Inventory Management Section -->
      <div class="bg-white rounded-2xl border border-gray-100 p-8 mb-8 shadow-sm hover:shadow-md transition">
        <h3 class="text-lg font-bold text-gray-900 mb-2">Inventory Management</h3>
        <p class="text-sm text-gray-600 mb-6">Manage stock levels for each color variant</p>

        <!-- Table -->
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
            <tr class="border-b border-gray-200">
              <th class="px-4 py-3 text-left font-semibold text-gray-700">COLOR</th>
              <th class="px-4 py-3 text-left font-semibold text-gray-700">PHYSICAL QTY</th>
              <th class="px-4 py-3 text-left font-semibold text-gray-700">INCOMING QTY</th>
              <th class="px-4 py-3 text-left font-semibold text-gray-700">OUTGOING QTY</th>
              <th class="px-4 py-3 text-left font-semibold text-gray-700">PROJECTED QTY</th>
              <th class="px-4 py-3 text-left font-semibold text-gray-700">STOCK STATUS</th>
              <th class="px-4 py-3 text-left font-semibold text-gray-700">REORDER LEVEL</th>
              <th class="px-4 py-3 text-left font-semibold text-gray-700">EXPECTED ARRIVAL</th>
              <th class="px-4 py-3 text-left font-semibold text-gray-700">ACTION</th>
            </tr>
            </thead>
            <tbody>
            <tr class="border-b border-gray-100 hover:bg-gray-50 transition">
              <td class="px-4 py-4 flex items-center gap-2">
                <div class="w-3 h-3 rounded-full bg-green-500"></div>
                <span class="font-medium text-gray-900">GREEN</span>
              </td>
              <td class="px-4 py-4 text-gray-600">0</td>
              <td class="px-4 py-4"><span class="text-blue-600 font-semibold">0</span></td>
              <td class="px-4 py-4"><span class="text-orange-600 font-semibold">0</span></td>
              <td class="px-4 py-4"><span class="text-red-600 font-semibold">0</span></td>
              <td class="px-4 py-4"><span class="px-3 py-1 bg-red-50 text-red-700 text-xs font-semibold rounded">OUT OF STOCK</span></td>
              <td class="px-4 py-4 text-gray-600">0</td>
              <td class="px-4 py-4 text-gray-400">yyyy-mm-dd</td>
              <td class="px-4 py-4"><span class="text-red-600 font-semibold cursor-pointer hover:text-red-700">DELETE</span></td>
            </tr>
            <tr class="hover:bg-gray-50 transition">
              <td class="px-4 py-4 flex items-center gap-2">
                <div class="w-3 h-3 rounded-full bg-yellow-200"></div>
                <span class="font-medium text-gray-900">IVORY</span>
              </td>
              <td class="px-4 py-4 text-gray-600">0</td>
              <td class="px-4 py-4"><span class="text-blue-600 font-semibold">0</span></td>
              <td class="px-4 py-4"><span class="text-orange-600 font-semibold">0</span></td>
              <td class="px-4 py-4"><span class="text-red-600 font-semibold">0</span></td>
              <td class="px-4 py-4"><span class="px-3 py-1 bg-red-50 text-red-700 text-xs font-semibold rounded">OUT OF STOCK</span></td>
              <td class="px-4 py-4 text-gray-600">0</td>
              <td class="px-4 py-4 text-gray-400">yyyy-mm-dd</td>
              <td class="px-4 py-4"><span class="text-red-600 font-semibold cursor-pointer hover:text-red-700">DELETE</span></td>
            </tr>
            </tbody>
          </table>
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <div class="p-6 rounded-xl border border-gray-100 bg-gradient-to-br from-blue-50 to-white">
            <div class="flex items-center justify-between mb-3">
              <h4 class="text-sm font-semibold text-gray-600">TOTAL COLORS</h4>
              <div class="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4z" />
                </svg>
              </div>
            </div>
            <p class="text-3xl font-bold text-gray-900">2</p>
          </div>

          <div class="p-6 rounded-xl border border-gray-100 bg-gradient-to-br from-green-50 to-white">
            <div class="flex items-center justify-between mb-3">
              <h4 class="text-sm font-semibold text-gray-600">TOTAL PHYSICAL STOCK</h4>
              <div class="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.5 1.5H5.75A2.25 2.25 0 003.5 3.75v12.5A2.25 2.25 0 005.75 18.5h8.5a2.25 2.25 0 002.25-2.25V6.5" />
                </svg>
              </div>
            </div>
            <p class="text-3xl font-bold text-gray-900">0</p>
          </div>

          <div class="p-6 rounded-xl border border-gray-100 bg-gradient-to-br from-amber-50 to-white">
            <div class="flex items-center justify-between mb-3">
              <h4 class="text-sm font-semibold text-gray-600">TOTAL PROJECTED STOCK</h4>
              <div class="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.5 1.5H5.75A2.25 2.25 0 003.5 3.75v12.5A2.25 2.25 0 005.75 18.5h8.5a2.25 2.25 0 002.25-2.25V6.5" />
                </svg>
              </div>
            </div>
            <p class="text-3xl font-bold text-gray-900">0</p>
          </div>

          <div class="p-6 rounded-xl border border-gray-100 bg-gradient-to-br from-red-50 to-white">
            <div class="flex items-center justify-between mb-3">
              <h4 class="text-sm font-semibold text-gray-600">NEED REORDER</h4>
              <div class="w-8 h-8 rounded-lg bg-red-500 flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
            <p class="text-3xl font-bold text-gray-900">2</p>
          </div>
        </div>
      </div>

      <!-- Media Management Section -->
      <div class="bg-white rounded-2xl border border-gray-100 p-8 mb-8 shadow-sm hover:shadow-md transition">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-8 h-8 rounded-lg bg-pink-100 flex items-center justify-center">
            <svg class="w-5 h-5 text-pink-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
            </svg>
          </div>
          <h3 class="text-lg font-bold text-gray-900">Media Management</h3>
        </div>

        <div class="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center mb-6 hover:border-blue-300 transition cursor-pointer bg-gray-50">
          <div class="flex flex-col items-center justify-center gap-3">
            <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 4v16m8-8H4" />
            </svg>
            <button class="px-4 py-2 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition">
              UPLOAD IMAGES OR VIDEOS
            </button>
          </div>
        </div>

        <!-- Image Gallery -->
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <div class="relative group overflow-hidden rounded-lg bg-gray-100 h-40">
            <img src="/product/1.jpg" alt="Product" class="w-full h-full object-cover group-hover:scale-110 transition" />
          </div>
          <div class="relative group overflow-hidden rounded-lg bg-gray-100 h-40">
            <img src="/product/1.jpg" alt="Product" class="w-full h-full object-cover group-hover:scale-110 transition" />
          </div>
          <div class="relative group overflow-hidden rounded-lg bg-gray-100 h-40">
            <img src="/product/1.jpg" alt="Product" class="w-full h-full object-cover group-hover:scale-110 transition" />
            <span class="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">NEW</span>
          </div>
          <div class="relative group overflow-hidden rounded-lg bg-gray-100 h-40">
            <img src="/product/1.jpg" alt="Product" class="w-full h-full object-cover group-hover:scale-110 transition" />
          </div>
          <div class="relative group overflow-hidden rounded-lg bg-gray-100 h-40">
            <img src="/product/1.jpg" alt="Product" class="w-full h-full object-cover group-hover:scale-110 transition" />
            <span class="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">SALE</span>
          </div>
          <div class="relative group overflow-hidden rounded-lg bg-gray-100 h-40">
            <img src="/product/1.jpg" alt="Product" class="w-full h-full object-cover group-hover:scale-110 transition" />
          </div>
          <div class="relative group overflow-hidden rounded-lg bg-gray-100 h-40">
            <img src="/product/1.jpg" alt="Product" class="w-full h-full object-cover group-hover:scale-110 transition" />
          </div>
          <div class="relative group overflow-hidden rounded-lg bg-gray-100 h-40">
            <img src="/product/1.jpg" alt="Product" class="w-full h-full object-cover group-hover:scale-110 transition" />
          </div>
        </div>

        <p class="text-xs text-gray-500 mt-4 text-center">Max 20 assets max limit automatic name through APIV</p>
      </div>

      <!-- Drag & Drop Info -->
      <div class="text-center py-8 border-t border-gray-100">
        <div class="flex items-center justify-center gap-2 mb-2">
          <svg class="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0113 2.586V4h.5A1.5 1.5 0 0115 5.5v13a1.5 1.5 0 01-1.5 1.5h-8A1.5 1.5 0 013 18.5v-13A1.5 1.5 0 014.5 4H5V2.586A2 2 0 016.586 2H9a1 1 0 000-2H6a4 4 0 00-4 4v14a3 3 0 003 3h8a3 3 0 003-3v-13a3 3 0 00-3-3H4z" />
          </svg>
          <p class="text-sm font-semibold text-gray-700">DRAG & DROP ASSETS</p>
        </div>
        <p class="text-xs text-gray-500">Drag your files or folders here to upload</p>
      </div>

      <!-- Action Buttons -->
      <div class="flex items-center justify-between mt-8 pt-8 border-t border-gray-100">
        <button class="text-sm font-semibold text-blue-600 hover:text-blue-700 transition">← BACK TO LIST</button>
        <div class="flex gap-4">
          <button class="px-6 py-2 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition">
            Previous
          </button>
          <button class="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition shadow-sm">
            Save Item
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Component is reactive with Vue 3 Composition API
const activeTab = ref('essentials')
</script>

<style scoped>
/* Smooth transitions for all interactive elements */
:deep(*) {
  transition: all 0.2s ease-out;
}
</style>
