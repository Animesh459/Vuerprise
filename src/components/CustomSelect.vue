<template>
  <div class="relative z-30">
    <label :for="id" class="block text-sm font-medium text-gray-400 mb-1">
      {{ label }}
    </label>

    <button
        :id="id"
        @click="toggleDropdown"
        type="button"
        class="w-full px-4 py-2 border rounded-lg shadow-sm
             bg-gray-800 border-gray-700 text-left
             focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500
             transition duration-200 ease-in-out flex justify-between items-center"
        :class="isOpen ? 'ring-2 ring-indigo-500 border-indigo-500' : 'text-gray-300'"
        aria-haspopup="listbox"
        :aria-expanded="isOpen"
    >
      <span :class="modelValue ? 'text-white' : 'text-gray-500'">
        {{ selectedOptionText || placeholder }}
      </span>

      <svg
          class="w-4 h-4 text-gray-400 transform transition-transform duration-300 ease-in-out"
          :class="{ 'rotate-180': isOpen }"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </button>

    <Transition name="select-slide-fade">
      <ul v-if="isOpen"
          class="absolute z-40 mt-1 w-full rounded-lg shadow-xl
               bg-gray-800 border border-gray-700 py-1 max-h-60 overflow-y-auto
               focus:outline-none"
          tabindex="-1"
          role="listbox"
      >
        <li v-for="option in options" :key="option.value"
            @click="selectOption(option)"
            class="px-4 py-2 text-sm cursor-pointer transition-colors duration-150"
            :class="{
            'bg-indigo-600 text-white': modelValue === option.value,
            'text-gray-300 hover:bg-gray-700': modelValue !== option.value
          }"
            role="option"
            :aria-selected="modelValue === option.value"
        >
          {{ option.text }}
        </li>
      </ul>
    </Transition>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, computed } from 'vue';

const props = defineProps({
  id: { type: String, required: true },
  label: { type: String, required: true },
  modelValue: { type: [String, Number], default: '' },
  options: { type: Array, required: true }, // e.g., [{ value: 'v1', text: 'Option 1' }]
  placeholder: { type: String, default: 'Select an option' },
});

const emit = defineEmits(['update:modelValue']);

const isOpen = ref(false);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectOption = (option) => {
  emit('update:modelValue', option.value);
  isOpen.value = false;
};

// Computed property to display the text of the currently selected value
const selectedOptionText = computed(() => {
  const selected = props.options.find(opt => opt.value === props.modelValue);
  return selected ? selected.text : null;
});
</script>

<style>
/* -------------------------------------- */
/* Select Dropdown Slide/Fade Effect */
/* -------------------------------------- */

.select-slide-fade-enter-active,
.select-slide-fade-leave-active {
  transition: all 0.2s ease-out; /* Slightly faster transition for dropdown */
}

/* Starting state for enter (Slightly up and transparent) */
.select-slide-fade-enter-from {
  opacity: 0;
  transform: translateY(-5px);
}

/* Ending state for leave (Fade out and slide back up) */
.select-slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>