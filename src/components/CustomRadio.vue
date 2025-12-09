<template>
  <div>
<!--    <label class="block text-sm font-medium text-gray-400 mb-2">-->
<!--      {{ label }}-->
<!--    </label>-->
    <div class="flex flex-wrap gap-6">
      <div v-for="option in options" :key="option.value" class="flex items-center">
        <input
            :id="`${id}-${option.value}`"
            :name="id"
            :value="option.value"
            :checked="modelValue === option.value"
            @change="$emit('update:modelValue', $event.target.value)"
            type="radio"
            class="hidden"
        />

        <label
            :for="`${id}-${option.value}`"
            class="flex items-center cursor-pointer text-sm text-gray-300 select-none
                 transition duration-200 ease-in-out hover:text-indigo-400"
        >
          <div
              class="w-5 h-5 mr-3 rounded-full border-2 flex items-center justify-center flex-shrink-0
                   transition duration-300 ease-in-out"
              :class="modelValue === option.value
              ? 'border-indigo-500 shadow-md shadow-indigo-500/30'
              : 'border-gray-600 bg-gray-800 hover:border-indigo-500'"
          >
            <div
                class="w-2.5 h-2.5 rounded-full bg-indigo-500
                     transition-transform duration-300 ease-in-out"
                :class="{ 'scale-100 opacity-100': modelValue === option.value, 'scale-0 opacity-0': modelValue !== option.value }"
            ></div>
          </div>
          {{ option.text }}
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
  id: { type: String, required: true },
  label: { type: String, required: true },
  modelValue: { type: [String, Number], default: '' },
  options: { type: Array, required: true },
});

defineEmits(['update:modelValue']);
</script>