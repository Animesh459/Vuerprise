<template>
  <div :class="{'w-full': !isInline}">
    <label
        :for="id"
        class="block text-sm font-medium mb-1 text-slate-300"
    >
      {{ label }}<span v-if="required" class="text-red-500">*</span>
    </label>
    <input
        :id="id"
        :type="type"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :placeholder="placeholder"
        :required="required"
        class="w-full px-3 py-2 bg-slate-800/50 text-white rounded-lg border border-slate-700/50
             shadow-inner-xl transition-all duration-300
             focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/80
             focus:outline-none"
        :class="customClasses"
    />
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
  id: { type: String, required: true },
  label: { type: String, required: true },
  modelValue: { type: [String, Number], default: '' },
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  required: { type: Boolean, default: false },
  customClasses: { type: String, default: '' },
  isInline: { type: Boolean, default: false }, // For controlling width when used next to another
});

defineEmits(['update:modelValue']);
</script>