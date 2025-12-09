<template>
  <div class="flex items-center">
    <input
        :id="id"
        :checked="modelValue"
        @change="$emit('update:modelValue', $event.target.checked)"
        type="checkbox"
        class="hidden"
    />

    <label
        :for="id"
        class="flex items-center cursor-pointer text-sm text-gray-300 select-none
             transition duration-200 ease-in-out hover:text-indigo-400"
    >
      <div
          class="w-5 h-5 mr-3 rounded-md border-2 flex items-center justify-center flex-shrink-0
               transition duration-300 ease-in-out"
          :class="modelValue
          ? 'border-indigo-500 bg-indigo-500 shadow-lg shadow-indigo-500/30' 
          : 'border-gray-600 bg-gray-800 hover:border-indigo-500'"
      >
        <svg
            class="w-3 h-3 text-white transform transition-transform duration-300 ease-in-out"
            :class="{ 'scale-100 opacity-100': modelValue, 'scale-0 opacity-0': !modelValue }"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      <slot>{{ label }}</slot>
    </label>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
  id: { type: String, required: true },
  label: { type: String, default: '' },
  modelValue: { type: Boolean, default: false },
});

defineEmits(['update:modelValue']);
</script>