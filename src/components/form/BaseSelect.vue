<template>
  <div :class="{'w-full': !isInline}">
    <label
        :for="id"
        class="block text-sm font-medium mb-1 text-slate-300"
    >
      {{ label }}<span v-if="required" class="text-red-500">*</span>
    </label>
    <div class="relative">
      <select
          :id="id"
          :value="modelValue"
          @change="$emit('update:modelValue', $event.target.value)"
          :required="required"
          class="appearance-none w-full px-3 py-2 bg-slate-800/50 text-white rounded-lg border border-slate-700/50
               shadow-inner-xl transition-all duration-300
               focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/80
               focus:outline-none cursor-pointer"
          :class="customClasses"
      >
        <option value="" disabled>{{ placeholder }}</option>
        <option v-for="option in options" :key="option.value" :value="option.value">
          {{ option.text }}
        </option>
      </select>

      <svg class="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
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
  placeholder: { type: String, default: 'Select an option' },
  required: { type: Boolean, default: false },
  customClasses: { type: String, default: '' },
  isInline: { type: Boolean, default: false },
});

defineEmits(['update:modelValue']);
</script>