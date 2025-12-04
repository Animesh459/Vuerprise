<template>
  <header class="flex items-center justify-between px-8 py-4 border-b border-gray-700/50">
    <div class="flex items-center gap-2">
      <div class="w-6 h-6 bg-teal-400 rounded-full"></div>
      <span class="text-xl font-semibold">Eden</span>
    </div>

    <div class="flex items-center gap-6">
      <button class="flex items-center gap-2 text-gray-300 hover:text-white text-sm">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Add Product
      </button>

      <button class="flex items-center gap-1 text-gray-300 hover:text-white text-sm">
        Support
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <button class="flex items-center gap-1 text-gray-300 hover:text-white text-sm">
        English (US)
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <button class="flex items-center gap-2 text-gray-300 hover:text-white">
        <div class="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-xs">
          E
        </div>
        <span class="text-sm">Eren</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>
  </header>
</template>

<script setup>
</script>