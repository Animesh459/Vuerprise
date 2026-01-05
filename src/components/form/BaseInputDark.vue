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
        class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:border-cyan-500/50 transition-all outline-none"
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