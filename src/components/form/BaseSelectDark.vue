<template>
  <div :class="{'w-full': !isInline}">
    <label
        v-if="label"
        class="block text-sm font-medium text-gray-700 mb-2"
    >
      {{ label }}
    </label>
    <div class="relative">
      <select
          :id="id"
          :value="modelValue"
          @change="$emit('update:modelValue', $event.target.value)"
          :required="required"
          :class="[
        'appearance-none h-9 w-full border border-neutral-200 bg-neutral-50 pl-4 pr-4 text-sm transition-colors',
        'placeholder:text-neutral-300 text-black focus:border-black focus:outline-none',
        customClass
      ]"

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
  customClass: {
    type: String,
    default: ''
  },
});

defineEmits(['update:modelValue']);
</script>